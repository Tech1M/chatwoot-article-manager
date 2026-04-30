---
title: Import candidates from your ATS
slug: integrations-ats-import
description: Pull candidates from your connected ATS straight into a Tech1m talent pool, with search, filters, and bulk import.
category_slug: integrations
meta:
  title: ""
  description: Pull candidates from your connected ATS straight into a Tech1m talent pool, with search, filters, and bulk import.
  tags: [integrations, ats, import, candidates, talent-pool]
related: [integrations-connect-an-integration, talent-create-a-pool, talent-import-csv]
status: drafted
position: 3
audience: business
last_updated: 2026-04-27
---

# Import candidates from your ATS

> Bring candidates from Greenhouse, Workable, Lever, or any other connected ATS into a Tech1m talent pool you choose.

## Before you start
- Connect your ATS first. See [Connect an integration](../integrations-connect-an-integration/ARTICLE.md).
- Have at least one talent pool ready, or [create one](../talent-create-a-pool/ARTICLE.md). You'll pick the destination during import.
- You need permission to manage the destination talent pools.

## Steps

1. Go to **Settings → Integrations**, find your connected ATS, and click **View candidates**.
   ![Connected ATS tile with View candidates](./assets/01-ats-tile.png)
2. Pick one or more talent pools to import into, then use the search box and filters to narrow the candidate list. Select the candidates you want.
   ![ATS candidate list with selection](./assets/02-candidate-list.png)
3. Click **Import selected**. Tech1m pulls each candidate's profile, contact info, resume, and tags, then adds them to the chosen pools.
   ![Import confirmation banner](./assets/03-import-success.png)

Imports run in the background. You can keep working while Tech1m finishes, and you'll see the new candidates show up in the pool when it's done.

## Tips
- Use **Updated since** to import only candidates touched recently — perfect for keeping pools in sync without re-importing everything.
- Imported candidates are matched on their ATS ID, so re-importing the same person updates their record instead of creating a duplicate.

## Troubleshooting
- **No candidates appear** — confirm the ATS has candidates visible to the account you connected with, then refresh.
- **"Not authorized" on a pool** — you can only import into pools you can manage. Pick a different pool or ask the owner.
- **An import looks stuck** — large batches take a moment. If nothing changes after a few minutes, retry with a smaller selection.

## Related articles
- [Connect an integration](../integrations-connect-an-integration/ARTICLE.md)
- [Create a talent pool](../talent-create-a-pool/ARTICLE.md)
- [Import candidates from CSV](../talent-import-csv/ARTICLE.md)
