---
title: Create and manage API keys
slug: account-api-keys
description: Issue, rotate, and revoke API keys for the Tech1m Chrome extension and other integrations.
category_slug: account-and-security
status: drafted
position: 6
meta:
  title: Create and manage API keys
  description: Generate Tech1m API keys for the Chrome extension, scripts, and integrations - and rotate them safely.
  tags: [api-keys, integrations, security]
related: []
audience: business
last_updated: 2026-04-27
---

# Create and manage API keys

> Issue tokens that let the Chrome extension and your own integrations call Tech1m on your behalf.

## Before you start
- API keys inherit your account's permissions - only create keys for tools you trust.
- A new key value is shown **once**. Be ready to copy it into your destination tool.

## Create a key

1. Open **Settings -> API keys**.
2. In **Create New API Key**, enter a descriptive name such as "Chrome Extension" or "Sourcing script", then click **Create API Key**.
   ![Create API key form](./assets/01-create-api-key.png)
3. The token appears at the top of **Your API Keys**. Click the copy icon and paste it into your tool. Once you leave the page the secret is never shown again.
   ![New token visible once](./assets/02-token-shown-once.png)

## Rotate or delete a key

In **Your API Keys**, each row has two icons:

- The circular arrow rotates the key - the old secret stops working immediately and a fresh value is shown.
- The trash icon revokes the key permanently. You will be asked to type **Delete** to confirm.
   ![Rotate or delete actions](./assets/03-rotate-delete.png)

The list also shows last-used and expiry timestamps so you can spot stale keys.

## Tips
- Rotate keys every few months, or whenever someone with access leaves the team.
- Use one key per tool so you can revoke without breaking everything else.

## Troubleshooting
- **Lost the secret** - rotate the key, then update your integration with the new value.
- **Key marked Expired** - it is past its expiry date. Create a new key and update your tool.

## Related articles
- [integrations-overview](../integrations-overview/ARTICLE.md)
- [talent-add-via-chrome-extension](../talent-add-via-chrome-extension/ARTICLE.md)
- [account-audit-log](../account-audit-log/ARTICLE.md)
