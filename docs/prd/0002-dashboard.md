# PRD-0002: Dashboard — sign-in and budgets

- **Status:** Draft
- **Owner:** Kateryna Klimchuk
- **Date:** 2026-09-29
- **Related ADRs:** ADR-0001 (monorepo), ADR-0002 (design tokens), ADR-0003 (Playwright tests). A backend/auth/hosting ADR is required before implementation (see Open questions).

## Problem
The landing page (PRD-0001) promises shared budgets but nothing exists behind "Get started". Users need a place to sign in, create budgets, and see them. Without this, no other feature (invites, contributions, expenses) has anywhere to live. This PRD delivers the minimum signed-in product: an account, a list of budgets, and a budget page, so later PRDs can add money movement on top.

## Goals
- A visitor can sign in with an email magic link or Google and land on their dashboard.
- A signed-in user can create a budget with a name, category, currency, optional target amount, and see it in their list.
- A user can open a budget and see its details, members (initially just themselves), and a running total, which is 0 until contributions exist.
- The dashboard is a separate app (`apps/dashboard`) with its own URL, sharing `@potluck/ui` and the design tokens with the landing page.
- The landing page's "Get started" buttons link to the dashboard sign-in instead of showing "Coming soon".

## Non-goals
- Inviting people to a budget, joining via link, or any member other than the creator (next PRD).
- Contributions, expenses, balances, or any money movement (later PRD).
- Editing or deleting budgets after creation (can follow quickly, but not required to ship).
- Email and password sign-in, password reset, or account settings pages.
- Notifications, email beyond the magic link itself.
- Native or offline apps.
- Localisation beyond English; currency is a stored code, not a translated UI.

## Users & scenarios
Primary user: the person who organises shared spending for a group. In this version they are alone in each budget.

1. **First sign-in.** Maya clicks "Get started" on the landing page, arrives at the dashboard sign-in, enters her email, opens the magic link from her inbox, and lands on an empty dashboard with a "Create your first budget" prompt.
2. **Google sign-in.** Daniel prefers Google. He clicks "Continue with Google", approves, and lands on the same empty dashboard. Signing in later with the same Google account returns him to the same account and budgets.
3. **Create and view.** Priya creates "Birthday party" with category Party, currency EUR, target 400. She is returned to the list, sees the budget card with "0 / 400 EUR", opens it, and sees the name, category, target, running total 0, and herself as the only member.
4. **Return visit.** Maya opens the dashboard a week later on her phone. Her session is still valid; she sees her three budgets without signing in again.
5. **Sign out.** Daniel signs out on a shared computer; refreshing the dashboard shows the sign-in page, not his data.

## Requirements
| # | Requirement | Priority (P0/P1/P2) |
|---|-------------|---------------------|
| 1 | New app `apps/dashboard` (`@potluck/dashboard`) using React, Vite, Tailwind, `@potluck/ui`, and the shared tokens. Deployed to its own URL. | P0 |
| 2 | Sign-in page offering email magic link and Google sign-in. Both create or reuse the same account when the email matches. | P0 |
| 3 | Magic link email is sent within a minute, works once, expires after 15 minutes, and shows a clear error if expired or reused. | P0 |
| 4 | Sessions persist across browser restarts for at least 30 days without re-authentication. | P0 |
| 5 | Sign-out control visible on every dashboard page; after sign-out, protected pages redirect to sign-in. | P0 |
| 6 | Unauthenticated access to any dashboard page redirects to sign-in and returns to the requested page after sign-in. | P1 |
| 7 | Budgets list page: shows the user's budgets as cards with name, category, currency, running total, target if set. Empty state prompts to create the first budget. | P0 |
| 8 | Create budget form: name (required, 1–60 chars), category (Travel, Family, Party, Shopping, Other), currency (ISO 4217 code chosen from a list, default from browser locale), optional target amount (positive number, two decimals). Validation errors shown inline. | P0 |
| 9 | Budget detail page at a stable URL: name, category, currency, target, running total (0 in this version), members list (creator only), created date. | P0 |
| 10 | Users see only budgets they belong to. Requesting another user's budget by URL returns a not-found state, not the data. | P0 |
| 11 | Data is persisted server-side; budgets survive sign-out, new devices, and deployments. | P0 |
| 12 | Landing page "Get started" buttons link to the dashboard sign-in URL; the "Coming soon" behaviour and its tests are removed. | P0 |
| 13 | Responsive layout on mobile (≥360px) and desktop; no horizontal scrolling. | P0 |
| 14 | Accessible: semantic headings, keyboard-operable forms and controls, WCAG AA contrast; axe scan in Playwright with zero A/AA violations. | P1 |
| 15 | Playwright suite covering: sign-in with a test-mode magic link, create budget, list shows it, detail shows it, sign-out redirects, cross-user access denied. | P1 |
| 16 | Loading and error states for every network call (skeleton or spinner; retry or clear message on failure). | P1 |
| 17 | Page titles set per page (e.g. "Birthday party · Potluck"). | P2 |

## Success metrics
- Functional: a new user can go from landing page to a created budget in under 2 minutes without help (informal test with 3–5 people).
- Reliability: magic link delivery under 60 seconds in 95% of sends during the first month.
- Quality: `bun run check` green with the Playwright suite in requirement 15; zero axe A/AA violations.
- Product: once live, the share of sign-ins that create at least one budget within the first session. Target 60% or more; below that, the create flow needs work before adding invites.

## Open questions
- **Backend, auth provider, database, and hosting** are undecided and need an ADR before code. Candidates to evaluate: a hosted auth+database service (Supabase, Firebase, Convex) versus a small API of our own with a managed Postgres and an auth library. Magic link plus Google, row-level access control, and a free tier suitable for early access are the requirements.
- **Dashboard URL.** A subdomain such as `app.<domain>` needs a domain we do not yet own; until then the host's default URL is used.
- **Currency list.** Full ISO 4217 versus a curated list of common currencies. Curated is simpler for v1.
- **Test-mode magic link.** How Playwright obtains the link without a real inbox (provider test API, or a development-only endpoint) depends on the backend choice.
- **Landing page session awareness.** Because the apps are on different origins, the landing page cannot show "Go to your budgets" for signed-in users. Accepted for now; revisit if it matters.
