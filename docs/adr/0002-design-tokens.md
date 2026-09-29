# ADR-0002: Design tokens as semantic CSS variables mapped into Tailwind

- **Status:** Accepted
- **Date:** 2026-09-29

## Context
PRD-0001 (marketing landing page) is the first UI with real visual requirements. Until now components used raw Tailwind palette classes (`bg-zinc-900`, `text-zinc-600`). That does not scale: every colour decision is duplicated across components, rebranding means editing every file, and adding dark mode later would require touching every class.

Constraints:
- Tailwind CSS v4 is already the styling layer (ADR-0001). Tokens should produce ordinary Tailwind utilities so components stay idiomatic.
- Light mode only is needed now, but dark mode is expected later and must not require component changes.
- Shared UI in `packages/ui` is consumed from source by `apps/web`, so tokens must be visible to both.
- No brand identity exists yet; the initial palette is a proposal and will change, so components must never reference raw colour values.

## Decision
- Tokens live in `packages/ui/src/theme.css`, imported by each app's root stylesheet immediately after `@import "tailwindcss"`.
- Tokens are **semantic**, named for their role, not their colour: `bg`, `surface`, `surface-muted`, `border`, `fg`, `fg-muted`, `accent`, `accent-hover`, `accent-fg`, `accent-soft`. Non-colour tokens: `font-sans` (system font stack), `radius-card`, `radius-button`.
- Two layers:
  1. Plain CSS custom properties on `:root` hold the current (light) values.
  2. A Tailwind `@theme inline` block maps those properties to theme keys (`--color-surface: var(--surface)` etc.), so Tailwind generates `bg-surface`, `text-fg-muted`, `bg-accent`, `rounded-card`, and so on.
- Components use only token-derived utilities for colour, font family, and named radii. Raw palette classes (`bg-zinc-*`, `text-orange-*`) are not used in `packages/ui` or `apps/web` for those properties.
- Dark mode, when added, is a `[data-theme="dark"]` (or `prefers-color-scheme`) block that redefines the `:root` variables. No component changes are expected.
- Tailwind's default spacing and type scale are used unchanged. Shadows, motion, and additional colour roles are added to the same file only when a real need appears.

Initial light values (a proposal, expected to change with branding):

| Token | Value |
|---|---|
| bg | #FBF8F3 |
| surface | #FFFFFF |
| surface-muted | #F3EEE6 |
| border | #E6DED2 |
| fg | #2B2520 |
| fg-muted | #6F655B |
| accent | #AD4718 |
| accent-hover | #8F3A14 |
| accent-fg | #FFFFFF |
| accent-soft | #FBE8DD |

## Alternatives considered
- **Raw Tailwind palette classes everywhere (status quo)** — fastest to start, but colour decisions get scattered and rebranding or dark mode become sweeping edits.
- **Primitive scales only (`--color-brand-50…900` in `@theme`)** — idiomatic Tailwind, but components would still choose shades themselves, so the "which shade means what" decision is repeated per component and dark mode still needs per-component changes.
- **Separate `packages/tokens` package with JSON tokens and a build step (Style Dictionary or similar)** — useful when tokens must feed multiple platforms (native, design tools). We have one web app and no design tooling yet; a single CSS file is enough and avoids a build step. Revisit if a second platform appears.
- **A component library with its own theming (shadcn/ui, Radix Themes, Chakra)** — brings a larger dependency and opinions before we know the product's UI needs. Semantic tokens over plain Tailwind keep that door open.

## Consequences
- Positive: one file defines the look; rebranding is a value change; dark mode is an additive block; components read as intent (`bg-surface`) rather than colour.
- Positive: no new dependency, no build step, works with the existing Tailwind v4 setup and the `@source` scan of `packages/ui`.
- Negative: a small vocabulary to learn, and discipline is required to not reach for `bg-zinc-*` when a token is missing. A Biome rule cannot enforce this today; code review must.
- Negative: semantic tokens can proliferate if every new component adds a role. New tokens should be justified by reuse in at least two places.
- Neutral: the palette values are provisional and will change when branding is decided; that is a value edit, not a new ADR.
