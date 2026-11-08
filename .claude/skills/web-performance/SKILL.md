---
name: web-performance
description: Use when a frontend page feels slow, before adding a heavy dependency, or when building lists, charts, images, or route loading states. Loading-time rules and budgets.
---

# Web Performance

Targets (measure first, enforce in W9): LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on a mid-range phone, 4G. Initial JS per route set from the W0 baseline; a PR that grows it >10% needs a reason.

## Rules
- Public pages: Server Components, minimal `'use client'`, no client data fetching for above-the-fold content.
- Admin: one request per screen where the API offers a summary (`/dashboard/summary`); avoid request waterfalls (parent fetch → child fetch); fire independent queries in parallel; prefetch next page / row detail on hover or focus.
- Code split: charts (Recharts), rich-text editor, calendar, QR scanner, image cropper via `next/dynamic` (`ssr:false` for client-only). Never import them in layouts.
- Import icons by name (`lucide-react`), no barrel imports of whole libraries; check `@next/bundle-analyzer` when adding deps.
- Lists: server pagination (`web-data-fetching`), `keepPreviousData`, virtualize above ~100 rows, memoize row components only after measuring.
- Images: `next/image` with `sizes`, explicit width/height or aspect-ratio (no CLS), `priority` only on the LCP image, lazy otherwise; uploads downscaled client-side.
- Fonts: `next/font`, ≤2 families, `display: swap`.
- Loading UI: `loading.tsx` / skeletons with the same dimensions as final content; never a blank page or full-screen spinner for data.
- Search/filter inputs: debounce 300 ms, cancel in-flight requests with `signal`.
- Polling: only unread count; pause when tab hidden; exponential backoff on error.
- Avoid effects that fetch; avoid state mirrored from server data; derive instead. React Compiler: opt in only after a measured gain.
- No third-party scripts by default.

## Checks
`npm run build -w @platform/web` output sizes reviewed; Lighthouse CI on one public + one admin route in W9; Playwright trace if INP suspect.
