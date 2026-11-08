# FRONTEND PLAN — Influencer Management Platform
> Current: W0 not started. Nothing in `apps/web` or `packages/ui` exists yet.
> Next: W0 — Foundations + verification spike. W1 may NOT start until every spike check below is ticked.
> Read ONLY the current phase. Rules live in `.claude/skills/web-*`; do not restate them here.

Scope: ONE admin app + public site for ONE influencer, in this repo, on the finished backend API.
It is a single project: `apps/api` (done) + `apps/web` + `packages/ui`. Each client is a copy of the repo with
`clients/<name>/` overrides (brand tokens, module toggles, extra routes). NOT SaaS, NOT multi-tenant.
Out of scope: 10–15 alternative themes, landing page, PWA, i18n, BFF/proxy, SSR of private data, mobile app, online payments, SMS/WhatsApp.

## Decisions (ADR table — override any row by editing it here first, then the skills that cite it)
| # | Decision | Why | Revisit when |
|---|----------|-----|--------------|
| D1 | Next.js 16 (App Router) + React 19 + TS strict + Tailwind 4 (CSS-first `@theme` tokens) + shadcn/ui | GLOBAL.md default stack; tokens = one-file rebrand per client | never without a reason |
| D2 | `apps/web` (app) + `packages/ui` (pure presentational primitives/composites; no fetching, no app imports) | Hard boundary stops duplicate/app-coupled components; enforced by `ui-guard` | UI is tiny and the boundary costs more than it saves |
| D3 | Browser calls the API directly (same-site subdomains `app.` / `api.`), `credentials: include`, via `@platform/api-client` | Matches backend session cookie (host-only, SameSite=Lax) and `CORS_ORIGINS`; no proxy = correct client IP for rate limits | Cookie problem in W0 spike |
| D4 | Private admin data is client-rendered (TanStack Query) behind a `/me` gate. No SSR of private data | Cookie is host-only on the API host: the Next server cannot see it. Server enforces everything anyway | never |
| D5 | Server Components fetch ONLY public endpoints (`/api/v1/public/*`, `/api/v1/store/*`) with `next:{revalidate,tags}` | Cacheable, no per-user data on the server | never |
| D6 | Nonce-based CSP in `proxy.ts` (Next 16 replaces `middleware.ts`) | Strongest XSS defence. Cost: all pages render dynamically; public pages cache at the data layer, not as static HTML | W0 spike shows budget failure → try experimental SRI |
| D7 | Do NOT enable `cacheComponents`/PPR | Incompatible with nonce CSP | D6 changes |
| D8 | TanStack Query `queryOptions` factories per feature (hand-written), not `openapi-react-query` | Explicit invalidation lists; avoids a 0.x dependency | it reaches 1.x and proves out |
| D9 | Zustand for UI-only state; filters/sort/page live in the URL | Shareable, back-button safe, no duplicate server state | — |
| D10 | Forms: react-hook-form + Zod schemas imported from `@platform/shared-types` | One validation source with the server | — |
| D11 | Charts: Recharts, lazy-loaded; rich-text editor / QR scanner / calendar: lazy-loaded, pick when the phase needs them | Keeps first-load JS small | a lighter lib is measured to win |
| D12 | Theming: semantic CSS-variable tokens, light/dark; per-client `clients/<name>/theme.json` → generated CSS, WCAG AA check | Rebrand without touching components | — |
| D13 | Tests: Vitest + RTL (components), Playwright + axe (e2e vs real API + test DB), generated-schema TS compile = contract check | Mocks drift; the real API is available | — |
| D14 | Deploy: `output:'standalone'` behind nginx on `app.<domain>`; extend `tools/deploy` in W9 | Matches the per-client VPS model | — |

## Which skills to load per phase (everything else stays unread)
Always: `CLAUDE.md`, this file's current phase, `context-management`. Then only:
| Phase | Skills to load |
|---|---|
| W0 | `web-architecture`, `theming`, `ui-component-library`, `component-registry`, `web-security`, `web-data-fetching`, `web-testing` |
| W1 | `web-auth-session`, `web-forms`, `web-ux-states`, `web-data-fetching`, `auth-rbac-matrix` |
| W2 | `web-caching`, `web-performance`, `web-forms`, `web-security` (honeypot, SafeHtml) |
| W3–W8 | `web-data-fetching`, `web-forms`, `web-ux-states`, `reusable-components`, plus the domain skill (`commerce`, `social-integrations`, `ai-automation`) |
| W9 | `web-performance`, `web-testing`, `web-security`, `client-deploy` |

## API gaps protocol (UI never edits the backend)
When a screen needs something the API lacks (missing field, filter, endpoint, wrong error code): stop that slice's affected part, add one row to `docs/API_GAPS.md` (what, why, the screen, a suggested shape), build the rest of the slice around it with an honest empty/"not available" state, and move on. Backend fixes are made in a separate backend change, then `npm run client:generate`.

## Definition of done (every phase)
1. Each screen handles loading, empty, error, permission-denied, module-off and capability-off states (`web-ux-states`).
2. No new component without a `ui-architect` REUSE/EXTEND/CREATE answer; new shared components added to `component-registry` in the same change.
3. Data access only through the feature's `queries.ts`/`mutations.ts`; every mutation lists the keys it invalidates (`web-data-fetching`).
4. `npm run ui:guard`, lint, typecheck, unit tests pass; Playwright flow for the phase passes with 0 axe violations.
5. `ui-reviewer` run on the diff; `PROJECT_CHECKLIST.md` Frontend section ticked only for what was verified.
6. Bundle/perf budget (W9 numbers) not regressed; no new dependency without a stated reason.

