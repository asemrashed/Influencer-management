---
name: context-management
description: Use at the start of any session and whenever a task spans many files - how to keep Claude's context small and focused in this repo.
---

# Context Management

- Read `CLAUDE.md` (router) → only the current phase of `MASTER_PLAN.md` / `FRONTEND_PLAN.md` (pointer lines at the top) → only the skills that match the task. Nested `apps/web/CLAUDE.md` and `packages/ui/CLAUDE.md` load only when working there.
- One feature slice per session (e.g. "orders list + detail"). Finish, run checks, commit, then start fresh.
- NEVER read whole generated files: `apps/api/openapi.json`, `packages/api-client/src/schema.ts`. Use `grep`/`jq` for a path or schema (e.g. `jq '.paths["/api/v1/orders"]' openapi.json`).
- Registry first: check `component-registry` before searching code; use `ui-architect` (read-only subagent) for REUSE/EXTEND/CREATE so grep output stays out of the main context.
- Use subagents for broad searches/reviews (`ui-reviewer`, `code-reviewer`, `security-scanner`) and take back only their conclusion.
- Don't paste large logs/diffs; summarize and reference file:line.
- Keep skill files short; when a rule is added, put it in ONE skill and link from others.
- Record decisions in `FRONTEND_PLAN.md` ADR table, not in chat. Update the pointer lines when a phase changes.
- After a phase: tick `PROJECT_CHECKLIST.md` only for what was verified.
