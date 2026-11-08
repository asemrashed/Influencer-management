---
name: web-testing
description: Use when writing or reviewing frontend tests, or deciding what to test for a UI change.
---

# Web Testing

Extends `testing-standards`. Don't mock what you can run for real.
- Unit/component: Vitest + React Testing Library; test behaviour by role/label, not implementation. Every `packages/ui` composite has tests for its states (loading/empty/error/denied).
- Hooks/mappers: pure tests for the error-code mapper, `useCursorPagination`, `safeUrl`, `toMinor`/`formatMoney`, `SafeHtml` (XSS payload corpus must come out inert).
- API mocking: MSW only for edge cases the real API can't produce easily (rate limit, 503 capability off, timeouts).
- E2E: Playwright against the real API + a test DB (seed demo data). One flow per module: happy path + permission-denied + empty state. `@axe-core/playwright` on each page: zero violations.
- Contract: web typechecks against the generated `api-client` schema; CI runs `client:check` so API drift breaks the build rather than the UI.
- Security tests: CSP header present and nonce changes per request; no session cookie value/CSRF token in storage; `next=` open-redirect cases rejected; forms don't leak PII into URLs.
- Visual: optional Playwright screenshots for tokens/theme only.
- A bug fix includes a test that fails before the fix.
Commands (once W0 lands): `npm run test -w @platform/web`, `npm run e2e -w @platform/web`, `npm run ui:guard`, `npm run test:ui-guard`.
