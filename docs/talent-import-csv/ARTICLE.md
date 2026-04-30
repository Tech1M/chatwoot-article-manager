---
title: Import candidates from CSV
slug: talent-import-csv
description: Bring an existing list of candidates into a Tech1m talent pool using a CSV file.
category_slug: talent-crm
status: drafted
position: 4
meta:
  title:
  description: Bring an existing list of candidates into a Tech1m talent pool using a CSV file.
  tags: [talent-crm, import, csv, bulk, candidates]
related:
  - talent-create-a-pool
  - talent-add-candidates-manual
  - talent-bulk-actions
audience: business
last_updated: 2026-04-27
---

# Import candidates from CSV

> Move a spreadsheet of candidates into a talent pool in a few clicks.

## Before you start
- Create the talent pool that should receive the imports.
- Make sure your CSV has at least name and email or phone for each row.
- Keep the file under the size limit shown on the import screen.

## Steps

1. Open the talent pool, click **Add candidate**, and choose **Import CSV**.
   ![Import CSV option](./assets/01-import-csv.png)
2. Download the sample template. Copy your data into it, or upload your own CSV — Tech1m will try to map the columns automatically.
   ![Download template](./assets/02-download-template.png)
3. Drag your CSV file in or click to browse, then review the column mapping. Match each column to the matching candidate field (Name, Email, Phone, Location, Current Role, Tags, and so on).
   ![Map columns](./assets/03-map-columns.png)
4. Click **Start import**. Tech1m checks for duplicates and validates each row. You can keep working in another tab while the import runs.
   ![Import progress](./assets/04-import-progress.png)
5. When the import finishes, review the summary: how many candidates were added, updated, or skipped. You can download a report of any rows that failed.

## Tips
- Wrap multi-value fields (like tags) in a single cell separated by commas.
- Re-uploading the same file will update existing candidates rather than create duplicates, as long as email or phone matches.

## Troubleshooting
- **All rows failed** — check the column mapping; an unmapped required field will reject the whole row.
- **Encoding looks wrong** — save the file as CSV UTF-8 from your spreadsheet app.

## Related articles
- [talent-create-a-pool](../talent-create-a-pool/ARTICLE.md)
- [talent-add-candidates-manual](../talent-add-candidates-manual/ARTICLE.md)
- [talent-bulk-actions](../talent-bulk-actions/ARTICLE.md)
