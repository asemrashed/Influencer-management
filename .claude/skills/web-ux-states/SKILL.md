---
name: web-ux-states
description: Use for every screen - required loading, empty, error, permission-denied, module-off and capability-off states, plus accessibility and responsive rules.
---

# Web UX States, A11y, Responsive

## Every list/detail/dashboard handles ALL of:
| State | Component | Trigger |
|-------|-----------|---------|
| Loading | `LoadingSkeleton` (same size as content) | pending, no data |
| Refetching | subtle inline indicator, keep old data | `isFetching` with data |
| Empty | `EmptyState` with next action | `items.length === 0` (distinguish "no data" from "no match for filters") |
| Error | `ErrorState` + retry + `requestId` | query error (non-403) |
| Permission denied | `PermissionDeniedState` | `FORBIDDEN` or missing permission |
| Module off | `ModuleOffState` | `MODULE_DISABLED` / `modules[key].enabled=false` |
| Capability off | `FeatureOffState` ("not configured on this installation") | `CAPABILITY_DISABLED` (AI, social sync/publish). Never fake success |
Provenance: figures show `SourceTag` (manual/synced). AI/pending items show `ApprovalBadge`. Social accounts show `ConnectionStatus`.

## Accessibility (WCAG 2.2 AA)
Semantic HTML + shadcn/Radix primitives; keyboard operable; visible focus; labels; contrast via tokens; `prefers-reduced-motion`; dialogs trap focus; live regions for toasts; tables have headers/captions; no color-only meaning; touch targets ≥ 44 px; `axe` zero violations in e2e.

## Responsive
Mobile-first; breakpoints from Tailwind tokens only; tables collapse to cards or horizontal scroll with sticky first column; nav → drawer on small screens; test 360 px, 768 px, 1280 px.

## Feedback
Toast for transient success; inline for field errors; never `alert()`. Errors say what happened and what to do, no raw server text.
