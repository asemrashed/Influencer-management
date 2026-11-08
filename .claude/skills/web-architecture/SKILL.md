---
name: web-architecture
description: Use when creating or moving any file in apps/web or packages/ui, adding a route, feature folder or dependency. Defines layout, boundaries and import rules for the frontend.
---

# Web Architecture

Decisions D1–D14 are in `FRONTEND_PLAN.md`. This skill is the layout and boundary contract.

## Layout
```
apps/web/src/
  app/(public)/   Server Components, public data only
  app/(auth)/     login, 2FA, invite, reset
  app/(admin)/    client-rendered behind the /me gate
  features/<domain>/{queries.ts,mutations.ts,permissions.ts,components/,schemas.ts}
  lib/{env.ts,api/,format/,url-state/}   cross-feature utilities (no JSX business logic)
  providers/      Query, Session, Theme
packages/ui/src/<component>/   presentational only
clients/<name>/theme.json      per-client brand
```
`<domain>` = module keys from `/me.modules` (profile, contacts, inbox, support, proposals, campaigns, deliverables, agreements, meetings, events, pr, content, social, analytics, earnings, customers, products, orders, workflows, ai, reports).

## Boundaries (enforced by `scripts/ui-guard.mjs` + ESLint)
- `packages/ui` imports nothing from `apps/web`, no `fetch`, no TanStack Query, no `next/*` data APIs. Data and handlers come in as props.
- A feature never imports another feature's `components/`. Shared UI → promote to `packages/ui` (after `ui-architect` says so). Shared non-UI logic → `lib/`.
- Route files (`page.tsx`) are thin: compose feature components, set metadata. No fetching logic inline.
- Only `lib/api` talks to the network. Only `lib/env.ts` reads `process.env`.
- `server-only` import in every module that must never reach the client bundle.
- Types come from `@platform/api-client` (`components['schemas']`) and `@platform/shared-types`. Never hand-write a type that mirrors an API shape.
- One component per file, file name = component name (PascalCase). Names must be unique across the repo (guard checks).

## Server vs client
- Default Server Component only in `(public)`. `'use client'` is pushed to the smallest leaf.
- `(admin)` and `(auth)` pages are client components that read the session from `SessionProvider`.

## Dependencies
Add one only if: no existing dep or platform API does it, bundle cost is stated, license OK, maintained. Heavy ones (charts, editor, calendar, QR) load via `next/dynamic`/`import()`. Run `npm audit` before committing a new dep.

## Files
TS strict, no `any`, no `// @ts-ignore` without a linked reason. ES modules. Functional components + hooks only.
