# ADR-0003: Browser tests with Playwright

- **Status:** Accepted
- **Date:** 2026-09-29

## Context
PRD-0001 requires tests for the landing page sections, the "Coming soon" CTA behaviour, a responsive layout, and WCAG AA accessibility. `bun test` (ADR-0001) has no DOM, so it cannot render React components, and a simulated DOM (happy-dom, jsdom) cannot check layout, real CSS, or colour contrast. For a marketing page, what the user actually sees in a browser is the thing worth verifying.

## Decision
- Add **Playwright** (`@playwright/test`) to `apps/web` as the UI test layer. Tests live in `apps/web/e2e/*.e2e.ts` (the `.e2e.ts` suffix keeps them out of `bun test`, which would otherwise pick up `*.spec.ts`) and run against the Vite dev server, which Playwright starts itself via its `webServer` option.
- Add **`@axe-core/playwright`** and run an axe scan in the landing page spec, failing on any WCAG A/AA violation.
- Chromium only for now, at a desktop and a mobile viewport. Other browsers are added when a real need appears.
- `bun test` remains the runner for pure TypeScript units (for example `cn`). UI behaviour is tested only with Playwright; no simulated-DOM component tests.
- `bun run check` runs lint, typecheck, `bun test`, and the Playwright suite. CI must run `bunx playwright install chromium` before `check`.

## Alternatives considered
- **happy-dom + Testing Library inside `bun test`** — one runner and fast, but blind to layout, CSS, and contrast, so it cannot verify the requirements that matter for this page. Considered and rejected during PRD-0001.
- **`react-dom/server` string assertions** — no dependencies, but cannot test interaction and is brittle.
- **Cypress** — comparable, but heavier and slower to start; Playwright's `webServer` integration and axe plugin fit the repo better.
- **Manual checks only** — no regression protection.

## Consequences
- Positive: tests exercise the real page in a real browser, including keyboard focus, responsive layout, and accessibility.
- Negative: a browser download (~100 MB) is required on each machine and in CI; the suite is slower than unit tests and needs the dev server.
- Negative: two test commands (`bun test`, `playwright test`) instead of one, hidden behind `bun run check`.
- Neutral: if component-level unit tests become valuable later (complex stateful widgets), a new ADR can add a simulated DOM alongside Playwright.
