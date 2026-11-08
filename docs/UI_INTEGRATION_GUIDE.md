# API Integration Guide for Frontend Builders (`/api/v1`)

How the web UI (and any future client) talks to the backend. The source of truth is always the live spec: `apps/api/openapi.json`, rendered at `/docs` when `API_DOCS_ENABLED=true`. When this guide and the spec disagree, the spec wins; fix the guide.

## 1. Sessions, CSRF and `/me`
- **Cookie session.** The API sets an httpOnly, `SameSite=Lax` cookie (`Secure` in production, path `/`, no `Domain` → host-only on the API host). Its name is the API env `SESSION_COOKIE_NAME` (default `sid`); the UI never reads or needs it. Browser calls must use `credentials: 'include'`.
- **Same registrable domain.** Serve the UI on `app.<domain>` and the API on `api.<domain>`, and list the exact UI origin in the API's `CORS_ORIGINS`. Requests from any other origin are rejected (`ORIGIN_NOT_ALLOWED`). The Next.js server never sees the cookie, so private pages are rendered in the browser only.
- **Session lifetime** (API env, defaults): idle timeout 720 min, absolute 336 h. Any `401 UNAUTHENTICATED` means the session ended: clear caches and go to login.
- **Login result.** `POST /auth/login` returns `{ status, csrfToken }` with `status` one of `authenticated | two_factor_required | two_factor_setup_required`. Super Admin and Admin must use 2FA. Keep `csrfToken` in memory only.
- **CSRF.** Every `POST/PUT/PATCH/DELETE` needs the header `X-CSRF-Token: <csrfToken>`. After a page reload, `GET /me` returns the token again at `session.csrfToken`. The generated client does this for you.
- **`GET /me`** returns the user, roles, effective permissions (`{key, scope: all|assigned|own}`), enabled modules (`{key, enabled}`), and session info. It is the single gate for navigation. The server still enforces everything.
- **Auth endpoints:** `/auth/login`, `/auth/logout`, `/auth/2fa/{setup,enable,verify}`, `/auth/invitations/accept`, `/auth/password/{forgot,reset,change}`. 2FA verify accepts either `code` (6 digits) or `recoveryCode`.

## 2. Contract and client
- OpenAPI 3.1 in `apps/api/openapi.json`; typed client `@platform/api-client` (generated, never hand-edited). Regenerate with `npm run client:generate`; CI fails on a stale client.
- Do not read the whole spec or generated schema; query it (`jq '.paths["/api/v1/orders"]' apps/api/openapi.json`).

## 3. Errors — branch on `code`, never on `message`
Shape: `{ code, message, details?, requestId }`. `details` is `[{ path, message }]` and only appears for `VALIDATION_FAILED`. Show `requestId` to the user for support.

| Code | UI behaviour |
|---|---|
| `VALIDATION_FAILED` | Put each `details[].message` on its field by `path` |
| `UNAUTHENTICATED` | Clear caches → login with "session expired" |
| `INVALID_CREDENTIALS` | One generic message (no account hints) |
| `TWO_FACTOR_REQUIRED` / `TWO_FACTOR_SETUP_REQUIRED` | Route to the 2FA verify / setup screen |
| `INVALID_TWO_FACTOR_CODE` | Inline error on the code field |
| `FORBIDDEN`, `PERMISSION_ESCALATION`, `LOCKED_ROLE`, `LAST_SUPER_ADMIN` | Permission-denied state or a plain explanation; never retry |
| `NOT_FOUND` | Not-found state (also used instead of 403 for records outside your scope) |
| `CONFLICT` | Show the message; refetch the record (stale data, insufficient stock, duplicate) |
| `RATE_LIMITED` | "Try again shortly"; disable the button for a short time |
| `CAPABILITY_DISABLED` | Feature-off state ("not configured on this installation"); not an error. Used by AI, social sync/publish, storage, email-dependent actions |
| `MODULE_DISABLED` | Module-off state |
| `CSRF_INVALID` / `ORIGIN_NOT_ALLOWED` | Refetch `/me` once; if it persists show a generic failure (it is a setup problem) |
| `INVALID_TOKEN` | Expired/invalid link screen (invite, reset) |
| `PAYLOAD_TOO_LARGE`, `UNSUPPORTED_MEDIA_TYPE` | Tell the user the file is too big / not allowed |
| `INTERNAL` | Generic failure with `requestId` |

