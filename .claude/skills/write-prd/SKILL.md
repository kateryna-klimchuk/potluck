---
name: write-prd
description: Create a new Product Requirement Document in docs/prd/ from the template. Use when the user wants to define a feature, initiative, or product scope.
---

# Write a PRD

1. Find the next number: `ls docs/prd/ | sort | tail -1` → increment (template `0000` does not count).
2. Copy `docs/prd/0000-template.md` to `docs/prd/NNNN-<kebab-slug>.md`.
3. Ask the user one question at a time until you can fill: Problem, Goals, Non-goals, Users & scenarios, Requirements (with P0/P1/P2), Success metrics.
4. Keep it concise — a PRD is a decision aid, not a novel. Leave real open questions in "Open questions"; never leave "TBD" in requirements.
5. Set Status to `Draft`, Date to today, Owner to the user.
6. If the PRD implies an architectural choice, suggest running `/write-adr` next.

## Git
Do not `git add` or `git commit` the result. Show the file(s) to the user and wait for explicit approval before any git operation.
