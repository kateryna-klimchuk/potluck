# Potluck

Shared budgets for the things you do together. Monorepo built on Bun, React, and Tailwind.

Live: https://kateryna-klimchuk.github.io/potluck/ (deployed from `main` by GitHub Actions).

```sh
bun install
bunx playwright install chromium   # once, for e2e tests
bun run dev      # apps/web on http://localhost:5173
bun run check    # lint + typecheck + unit + e2e
```

See `CLAUDE.md` for layout and conventions, `docs/` for PRDs and ADRs.
