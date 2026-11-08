---
name: reusable-components
description: Use when deciding whether to extract, share, or parameterize a component instead of forking or re-creating it (cards, buttons, tables, badges, dialogs, dashboards).
---

# Reusable Components — Extraction Rules

## Hard rules (the guard script checks these)
- No raw `<button>`, `<table>`, `<input>`, `<dialog>` in `apps/web/src/features/**` or `app/**` — use `packages/ui`.
- No second component with the same name anywhere (e.g. two `StatCard`, two `OrderCard`).
- No copy-pasted JSX blocks for cards/rows/badges across pages: same visual pattern in ≥2 places = ONE component.
- Dashboard cards: `StatCard` / `ChartCard` / `ListCard` only; per-dashboard differences via props (`title`, `value`, `delta`, `source`, `href`, `loading`).
- Statuses (order, ticket, campaign, deliverable, RSVP…) render through ONE `StatusBadge` with a status→tone map in the feature's `status.ts`; never ad-hoc coloured spans.
- Money via `Money`, dates via `DateTime`, provenance via `SourceTag`, avatars via `UserAvatar`. No local re-implementations.

## Rule of Three (for NEW feature-specific pieces)
- 1 place → local to its feature. 2 places → extract into `lib/` or the feature's shared folder. 3+ (or any cross-feature use) → `packages/ui` now.
- Exception: anything in the baseline set (`component-registry`) already lives in `packages/ui`; don't start local.

## Parameterize, don't fork
- Differences by role/permission/data shape → props + `<Can>`; never `ComponentAdmin` / `ComponentManager`.
- Genuinely different structure → extract the shared sub-piece.
- Variants via `cva` (class-variance-authority) with token-based classes only. Prefer slots (`children`, `actions`, `header`) over boolean-prop explosions (>4 booleans = redesign).

## Before creating anything
1. Ask `ui-architect` (REUSE / EXTEND / CREATE) — it reads `component-registry` and greps the code.
2. 80%+ similar → EXTEND with a prop and update the registry row.
3. New shared component → registry row + story/test + a11y check in the same change.

## Ownership
`packages/ui` components contain no feature logic: data and handlers come in via props. Features never reach into a component's internals or override its classes with arbitrary values.
