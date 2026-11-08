# apps/web — rules (loads only when working here)
Inherits root `CLAUDE.md`. Plan: `FRONTEND_PLAN.md` (current phase only). Not scaffolded until W0.
Scaffolding note: this file exists before `package.json`; move it aside while running the generator, then restore it.

- Layout and boundaries: `web-architecture`. Fetching: `web-data-fetching`. Caching: `web-caching`. Security: `web-security`. Session/gating: `web-auth-session`. States/a11y: `web-ux-states`. Forms: `web-forms`. Perf: `web-performance`. Tests: `web-testing`.
- Before any new component: `ui-architect`. After: `ui-reviewer`. Always: `npm run ui:guard`.
- Only `lib/api` makes requests; only `lib/env.ts` reads `process.env`; `(admin)` is client-rendered behind `/me`; `(public)` Server Components fetch public endpoints only.
- Next 16: async `params`/`cookies()`/`headers()`, `proxy.ts` (not `middleware.ts`), no `cacheComponents`, `next lint` is gone (run ESLint directly).
- Do not touch `apps/api` or `packages/{shared-types,config,api-client}`.
