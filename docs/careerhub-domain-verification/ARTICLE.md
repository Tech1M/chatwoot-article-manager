---
title: Verify your domain
slug: careerhub-domain-verification
description: Confirm your DNS record so Tech1m can serve your Career Hub on your custom domain over HTTPS.
category_slug: career-hub
status: drafted
position: 3
meta:
  title:
  description: Verify the DNS record you added so your custom Career Hub domain goes live with SSL.
  tags: [career-hub, dns, verification, ssl, custom-domain]
related:
  - careerhub-custom-domain
  - careerhub-set-up-page
audience: business
last_updated: 2026-04-27
---

# Verify your domain

> Once you've added the DNS record, run a verification check so we can issue an SSL certificate and route traffic to your Career Hub.

## Before you start
- You've connected a custom domain in Career Hub settings.
- You've added the DNS record shown to you at your registrar.
- Allow a few minutes for DNS to propagate before verifying.

## Steps

1. Open **Career Hub** and scroll to **Domain**. You'll see your domain listed with a yellow "Pending verification" badge.
   ![Pending verification badge](./assets/01-pending-verification.png)
2. Click **Verify domain**. We check that the DNS record points to the correct target.
   ![Verify domain button](./assets/02-verify-domain.png)
3. When verification succeeds, the badge turns green and your custom domain becomes the primary URL for your Career Hub. SSL is provisioned automatically.

## Tips
- You can keep using your default `*.careers.peoplexyz.ai` URL while DNS propagates — it stays active.
- If you change DNS providers later, re-verify to confirm the new record still points correctly.

## Troubleshooting
- **"The record for the domain does not point to..."** — double-check the record type and value at your DNS provider; a typo or wrong host is the most common cause.
- **Verification still failing after an hour** — flush the DNS cache at your registrar, or use a tool like `dig` to confirm the record is live publicly.
- **HTTPS shows a certificate warning** — wait a few minutes after verification; SSL provisioning happens right after the check passes.

## Related articles
- [careerhub-custom-domain](../careerhub-custom-domain/ARTICLE.md)
- [careerhub-set-up-page](../careerhub-set-up-page/ARTICLE.md)
