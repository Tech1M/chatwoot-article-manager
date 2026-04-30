---
title: Roles and permissions explained
slug: getting-started-roles-and-permissions
description: Understand what each Tech1m role can do, when to use them, and how to keep sensitive data scoped to the right people.
category_slug: getting-started
status: drafted
position: 4
meta:
  title: ""
  description: Understand what each Tech1m role can do, when to use them, and how to keep sensitive data scoped to the right people.
  tags: [roles, permissions, access, security, getting-started]
related: [getting-started-invite-team-members, getting-started-2fa-and-passkeys, getting-started-departments]
audience: business
last_updated: 2026-04-27
---

# Roles and permissions explained

> Roles decide what each teammate can see and do — from posting a job to handling billing. Pick the smallest role that lets someone do their job.

## The roles at a glance

- **Owner** — full control of the workspace, including billing, deleting jobs, and removing members. Usually one or two people per company.
- **Admin** — manages settings, members, departments, and integrations. Cannot change billing.
- **Recruiter** — creates and runs jobs, manages candidates, schedules interviews.
- **Hiring manager** — reviews candidates and gives feedback on jobs they're attached to. Limited access outside their own jobs.
- **Interviewer** — sees only the interviews and candidates they're invited to. Submits scorecards.
- **Member (view only)** — read-only access to assigned jobs. Good for stakeholders who just need visibility.

![Role picker on the team page](./assets/01-role-picker.png)

## How access really works

1. **Workspace role** sets the floor — what someone can do anywhere in the app.
   ![Workspace-wide capabilities](./assets/02-workspace-role.png)
2. **Job-level access** narrows it down — hiring managers and interviewers see only the jobs they're added to.
3. **Sensitive areas** (billing, integrations, audit log) are restricted to Owners and Admins regardless of job access.

## Tips
- When in doubt, start someone as **Recruiter** or **Hiring manager** and upgrade later — downgrading is easy too.
- Use departments to group access, but remember the role still rules.

## Troubleshooting
- **Teammate can't see a job they should** — check the job's collaborator list, not just their workspace role.
- **Someone has too much access** — change their role from **Settings → Team**; the change applies on their next page load.

## Related articles
- [Invite team members](../getting-started-invite-team-members/ARTICLE.md)
- [Enable 2FA and passkeys](../getting-started-2fa-and-passkeys/ARTICLE.md)
- [Create and organize departments](../getting-started-departments/ARTICLE.md)
