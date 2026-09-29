# PRD-0001: Marketing landing page

- **Status:** Draft
- **Owner:** Kateryna Klimchuk
- **Date:** 2026-09-29
- **Related ADRs:** ADR-0001 (monorepo with Bun, React, Tailwind)

## Problem
Potluck is a shared-budget app: people who travel, live, celebrate, or shop together pool money into a budget everyone can see and spend from. Nothing about the product exists yet, so there is nowhere to explain what Potluck does or to build early interest. We need a public page that tells visitors what Potluck is and what they will be able to do with it, before the signed-in product (dashboard, budgets, invites) is built.

## Goals
- Explain the core idea in one screen: shared budgets for travel, family, parties, shopping, and similar occasions.
- Show the key capabilities: create several separate budgets, invite people to a budget, see and track spending together.
- Set expectations honestly: the product is not available yet ("Coming soon", free during early access).
- Establish the visual base (layout, typography, components in `@potluck/ui`) that the dashboard will reuse.

## Non-goals
- Sign-up, sign-in, or any authenticated experience (dashboard is a separate PRD).
- Collecting emails or any visitor data (no waitlist, no analytics in this PRD).
- Backend, database, or API.
- Final pricing, plan tiers, or billing.
- Localisation beyond English.
- Blog, docs, legal pages, or SEO work beyond basic page title and meta description.

## Users & scenarios
Primary audience: anyone who shares expenses with a group and currently uses chat threads, spreadsheets, or one person fronting the money.

1. **Trip organiser.** Maya is planning a week away with four friends and wants to know if Potluck can hold a shared pot for accommodation and food. She lands on the page, reads the hero and the "Travel" use case, sees "invite people to a budget" in the features, and understands the product fits. She clicks "Get started", sees "Coming soon", and leaves knowing to check back.
2. **Household.** Daniel and his partner want one budget for groceries and a separate one for a kitchen renovation. The "Family" and "Shopping" use cases and the "several separate budgets" feature answer his question without scrolling far.
3. **Party host.** Priya is collecting money for a birthday party and wants to know what it costs. She jumps to the pricing section, sees "Free during early access", and checks the FAQ to confirm friends will not need to pay to join a budget.

## Requirements
| # | Requirement | Priority (P0/P1/P2) |
|---|-------------|---------------------|
| 1 | Hero section: one-line pitch, one-sentence subline, primary "Get started" button. | P0 |
| 2 | "Get started" opens a "Coming soon" state (inline message or modal) and collects nothing. Every CTA on the page behaves the same way. | P0 |
| 3 | Use-case section: four cards for Travel, Family, Party, Shopping, each with a title and one sentence. | P0 |
| 4 | Features section listing at least: several separate budgets per user, invite people to a budget, everyone sees and tracks spending together. | P0 |
| 5 | "How it works" section: three steps — create a budget, invite people, track spending together. | P0 |
| 6 | Pricing teaser: single card stating "Free during early access", with a CTA that behaves per requirement 2. | P1 |
| 7 | FAQ section with 4–6 questions and short answers (e.g. do invitees pay, can I have more than one budget, when does it launch, is my data shared). | P1 |
| 8 | Footer with Potluck name and current year. | P1 |
| 9 | Responsive layout: usable on mobile (≥360px) and desktop without horizontal scrolling. | P0 |
| 10 | Accessible: semantic headings in order, buttons keyboard-reachable, colour contrast meets WCAG AA. | P1 |
| 11 | Page `<title>` and meta description set for Potluck. | P1 |
| 12 | Built with the existing stack (React, Tailwind v4, `@potluck/ui`); reusable pieces (e.g. card, section heading) live in `packages/ui`. | P0 |
| 13 | Component tests for the "Coming soon" behaviour and for rendering of each section. | P1 |
| 14 | Replace the current placeholder `App` in `apps/web`; the landing page is the root route. | P0 |

## Success metrics
Before launch there is no traffic, so metrics are qualitative and internal:
- A reader with no prior context can say what Potluck does and name at least two use cases after 30 seconds on the page (informal test with 3–5 people).
- `bun run check` passes with tests covering the P0 sections and the CTA behaviour.
- Lighthouse accessibility score ≥ 90 on the built page.
- Once a waitlist or sign-up exists (later PRD), CTA click-through becomes the primary metric.

## Open questions
- Final wording of the hero pitch and subline (draft copy will be proposed in the implementation).
- Visual identity: colours, logo, and font are undecided; the first version uses the current neutral zinc palette.
- Whether "Coming soon" should be an inline message under the button or a modal — decide during implementation, both satisfy requirement 2.
- Do we want a public URL and hosting before the dashboard exists? If yes, a hosting/deployment ADR is needed.
