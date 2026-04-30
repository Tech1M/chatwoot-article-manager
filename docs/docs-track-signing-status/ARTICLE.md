---
title: Track signing status
slug: docs-track-signing-status
description: See who has signed, nudge anyone who hasn't, and download the completion certificate when everyone is done.
category_slug: documents
status: drafted
position: 4
meta:
  title:
  description: See who has signed, nudge anyone who hasn't, and download the completion certificate when everyone is done.
  tags: [documents, signing, audit-trail, certificate, reminders]
related:
  - docs-overview
  - docs-create-template
  - docs-send-for-signature
audience: business
last_updated: 2026-04-27
---

# Track signing status

> Open any document to see exactly who has signed, who is still pending, and pull the certificate once it's complete.

## Before you start
- Send a document for signature first — you can only track documents that are out.

## Steps

1. Open **Documents** and click into the document you want to check. The header shows the overall status: **Pending**, **Partially signed**, **Fully signed**, or **Expired**.
   ![Document status](./assets/01-document-status.png)
2. The signers panel lists each required signer with a status and timestamp. A green check means they've signed; a clock means you're still waiting.
   ![Signers panel](./assets/02-signers-panel.png)
3. To remind a pending signer, click **Resend invite** next to their name. They'll get a fresh email with the same secure link.
4. When everyone has signed, click **Download certificate** to get a PDF with the document, all signatures, and the full audit trail (who, when, from which IP).
   ![Download certificate](./assets/03-download-certificate.png)

## Tips
- The audit trail is generated automatically on every document — you don't need to do anything extra to keep records compliant.
- If the underlying contract data changes before anyone has signed, the document is regenerated so signers always see the latest version.

## Troubleshooting
- **Certificate button is disabled** — at least one required signer hasn't signed yet.
- **Signer says they signed but status still shows pending** — ask them to refresh the page; if it persists, resend the invite to make sure they used the right link.

## Related articles
- [docs-overview](../docs-overview/ARTICLE.md)
- [docs-create-template](../docs-create-template/ARTICLE.md)
- [docs-send-for-signature](../docs-send-for-signature/ARTICLE.md)
