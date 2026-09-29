# ADR-0005: Supabase for auth and data, Vercel for the dashboard app

- **Status:** Proposed
- **Date:** 2026-09-29

## Context
PRD-0002 needs sign-in (email magic link and Google), server-side persistence of budgets, per-user access control, and a hosted dashboard at its own URL. Nothing server-side exists yet. The priority at this stage is validating the product with real users quickly, with minimal operations, while keeping the data model sound for the shared-ledger features that follow (members, contributions, expenses, balances). The landing page stays on GitHub Pages (ADR-0004).

Constraints:
- Both sign-in methods must work without us running an email or OAuth service.
- Users must only ever see budgets they belong to, enforced server-side.
- Playwright must be able to complete a magic-link sign-in in CI without a real inbox.
- Free tiers for early access; a clear path to paid tiers later.
- Small team; no dedicated ops.

## Decision
- **Supabase** provides Postgres, Auth, and the client SDK.
  - Auth: email magic link (OTP link) and Google OAuth, both enabled in the Supabase project. A user is identified by email; both methods resolve to the same account.
  - Data: tables `budgets` and `budget_members` (with `profiles` mirroring `auth.users`), defined as SQL migrations in `supabase/migrations/` in this repo. Row-level security policies enforce that a user can read and write only budgets where they are a member.
  - The dashboard calls Supabase directly with the anon key plus the user's session; no API server of our own. Logic that RLS cannot express is added as Postgres functions when needed.
  - Local development and CI use the Supabase CLI local stack (`supabase start`), which includes a mail catcher; Playwright reads magic links from it.
- **Vercel** hosts `apps/dashboard` as a static single-page app with SPA rewrites, deployed from `main` with preview deploys per pull request via the Vercel GitHub integration. The Supabase URL and anon key are Vercel environment variables.
- The dashboard is a separate app from the landing page (PRD-0002). Shared UI and tokens continue to live in `@potluck/ui`.
- A `packages/db` (or similar) package holds generated Supabase types and the typed client so both apps, and future ones, share one definition.

## Alternatives considered
- **Convex with Convex Auth** — excellent TypeScript experience and realtime updates, but a document model and a proprietary function runtime; Convex Auth is newer and magic-link testing needs custom email hooks. Relational data (ledger, balances) fits Postgres better.
- **Own API (Bun + Hono, Drizzle, managed Postgres, Better Auth) on Fly or Railway** — full control and no vendor lock-in, but email delivery, OAuth, sessions, migrations, secrets, and a server to keep alive are all our problem. Too much for a version whose purpose is validation. Remains the path if Supabase limits bite.
- **Firebase (Auth + Firestore)** — mature auth, but Firestore's NoSQL rules model fits a shared ledger poorly and the TypeScript experience is weaker.
- **Dashboard on GitHub Pages under `/potluck/app/`** — no new vendor, but Pages has no SPA fallback (a root `404.html` redirect hack would also affect the landing page), only one site per repo, and less predictable callback URLs for OAuth and magic links. Vercel's free tier removes all of that.
- **Netlify or Cloudflare Pages instead of Vercel** — equivalent for a static SPA. Vercel chosen for the simplest GitHub integration; switching later is a config change.

## Consequences
- Positive: sign-in, persistence, and access control are configuration plus SQL, not custom services. Time to a working dashboard is days, not weeks.
- Positive: the schema lives in the repo as migrations, so the data model is reviewed like code and the local stack matches production.
- Positive: Vercel preview URLs per pull request give a place to review dashboard changes before merge.
- Negative: two external vendors and accounts. Supabase free projects pause after seven days of inactivity; plan an upgrade or a keep-alive once real users exist.
- Negative: business logic beyond RLS lands in Postgres functions or Supabase Edge Functions, which are less pleasant to test than app code. Keep it minimal; if it grows, revisit an API layer.
- Negative: CI must start the Supabase local stack (Docker), making the dashboard's Playwright job slower and heavier than the landing page's.
- Neutral: the anon key is public by design; security depends entirely on RLS being correct, so every table gets policies and a Playwright test for cross-user denial (PRD-0002 requirement 10).
