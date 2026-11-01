---
name: storage
description: Use when handling file/media uploads, downloads, private files, or the storage provider (S3/R2/Cloudinary/local).
---

# Storage Rules

## Provider abstraction
- All file/media storage goes through one `StorageProvider` interface (`upload`, `getUrl`, `delete`, at minimum) resolved from env via a factory (see `env`) — route/service code never calls a vendor SDK directly.
- Supported providers are swappable without touching call sites (e.g. Cloudinary / S3 / R2 / local-disk-for-dev).

## Uploads
- Validate file size and mime type server-side before accepting — never trust the client's declared type.
- Generate a random/opaque storage key, don't trust client-supplied filenames as paths.
- Return signed/expiring URLs for private content; public content can use a stable CDN URL.

## Component
- Expose one upload flow (validate, store, return a `StoredFile` DTO or a short-lived signed upload URL) shared by every module; no per-feature upload logic. Any UI builds its own uploader on top of it.

## Provider switching & access
- Store the provider-agnostic key (not a full vendor URL) in the DB; build URLs via `getUrl`. Changing `STORAGE_PROVIDER` does not move existing files — follow the migration procedure in `deployment`.
- Authorize every private-file access server-side (ownership/permission check before issuing a signed URL or streaming).
- Allowlist extensions AND verify content (magic bytes); strip path separators; set `Content-Disposition`/`nosniff`; never serve user uploads from the app origin as executable/HTML.
- Enforce per-file and per-user size/quota limits; scan or restrict risky types (SVG, HTML, archives).
