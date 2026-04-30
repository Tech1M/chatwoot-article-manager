---
title: Enable 2FA and passkeys
slug: getting-started-2fa-and-passkeys
description: Turn on two-factor authentication and add a passkey so your Tech1m account stays secure even if your password leaks.
category_slug: getting-started
status: drafted
position: 7
meta:
  title: ""
  description: Turn on two-factor authentication and add a passkey so your Tech1m account stays secure even if your password leaks.
  tags: [2fa, passkey, security, mfa, getting-started]
related: [getting-started-roles-and-permissions, getting-started-create-account, getting-started-app-tour-overview]
audience: business
last_updated: 2026-04-27
---

# Enable 2FA and passkeys

> Hiring data is sensitive. Adding a second factor — an authenticator code or a passkey — makes your account dramatically harder to take over.

## Before you start
- An authenticator app (1Password, Authy, Google Authenticator, etc.) for 2FA.
- A device with a fingerprint, Face ID, Windows Hello, or a security key for passkeys.

## Enable 2FA

1. Open **Account settings → Security**.
   ![Security settings](./assets/01-security-settings.png)
2. Under **Two-factor authentication**, click **Enable**. Confirm your password.
3. Scan the QR code with your authenticator app, then enter the 6-digit code it shows to verify.
   ![QR code and verify code](./assets/02-2fa-qr.png)
4. Save your **recovery codes** somewhere safe — a password manager is ideal. You'll need them if you lose your phone.

## Add a passkey

1. Still in **Account settings → Security**, scroll to **Passkeys** and click **Add passkey**.
   ![Passkey list](./assets/03-passkeys-list.png)
2. Your browser or device prompts you to confirm with Touch ID, Face ID, Windows Hello, or your security key. Confirm it.
3. Give the passkey a friendly name (e.g. "MacBook Pro" or "iPhone") so you can recognize it later.

You can sign in with the passkey from then on — no password, no code.

## Tips
- Add passkeys on every device you use Tech1m from. They sync via your password manager or platform keychain.
- Keep 2FA on as a backup even after adding passkeys.

## Troubleshooting
- **Lost your phone** — sign in with a recovery code and replace your 2FA setup right away.
- **Passkey button does nothing** — your browser may not support passkeys. Try an up-to-date Chrome, Safari, Edge, or Firefox.
- **Wrong code** — make sure your phone's clock is set to network time; authenticator codes drift if it isn't.

## Related articles
- [Roles and permissions explained](../getting-started-roles-and-permissions/ARTICLE.md)
- [Create your business account](../getting-started-create-account/ARTICLE.md)
- [A quick tour of the app](../getting-started-app-tour-overview/ARTICLE.md)
