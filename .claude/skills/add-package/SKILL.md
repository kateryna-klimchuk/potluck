---
name: add-package
description: Add a new workspace package or app to the monorepo (apps/* or packages/*) following repo conventions. Use when creating a new shared library, service, or app.
---

# Add a workspace package

1. Decide location: deployable → `apps/<name>`; shared library → `packages/<name>`.
2. Create `package.json`:
   - `"name": "@potluck/<name>"`, `"private": true`, `"type": "module"`.
   - Libraries: `"exports": { ".": "./src/index.ts" }` (consumed from source, no build step).
   - Scripts: at minimum `typecheck: "tsc -p tsconfig.json"`. Apps also need `dev` and `build`.
   - Internal deps use `"workspace:*"`. Add `@potluck/config` to devDependencies.
3. Create `tsconfig.json` extending `@potluck/config/tsconfig.base.json` (or `tsconfig.react.json` for JSX) with `"include": ["src"]`.
4. If it ships Tailwind-styled React components, add its `src` to the consuming app's `@source` in `styles.css`.
5. Run `bun install`, then `bun run check`.
6. Add at least one `*.test.ts` under `src/`.
7. If the package introduces a new technology, write an ADR first (`/write-adr`).
