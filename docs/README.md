# Support Articles — Business App

User-facing help-center content for Chatwoot import.

## Layout
- `PLAN.md` — status tracker (one row per article).
- `_template/ARTICLE.md` — copy this when creating a new article.
- `<slug>/ARTICLE.md` — the article body + frontmatter.
- `<slug>/assets/*.png` — screenshots referenced as `./assets/NN-<name>.png`.

## Conventions
- Slug = kebab-case, prefixed by category area (e.g. `jobs-create-a-job`).
- Frontmatter aligns with Chatwoot's article import schema (`title`, `slug`, `description`, `category_slug`, `status`, `position`, `meta`).
- Audience is `business` for everything in this folder.
- Screenshots come from a local seeded environment — no real-tenant PII.
- English only for now.

## Writing flow
1. Find the row in `PLAN.md` and mark `In Progress`.
2. Copy `_template/ARTICLE.md` into the article folder.
3. Fill out frontmatter + body. Use the copywriting skill to pick the best shape (how-to, concept, troubleshooting).
4. Capture screenshots into `assets/` via browser-harness against local dev.
5. Update `PLAN.md` row status.

## Status legend
- ⬜ Not started
- 🟨 Drafted (text only, no screenshots)
- 🟦 Screenshots captured
- ✅ Reviewed & ready for import
