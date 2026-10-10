# GENESIS: Team Workflow & Architecture Guide

Welcome to **GENESIS** (Placement Management System). This guide outlines our project architecture, directory structure, Git conventions, and operational workflows for our 3-developer team.

---

## 1. Team Responsibilities & Ownership

To prevent merge conflicts and ensure parallel execution, the codebase is modularized by portals and shared domains:

| Role | Developer | Scope & Ownership | Page Count |
|---|---|---|---|
| **Lead / Core UI & Student Engine** | **Dev 1** | Project setup, design tokens, Shared UI kit (`components/ui`), Auth (`X1–X6`), Student Portal (`S1–S19`), Alumni Portal (`A1–A6`), TPO Alumni Ops (`T26`) | **32 Pages** |
| **Placement Operations & Industry** | **Dev 2** | TPO Core Ops (`T1–T14`), Recruiter Portal (`R1–R9`), Faculty & HOD Portal (`F1–F7`) | **30 Pages** |
| **Enterprise Governance & Assessments** | **Dev 3** | TPO Extended Ops (`T15–T25`, `T27–T32`), Management / Principal Portal (`M1–M7`), Admin Portal (`AD1–AD8`), Reusable Chart/Report engines | **32 Pages** |

> **Critical Rule:** Never edit files directly inside another developer's `features/` folder without checking with them. All shared components live in `src/components/ui` or `src/components/shared`.

---

## 2. Recommended Directory Structure

```text
GENESIS/
├── .github/
│   └── pull_request_template.md    # PR checklist for code reviews
├── docs/
│   ├── placement-frontend-plan.md  # Master 94-page plan
│   └── api-contracts.md            # Agreed request/response schemas
├── public/
│   ├── favicon.ico
│   └── assets/                     # Logos, static illustrations
├── src/
│   ├── app/                        # Root application wrappers
│   │   ├── App.jsx                 # App entry point
│   │   ├── router.jsx              # Central router configuration
│   │   ├── providers.jsx           # QueryClient, Theme, Toast providers
│   │   └── queryClient.js          # TanStack query cache config
│   │
│   ├── layouts/                    # Layout shells
│   │   ├── AuthLayout.jsx          # Centered / Split card layout for auth
│   │   ├── PortalLayout.jsx        # Sidebar + Topbar + Content container
│   │   └── components/
│   │       ├── Sidebar.jsx         # Dynamic role-based navigation sidebar
│   │       ├── Topbar.jsx          # Header with user avatar, search, notifications
│   │       └── Breadcrumbs.jsx
│   │
│   ├── components/                 # Reusable UI & Shared domain widgets
│   │   ├── ui/                     # Atomic UI kit (Owned by Dev 1)
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Drawer.jsx
│   │   │   ├── Tabs.jsx
│   │   │   ├── Stepper.jsx
│   │   │   ├── StatusBadge.jsx     # Color-coded workflow badges
│   │   │   └── Skeleton.jsx
│   │   └── shared/                 # Complex composite widgets
│   │       ├── DataTable.jsx       # TanStack table (sort, filter, pagination, export)
│   │       ├── FilterBar.jsx       # Multi-select filter bar
│   │       ├── StatCard.jsx        # Metric summary card
│   │       ├── ChartCard.jsx       # Recharts wrappers (Dev 3)
│   │       ├── ApprovalPanel.jsx   # Approve / Reject / Comment dialog
│   │       ├── FileUploader.jsx    # Drag-and-drop document uploader
│   │       ├── RoleGuard.jsx       # RBAC route shield
│   │       └── NotificationBell.jsx
│   │
│   ├── features/                   # Self-contained feature modules
│   │   ├── shared/                 # Dev 1 (Login, MFA, Account, Notifications, Errors)
│   │   │   ├── pages/
│   │   │   └── services/
│   │   ├── student/                # Dev 1 (S1 - S19)
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   ├── alumni/                 # Dev 1 (A1 - A6, T26)
│   │   ├── tpo/                    # Dev 2 (T1-T14) & Dev 3 (T15-T32)
│   │   │   ├── core/               # Dev 2 (Students, Drives, Jobs, Applications, Rounds, Interviews)
│   │   │   └── extended/           # Dev 3 (Tests, Training, Comms, Reports, Policies, Finance)
│   │   ├── recruiter/              # Dev 2 (R1 - R9)
│   │   ├── faculty/                # Dev 2 (F1 - F7)
│   │   ├── management/             # Dev 3 (M1 - M7)
│   │   └── admin/                  # Dev 3 (AD1 - AD8)
│   │
│   ├── lib/                        # Utilities, constants & API instances
│   │   ├── axios.js                # Preconfigured Axios instance with JWT interceptors
│   │   ├── constants.js            # Enums (ApplicationStatus, DriveStatus, Roles, etc.)
│   │   ├── rbac.js                 # Permission matrix and role helpers
│   │   └── utils.js                # Date formatters, currency helpers, cn (tailwind-merge)
│   │
│   ├── mocks/                      # Mock Service Worker (MSW) or mock JSON
│   │   ├── handlers/               # Route-specific mock handlers
│   │   └── browser.js              # Worker registration
│   │
│   └── store/                      # Global state (Zustand)
│       ├── authStore.js            # User session, JWT tokens, active role
│       └── uiStore.js              # Theme mode, sidebar collapse state
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 3. Standard Git Workflow & Branching Strategy

To keep collaboration clean and avoid stepping on each other's toes:

### Branch Structure
- **`main`**: Production-ready code only. Never commit directly to `main`.
- **`dev`**: Integration branch. All developers branch off `dev` and merge into `dev`.
- **Feature Branches**: Named using convention `feat/<dev>-<module>-<page>`:
  - Example: `feat/dev1-student-dashboard`
  - Example: `feat/dev2-tpo-drives`
  - Example: `feat/dev3-reports-analytics`
  - Bug fixes: `fix/<dev>-<issue-description>`

### Step-by-Step Daily Workflow

1. **Before starting work:**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/dev1-student-profile
   ```

