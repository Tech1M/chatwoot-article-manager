---
title: Add a code challenge
slug: assess-code-challenges
description: Drop a coding problem into your assessment, pick languages, set test cases, and let the in-browser editor grade submissions automatically.
category_slug: assessments
status: drafted
position: 3
meta:
  title: ""
  description: Drop a coding problem into your assessment, pick languages, set test cases, and let the in-browser editor grade submissions automatically.
  tags: [assessments, code, coding, technical, engineering]
related: [assess-build-assessment, assess-take-home, assess-results-and-evaluation]
audience: business
last_updated: 2026-04-27
---

# Add a code challenge

> Code challenges run in a browser-based editor with auto-graded test cases, so you see real working code, not just a CV claim.

## Before you start
- An assessment in the builder.
- A clear problem statement, sample inputs/outputs, and the languages you'll allow.

## Steps

1. In the builder, click **Add component → Code challenge**. Pick from the challenge library or choose **Create new**.
   ![Add code challenge](./assets/01-add-challenge.png)
2. Write the problem statement, paste any starter code, and add **test cases** — visible ones the candidate sees, and hidden ones used for final scoring.
   ![Code challenge editor](./assets/02-challenge-editor.png)
3. Choose allowed languages, the time limit, and how partial credit is awarded for passing some test cases.
   ![Challenge settings](./assets/03-challenge-settings.png)
4. Save the challenge. Candidates will solve it in an embedded editor with run-and-test before final submission.

## Tips
- Always include at least one tricky hidden test case — visible cases alone reward pattern-matching.
- Calibrate difficulty against your team. Run the challenge yourself and aim for 60–80% of strong candidates passing it.

## Troubleshooting
- **Submissions failing on a passing solution** — re-check whitespace and newline handling in your expected output.
- **Language missing** — the available list depends on your plan. Contact support to request additions.

## Related articles
- [Build an assessment](../assess-build-assessment/ARTICLE.md)
- [Set up a take-home assessment](../assess-take-home/ARTICLE.md)
- [Review results and evaluate](../assess-results-and-evaluation/ARTICLE.md)