---
## W0 — Foundations + verification spike (do first; everything else assumes it)
- [ ] Scaffold `apps/web` (Next 16, TS strict, Tailwind 4, shadcn init) and `packages/ui`; add both to root `tsconfig.json` references; `transpilePackages: ['@platform/ui']`. (`apps/web/CLAUDE.md` and `packages/ui/CLAUDE.md` already exist — move them aside while scaffolding, then restore.)
- [ ] `lib/env.ts` (Zod; only `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`, server-only optional `API_INTERNAL_URL`); the only reader of `process.env`.
- [ ] `lib/api/` single wrapper over `createApiClient` + error-code → UI-behaviour mapper (`web-data-fetching`); `QueryClient` defaults; `SessionProvider` (single `/me`).
- [ ] Tokens file + `theme.json` generator + contrast check (`theming`); light/dark.
- [ ] Core `packages/ui` set: Button/Input/etc. via shadcn, DataTable, PageHeader, FilterBar, FormModal, ConfirmDialog, EmptyState, ErrorState, PermissionDeniedState, FeatureOffState, LoadingSkeleton, SafeHtml, SourceTag, StatusBadge, Money.
- [ ] CI: add `ui:guard`, `test:ui-guard`, web lint/typecheck/test/build and `npm audit` to `.github/workflows/ci.yml`.
- [ ] **Spike (must pass before W1)** — prove on a real build, record results in `docs/FRONTEND_SPIKE.md`:
  1. Nonce CSP from `proxy.ts` works with Next scripts, `next/font`, `next-themes` (nonce prop), shadcn.
  2. Login on `app.` sets the session cookie on `api.` and `/me` works cross-origin; CSRF header sent on mutations; logout clears cache.
  3. Public Server Component fetch honours `revalidate`/tags; no per-user data cached.
  4. Upload of an 8 MB image through the base64 route works end-to-end (client downscale first).
  5. Lighthouse/INP baseline for one public and one admin page.
  Any failure changes a row in the ADR table before W1 starts. Fallbacks, decided in advance so a failure is a lookup, not a debate:

  | Spike check fails | Fallback (edit the ADR row, then the skill that cites it) |
  |---|---|
  | 1 — nonce CSP breaks Next/fonts/theme/shadcn | Hash-based or `'unsafe-inline'` for styles only; keep `script-src` nonce. If scripts break too: static-CSP with SRI (experimental), record the weaker policy in D6 |
  | 2 — cookie not sent cross-origin | Confirm `app.` and `api.` share a registrable domain and `CORS_ORIGINS` lists the exact origin; in local dev use `localhost` for both. Only if impossible: report an API gap (never add a proxy without a new ADR row) |
  | 3 — public fetch not cached / leaks user data | Use `unstable_cache`/tag revalidation on the data layer; never forward cookies from the Next server |
  | 4 — 8 MB upload fails | Lower the client cap (downscale harder); API body limit is 15 MB JSON (≈10.6 MB of file once base64-encoded); report a gap if a real image still fails |
  | 5 — perf budget missed | Lazy-load charts/editor; trim fonts; set the W9 budgets from this baseline instead of guessing |

## W1 — Auth, shell, access management
Login, 2FA setup/verify, accept-invite, forgot/reset/change password, logout, idle/absolute-expiry handling, `/me` gate, nav from `modules` + `permissions`, notification bell (`unread-count` poll with backoff). Users, roles/permissions editor (shows escalation/locked-role errors), invitations, audit log viewer, module toggles, settings.
Accept: wrong-role/URL-guessing shows PermissionDenied; 2FA flows e2e; last-Super-Admin errors surfaced; no token in storage.

## W2 — Public site
Profile, portfolio albums, media kit, events + RSVP, inquiry form (honeypot `website_hp`, `RATE_LIMITED` UX), meeting booking (slots), SEO metadata, sitemap. Server Components + `revalidate`.
Accept: LCP/CLS budgets on mobile profile; forms succeed/fail correctly; no private fetch on the server.

## W3 — Admin core
Dashboard (`/dashboard/summary`, one request), inbox/threads, notifications page, support tickets, contacts/CRM, profile/portfolio/media-kit editing with uploads (`FileUploader`).
Accept: cursor pagination with stack; optimistic read/unread; upload size cap + progress + error.

## W4 — Collaboration + meetings
Proposals, campaigns, deliverables, agreements (e-sign status), meetings/availability, calendar view.

## W5 — PR + events
PR pipeline, events admin, RSVP list, QR check-in.

## W6 — Social, analytics, content calendar
Social accounts (ConnectionStatus; sync/publish show FeatureOff 503 states), analytics with SourceTag, content calendar.

## W7 — Commerce + earnings
Public storefront (categories, products, cart, checkout with reused idempotency key, offline payment instructions), admin orders/customers/inventory/promo/refunds/shipments, earnings and invoices (money = integer minor units via `Money`).

## W8 — AI + automation
AI drafts (ApprovalBadge, always human-approved), AI actions log, workflow rules and runs (decide runs), reports. All AI/social-sync screens must render the capability-off state when the API returns `CAPABILITY_DISABLED`.

## W9 — Hardening + release
Budgets enforced in CI (bundle analyzer, Lighthouse CI), full axe pass, security-header check, error-boundary + requestId display, Playwright smoke per module, `tools/deploy` extension (build standalone, nginx vhost, env), runbook in `docs/`.

## After W9
Per-client: copy repo, add `clients/<name>/theme.json` + module toggles, deploy (`client-deploy`). Anything two clients want is promoted to core.
