---
title: Enable two-factor authentication
slug: account-2fa
description: Add a second step to your Tech1m sign-in using an authenticator app and recovery codes.
category_slug: account-and-security
status: drafted
position: 4
meta:
  title: Enable two-factor authentication
  description: Protect your Tech1m account with TOTP-based two-factor authentication and backup recovery codes.
  tags: [2fa, totp, security]
related: []
audience: business
last_updated: 2026-04-27
---

# Enable two-factor authentication

> Require a one-time code from your authenticator app on every sign-in.

## Before you start
- Install an authenticator app such as 1Password, Authy, Google Authenticator, or your password manager's built-in TOTP feature.
- Have somewhere safe to store recovery codes.

## Turn on two-factor authentication

1. Open **Settings -> Account** and find the **Two-factor authentication** card.
   ![2FA card](./assets/01-2fa-card.png)
2. Click **Enable**. Tech1m shows a QR code and a manual setup key. Scan the QR code with your authenticator app, or paste the manual key if you cannot scan.
   ![QR code and manual key](./assets/02-qr-code.png)
3. Enter the six-digit code your app generates and click **Confirm**. Tech1m then displays your recovery codes - copy them into a password manager before closing the dialog.

From the next sign-in onward, Tech1m will prompt for a code after you enter your password.

## Tips
- Treat recovery codes like passwords. Each code works once.
- If you switch phones, regenerate the QR code from the same card before wiping the old device.

## Troubleshooting
- **Code is rejected** - check that your phone clock is set to automatic time. TOTP codes are time-based.
- **Lost your phone and codes** - contact your workspace owner. Owners can reset 2FA for a teammate after verifying identity.

## Related articles
- [account-passkeys](../account-passkeys/ARTICLE.md)
- [account-sessions](../account-sessions/ARTICLE.md)
- [getting-started-2fa-and-passkeys](../getting-started-2fa-and-passkeys/ARTICLE.md)
