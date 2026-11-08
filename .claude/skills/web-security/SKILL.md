---
name: web-security
description: Use for any frontend code touching HTML rendering, URLs/redirects, env vars, headers/CSP, forms, uploads, third-party scripts, storage, or logging. Frontend security rules.
---

# Web Security

The server enforces authorization; the UI must not weaken it or leak. Treat all API text as untrusted (customers, inbox, AI output).

## Rendering
- Default React escaping. `dangerouslySetInnerHTML` is allowed ONLY inside `packages/ui/SafeHtml`, which runs DOMPurify (`isomorphic-dompurify`) with the same allowlist as backend `sanitizeRichText`. Guard fails on any other use.
- No `innerHTML`, `eval`, `new Function`, `document.write`, inline event-handler strings.
- User/API URLs (`href`, `src`, redirects) must be `https:` (or same-origin relative). Use `safeUrl()`; external links `rel="noopener noreferrer"`.
- `next` redirect param: relative paths starting with a single `/` only; reject `//`, `\`, schemes.
- Markdown/rich text from AI or inbound mail is data; render via `SafeHtml`, never execute links automatically.

## Secrets & env
- Only `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` are public. Everything else server-only. Anything named `*_KEY/*_SECRET/*_TOKEN` must never be `NEXT_PUBLIC_*`. Validate with Zod in `lib/env.ts`.
- No API keys, provider credentials or tokens in the bundle, repo, logs or `clients/` files.

## Session & storage
- Auth is the httpOnly session cookie (API default name `sid`) (host-only on API host). The UI never reads/stores it. CSRF token = memory only. No auth data in localStorage/sessionStorage/IndexedDB/URL. See `web-auth-session`.
- localStorage only for harmless prefs (theme, table density, column visibility), wrapped in try/catch.

## Headers (set in `proxy.ts` / `next.config`)
Nonce CSP: `default-src 'self'; script-src 'self' 'nonce-…' 'strict-dynamic'; style-src 'self' 'nonce-…'` (or `'unsafe-inline'` for styles only if the spike shows shadcn needs it); `object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; connect-src 'self' <API origin>; img-src 'self' data: blob: <Cloudinary/S3 hosts>`. Plus `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera only on check-in page), `Cross-Origin-Opener-Policy: same-origin`. No third-party scripts/analytics/chat widgets without an ADR row and a CSP entry.

## Forms & input
- Validate with shared-types Zod on the client for UX AND rely on server validation; never trust either alone.
- Public forms include honeypot `website_hp` (hidden, `tabIndex=-1`, `autocomplete=off`) and handle `RATE_LIMITED`.
- Checkout: generate `idempotencyKey` (uuid) once per attempt and reuse on retry; disable submit while pending.
- Uploads: allowlist MIME + extension, size cap 8 MB raw, never trust file name for display without escaping.
- No card data anywhere (offline payments only).

## Privacy & logging
- Never `console.log` PII, tokens, API bodies. Error reporting (if added) scrubs emails/phones. Show `requestId` to users, not stack traces.
- Permission checks in UI (`useCan`, `<Can>`) are UX only; never hide a security-relevant action by UI alone and never rely on it.

## Supply chain
Lockfile committed; `npm audit --omit=dev --audit-level=high` in CI; pin major versions; no postinstall scripts from unknown packages; review new deps (`web-architecture`).
