---
title: Review the audit log
slug: account-audit-log
description: Trace who did what across your Tech1m workspace, with filters, severity, and event details.
category_slug: account-and-security
status: drafted
position: 7
meta:
  title: Review the audit log
  description: Filter, inspect, and export Tech1m audit events to investigate activity across your workspace.
  tags: [audit-log, security, compliance]
related: []
audience: business
last_updated: 2026-04-27
---

# Review the audit log

> Investigate sign-ins, settings changes, and other workspace activity from one timeline.

## Before you start
- You need workspace admin permissions to access the full audit log.
- Timestamps render in your profile timezone - update it on the **Profile** tab if it looks off.

## Browse and filter events

1. Open **Audit log** from the sidebar. Each row shows the event, actor, resource, severity, and timestamp.
   ![Audit log overview](./assets/01-audit-log.png)
2. Use the category tabs along the top to narrow to areas like **Auth**, **Jobs**, or **Billing**. Combine with the date-range selector (last 7, 30, or 90 days) and the search box to find a specific actor or event.
   ![Audit log filters](./assets/02-audit-filters.png)
3. Click any row to open a side panel with the full event payload, including IP address, user agent, and any properties recorded with the action.

If you leave the page open, the list flags itself as stale after a few minutes - reload to fetch the latest events.

## Tips
- Severity badges let you scan for trouble fast: blue is informational, amber needs a look, red needs action.
- Use **Export** to pull a CSV for compliance reviews or external SIEM ingestion.

## Troubleshooting
- **No events showing** - check your filters. The date range defaults to **Last 30 days**.
- **Missing recent action** - the log can lag a few seconds. Refresh, then widen the date range if the event is older than your filter.

## Related articles
- [account-sessions](../account-sessions/ARTICLE.md)
- [account-api-keys](../account-api-keys/ARTICLE.md)
- [getting-started-roles-and-permissions](../getting-started-roles-and-permissions/ARTICLE.md)
