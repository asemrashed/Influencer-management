---
name: web-data-fetching
description: Use when writing any code that reads or writes API data in the frontend - queries, mutations, pagination, uploads, error handling. Single secure pattern for all fetching.
---

# Web Data Fetching

## One door
All requests go through `lib/api` (a wrapper around `createApiClient({ baseUrl: env.NEXT_PUBLIC_API_URL })` from `@platform/api-client`; the factory is `createApiClient`, NOT `createClient`). No `fetch(`, `axios`, or `XMLHttpRequest` elsewhere. The client already sends `credentials: 'include'`, captures the CSRF token (login, 2FA, accept-invite, `/me`) and adds `X-CSRF-Token` on POST/PUT/PATCH/DELETE. Never hand-roll those.

## Query factories (per feature, hand-written)
```ts
// features/orders/queries.ts
export const orderKeys = {
  all: ['orders'] as const,
  list: (f: OrderFilters) => ['orders', 'list', f] as const,
  detail: (id: string) => ['orders', 'detail', id] as const,
};
export const orderListQuery = (f: OrderFilters, cursor?: string) =>
  queryOptions({
    queryKey: [...orderKeys.list(f), cursor ?? null],
    queryFn: ({ signal }) => unwrap(api.GET('/api/v1/orders', { params: { query: { ...f, cursor, limit: 25 } }, signal })),
    placeholderData: keepPreviousData,
    staleTime: STALE.list,
  });
```
Key shape: `[domain, 'list'|'detail', ...]`. Components call `useQuery(orderListQuery(...))` — never inline `queryKey/queryFn`.
`unwrap` throws a typed `ApiError` (`code`, `message`, `details`, `requestId`) from the `{code,message,details?,requestId?}` contract.

## Mutations
Each mutation file lists, explicitly, the keys it invalidates (no blanket `invalidateQueries()`):
```ts
onSuccess: () => qc.invalidateQueries({ queryKey: orderKeys.detail(id) }) /* + list + dashboard summary */
```
Optimistic updates only for trivial toggles (read/unread, enable/disable); roll back on error. Disable the submit button while pending (double-submit guard).

## Pagination (backend is forward-only cursor)
`?limit=&cursor=` (limit ≤ 100) → `{ items, nextCursor? }`. Use the shared `useCursorPagination` hook: it keeps a client-side stack of cursors so Prev/Next work; resets on filter/sort change; page size from a fixed set (10/25/50). Filters, sort, search and page live in the URL (`lib/url-state`). Search debounce 300 ms. Lists over ~100 rendered rows use TanStack Virtual. Small config lists (store categories, rate card, availability slots, social accounts, workflow rules) are bare arrays — no pagination UI.
Never "load all pages" to filter client-side; ask the API.

## Error → behaviour (single mapper in `lib/api/errors.ts`)
| code | behaviour |
|------|-----------|
| UNAUTHENTICATED | `queryClient.clear()`, redirect `/login?next=<safe relative path>` |
| TWO_FACTOR_REQUIRED / _SETUP_REQUIRED | go to the 2FA screens |
| FORBIDDEN | `PermissionDeniedState` (not a toast) |
| RATE_LIMITED | back off using `Retry-After`; friendly message; no auto-retry storm |
| CAPABILITY_DISABLED | `FeatureOffState` — never fake success |
| MODULE_DISABLED | hide nav item, show disabled state |
| VALIDATION_FAILED | map `details[].path` to form fields (`setError`) |
| CONFLICT | refetch the resource + message |
| CSRF_INVALID | refresh `/me` once, retry once |
| INTERNAL / network | generic message + `requestId` for support; never show raw server text |
Retries: queries retry network/5xx up to 2× with backoff; never retry 4xx; mutations never auto-retry.

## Uploads
`POST /api/v1/storage/upload` takes JSON `{filename, mimeType, base64Data, folder}` (folder ∈ products|portfolio|media-kit|drafts|avatars); body limit 15 MB, base64 adds ~33%. So: cap raw files at 8 MB, downscale images client-side (canvas, max ~2400 px), validate MIME against an allowlist before reading, show progress/err states, one `FileUploader` in `packages/ui` (the upload function is passed in). Display via `url` or `GET /api/v1/storage/url/{key}` (signed, expires).

## Public server fetch
Server Components call only `/api/v1/public/*` and `/api/v1/store/*` through `lib/api/server.ts` (`server-only`), with `next: { revalidate, tags }`, never forwarding cookies. See `web-caching`.

## Money, dates, provenance
Money is integer minor units → format only through `<Money>`/`formatMoney`. Dates: ISO from API, format through `lib/format`. Figures with `source` render `<SourceTag>`.
