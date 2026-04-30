---
title: Use a custom domain
slug: careerhub-custom-domain
description: Host your Career Hub on your own domain — like careers.example.com — instead of the default subdomain.
category_slug: career-hub
status: drafted
position: 2
meta:
  title:
  description: Connect a domain you own to your Career Hub for a fully branded careers URL.
  tags: [career-hub, custom-domain, dns, branding, ssl]
related:
  - careerhub-domain-verification
  - careerhub-set-up-page
audience: business
last_updated: 2026-04-27
---

# Use a custom domain

> Replace the default `careers.peoplexyz.ai` URL with your own domain so candidates see something like `careers.example.com`.

## Before you start
- You're on a plan that includes custom domains.
- You can edit DNS records at your domain registrar (GoDaddy, Cloudflare, Namecheap, etc.).
- Pick a subdomain you control — `careers.`, `jobs.`, or `talent.` are common.

## Steps

1. Open **Career Hub**, then scroll to **Domain** in the settings panel.
   ![Domain settings panel](./assets/01-domain-settings.png)
2. Enter your domain (for example, `careers.example.com`) and click **Connect domain**. We'll show you the DNS record to add.
   ![Connect domain dialog](./assets/02-connect-domain.png)
3. In a new tab, sign in to your DNS provider and add the record we showed you. The host should match your subdomain (`careers`) and point to the value Tech1m provides.
4. Come back to Career Hub and continue with [Verify your domain](../careerhub-domain-verification/ARTICLE.md).

## Tips
- Use a subdomain rather than your apex domain (`example.com`) — it's safer and easier to manage.
- SSL certificates are issued automatically once verification succeeds; you don't need to upload one.

## Troubleshooting
- **"Please provide a valid domain"** — drop `https://` and any trailing slash; enter just the hostname.
- **DNS changes aren't visible yet** — propagation can take up to an hour. Wait, then retry verification.

## Related articles
- [careerhub-domain-verification](../careerhub-domain-verification/ARTICLE.md)
- [careerhub-set-up-page](../careerhub-set-up-page/ARTICLE.md)
