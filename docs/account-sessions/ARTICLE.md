---
title: Review and end active sessions
slug: account-sessions
description: See where your Tech1m account is signed in and revoke sessions you no longer recognise.
category_slug: account-and-security
status: drafted
position: 5
meta:
  title: Review and end active sessions
  description: Audit and revoke browser sessions for your Tech1m account from one place.
  tags: [sessions, security, sign-out]
related: []
audience: business
last_updated: 2026-04-27
---

# Review and end active sessions

> Spot any unfamiliar device on your account and sign it out remotely.

## Before you start
- You will need your password to confirm the action - keep it handy.

## Steps

1. Open **Settings -> Account** and scroll to **Active sessions**. Each row shows the device, browser, approximate location, and time of last activity. Your current session is labelled **This device**.
   ![Active sessions list](./assets/01-active-sessions.png)
2. Review the list. If anything looks unfamiliar, click **Log out other browser sessions**.
   ![Log out other sessions confirmation](./assets/02-confirm-logout.png)
3. Enter your password to confirm. Every session except the one you are using will be signed out immediately.

For extra peace of mind after revoking sessions, change your password and rotate any API keys you use.

## Tips
- Sessions also expire automatically after a period of inactivity, so old devices clear themselves over time.
- Sign out of shared computers explicitly - revoking later is a fallback, not a habit.

## Troubleshooting
- **Password is rejected** - the session-revocation dialog uses your current Tech1m password, not your single sign-on password if your workspace uses SSO. Use **Forgot password** to reset.
- **Same device shown twice** - browsers create separate sessions per profile or private window. Revoke and sign in fresh if unsure.

## Related articles
- [account-profile-and-password](../account-profile-and-password/ARTICLE.md)
- [account-2fa](../account-2fa/ARTICLE.md)
- [account-audit-log](../account-audit-log/ARTICLE.md)
