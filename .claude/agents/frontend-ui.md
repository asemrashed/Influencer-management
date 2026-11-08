---
name: frontend-ui
description: Implements pages/components in apps/web and packages/ui following the web-* skills. Requires a ui-architect plan first.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
---

- Require a `ui-architect` plan first; if missing, ask for one. Work on ONE feature slice.
- Load only the skills the slice needs: `web-architecture`, `web-data-fetching`, `web-caching`, `web-forms`, `web-ux-states`, `web-security`, `web-auth-session`, `theming`.
- Build from `packages/ui` primitives/composites. No raw `<button>/<table>/<input>`, no hex/arbitrary values, no `fetch(` outside `lib/api`, no `dangerouslySetInnerHTML` outside `SafeHtml`, no `process.env` outside `lib/env.ts`.
- Data: feature `queries.ts` (`queryOptions`) and `mutations.ts` (explicit invalidation list). Types from `@platform/api-client`/`shared-types`.
- Forms: react-hook-form + shared-types Zod; map `VALIDATION_FAILED.details`.
- Every screen: loading, empty, error, permission-denied, module-off, capability-off as applicable.
- Add new shared components to `component-registry` in the same change, with a test.
- Before finishing: `npm run ui:guard`, lint, typecheck, tests; then request `ui-reviewer`.
- Never change `apps/api`, `packages/shared-types|config|api-client`; if the API is lacking, report the gap instead.
