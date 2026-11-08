# packages/ui — rules (loads only when working here)
Inherits root `CLAUDE.md`. Not scaffolded until W0.
- Pure presentational: no fetching, no `next/*` data APIs, no imports from `apps/web`, no stores. Data/handlers via props.
- Tokens only (`theming`): no hex, raw palette classes or arbitrary values. Variants via `cva`.
- Every export: row in `component-registry`, RTL test of its states, a11y (labels, focus, keyboard).
- Structure and baseline list: `ui-component-library`. Reuse rules: `reusable-components`.
- Do not duplicate: if something similar exists, extend it.
