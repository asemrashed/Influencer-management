# FRONTEND PLAN — Influencer Management Platform
> Current: Phase W0 & Core Skeleton complete. Updating comprehensive UI coverage for all backend APIs.
> Scope: ONE admin app + public site for ONE influencer, in this repo, on the finished backend API.
> Architecture: Next.js (App Router) + React 19 + TS strict + Tailwind 4 semantic tokens + `@platform/ui`.
> Client: Standalone per influencer, styled via `clients/<name>/theme.json`.

---

## Complete API-to-UI Mapping Matrix (Every backend route has a UI screen)

### 1. Public Site & Fan/Brand Facing (`/`)
- [ ] **Homepage & Showcase** (`/`):
  - Dynamic Hero with influencer stats, biography, and social badges.
  - Video Gallery with playable video modal (`/api/v1/public/portfolio`).
  - Services deck with distinct inquiry drawer (`/api/v1/public/inquiries`).
  - Partner highlights & social proof.
- [ ] **Public Media Kit & Press** (`/media-kit`):
  - View rate cards, verified audience demographics, platform metrics, and one-click Media Kit PDF/download (`/api/v1/public/media-kit`).
- [ ] **Public Event Schedule & Ticketing** (`/events`, `/events/[id]`):
  - Upcoming events listing, RSVP registration form with instant QR ticket confirmation (`/api/v1/public/events`, `/rsvp`).
- [ ] **Public Meeting Scheduler** (`/book`):
  - Influencer availability slots calendar, timezone selection, and brand consultation booking form (`/api/v1/public/meetings/slots`, `/book`).
- [ ] **Public Merchandise Storefront & Cart** (`/store`, `/store/cart`, `/store/checkout`):
  - Category filters, product grid, variant selector, cart drawer (`/api/v1/store/products`).
  - Multi-step checkout with delivery address and offline payment instructions (COD / Manual Transfer) (`/api/v1/store/checkout`).

---

### 2. Authentication, Security & RBAC (`/login`, `/2fa/*`)
- [ ] **Session & Access Gate**:
  - Fix permission & role mapper in `SessionProvider` (map `p.permission` and `r.name` / `r.key`).
  - Instant login buttons for development: Super Admin, Admin, Manager (`/login`).
  - 2FA Setup with QR code & Secret (`/api/v1/auth/2fa/setup`), Enable (`/2fa/enable`), and Verify (`/2fa/verify`).
  - Password Reset & Invite Acceptance (`/accept-invite`, `/forgot-password`).

---

### 3. Unified Inbox & AI Copilot (`/admin/inbox`)
- [ ] **Unified Thread Management** (`/api/v1/inbox/threads`):
  - Split views: Public Inquiries, Brand Deals, Support, and Direct.
  - Read/Unread status, assign to team member, resolve/close thread.
- [ ] **In-Chat AI Assistant**:
  - One-click "Draft AI Reply" button invoking `/api/v1/ai/generate` (`INBOX_REPLY`).
  - Human review & edit workflow before sending email/message.
  - Auto-email trigger for brand collaboration responses.

---

### 4. Brand Collaborations & Campaign CRM (`/admin/campaigns`, `/admin/proposals`)
- [ ] **Proposals & Deal Flow** (`/api/v1/collaboration/proposals`):
  - Create proposal, define deliverables, set pricing milestones, auto-email proposal link to brand contact.
  - Brand response status: `DRAFT`, `SUBMITTED`, `ACCEPTED`, `DECLINED`.
- [ ] **Campaign & Deliverables Execution** (`/api/v1/collaboration/campaigns`):
  - Deliverable submission tracker (link / file upload), revision requests, client approval.
  - Digital Agreements & E-Sign contract status (`/agreements`).
- [ ] **Contacts & CRM** (`/admin/contacts`):
  - Sponsor/brand directory, company profiles, primary contact emails, deal history (`/api/v1/contacts`).

---

### 5. Content Calendar & Multi-Platform Social Hub (`/admin/calendar`, `/admin/social`)
- [ ] **Content Planning & Publishing** (`/api/v1/social/drafts`):
  - Calendar grid view with post status (`IDEA`, `DRAFT`, `SCHEDULED`, `PUBLISHED`).
  - Cross-platform publishing trigger to YouTube, Instagram, X (`/api/v1/social/drafts/:id/publish`).
- [ ] **Social Account Connections & Metrics** (`/admin/social`):
  - Platform OAuth connection cards (`ConnectionStatus`).
  - Automated sync follower counts vs. manual telemetry entry (`/api/v1/social/followers`).
  - Audience growth analytics charts (`/api/v1/social/growth`).

---

### 6. PR & Event Management (`/admin/pr`, `/admin/events`)
- [ ] **PR & Press Pipeline** (`/admin/pr`):
  - Media kit configuration, rate card editor, press release distribution list.
- [ ] **Event Hosting & QR Check-in** (`/admin/events`):
  - Event creator (date, venue, ticket tiers, capacity).
  - Live attendee RSVP list with check-in counter (`/api/v1/events/:id/rsvps`).
  - Camera-based QR Code ticket scanner for on-site verification (`/api/v1/events/:id/check-in`).

---

### 7. Custom E-Commerce & Merch Store Admin (`/admin/store`)
- [ ] **Catalog & Variants** (`/api/v1/commerce/products`):
  - Product creation, image upload, variant options (sizes/colors), pricing in integer minor units.
- [ ] **Stock & Inventory Ledger** (`/admin/store/inventory`):
  - Real-time stock levels, adjustment history (`RESTOCK`, `DAMAGE_WRITE_OFF`, `SALE`).
- [ ] **Orders & Fulfillment** (`/admin/store/orders`):
  - Order status pipeline (`PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
  - Shipment creation with tracking numbers (`/api/v1/commerce/shipments`).
  - Return requests review & offline payment confirmation.

---

### 8. Finance, Earnings & Invoices (`/admin/finance`)
- [ ] **Earnings Ledger & Milestone Payments** (`/api/v1/commerce/earnings`):
  - Consolidated revenue: brand sponsorships, merch sales, affiliate links.
  - Milestone invoice creator with PDF generation and payment recording (`/api/v1/commerce/invoices`).
  - Monthly payout tracking and financial summary dashboard.

---

### 9. AI Automation & Workflow Engine (`/admin/ai`)
- [ ] **AI Creative Studio** (`/api/v1/ai/generate`):
  - Task selector: `BRAND_PITCH`, `VIDEO_SCRIPT`, `SOCIAL_CAPTION`, `INBOX_REPLY`.
  - Human approval card (`ApprovalBadge`), edit draft, reject or apply.
- [ ] **Workflow Rules & Runs** (`/admin/ai/workflows`):
  - Trigger conditions (e.g., "On new brand inquiry > Auto-draft pitch & notify manager").
  - Execution run logs and safety override controls (`/api/v1/ai/workflows/runs`).

---

### 10. Staff, RBAC & Audit (`/admin/roles`, `/admin/audit`)
- [ ] **Team & Role Management** (`/api/v1/users`, `/api/v1/roles`):
  - Role-based UI rendering with scoped permissions (`ALL`, `ASSIGNED`, `OWN`).
  - Invite staff member modal, 2FA enforcement flags, user activity audit logs (`/api/v1/audit`).
