"""
Idempotent, hash-based sync engine.

Compares local .md files against a manifest of content hashes.
Only creates/updates articles whose content has actually changed.
Pushes in configurable chunks with rate limiting.

Status mapping:
  - "published" / "ready" -> Chatwoot status 1 (published)
  - "archived"            -> Chatwoot status 2 (archived)
  - anything else         -> Chatwoot status 0 (draft)
"""

import hashlib
import json
import re
import time
from pathlib import Path

import yaml

from .chatwoot_client import ChatwootClient


MANIFEST_FILE = ".chatwoot-sync.json"
FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)
STATUS_MAP = {"published": 1, "ready": 1, "archived": 2}


def parse_md(text: str) -> tuple[dict, str]:
    match = FRONTMATTER_RE.match(text)
    if not match:
        return {}, text
    try:
        fm = yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError:
        fm = {}
    return fm, text[match.end():]


def content_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:16]


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    return re.sub(r"-+", "-", text).strip("-")


def title_from_filename(p: Path) -> str:
    return re.sub(r"[-_]+", " ", p.stem).title()


def first_paragraph(body: str) -> str:
    for line in body.strip().splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            return line[:200]
    return ""


def _resolve_status(fm: dict) -> int:
    raw = str(fm.get("status", "")).lower().strip()
    return STATUS_MAP.get(raw, 0)


def build_payload(fm: dict, body: str, filepath: Path, category_map: dict[str, int], slug_to_id: dict[str, int]) -> dict:
    title = fm.get("title", "")
    if not title:
        h1 = re.match(r"^#\s+(.+)$", body.strip(), re.MULTILINE)
        if h1:
            title = h1.group(1).strip()
            body = body.replace(h1.group(0), "", 1).strip()
        else:
            title = title_from_filename(filepath)

    slug = fm.get("slug", slugify(title))
    desc = fm.get("description", first_paragraph(body))

    payload: dict = {
        "title": title,
        "slug": slug,
        "content": body,
        "description": desc[:255] if desc else "",
        "status": _resolve_status(fm),
        "locale": fm.get("locale", "en"),
    }

    if "position" in fm:
        payload["position"] = int(fm["position"])

    cat_key = fm.get("category_slug") or fm.get("category")
    if cat_key and cat_key in category_map:
        payload["category_id"] = category_map[cat_key]

    fm_meta = fm.get("meta")
    if isinstance(fm_meta, dict):
        payload["meta"] = {
            "tags": fm_meta.get("tags", []),
            "title": fm_meta.get("title", "") or title,
            "description": fm_meta.get("description", "") or payload["description"],
        }

    related = fm.get("related", [])
    if related and slug_to_id:
        for rs in related:
            if rs in slug_to_id:
                payload["associated_article_id"] = slug_to_id[rs]
                break

    return payload


def load_manifest(docs_dir: Path) -> dict:
    mf = docs_dir / MANIFEST_FILE
    if mf.exists():
        return json.loads(mf.read_text())
    return {}


def save_manifest(docs_dir: Path, manifest: dict):
    mf = docs_dir / MANIFEST_FILE
    mf.write_text(json.dumps(manifest, indent=2))


def collect_md_files(directory: Path) -> list[Path]:
    excludes = {"readme.md", "changelog.md", "license.md", "contributing.md"}
    return sorted(f for f in directory.rglob("*.md") if f.name.lower() not in excludes)


def ensure_categories(client: ChatwootClient, portal_slug: str, files: list[Path]) -> dict[str, int]:
    """Fetch existing categories, create missing ones. Returns slug->id map."""
    existing = client.list_categories(portal_slug)
    cat_map: dict[str, int] = {}
    for c in existing:
        cat_map[c["name"]] = c["id"]
        if "slug" in c:
            cat_map[c["slug"]] = c["id"]

    needed: dict[str, str] = {}
    for f in files:
        raw = f.read_text(encoding="utf-8")
        fm, _ = parse_md(raw)
        cs = fm.get("category_slug")
        if cs and cs not in cat_map:
            display = fm.get("category", cs.replace("-", " ").replace("_", " ").title())
            needed[cs] = display

    for slug_key, display in sorted(needed.items()):
        try:
            result = client.create_category(portal_slug, display, slug=slugify(slug_key))
            cid = result.get("id") or result.get("payload", {}).get("id")
            cat_map[slug_key] = cid
            cat_map[slugify(slug_key)] = cid
        except Exception:
            pass

    return cat_map


