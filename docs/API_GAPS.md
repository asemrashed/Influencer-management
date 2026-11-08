# API gaps found while building the UI

The UI never edits `apps/api` or the shared packages. Add one row per gap, then keep building the rest of the slice with an honest "not available" state. A backend change resolves the row; then run `npm run client:generate`.

| # | Date | Phase/screen | What is missing or wrong | Suggested shape | Status |
|---|------|--------------|--------------------------|-----------------|--------|
| 1 | | | | | open |

Status: `open` → `in backend` → `done` (note the commit/tag) or `won't fix` (note the UI workaround).