## 4. Lists and pagination
Cursor pagination: `?limit=25&cursor=<nextCursor>` (limit 1–100) → `{ items, nextCursor? }`. Keep filters, sort and cursor stack in the URL. A few small config lists (store categories, rate card, availability slots, social accounts, workflow rules) are returned whole, not paged.

## 5. Uploads
`POST /storage/upload` (signed-in) takes JSON `{ filename, mimeType, base64Data, folder }` with `folder` one of `products | portfolio | media-kit | drafts | avatars`, and returns `{ key, url, size, mimeType }`. Server limit: 10 MB per file (JSON body cap 15 MB); the UI downsizes images and caps at 8 MB before encoding. Store the returned `key` (the ID other endpoints expect), not the URL. `GET /storage/url/{key}` gives a URL for display. Files in private folders need a signed-in session; confirm the exact access rules per folder in `/docs`. If storage is not configured the API answers `CAPABILITY_DISABLED`.

## 6. Public forms and checkout
- Public endpoints live under `/public/*` and `/store/*` and are rate limited per IP (`RATE_LIMITED`).
- Inquiry form: include a hidden honeypot field `website_hp` that must stay empty.
- Checkout: generate one `idempotencyKey` (uuid) per purchase attempt and reuse it on retries (the API returns the original order). Prices, discounts and totals are always recomputed by the server. Only offline payment methods exist (`CASH_ON_DELIVERY`, `MANUAL_BANK_TRANSFER`, `OTHER_OFFLINE`).

## 7. Figures and AI
- Money is an integer in minor units (`...Cents`); format it with the shared `Money` component only.
- Metrics carry a `source` (`MANUAL` or `SYNCED`); always show a `SourceTag`.
- AI output and workflow runs awaiting approval are suggestions; show an approval badge and never auto-apply. Until a provider is chosen, AI and social sync/publish return `CAPABILITY_DISABLED`.

## 8. Domains
| Domain | Prefix | Needs |
|---|---|---|
| Public storefront | `/store/*` | public |
| Public profile, rate card, portfolio, inquiries, RSVP, booking | `/public/*` | public |
| Auth | `/auth/*` | public for login/reset; session for 2FA setup |
| Commerce admin | `/customers`, `/products`, `/orders`, `/promo-codes` | `customers.*`, `products.*`, `orders.*` |
| Earnings and invoices | `/earnings/*` | `earnings.*` |
| Inbox and support | `/inbox/*`, `/support/*` | `inbox.*`, `support.*` |
| Collaboration and meetings | `/proposals`, `/campaigns`, `/deliverables`, `/meetings` | matching `*.read/write` |
| Events and PR | `/events/*`, `/pr/*` | `events.*`, `pr.*` |
| Social, content, analytics | `/social/*`, `/content/*` | `social.read`, `content.*`, `analytics.read` |
| Profile and media | `/profile`, `/portfolio`, `/media-kit`, `/rate-card`, `/storage/*` | `profile.*`, `portfolio.write` |
| Dashboard and notifications | `/dashboard/summary`, `/notifications/*` | signed in |
| Access management | `/users`, `/roles`, `/permissions`, `/invitations`, `/modules`, `/settings`, `/audit-logs` | `users.*`, `roles.*`, `settings.*`, `audit.read` |
| AI and automation | `/ai/*`, `/workflows/*` | `ai.*`, `workflows.*`; `CAPABILITY_DISABLED` until a provider exists |
