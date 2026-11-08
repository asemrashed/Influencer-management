---
name: web-auth-session
description: Use when building login, 2FA, invite, password flows, route guards, permission/module gating, session expiry or logout in the frontend.
---

# Web Auth & Session

## Facts (from the backend)
- Session cookie (name = API env `SESSION_COOKIE_NAME`, default `sid`; the UI never needs the name): httpOnly, SameSite=Lax, Secure in prod, path `/`, NO domain attribute → host-only on the API host. The Next server and `proxy.ts` CANNOT see it. Therefore auth gating is client-side via `GET /api/v1/me`; the API enforces everything.
- Session: idle timeout 720 min, absolute 336 h (env-configurable). 2FA required for Super Admin/Admin.
- Session states: `authenticated | two_factor_required | two_factor_setup_required`.
- Endpoints under `/api/v1/auth/`: `login, logout, 2fa/setup, 2fa/enable, 2fa/verify, invitations/accept, password/forgot, password/reset, password/change`.

## SessionProvider (single source)
One provider fetches `/me` (`queryOptions`, staleTime 60 s). It exposes `{status:'loading'|'anonymous'|'2fa'|'authenticated', user, roles, permissions, modules}`. Nothing else calls `/me` directly.
- `anonymous` → `/login?next=<safe path>`; `2fa` states → 2FA screens; `authenticated` → render.
- Admin layout renders a full-page skeleton until status is known (no flash of protected content, no redirect loops).
- On user-id change or logout: `queryClient.clear()` and reset Zustand stores.
- Expiry: any 401 → clear + redirect with a "session expired" message; save no form drafts containing sensitive data.
- Multi-tab: on `storage`-free logout, rely on next request 401 (don't store auth markers). Optional `BroadcastChannel('auth')` for logout broadcast (no secrets in it).

## Gating
- `permissions[]` are `{key, scope: all|assigned|own}`; `modules[]` are `{key, enabled}`.
- `useCan(key)` / `<Can permission="orders.write">` hide or disable UI. A disabled/hidden control never replaces server checks; show PermissionDenied for whole routes.
- Nav items require `module.enabled && can(read-permission)`. Direct URL to a disabled module → `ModuleOff` state.
- Scope `assigned/own` only affects what the API returns; UI doesn't filter on its own.
- Permission keys: take from the generated permission list/registry docs (`auth-rbac-matrix`); never invent keys. Centralize per feature in `features/<domain>/permissions.ts`.

## Screens
- Login: generic error on `INVALID_CREDENTIALS` (no account hints), lockout/RATE_LIMITED message, `autocomplete` attrs for password managers.
- 2FA: 6-digit input, paste-friendly, `INVALID_TWO_FACTOR_CODE` inline, QR + secret from `/2fa/setup`, show recovery info if API returns it.
- Accept invite / reset: token from URL → immediately strip from the address bar (`history.replaceState`) after reading; `INVALID_TOKEN` → friendly expired screen.
- Password change: after success the server may rotate sessions → refetch `/me`.
- Logout: POST logout, then `clear()`, then redirect (even if the request fails).
- Open-redirect protection for `next` (see `web-security`).

## Never
Store credentials/tokens in JS-accessible storage, decode a session client-side, trust a role from the URL, or build per-role page forks (use `<Can>` + props).
