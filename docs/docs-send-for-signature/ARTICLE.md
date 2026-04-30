---
title: Send a document for signature
slug: docs-send-for-signature
description: Generate a document from a template, add signers, and send it out for legally binding signatures.
category_slug: documents
status: drafted
position: 3
meta:
  title:
  description: Generate a document from a template, add signers, and send it out for legally binding signatures.
  tags: [documents, signing, e-signature, contracts, templates]
related:
  - docs-overview
  - docs-create-template
  - docs-track-signing-status
audience: business
last_updated: 2026-04-27
---

# Send a document for signature

> Pick a template, link it to a contract or recipient, and the right signers will be invited automatically.

## Before you start
- Create or pick the contract, offer, or record the document is for.
- Have a template ready in your template library.

## Steps

1. Open the contract or recipient record and click **Generate document**. Choose the template you want to use.
   ![Generate document](./assets/01-generate-document.png)
2. Review the preview. All merge variables are filled in from the underlying record. If something looks off, fix the source data and regenerate — the document only locks once a signer signs.
3. Add any ad-hoc external signers (for example, a witness or a guarantor) by entering their name and email. Set an optional expiry date for the link.
   ![Add signers](./assets/02-add-signers.png)
4. Click **Send for signature**. Each signer gets an email with a secure link. They can sign by drawing, typing, or using initials. You'll see them appear in the signing status as they go.

## Tips
- Set an expiry on time-sensitive documents (for example, an offer that's only valid for 7 days) so old links can't be signed weeks later.
- The document and all signatures are stamped with a timestamp and IP for the audit trail — no extra setup needed.

## Troubleshooting
- **A signer reports "this document has expired"** — the expiry date passed. Generate a new document and resend.
- **You can't generate** — the contract may be missing required fields the template depends on. Fill them in and try again.

## Related articles
- [docs-overview](../docs-overview/ARTICLE.md)
- [docs-create-template](../docs-create-template/ARTICLE.md)
- [docs-track-signing-status](../docs-track-signing-status/ARTICLE.md)
