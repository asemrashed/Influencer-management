---
name: web-caching
description: Use when choosing staleTime/gcTime, invalidation, Next fetch caching, image/static caching, or anything that affects what is cached where in the frontend.
---

# Web Caching

Goal: fewer requests, never stale-looking mistakes, never another user's data.

## TanStack Query (private data) — tiers in `lib/api/stale.ts`
| Data | staleTime | Notes |
|------|-----------|-------|
| `/me` | 60 s | refetch on window focus; user id change → `queryClient.clear()` |
| Lists | 30 s | `placeholderData: keepPreviousData` |
| Detail | 30 s | seed from list item via `initialData` only if shape is identical |
| Dashboard summary | 60 s | one request per screen |
| Static config (modules, roles, permission registry, categories) | 5–10 min | |
| Unread count | 30 s poll, pause when tab hidden | back off on errors |
| Signed storage URLs | `expiresInSeconds` minus 60 s | else images 403 |
`gcTime` default 5 min; lower (1 min) for large lists/detail.
- Prefetch on hover/focus of row links and next page (`prefetchQuery`), not on mount of everything.
- Pass `signal` to cancel on unmount/filter change.
- **Clear everything** (`queryClient.clear()`) on logout, on 401, and when `/me` returns a different user id. 
- **Never persist** authenticated cache (no `persistQueryClient`, no localStorage/IndexedDB).
- Invalidate with explicit key lists (`web-data-fetching`). Cross-feature effects (order → dashboard, customers) are listed in the mutation.

## Next.js (public data only)
- Next 16 is dynamic by default. Opt into caching per fetch: `fetch(url, { next: { revalidate: 300, tags: ['public-profile'] } })`.
- TTLs: profile/portfolio 5 min, events 1–2 min, store products/categories 1–2 min, anything with stock/price on checkout fetched fresh client-side.
- The backend has no revalidation webhook; do NOT build one (backend is frozen). Time-based `revalidate` only. If admin edits must show instantly on the public site, call `revalidateTag(tag, 'max')` from a Server Action only when the admin app is same-origin with the public site — otherwise accept the TTL.
- Do NOT enable `cacheComponents`/PPR (nonce CSP incompatibility). `use cache` only in public, per-request-independent functions, after the W0 spike.
- Nonce CSP makes HTML dynamic; rely on data-layer caching + CDN for static assets, not on ISR HTML.

## HTTP / assets
- `_next/static` immutable by hash (Next default); nginx must not override.
- Authenticated HTML: `Cache-Control: no-store` (set in `proxy.ts`/headers).
- `next/image` with `remotePatterns` limited to Cloudinary/S3 hosts from env; sizes set; priority only for the LCP image.
- Fonts: `next/font` (self-hosted, no layout shift).

## Never
- Cache per-user data in a Server Component, in `fetch` cache, or under a shared key.
- Store tokens or cache in localStorage/sessionStorage.
- Use `staleTime: Infinity` for anything a user edited.
