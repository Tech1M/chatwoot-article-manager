---
title: Set up passkeys
slug: account-passkeys
description: Sign in to Tech1m with Face ID, Touch ID, Windows Hello, or a hardware key instead of a password.
category_slug: account-and-security
status: drafted
position: 3
meta:
  title: Set up passkeys
  description: Add a passkey to your Tech1m account for faster, phishing-resistant sign-in.
  tags: [passkeys, webauthn, security]
related: []
audience: business
last_updated: 2026-04-27
---

# Set up passkeys

> Replace passwords with a phishing-resistant passkey tied to your device.

## Before you start
- Use a browser and device that support WebAuthn - modern Chrome, Safari, Edge, and Firefox all qualify.
- Have your device unlock method ready (Face ID, Touch ID, Windows Hello, or a security key).

## Add a passkey

1. Open **Settings -> Account**.
2. Scroll to **Manage Passkeys** and give the passkey a recognisable name, such as "MacBook Pro" or "YubiKey 5".
   ![Create passkey form](./assets/01-create-passkey.png)
3. Click **Create Passkey**. Your browser or operating system will ask you to confirm with your biometric, PIN, or security key.
   ![System prompt confirming passkey](./assets/02-system-prompt.png)
4. The new passkey appears under **Your Passkeys** with the date you created it.

## Sign in with a passkey

On the login screen, choose **Sign in with a passkey** and confirm with the same unlock you used during setup. No password required.

## Tips
- Add a passkey on every device you use regularly so you always have a fallback.
- Use clear names - you cannot tell two "MacBook" passkeys apart at a glance.

## Troubleshooting
- **WebAuthn not supported** - update your browser or switch to a supported one.
- **Lost a device** - sign in from another device, then click **Delete** next to the missing passkey to revoke it.

## Related articles
- [account-2fa](../account-2fa/ARTICLE.md)
- [account-profile-and-password](../account-profile-and-password/ARTICLE.md)
- [getting-started-2fa-and-passkeys](../getting-started-2fa-and-passkeys/ARTICLE.md)
