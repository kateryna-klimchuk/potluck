---
name: write-adr
description: Record an architecture decision in docs/adr/ using the ADR template. Use when choosing a library, framework, pattern, or infrastructure, or when a past decision is being reversed.
---

# Write an ADR

1. Find the next number: `ls docs/adr/ | sort | tail -1` → increment.
2. Copy `docs/adr/0000-template.md` to `docs/adr/NNNN-<kebab-slug>.md`.
3. Fill Context (forces, constraints), Decision (full sentences, concrete), at least two Alternatives with a reason each, and Consequences (include negatives).
4. Status is `Proposed` unless the user explicitly accepts it in the conversation, then `Accepted`.
5. ADRs are immutable once accepted. To change a decision, write a new ADR and mark the old one `Superseded by ADR-NNNN`.
6. If the decision adds a dependency, follow `/add-package` after the ADR.
