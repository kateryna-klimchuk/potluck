# Potluck

Bun-workspaces monorepo. React 19 + Vite + Tailwind v4 web app, shared TypeScript packages.

## Layout
- `apps/web` — React app (`@potluck/web`)
- `packages/ui` — shared React components (`@potluck/ui`), consumed from source
- `packages/config` — shared tsconfigs
- `docs/prd`, `docs/adr` — product requirements and architecture decisions (see `docs/README.md`)
- `.claude/skills` — `/write-prd`, `/write-adr`, `/add-package`

## Commands
- `bun install`
- `bun run dev` — start web app
- `bun run check` — lint (Biome) + typecheck + tests. Run before claiming work is done.
- `bun test`

## Conventions
- Internal packages: `@potluck/*`, referenced with `workspace:*`.
- Strict TypeScript; no `any` without a comment.
- Biome is the single formatter/linter — don't add ESLint/Prettier.
- New technology or cross-cutting pattern → write an ADR first. New feature scope → PRD.
- Tests live next to source as `*.test.ts(x)` and run with `bun test`.

## Git rules
- **Never run `git add`, `git commit`, or `git push` without explicit approval from the user in the current conversation.** Finish the work, run `bun run check`, then show what changed and ask before staging or committing.
- **Commit message format:** title only, no body, all lowercase, Conventional Commits prefix: `feat:`, `fix:`, `docs:`, `chore:`. Example: `docs: add git approval rule`.
