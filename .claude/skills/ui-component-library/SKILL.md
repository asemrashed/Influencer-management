---
name: ui-component-library
description: Use when organizing shared UI in packages/ui, adding a primitive/composite, or deciding component structure, layering, props and tests.
---

# UI Component Library (`packages/ui`)

## Tiers
1. **Primitives** — shadcn/Radix components copied into `packages/ui/src/primitives`. Style changes happen via tokens or `cva` variants, never by forking per feature.
2. **Composites** — domain-agnostic blocks built from primitives (DataTable, FilterBar, FormModal, ConfirmDialog, StatCard, PageHeader, states). Live in `packages/ui`.
3. **Feature components** — in `apps/web/src/features/<domain>/components`; built from tiers 1–2; promoted when a second feature needs them (`reusable-components`).

## Package contract
- Pure presentational: no data fetching, no `next/*` data APIs, no app imports, no global stores; React 19 + Tailwind tokens only. Export from `src/index.ts`; one folder per component: `Component.tsx`, `Component.test.tsx`, optional `Component.stories`.
- Props typed, minimal, documented with TSDoc on non-obvious ones. Controlled where state matters (table sort/page come in as props + callbacks).
- Accessible by default (labels, roles, focus); test states with RTL.
- Consumed through `transpilePackages: ['@platform/ui']`. No CSS-in-JS; Tailwind classes use semantic tokens (`bg-surface`, `text-muted`, `border-border`, `ring-ring`), never raw palette or hex.
- Every export has a row in `component-registry` (guard checks).

## Required composites (baseline)
DataTable (server pagination, sorting, loading/empty/error, row actions, selection, column visibility), FilterBar, PageHeader, StatCard, ChartCard, FormModal, ConfirmDialog, FileUploader, SafeHtml, Money, DateTime, StatusBadge, SourceTag, UserAvatar, Pagination (cursor stack UI), EmptyState, ErrorState, PermissionDeniedState, ModuleOffState, FeatureOffState, LoadingSkeleton, Toaster.

## Role-based rendering
One component + `<Can permission="…">` around gated actions + `disabled` for read-only fields. Never per-role copies. `Can` lives in `apps/web` (needs session), `packages/ui` receives `canEdit`/`actions` as props.
