---
name: web-forms
description: Use when building any form or edit dialog in the frontend - validation, server errors, submit state, uploads, accessibility.
---

# Web Forms

- Stack: react-hook-form + `zodResolver` + the Zod schema from `@platform/shared-types` (same schema as the API). Don't redefine rules locally; extend the shared schema only for UI-only fields.
- Build forms from `packages/ui` `Form*` primitives (label, description, error wiring). Create/edit dialogs use `FormModal`; never a bespoke modal.
- Submit: mutation from the feature's `mutations.ts`; button disabled + spinner while pending; no double submit; success → toast + invalidation (listed) + close.
- Server errors: `VALIDATION_FAILED.details[].path` → `setError(path)`; other errors → `ErrorState`/toast from the mapper. Keep user input on failure.
- Unsaved changes: warn on navigation only for long forms.
- Accessibility: every input has a visible label, `aria-invalid` + `aria-describedby` for errors, error summary focus on submit failure, correct `type`/`autocomplete`/`inputmode`.
- Money inputs: user enters major units, convert to integer minor units in one helper (`toMinor`); never floats in payloads.
- Dates/time zones: send ISO; display in the user's zone with explicit zone where it matters (meetings, events).
- Public forms: honeypot `website_hp`, `RATE_LIMITED` message, no PII in URLs, consent text where required.
- Destructive actions use `ConfirmDialog`.
- Rich text: only through the shared editor; output sanitized on the server; render with `SafeHtml`.
