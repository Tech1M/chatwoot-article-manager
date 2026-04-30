---
title: Create a document template
slug: docs-create-template
description: Build a reusable template with merge variables and signer roles you can send again and again.
category_slug: documents
status: drafted
position: 2
meta:
  title:
  description: Build a reusable template with merge variables and signer roles you can send again and again.
  tags: [documents, templates, contracts, signing, variables]
related:
  - docs-overview
  - docs-send-for-signature
  - docs-track-signing-status
audience: business
last_updated: 2026-04-27
---

# Create a document template

> Set up a template once, and every future document you send uses the same wording, layout, and signer rules.

## Before you start
- Make sure you have permission to manage documents in your company.
- Have the final wording ready — copy it from your existing contract, NDA, or offer letter.

## Steps

1. Open **Documents** from the sidebar and click **New template**. Give it a clear name like "Standard Contractor Agreement".
   ![Create template](./assets/01-create-template.png)
2. Paste or write the document body. Use the variable picker to drop in merge fields such as the company name, contractor name, start date, or rate. Variables are filled in automatically when you generate a document.
   ![Add variables](./assets/02-add-variables.png)
3. Add the signer roles that need to sign — for example, **Company** and **Talent**. The order you add them is the order they will sign. You can also leave space for ad-hoc external signers you'll add when you send.
4. Save the template. It now appears in your template library and can be used to generate documents at any time.

## Tips
- Keep one canonical template per document type and version it as your wording evolves. Documents already sent stay locked to the version they were generated from.
- Use clear placeholder labels (for example, `{{ contract.start_date }}`) so reviewers can see at a glance where data will be inserted.

## Troubleshooting
- **A variable shows as blank in a generated document** — the source record didn't have that field set. Fill it in and regenerate.
- **You can't save the template** — confirm at least one signer role is added.

## Related articles
- [docs-overview](../docs-overview/ARTICLE.md)
- [docs-send-for-signature](../docs-send-for-signature/ARTICLE.md)
- [docs-track-signing-status](../docs-track-signing-status/ARTICLE.md)
