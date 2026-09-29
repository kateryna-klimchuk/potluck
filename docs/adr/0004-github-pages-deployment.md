# ADR-0004: Deploy the web app to GitHub Pages with GitHub Actions

- **Status:** Accepted
- **Date:** 2026-09-29

## Context
PRD-0001 delivers a static marketing page. It has no backend and no server-side rendering, so it can be served as static files. We need it publicly reachable, rebuilt on every change to `main`, and gated on `bun run check` so a broken page is never published. The repository is already hosted on GitHub.

## Decision
- **GitHub Pages** hosts the built `apps/web` app at `https://kateryna-klimchuk.github.io/potluck/`.
- **GitHub Actions** (`.github/workflows/deploy.yml`) runs on every push to `main` and on manual dispatch. A `check` job installs Bun, installs Playwright's Chromium, and runs `bun run check`. A `deploy` job runs only after `check` succeeds, builds with `BASE_PATH=/potluck/`, uploads `apps/web/dist`, and publishes with `actions/deploy-pages`.
- The Pages source is set to "GitHub Actions" in the repository settings.
- `apps/web/vite.config.ts` reads `BASE_PATH` (default `/`) so the project sub-path applies only in the production build; dev server and Playwright are unaffected.
- No custom domain yet. Adding one later is a `CNAME` file plus DNS, and `BASE_PATH` goes back to `/`.

## Alternatives considered
- **Vercel / Netlify** — better previews per pull request and a nicer default URL, but require a third-party account and give little extra for a static page. Revisit when the app needs serverless functions or preview deployments.
- **Cloudflare Pages** — similar trade-off to Vercel/Netlify, plus a second account to manage.
- **Manual `gh-pages` branch pushes from a laptop** — no CI gate, easy to publish a broken build.

## Consequences
- Positive: free hosting, no new accounts, and every deploy has passed lint, typecheck, unit and browser tests first.
- Negative: the app lives under a `/potluck/` sub-path, so any future routing must respect the base path; Pages serves static files only, so a backend will need a different host.
- Negative: the browser download makes the CI job slower (~1–2 minutes extra).
- Neutral: a failed `check` blocks the deploy but does not roll back the previous one; the last good build stays live.
