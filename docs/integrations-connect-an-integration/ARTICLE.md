---
title: Connect an integration
slug: integrations-connect-an-integration
description: Connect Tech1m to a third-party tool in three clicks — pick the provider, authorize in the popup, and you're done.
category_slug: integrations
meta:
  title: ""
  description: Connect Tech1m to a third-party tool in three clicks — pick the provider, authorize in the popup, and you're done.
  tags: [integrations, connect, setup]
related: [integrations-overview, integrations-marketplace, integrations-disconnect]
status: drafted
position: 2
audience: business
last_updated: 2026-04-27
---

# Connect an integration

> Link a tool to Tech1m so it can start sharing data with your team.

## Before you start
- Make sure you can sign in to the tool you're connecting — you'll authorize Tech1m using that account.
- Allow popups for the Tech1m site in your browser. Connections open in a small popup window.

## Steps

1. Open **Settings → Integrations** and find the tool you want in the marketplace grid.
   ![Marketplace grid with Connect buttons](./assets/01-marketplace.png)
2. Click **Connect** on the provider's tile. A secure popup appears asking you to sign in to that tool.
   ![Authorize Tech1m popup](./assets/02-authorize.png)
3. Sign in if prompted, then click **Allow** (or **Authorize**) to let Tech1m access your data. The popup closes on its own and the tile flips to **Connected**.
   ![Connected state with status badge](./assets/03-connected.png)

That's it. Tech1m starts pulling in the data this provider supports — candidates, calendars, messages, or files — within a minute or two.

## Tips
- The connection is tied to your Tech1m account. If a teammate also wants to use this provider, they connect it from their own settings.
- For ATS providers, head straight to [Import candidates from your ATS](../integrations-ats-import/ARTICLE.md) once the tile shows **Connected**.

## Troubleshooting
- **The popup didn't open** — check your browser's popup blocker, allow popups for Tech1m, then click **Connect** again.
- **The popup closed but the tile still shows Connect** — refresh the page; the status updates after a moment.
- **You see "authorization failed"** — make sure you're signed in to the right account in the provider, then retry.

## Related articles
- [Integrations overview](../integrations-overview/ARTICLE.md)
- [Browse the integration marketplace](../integrations-marketplace/ARTICLE.md)
- [Disconnect an integration](../integrations-disconnect/ARTICLE.md)
