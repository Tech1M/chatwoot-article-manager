"""
FastAPI server — articles file CRUD, sync to Chatwoot, git operations.
"""

import os
import re
import subprocess
from pathlib import Path
from typing import Optional

import yaml
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .chatwoot_client import ChatwootClient
from .sync_engine import (
    FRONTMATTER_RE,
    collect_md_files,
    load_manifest,
    parse_md,
    slugify,
    sync,
    title_from_filename,
)

app = FastAPI(title="Chatwoot Article Manager")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


def get_config():
    base_url = os.environ.get("CHATWOOT_BASE_URL", "")
    token = os.environ.get("CHATWOOT_API_TOKEN", "")
    account_id = os.environ.get("CHATWOOT_ACCOUNT_ID", "1")
    portal_slug = os.environ.get("CHATWOOT_PORTAL_SLUG", "")
    docs_dir = os.environ.get("DOCS_DIR", "./sample-docs")
    return base_url, token, account_id, portal_slug, docs_dir


def get_client() -> ChatwootClient:
    base_url, token, account_id, _, _ = get_config()
    if not base_url or not token:
        raise HTTPException(500, "CHATWOOT_BASE_URL and CHATWOOT_API_TOKEN must be set")
    return ChatwootClient(base_url, token, account_id)


def docs_path() -> Path:
    _, _, _, _, d = get_config()
    return Path(d).resolve()


def _run_git(args: list[str], cwd: Path) -> tuple[int, str]:
    try:
        r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, timeout=30)
        return r.returncode, (r.stdout + r.stderr).strip()
    except Exception as e:
        return 1, str(e)


# ── File tree ────────────────────────────────────────────────────────────

@app.get("/api/files")
def list_files():
    root = docs_path()
    manifest = load_manifest(root)
    files = collect_md_files(root)
    result = []
    for fp in files:
        rel = str(fp.relative_to(root))
        raw = fp.read_text(encoding="utf-8")
        fm, _ = parse_md(raw)
        slug = fm.get("slug", slugify(fm.get("title", "") or title_from_filename(fp)))
        synced_hash = manifest.get(rel, {}).get("hash")
        from .sync_engine import content_hash
        current_hash = content_hash(raw)
        result.append({
            "path": rel,
            "slug": slug,
            "title": fm.get("title", title_from_filename(fp)),
            "status": str(fm.get("status", "drafted")),
            "category_slug": fm.get("category_slug", ""),
            "synced": synced_hash == current_hash,
            "has_changes": synced_hash is not None and synced_hash != current_hash,
            "new": synced_hash is None,
        })
    return {"files": result}


# ── Single file CRUD ─────────────────────────────────────────────────────

@app.get("/api/files/{path:path}")
def read_file(path: str):
    fp = docs_path() / path
    if not fp.exists() or not fp.suffix == ".md":
        raise HTTPException(404, "File not found")
    raw = fp.read_text(encoding="utf-8")
    fm, body = parse_md(raw)
    return {"path": path, "frontmatter": fm, "body": body, "raw": raw}


class SaveRequest(BaseModel):
    frontmatter: dict
    body: str


def _serialize_frontmatter(fm: dict) -> str:
    """Dump frontmatter preserving flow-style for meta.tags and related arrays."""
    return yaml.dump(fm, default_flow_style=False, allow_unicode=True, sort_keys=False).rstrip("\n")


@app.put("/api/files/{path:path}")
def save_file(path: str, req: SaveRequest):
    fp = docs_path() / path
    fp.parent.mkdir(parents=True, exist_ok=True)
    content = f"---\n{_serialize_frontmatter(req.frontmatter)}\n---\n\n{req.body}"
    fp.write_text(content, encoding="utf-8")
    return {"ok": True, "path": path}


class CreateFileRequest(BaseModel):
    path: str
    title: str
    category_slug: Optional[str] = ""


@app.post("/api/files")
def create_file(req: CreateFileRequest):
    fp = docs_path() / req.path
    if fp.exists():
        raise HTTPException(409, "File already exists")
    fp.parent.mkdir(parents=True, exist_ok=True)
    slug = slugify(req.title)
    fm = {
        "title": req.title,
        "slug": slug,
        "description": "",
        "category_slug": req.category_slug or "",
        "meta": {"title": "", "description": "", "tags": []},
        "related": [],
        "status": "drafted",
        "position": 1,
    }
    content = f"---\n{_serialize_frontmatter(fm)}\n---\n\n"
    fp.write_text(content, encoding="utf-8")
    return {"ok": True, "path": req.path, "slug": slug}


@app.delete("/api/files/{path:path}")
def delete_file(path: str):
    fp = docs_path() / path
    if not fp.exists():
        raise HTTPException(404, "File not found")
    fp.unlink()
    return {"ok": True}


# ── Sync ─────────────────────────────────────────────────────────────────

class SyncRequest(BaseModel):
    dry_run: bool = False
    chunk_size: int = 10


@app.post("/api/sync")
def run_sync(req: SyncRequest):
    _, _, _, portal_slug, _ = get_config()
    if not portal_slug:
        raise HTTPException(400, "CHATWOOT_PORTAL_SLUG must be set")
    client = get_client()
    results = sync(client, portal_slug, docs_path(), chunk_size=req.chunk_size, dry_run=req.dry_run)
    return results


# ── Git ──────────────────────────────────────────────────────────────────

@app.get("/api/git/status")
def git_status():
    root = docs_path()
    code, out = _run_git(["status", "--porcelain"], root)
    if code != 0:
        return {"ok": False, "error": out}
    changes = []
    for line in out.splitlines():
        if line.strip():
            status_code = line[:2].strip()
            file_path = line[3:].strip()
            changes.append({"status": status_code, "file": file_path})
    return {"ok": True, "changes": changes, "clean": len(changes) == 0}


class CommitRequest(BaseModel):
    message: str
    files: Optional[list[str]] = None  # None = all changed files


@app.post("/api/git/commit")
def git_commit(req: CommitRequest):
    root = docs_path()
    if req.files:
        for f in req.files:
            _run_git(["add", f], root)
    else:
        _run_git(["add", "-A"], root)

    code, out = _run_git(["commit", "-m", req.message], root)
    if code != 0 and "nothing to commit" not in out:
        raise HTTPException(400, out)
    return {"ok": True, "output": out}


@app.post("/api/git/push")
def git_push():
    root = docs_path()
    code, out = _run_git(["push"], root)
    if code != 0:
        raise HTTPException(400, out)
    return {"ok": True, "output": out}


# ── Config info ──────────────────────────────────────────────────────────

@app.get("/api/config")
def get_app_config():
    base_url, _, account_id, portal_slug, dd = get_config()
    return {
        "chatwoot_url": base_url,
        "account_id": account_id,
        "portal_slug": portal_slug,
        "docs_dir": dd,
    }


# ── Portals/Categories for UI dropdowns ─────────────────────────────────

@app.get("/api/portals")
def list_portals():
    client = get_client()
    return {"portals": client.list_portals()}


@app.get("/api/categories")
def list_categories():
    _, _, _, portal_slug, _ = get_config()
    if not portal_slug:
        raise HTTPException(400, "CHATWOOT_PORTAL_SLUG must be set")
    client = get_client()
    return {"categories": client.list_categories(portal_slug)}


# ── Static frontend (mounted last) ──────────────────────────────────────

frontend_dist = Path(__file__).parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")

