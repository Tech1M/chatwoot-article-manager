---
title: "I can't connect my Google Calendar"
slug: faq-cant-connect-google-calendar
description: Fix the most common reasons Google Calendar won't connect, including pop-up blockers, account mismatches, and stale sessions.
category_slug: faq
status: drafted
position: 1
meta:
  title:
  description: Troubleshoot Google Calendar connection issues — pop-up blockers, wrong Google account, expired permissions, and when to reconnect.
  tags: [calendar, google, troubleshooting]
related:
  - calendar-connect-google
  - calendar-disconnect-resync
audience: business
last_updated: 2026-04-27
---

# I can't connect my Google Calendar

> The Connect button doesn't finish, or you see an error after picking your Google account.

## Symptom

You click **Connect Google Calendar** and the pop-up either closes immediately, hangs on a blank screen, or returns you to the calendar page without showing your account as connected.

## Most likely cause: a blocked or interrupted pop-up

The connection happens in a secure pop-up window. If your browser blocks it, or if the window is closed before you finish granting access, the connection won't complete.

1. Allow pop-ups for this site in your browser settings, then reload the page.
2. Go to **Settings → Calendar** and click **Connect Google Calendar** again.
   ![Connect Google Calendar button](./assets/01-connect-button.png)
3. In the Google window, choose the work account you want to use and click **Continue**.
4. Tick every permission Google asks for — leaving any unchecked will block syncing.
5. Wait until the window closes on its own. You should see your email under **Connected account**.

## Other things to check

- You picked a personal Gmail account by mistake. Disconnect and reconnect with your work account.
- Your Google Workspace admin restricts third-party apps. Ask them to approve the connection.
- You already connected the same account on another workspace. Disconnect there first.
- A previous connection went stale after a password change — disconnect and reconnect to refresh access.
- Your browser is blocking third-party cookies. Enable them for the duration of the connection.

## When to contact support

Reach out if you've tried a clean reconnect from a different browser, confirmed your admin allows the app, and still see an error. Include the email address you tried, the error text, and the time you attempted it so we can match it to our logs.
