---
name: component-registry
description: Use BEFORE creating any UI component, to check what already exists. Index of primitives and shared components in packages/ui and the feature components worth reusing.
---

# Component Registry

Source of truth for "does this exist?". Add a row in the SAME change that adds an export to `packages/ui` (the guard fails otherwise). Status: `planned` until built in W0+, then `built`.

## Primitives (shadcn in `packages/ui/src/primitives` — never recreate)
Button, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Label, Dialog, Sheet, Drawer, Table, Card, Badge, Tabs, Tooltip, Popover, DropdownMenu, Calendar, Form, Toast/Sonner, Skeleton, Avatar, Separator, ScrollArea, Command.

## Shared composites
| Component | Path (`packages/ui/src/…`) | Used for | Status |
|-----------|------|----------|--------|
| DataTable | data-table | every list: server paging, sort, states, row actions | planned |
| Pagination | pagination | cursor-stack prev/next + page size | planned |
| FilterBar | filter-bar | search + filters synced to URL | planned |
| PageHeader | page-header | title, breadcrumb, actions | planned |
| StatCard | stat-card | KPI tile (value, delta, SourceTag, loading) | planned |
| ChartCard | chart-card | card wrapper + lazy chart slot | planned |
| ListCard | list-card | short "recent items" lists on dashboards | planned |
| FormModal | form-modal | any create/edit dialog | planned |
| ConfirmDialog | confirm-dialog | destructive actions | planned |
| FileUploader | file-uploader | uploads (size cap, MIME allowlist, progress); upload fn passed in | planned |
| SafeHtml | safe-html | ONLY place HTML is injected (DOMPurify) | planned |
| Money | money | integer minor units → localized currency | planned |
| DateTime | date-time | formatted dates/relative time | planned |
| StatusBadge | status-badge | all statuses via tone map | planned |
| SourceTag | source-tag | `manual` vs `synced` | planned |
| ApprovalBadge | approval-badge | AI drafts / awaiting human approval | planned |
| ConnectionStatus | connection-status | social account state | planned |
| UserAvatar | user-avatar | avatars/initials | planned |
| EmptyState | empty-state | no data / no filter match | planned |
| ErrorState | error-state | error + retry + requestId | planned |
| PermissionDeniedState | permission-denied-state | 403 | planned |
| ModuleOffState | module-off-state | module disabled | planned |
| FeatureOffState | feature-off-state | `CAPABILITY_DISABLED` | planned |
| LoadingSkeleton | loading-skeleton | page/table/card skeletons | planned |
| CalendarView | calendar-view | content, events, meetings (lazy) | planned |
| ThreadView | thread-view | inbox conversations | planned |
| ProductCard / PriceTag | product-card | storefront (public) | planned |

## App-level (not in `packages/ui`; need session or routing)
`Can`/`useCan`, `SessionProvider`, `AppShell`, `Nav`, `NotificationBell`, `useCursorPagination`, `useUrlState` — in `apps/web/src/{providers,lib,components}`.

## Rules
- BEFORE creating ANY component, search this file, then ask `ui-architect`.
- ≥80% similar → EXTEND with props; don't fork.
- Permission/variant differences → props + `Can`, never per-role copies.
- Colors/fonts/spacing from tokens only (`theming`).
- Remove or mark `deprecated` rows when components are deleted.
