---
title: "A team member can't log in"
slug: faq-team-member-cant-log-in
description: Fix login issues for a teammate — pending invites, wrong workspace, password resets, and 2FA recovery.
category_slug: faq
status: drafted
position: 5
meta:
  title:
  description: Troubleshoot teammate login problems — invite status, password reset, 2FA, and account suspension.
  tags: [team, login, access, troubleshooting]
related:
  - getting-started-invite-team-members
  - getting-started-2fa-and-passkeys
audience: business
last_updated: 2026-04-27
---

# A team member can't log in

> Someone on your team says they can't sign in, or they don't see your workspace after logging in.

## Symptom

A teammate reports an error on the sign-in page, a missing invite, or a workspace they can't access. They may also be stuck on a two-factor prompt.

## Most likely cause: the invite was never accepted or has expired

New members must accept their invite before they can log in. Invites expire after a set period and need to be resent.

1. Go to **Settings → Team members**.
2. Find the teammate in the list and check their status.
   ![Team member invite status](./assets/01-invite-status.png)
3. If status is **Pending** or **Expired**, click **Resend invite**. Ask them to open the new email and follow the link to set a password.
4. Confirm they're using the exact email the invite was sent to — invites are tied to that address.
5. Once accepted, their status changes to **Active** and they can sign in normally.

## Other things to check

- They forgot their password — ask them to use **Forgot password?** on the login page.
- Two-factor codes aren't working — they can use a recovery code, or you can reset 2FA from their member row.
- Their account was set to **Inactive**. Toggle it back to **Active**.
- They're signing in to the wrong workspace. Send them the direct workspace URL.
- Their device clock is wildly off, which breaks 2FA codes. Ask them to enable automatic time on their phone.

## When to contact support

Contact us if the invite has been resent, the email isn't arriving (and isn't in spam), or 2FA reset doesn't unlock the account. Share the teammate's email and what they see on screen so we can locate the account.