2. **Commit with clear Conventional Commit messages:**
   - `feat(student): implement S2 profile tabs and ERP sync button`
   - `ui(kit): add DataTable row selection and bulk action bar`
   - `fix(tpo): resolve round transition validation issue`

3. **Before opening a Pull Request (PR):**
   Rebase or merge the latest changes from `dev` to ensure zero conflicts:
   ```bash
   git fetch origin
   git merge origin/dev
   ```

4. **Push branch and open PR into `dev`:**
   ```bash
   git push -u origin feat/dev1-student-profile
   ```
   - At least 1 teammate must approve the PR before merging.
   - Once tested on `dev`, merge `dev` into `main` at milestones.

---

## 4. Cross-Team Contracts & Conventions

### Shared Data Contracts
All mock endpoints and backend responses must follow this common format:

```json
// Success List Response
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 140
  }
}

// Success Item Response
{
  "success": true,
  "data": { ... }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED_ACCESS",
    "message": "You do not have permission to view salary details."
  }
}
```

### Shared Status Enums (`src/lib/constants.js`)
Use uniform enums across all pages to avoid inconsistent labels:
- **Application Status:** `DRAFT`, `APPLIED`, `SHORTLISTED`, `IN_REVIEW`, `REJECTED`, `SELECTED`, `WITHDRAWN`
- **Drive Status:** `UPCOMING`, `ONGOING`, `COMPLETED`, `CANCELLED`
- **Offer Status:** `PENDING`, `ACCEPTED`, `DECLINED`, `REVOKED`, `JOINED`
- **Verification Status:** `PENDING`, `VERIFIED`, `REJECTED`, `REQUIRES_UPDATE`

---

## 5. Execution Timeline & Milestones

1. **Phase 1: Foundation (Hours 0 – 4)**
   - Dev 1 builds the base kit: `PortalLayout`, `DataTable`, `Button`, `Modal`, `StatusBadge`, and routing shells.
   - Dev 2 & Dev 3 create mock JSON contracts for their respective portals.
2. **Phase 2: Core Demo Flow (P1 Priority)**
   - Student signs up (`S2`) $\rightarrow$ TPO verifies (`T4`) $\rightarrow$ Recruiter posts job (`R3`) $\rightarrow$ Student applies (`S6`) $\rightarrow$ TPO shortlists & schedules (`T12`, `T14`) $\rightarrow$ Offer issued & accepted (`R8`, `S13`) $\rightarrow$ Management dashboard displays metrics (`M1`).
3. **Phase 3: Secondary Operations (P2 Priority)**
   - Assessments, calendars, communication centre, custom reports, role configurations.
4. **Phase 4: Polish & Wrap-up (P3 Priority)**
   - Empty/error states, mobile responsiveness audit, and final rehearsal.
