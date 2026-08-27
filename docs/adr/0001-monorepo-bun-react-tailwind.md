# ADR-0001: Monorepo with Bun, React, and Tailwind

- **Status:** Accepted
- **Date:** 2026-08-27

## Context
Potluck is intended to grow into a large project with multiple apps and shared packages. We need a foundation that keeps shared code in one place, installs fast, and has minimal tooling overhead while the stack is still being decided.

## Decision
- **Bun workspaces** as the monorepo/package manager/test runner (`apps/*`, `packages/*`).
- **React 19 + Vite** for the web app (`apps/web`).
- **Tailwind CSS v4** via `@tailwindcss/vite`; shared UI in `packages/ui` is consumed from source and scanned via `@source`.
- **TypeScript strict**, shared tsconfigs in `packages/config`.
- **Biome** for lint + format (single tool, fast).
- Internal packages are named `@potluck/*` and referenced with `workspace:*`.

## Alternatives considered
- **pnpm + Turborepo** — mature, but adds a second tool; Bun covers install/run/test today. Revisit Turborepo if task caching becomes a need.
- **Next.js** — deferred until we know we need SSR/routing framework; Vite keeps the app un-opinionated for now.
- **ESLint + Prettier** — more plugins, slower, two configs. Biome is enough for now.

## Consequences
- Fast installs and a single CLI (`bun`) for most tasks.
- Bun-specific behaviors (test runner, workspace resolution) mean CI must use Bun.
- Further tech (routing, data layer, backend, CI) is intentionally undecided; each addition gets its own ADR.