def sync(
    client: ChatwootClient,
    portal_slug: str,
    docs_dir: Path,
    chunk_size: int = 10,
    dry_run: bool = False,
) -> dict:
    """
    Idempotent sync: only push files whose hash changed since last sync.
    Returns a results dict with created/updated/skipped/failed counts and details.
    """
    docs_dir = Path(docs_dir).resolve()
    files = collect_md_files(docs_dir)
    manifest = load_manifest(docs_dir)

    # Fetch remote state
    cat_map = ensure_categories(client, portal_slug, files)
    remote_articles = client.list_articles(portal_slug)
    slug_to_remote: dict[str, dict] = {a["slug"]: a for a in remote_articles if "slug" in a}
    slug_to_id: dict[str, int] = {a["slug"]: a["id"] for a in remote_articles if "slug" in a}

    # Diff: figure out what changed
    actions: list[dict] = []
    for fp in files:
        raw = fp.read_text(encoding="utf-8")
        h = content_hash(raw)
        rel = str(fp.relative_to(docs_dir))
        fm, body = parse_md(raw)
        slug = fm.get("slug", slugify(fm.get("title", "") or title_from_filename(fp)))
        prev_hash = manifest.get(rel, {}).get("hash")

        if h == prev_hash and slug in slug_to_remote:
            actions.append({"action": "skip", "file": rel, "slug": slug, "reason": "unchanged"})
            continue

        payload = build_payload(fm, body, fp, cat_map, slug_to_id)

        if slug in slug_to_remote:
            actions.append({
                "action": "update",
                "file": rel,
                "slug": slug,
                "article_id": slug_to_remote[slug]["id"],
                "payload": payload,
                "hash": h,
            })
        else:
            actions.append({
                "action": "create",
                "file": rel,
                "slug": slug,
                "payload": payload,
                "hash": h,
            })

    # Execute in chunks
    results = {"created": 0, "updated": 0, "skipped": 0, "failed": 0, "details": []}

    for act in actions:
        if act["action"] == "skip":
            results["skipped"] += 1
            results["details"].append({"file": act["file"], "slug": act["slug"], "action": "skip"})
            continue

        if dry_run:
            key = act["action"]
            results[key + "d" if key == "create" else key + "d"] += 1
            results["details"].append({"file": act["file"], "slug": act["slug"], "action": act["action"], "dry_run": True})
            continue

        try:
            if act["action"] == "create":
                resp = client.create_article(portal_slug, act["payload"])
                aid = resp.get("id") or resp.get("payload", {}).get("id")
                slug_to_id[act["slug"]] = aid
                results["created"] += 1
            else:
                client.update_article(portal_slug, act["article_id"], act["payload"])
                results["updated"] += 1

            # Update manifest
            manifest[act["file"]] = {"hash": act["hash"], "slug": act["slug"]}
            results["details"].append({"file": act["file"], "slug": act["slug"], "action": act["action"], "ok": True})
        except Exception as e:
            results["failed"] += 1
            results["details"].append({"file": act["file"], "slug": act["slug"], "action": act["action"], "error": str(e)})

        time.sleep(0.3)

        # Save manifest after each chunk boundary
        if (results["created"] + results["updated"] + results["failed"]) % chunk_size == 0:
            if not dry_run:
                save_manifest(docs_dir, manifest)

    if not dry_run:
        save_manifest(docs_dir, manifest)

    results["total"] = len(files)
    return results

