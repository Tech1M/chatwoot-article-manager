# Chatwoot Article Manager

Manage Chatwoot Help Center articles as markdown files with a web UI, git-based workflow, and idempotent sync engine.

## Features

- **Markdown-first** — articles are `.md` files with YAML frontmatter
- **Idempotent sync** — SHA256 content hashing, only pushes changed files
- **Chunked uploads** — configurable batch size with rate limiting
- **Web UI** — file browser, markdown editor, draft/publish workflow
- **Git integration** — commit & push from the UI, GitHub Action auto-syncs on push
- **Dry run** — preview what would change before syncing

## Quick Start

```bash
# Clone
git clone https://github.com/Tech1M/chatwoot-article-importer.git
cd chatwoot-article-importer

# Install
pip install -r requirements.txt
cd frontend && pnpm install && pnpm approve-builds --all && node build.cjs && cd ..

# Configure
cp .env.example .env
# Edit .env with your Chatwoot credentials

# Run
python3 run.py
# Open http://localhost:8000
```

## Configuration

Set these in `.env` or as environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `CHATWOOT_BASE_URL` | Your Chatwoot instance URL | `https://chatwoot.example.com` |
| `CHATWOOT_API_TOKEN` | API access token (Profile > Access Token) | `abc123...` |
| `CHATWOOT_ACCOUNT_ID` | Account ID (usually `1` for self-hosted) | `1` |
| `CHATWOOT_PORTAL_SLUG` | Portal slug in Help Center | `help-center` |
| `DOCS_DIR` | Path to your markdown articles directory | `./docs` |

## Article Frontmatter

```yaml
---
title: Feed vs Inbox — what goes where
slug: feed-vs-inbox
description: Quick guide to Feed vs Inbox.
category_slug: feed
meta:
  title: ""
  description: Quick guide to Feed vs Inbox.
  tags: [feed, inbox, communication]
related: [feed-post-update, inbox-overview]
status: drafted        # drafted | ready | published | archived
position: 5
---

Your markdown content here...
```

### Status Mapping

| Frontmatter status | Chatwoot status | Behavior |
|---------------------|-----------------|----------|
| `drafted` (default) | Draft (0) | Not visible to customers |
| `ready` / `published` | Published (1) | Visible in Help Center |
| `archived` | Archived (2) | Hidden from Help Center |

## Sync Engine

The sync engine uses content hashing for idempotency:

1. Computes SHA256 hash of each `.md` file
2. Compares against `.chatwoot-sync.json` manifest
3. Only creates/updates articles whose content has changed
4. Saves manifest after each chunk for crash recovery
5. Auto-creates missing categories from `category_slug`

## GitHub Action

The included workflow (`.github/workflows/sync-articles.yml`) auto-syncs when you push changes to `docs/**/*.md` on the `main` branch.

### Setup

Add these repository secrets (Settings > Secrets):

- `CHATWOOT_BASE_URL`
- `CHATWOOT_API_TOKEN`
- `CHATWOOT_ACCOUNT_ID`
- `CHATWOOT_PORTAL_SLUG`

### Manual Trigger

You can also trigger the sync manually from the Actions tab with an optional dry-run mode.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/files` | List all articles with sync status |
| `GET` | `/api/files/{path}` | Read article (frontmatter + body) |
| `PUT` | `/api/files/{path}` | Save article |
| `POST` | `/api/files` | Create new article |
| `DELETE` | `/api/files/{path}` | Delete article |
| `POST` | `/api/sync` | Run sync (`dry_run`, `chunk_size`) |
| `GET` | `/api/git/status` | Git status |
| `POST` | `/api/git/commit` | Commit changes |
| `POST` | `/api/git/push` | Push to remote |
| `GET` | `/api/config` | Current configuration |
| `GET` | `/api/categories` | List portal categories |

## Development

```bash
# Backend (with hot reload)
python3 run.py

# Frontend (with HMR, proxies /api to backend)
cd frontend && npx vite --port 5173
```

## License

MIT

