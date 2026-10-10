# Placement Management System: Frontend Implementation Plan

**Stack:** React.js + Tailwind CSS (frontend) · Express + Python (backend) · SQL DB
**Scope:** 37 sections of the master plan → 30 modules (A+B) + 7 portals (C)
**Total frontend pages:** **94** (6 shared + 88 portal pages), split across 3 developers.

> Reading guide: `M5.14` = Module 5, item 5.14 in your master plan. Every item 1.1 to 30.12 is mapped to a page below. The coverage checklist at the end proves nothing is missed.

---

## 1. Portals and page count

| Portal | Users | Pages | Dev |
|---|---|---|---|
| Shared (auth, notifications, account, errors) | everyone | 6 | Dev 1 |
| Student Portal (31) | students | 19 | Dev 1 |
| Alumni Portal (36) | alumni | 6 | Dev 1 |
| TPO / Placement Officer Portal (32): core ops | TPO staff | 14 (T1 to T14) | Dev 2 |
| Company Recruiter Portal (33) | recruiters | 9 | Dev 2 |
| Department Coordinator / Faculty Portal (34) | HOD, faculty, trainers | 7 | Dev 2 |
| TPO Portal (32): assessments, training, comms, reports, etc. | TPO staff | 18 (T15 to T32) | Dev 3 |
| Management / Principal Portal (35) | management | 7 | Dev 3 |
| System Administrator Portal (37) | admins | 8 | Dev 3 |

Note: T26 (Alumni Management) is built by **Dev 1** because it shares components with the Alumni portal. So Dev 1 = 32 pages, Dev 2 = 30, Dev 3 = 32.

---

## 2. Architecture (all 3 devs follow this)

**Libraries:** React 18 + Vite, React Router v6, Tailwind CSS, TanStack Query (API calls and caching), Axios, React Hook Form + Zod (forms and validation), TanStack Table (data tables), Recharts (charts), FullCalendar (calendars), Zustand (auth and UI state), Headless UI / Radix (modals, tabs, dropdowns), react-hot-toast, jsPDF / SheetJS (export), Monaco Editor (coding tests).

**Folder structure**
```
src/
  app/            router.jsx, queryClient.js, providers
  layouts/        AuthLayout, PortalLayout (sidebar + topbar + notification bell)
  components/     shared UI kit (see section 3)
  features/
    student/  alumni/  tpo/  recruiter/  faculty/  management/  admin/  shared/
      pages/  components/  api.js  hooks.js  mock.json
  lib/            axios instance, rbac.js, formatters, constants
```

**Routing and roles:** one `<RoleGuard roles={[...]}>` wrapper. Routes are prefixed per portal: `/student/*`, `/tpo/*`, `/recruiter/*`, `/faculty/*`, `/management/*`, `/alumni/*`, `/admin/*`. Sidebar menus are generated from a single `menuConfig` per portal. Within a portal, menu items and buttons are also hidden by permission (M23.4, M23.5).

**Backend not ready?** Build against mock JSON using **MSW (Mock Service Worker)**. When Express endpoints are ready, only the base URL changes. Agree the REST contract first (`/api/students`, `/api/jobs`, `/api/drives`, ...). Python services (resume parsing, AI, coding-test runner) are called through Express.

---

## 3. Shared component kit (Dev 1 builds this first, by Hour 4)

Everyone reuses these. This is what makes 94 pages doable.

| Component | Purpose |
|---|---|
| `PortalLayout`, `Sidebar`, `Topbar`, `Breadcrumbs` | Shell for every portal |
| `DataTable` | Search, filter, sort, pagination, row select, bulk actions, export |
| `FilterBar` | Department, year, status, date-range filters |
| `StatCard`, `ChartCard` (bar, line, pie, funnel) | Dashboards and reports |
| `StatusBadge` | Colour-coded status for any workflow |
| `FormBuilder` / `FormField` | Standard forms with validation |
| `Modal`, `Drawer`, `ConfirmDialog` | Dialogs and side panels |
| `Tabs`, `Stepper`, `Timeline` | Detail pages, workflows, history |
| `FileUploader`, `DocViewer` | Uploads, PDF/resume preview |
| `ApprovalPanel` | Approve / reject / comment (used in about 15 pages) |
| `AuditLogViewer` | Who did what, when |
| `CalendarView` | Interviews, training, events |
| `ExportMenu` | Excel / CSV / PDF (M18.20) |
| `NotificationBell` | In-app notifications |
| `EmptyState`, `Skeleton`, `ErrorBoundary` | Loading and error UX |
| `RichTextEditor` | Announcements, job descriptions |
| `RoleGuard`, `PermissionGate` | Access control |

**Generic page templates** (build once, configure per page): `ListPage` (filters + table + create button), `DetailPage` (header + tabs), `FormPage`, `DashboardPage`, `ReportPage`, `QueuePage` (approve/reject items). Most pages below are one of these templates plus config.

---

## 4. Priority tags

- **P1** = hackathon demo path. Build and polish first.
- **P2** = build next.
- **P3** = build as a simple config-driven page, or stub with mock data.

Suggested demo story: *Student registers → TPO approves → Recruiter posts job → Student applies → TPO shortlists → Interview → Offer → Management dashboard.* All the P1 pages follow this path.

---

# 5. PAGE LIST

## SHARED PAGES (Dev 1)

| ID | Page | Options on the page | What it does (simple) | Pri |
|---|---|---|---|---|
| X1 | **Login** | Email/ID + password, role-based redirect, "Forgot password" link (M23.1, 23.8) | Signs the user in and sends them to their portal | P1 |
| X2 | **Forgot / Reset Password** | Email entry, reset link, new password form (M23.8) | Lets users recover their account | P3 |
| X3 | **MFA Verification** | OTP input, resend code (M23.7) | Extra login security where required | P3 |
| X4 | **Notification Centre** | List with filters (unread, type), mark read, acknowledge, announcement view, delivery and read status (M15.1, 15.16, 15.17, 29.7, 29.11) | One inbox for every alert, reminder and circular | P2 |
| X5 | **My Account & Privacy** | Profile basics, change password, active sessions and sign-out (M23.8); consent and purpose view (M26.4); data correction / review request form (M26.11) | Manage own login, sessions and personal-data rights | P2 |
| X6 | **Error pages** | 403 Unauthorized, 404, 500, Session expired | Friendly messages when access or the server fails | P3 |

---

## STUDENT PORTAL (Dev 1), 19 pages

| ID | Page | Options on the page | What it does (simple) | Pri |
|---|---|---|---|---|
| S1 | **Student Dashboard** | Profile completeness bar, registration status, upcoming interviews/assessments, application status summary, deadlines, recommended jobs, offers pending, training reminders, announcements, readiness indicator (M1 student view, 29.1, 29.5, 29.6, 29.10, 29.11, 21.10) | Single view of everything the student must do next | P1 |
| S2 | **Placement Registration & Profile** | Tabs: Personal and contact (2.3), Academic (reg no., department, programme, grad year 2.4; semester CGPA 2.5; arrears/backlogs and eligibility info 2.6), Skills (technical and languages 2.7; soft skills and languages known 2.8), Projects/research/publications/achievements (2.9), Certifications (2.10), Internship and work experience (2.11), Links: resume, portfolio, GitHub, LinkedIn (2.12), Preferences: roles, locations, industries (2.13); "Import from ERP" button (2.2); completeness and verification status (2.14); consent and preferences (2.15); placement history (2.16); change history and pending approvals (2.17); registration status (2.18); Register button (2.1) | Student fills and maintains the placement profile, which staff verify | P1 |
| S3 | **My Resumes** | Create (builder) or upload (3.1), multiple versions per role (3.2), templates (3.3), review/approval status from staff (3.4), version history (3.12), download and share (3.14), resume submission history per drive (3.15), AI improvement suggestions link (M21.2) | Manage role-specific resumes | P1 |
| S4 | **My Documents** | Upload mark sheets/certificates (3.5), identity/eligibility docs (3.6), internship certificates (3.7), project portfolios (3.8), certifications/achievements (3.9), verification status (3.10), missing-document alerts (3.11), version control (3.12), recruiter access permissions toggle (3.13) | Upload documents and see which are verified | P2 |
| S5 | **Jobs & Internships (Browse)** | Search + filters, tabs: full-time / part-time / internship / apprenticeship (5.4), recommended for me (5.16, 21.4), eligibility tag on each card, deadlines (8.1, 29.3) | Discover opportunities | P1 |
| S6 | **Job Detail & Apply** | Full job info (title, description, skills, salary/CTC/stipend, location, rounds, documents needed), live eligibility check with reasons if ineligible (8.3, 7.8), select resume (8.4), upload job-specific docs (8.5), submit (8.2), AI skill-match score (21.3) | Apply for a job after the system checks eligibility | P1 |
| S7 | **My Applications** | List with status, timestamps (8.10), round-wise status (9.12), full history (8.15), withdraw per policy (8.8), dashboard counts (8.16, 29.5) | Track every application | P1 |
| S8 | **Placement Drives** | Upcoming/ongoing/completed drives, register for a drive (6.12), eligibility status, pre-placement talk info (6.10), application limit counter (6.9), attendance status (6.12), drive feedback form (6.17) | See and register for campus drives | P2 |
| S9 | **My Schedule** | Calendar and list: interviews (time, panel, room/link, 10.2 to 10.4), assessments, trainings, events; invitations and reminders (10.7); calendar sync (25.9); time zones (10.5) (29.6) | One calendar of every date | P2 |
| S10 | **Assessments** | Available tests, instructions page, **test-taking screen** (timer, question navigator, MCQ/descriptive/coding editor; 11.2, 11.9, 11.7), submit, results and performance report (11.15, 29.9), retest requests (11.16) | Students take online tests and see results | P2 |
| S11 | **Training** | Annual calendar (12.1), enrol in programmes (12.2 to 12.11), batch and trainer info (12.12, 12.13), attendance (12.14), assessment/feedback (12.15), certificates download (12.16), skill-gap view (12.17), remedial/improvement plan (12.18), company-specific prep sessions (12.11), mock interview booking (12.10) (29.8) | Placement preparation hub | P2 |
| S12 | **My Internships** | Internship openings and apply (13.1, 13.3), eligibility (13.4), offer and joining details (13.5), duration/stipend (13.6), faculty mentor (13.7), attendance and weekly/monthly reports upload (13.8, 13.9), tasks (13.10), evaluation and feedback (13.12), completion certificate and final report (13.13, 13.14), conversion to job status (13.15) | Track an internship from application to completion | P3 |
| S13 | **My Offers & Joining** | Offer list with status: pending/accepted/declined/withdrawn (14.6), view offer letter (14.2), job title/employer/location (14.3), CTC/fixed/variable/benefits (14.4), issue and expiry dates (14.5), accept/decline with evidence upload (14.7), joining date/confirmation (14.8), multiple-offer policy warning (14.10, 14.11), history (14.13) (29.10) | Manage and respond to offers | P1 |
| S14 | **AI Placement Assistant** | Resume parsing and skill extraction (21.1), resume suggestions (21.2), job-skill matching (21.3), recommendations with confidence and explanation (21.4, 21.12), skill-gap analysis (21.5), recommended training (21.6), interview question practice (21.7), mock interview feedback (21.8), communication coaching (21.9), readiness indicator (21.10), usage history and feedback buttons (21.14). Banner: *"AI helps you prepare. It never rejects you or makes hiring decisions."* | AI coach for preparation and discovery | P2 |
| S15 | **Career Guidance** | Interest assessment (19.1), career path and role explorer (19.2), industry info (19.3), skill and competency map (19.4), individual development plan (19.5), higher-ed and competitive exam guidance (19.6), startup guidance (19.7), govt and private options (19.8), certification recommendations (19.9), book counselling appointment (19.10), mentor assigned (19.11), goals and progress (19.12), feedback (19.14), resources (29.12) | Career help for students | P3 |
| S16 | **Alumni Connect** | Mentor directory and request mentorship (16.4, 16.5), referral opportunities (16.6), alumni-led openings (16.7), guest lectures and events (16.8, 16.9), success stories (16.10), skill sessions (16.11) | Reach alumni for guidance and referrals | P3 |
| S17 | **Events** | Job fairs, PPTs, seminars, workshops list (17.1 to 17.3), register and attendance (17.4), feedback (17.12) | Join and rate placement events | P3 |
| S18 | **Policies & Announcements** | Placement circulars (15.1), placement policy by academic year (7.10, 7.13), offer restrictions and dream-company/higher-package rules (7.11, 7.12), **acknowledge policy** button (7.14, 22.9), consent and participation (22.5) | Read and acknowledge the rules | P2 |
| S19 | **Grievance & Feedback** | Submit complaint (category, priority, confidential toggle; 20.1, 20.2, 20.4), status tracking (20.5), appeal/escalation (20.6), drive/interview feedback (20.8), training feedback (20.9), policy clarification request (20.11), closure confirmation (20.13) (29.13) | Raise placement-related issues and track them | P3 |

---

## ALUMNI PORTAL (Dev 1), 6 pages

| ID | Page | Options | What it does | Pri |
|---|---|---|---|---|
| A1 | **Alumni Dashboard** | Engagement summary, mentee requests, referral status, upcoming events | Overview of the alumnus's involvement (M16.13) | P3 |
| A2 | **Employment Profile** | Register and edit profile (16.1), current employer and role (16.2), employment verification status (16.3) | Keep alumni data current | P3 |
| A3 | **Mentorship** | Mentor profile (availability, domains), incoming requests, accept/decline, mentee list (16.4, 16.5) | Guide students | P3 |
| A4 | **Referrals & Networking** | Post referral/openings (16.6), alumni-led recruitment links (16.7), history (16.12), networking events (16.9) | Help students get in at their company | P3 |
| A5 | **Guest Lectures & Sessions** | Offer/accept guest lecture (16.8), skill-sharing sessions (16.11), career guidance sessions | Teach and share | P3 |
| A6 | **Recruitment Connections & Stories** | Company hiring contacts (16.7), submit success story (16.10), engagement report (16.13) | Connect companies and share stories | P3 |

**T26 Alumni Management (TPO side)**, also Dev 1, listed under TPO below.

---

## TPO / PLACEMENT OFFICER PORTAL, Part 1: Core Operations (Dev 2), T1 to T14

| ID | Page | Options on the page | What it does (simple) | Pri |
|---|---|---|---|---|
| T1 | **TPO Dashboard** | Cards: enrolled, registered, eligible, ineligible, placed, unplaced (1.1, 1.2, 1.3); companies registered/approved/active (1.4); drives upcoming/ongoing/completed (1.5); applications pending (1.6); interviews today/upcoming (1.7); offers pending acceptance (1.8); accepted and joined (1.9); highest/lowest/average/median package (1.10); department and programme stats charts (1.11); academic-year comparison and trends (1.12); training completion and readiness (1.13); notifications, deadlines, pending approvals (1.14); **customise widgets** (1.15) | Live control room for the placement cell | P1 |
| T2 | **Students List** | Table with filters (department, programme, year, eligibility, placed/unplaced, registration status; 2.18, 7.7), **Import from ERP** with validation, reconciliation and duplicate detection (2.2, 25.15, 25.18), bulk actions, export | Browse and manage all students | P1 |
| T3 | **Student Profile (360 view)** | Tabs: personal, academic (CGPA, arrears; 2.5, 2.6), skills, projects, certifications, internships, links, resumes, documents, applications, offers, placement history (2.16), eligibility with reasons (7.8), change history (2.17), training and assessment scores | Everything about one student in one place | P1 |
| T4 | **Verification Centre** | Queues: profile-change approvals (2.17), profile verification (2.14), resume review/approve (3.4), document verification (3.10), missing-document alerts and bulk reminders (3.11) | Staff approve or reject student data | P1 |
| T5 | **Companies List & Onboarding** | Table with status prospect/active/inactive/restricted (4.16), onboarding form (4.1), industry/category (4.3), **duplicate detection** (4.17), approval workflow (4.7) | Add and approve companies | P1 |
| T6 | **Company Detail** | Tabs: profile and business (4.2, 4.3), addresses, website, offices (4.4), recruiters and HR contacts (4.5), recruiter accounts and permissions (4.6), verification (4.7), hiring background (4.8), roles/departments recruited (4.9), recruitment history (4.10), salary and benefits history (4.11), communication log (4.12), recruiter feedback and relationship (4.13), visits and engagement (4.14), documents and agreements (4.15), authorized notes and audit log (4.18) | Complete company record | P2 |
| T7 | **Jobs List** | Table by status, **approve before publishing** (5.14), publish/pause/close/cancel (5.15), application statistics (5.17), archived jobs (5.18) | Manage all job postings | P1 |
| T8 | **Job Create / Edit** | Title/description/responsibilities (5.2), category and type (5.3, 5.4), qualifications and grad year (5.5), min CGPA and backlog rules (5.6), skills (5.7), location and work mode (5.8), salary/CTC/stipend/benefits (5.9), open and close dates (5.10), vacancies (5.11), required docs and resume format (5.12), selection process and rounds (5.13), publish (5.1) | Create or edit a job | P1 |
| T9 | **Drives List & Create** | Create campus / pooled / off-campus / virtual / hybrid drive (6.1 to 6.3), link company and jobs (6.4), dates and deadlines (6.5), departments and programmes (6.6), eligibility rules (6.7), stages (6.8), application limits (6.9), coordinator assignment (6.13), postpone/cancel (6.15) | Set up recruitment drives | P1 |
| T10 | **Drive Detail** | Tabs: overview, PPT scheduling (6.10), logistics (6.11), registration and attendance (6.12), shortlist and selection tracking (6.14), outcome confirmation (6.16), feedback and review (6.17), drive-wise reports (6.18) | Run a drive end to end | P2 |
| T11 | **Eligibility Rules** | CGPA/percentage (7.1), active and historical backlogs (7.2), course/branch/year (7.3), company-specific rules (7.4), skill requirements (7.5), auto-check preview (7.6), eligible/ineligible lists (7.7), reasons (7.8), manual exception approval (7.9), registration rules (7.10), offer restrictions (7.11), dream/higher-package policy (7.12), policy versions by year (7.13), acknowledgement tracking (7.14), override and approval history (7.15), eligibility audit report (7.16) | Define who can apply where, and why | P1 |
| T12 | **Applications Management** | List by job/drive, review (8.6), approve/reject (8.7), duplicate detection (8.11), shortlist (8.12), **bulk** shortlist/status update (8.13), rejection reasons with restricted access (8.14), history (8.15), view recruiter candidate list (8.17), export approved list (8.18) | Process student applications | P1 |
| T13 | **Rounds & Selection** | Configure rounds per drive (9.1) using round types: screening, aptitude, technical, coding, GD, technical/managerial/HR interview, practical, final (9.2 to 9.11); round-wise status (9.12), scores and comments (9.13), shortlist/reject (9.14), bulk move between rounds (9.15), retest handling (9.16), final selection approval (9.17), selection history (9.18) | Move candidates through rounds | P1 |
| T14 | **Interview Scheduler** | Create schedule (10.1), assign candidates to slots (10.2), panel (10.3), rooms/labs/links (10.4), dates and time zones (10.5), **conflict warning** (10.6), invites and reminders (10.7), candidate and interviewer attendance (10.8, 10.9), scores and remarks (10.10), reschedule/cancel (10.11), no-shows (10.12), scorecards (10.13), completion (10.14), reports (10.15) | Plan and track interviews | P1 |

## TPO PORTAL, Part 2 (Dev 3, except T26 = Dev 1), T15 to T32

| ID | Page | Options on the page | What it does (simple) | Pri |
|---|---|---|---|---|
| T15 | **Question Bank** | Add/edit MCQ, descriptive, coding questions (11.1, 11.2), category: aptitude, quant, logical, verbal, technical (11.3 to 11.6), difficulty and topic tags (11.10), bulk import | Store reusable test questions | P2 |
| T16 | **Test Builder & Scheduling** | Create test (11.8), pick questions, time limit and randomisation (11.9), assessment type (11.7), schedule, assign batches, retest approval (11.16) | Create and schedule tests | P2 |
| T17 | **Results, Evaluation & Integrity** | Auto-scored results (11.11), manual evaluation of descriptive answers (11.12), coding results from the secure service (11.13), attempt/submission tracking (11.14), publish results and reports (11.15), suspicious-activity logs (11.17), analytics by student/department/topic (11.18) | Grade tests and review cheating flags | P2 |
| T18 | **Training Programmes & Calendar** | Annual calendar (12.1), create programmes (12.2): aptitude, programming, DSA, English, soft skills, GD, resume workshops, mock interviews, company-specific (12.3 to 12.11), batches (12.12), trainer allocation and scheduling (12.13), budget and resource allocation (12.19) | Plan training | P2 |
| T19 | **Training Attendance & Effectiveness** | Attendance (12.14), assessment and feedback (12.15), certificates (12.16), performance and skill-gap (12.17), remedial plans (12.18), effectiveness reports (12.20) | Measure whether training worked | P3 |
| T20 | **Internship Management** | Opportunities (13.1), companies and supervisors (13.2), applications and approvals (13.3), eligibility checks (13.4), offers and joining (13.5), duration and stipend (13.6), faculty mentors (13.7), attendance and progress (13.8), reports (13.9), projects and tasks (13.10), industrial visits (13.11), evaluation (13.12), completion and certificates (13.13), report submissions (13.14), conversion tracking (13.15), statistics (13.16) | Run the internship programme | P3 |
| T21 | **Offers & Joining** | Record provisional/final offers (14.1), upload and store letters (14.2), role/employer/location (14.3), CTC and benefits (14.4), issue and expiry (14.5), status tracking (14.6), acceptance evidence (14.7), joining dates and confirmation (14.8), non-joining and revocation (14.9), **multiple offers per student** (14.10), apply offer policies (14.11), verify outcomes (14.12), history (14.13), reports (14.14) | Track offers through to joining | P1 |
| T22 | **Communication Centre** | Announcements and circulars (15.1), channel selection: email, SMS, optional WhatsApp, push (15.2 to 15.5), company-specific announcements (15.6), department/batch targeting (15.7), eligibility-based targeting (15.8), reminder types: deadline, interview/assessment, training/event, offer expiry/joining (15.9 to 15.12), templates with personalisation (15.13), schedule send (15.14), delivery and failure tracking (15.15), read receipts (15.16), history with access control (15.17) | Send the right message to the right students | P2 |
| T23 | **Events & Logistics** | Job fairs, PPTs, seminars (17.1 to 17.3), registration and attendance (17.4), auditorium/classroom/lab booking (17.5), interview rooms (17.6), computer labs and equipment (17.7), coordinators and volunteers (17.8), visitors and guests (17.9), schedule and resource plan (17.10), expenses (17.11), feedback (17.12), completion reports (17.13) | Plan campus events | P3 |
| T24 | **Career Guidance Admin** | Manage assessments and resources (19.1 to 19.9), counselling appointments (19.10), mentor assignment (19.11), goal tracking (19.12), **restricted** counselling records (19.13), feedback and outcomes (19.14) | Run career counselling | P3 |
| T25 | **Grievance Management** | Complaints by category and priority (20.1, 20.2), assign to staff (20.3), confidential handling (20.4), status (20.5), appeal/escalation (20.6), company and recruiter feedback (20.7, 20.10), student feedback views (20.8, 20.9), policy clarification requests (20.11), deadlines and reminders (20.12), closure (20.13), trends and reports (20.14) | Resolve complaints | P3 |
| T26 | **Alumni Management** *(Dev 1)* | Alumni records and verification (16.1 to 16.3), mentor directory (16.4), mentorship matches (16.5), referrals (16.6), alumni recruitment (16.7), guest lectures and events (16.8, 16.9, 16.11), stories (16.10), history and engagement reports (16.12, 16.13) | TPO view of the alumni network | P3 |
| T27 | **Placement Finance** | Annual budget (27.1), training budget (27.2), event expenses (27.3), trainer/consultant payments (27.4), logistics (27.5), travel and accommodation (27.6), company-visit costs (27.7), vendors and invoices (27.8), allocation by department/activity (27.9), actual vs budget (27.10), approval workflow (27.11), reports and audit trail (27.12). Note: tracks cell *expenditure* only; no student fees, no company payments | Control the placement cell budget | P3 |
| T28 | **Documents & Agreements** | MoUs and agreements (28.1), recruiter authorisation (28.2), JDs and notices (28.3), circulars (28.4), student resumes/certificates (28.5), offer and joining docs (28.6), internship agreements/certificates (28.7), training materials and attendance records (28.8), approval workflow and status (28.9), versions and expiry alerts (28.10), authorised download and share (28.11), archive and retention (28.12) | Central, searchable document store | P3 |
| T29 | **AI Insights & Human Review** | Candidate profile summaries for authorised recruiters (21.11), explainable recommendations with confidence (21.12), **human review queue** for important recommendations (21.13), AI usage history and feedback (21.14), skill-matching view (21.3), cohort skill-gap (21.5), readiness (21.10). Banner: AI assists, never auto-rejects | Staff oversight of AI | P3 |
| T30 | **Reports & Analytics** | Overall summary (18.1), registration/participation (18.2), eligible vs ineligible (18.3), placed vs unplaced (18.4), unique students placed vs total offers (18.5), accepted offers vs joined (18.6), department/programme (18.7), company-wise (18.8), role and industry (18.9), salary distribution (18.10), highest/lowest/average/median (18.11), rate by year (18.12), internship participation and conversion (18.13), training reports (18.14), assessment and interview performance (18.15), acceptance and non-joining (18.16), trends (18.17), NAAC/NBA/NIRF data (18.18); export Excel/CSV/PDF (18.20) | Ready-made reports | P1 |
| T31 | **Custom Report Builder** | Pick fields and filters (18.19), save report definitions (24.14), schedule reports to management (18.21), generation and export **audit log** (18.22) | Build, schedule and audit your own reports | P2 |
| T32 | **Policy & Rule Engine** | Institution-wide policy (22.1), department rules (22.2), company rules (22.3), academic-year config (22.4), participation and consent rules (22.5), offer and multiple-offer rules (22.6), internship policies (22.7), exceptions and approvals (22.8), publish and acknowledgement (22.9), effective dates and version history (22.10), violation review and appeal (22.11), audit trail (22.12) | Define and publish placement policy | P2 |

---

## COMPANY RECRUITER PORTAL (Dev 2), 9 pages

| ID | Page | Options | What it does | Pri |
|---|---|---|---|---|
| R1 | **Recruiter Dashboard** | Active jobs, upcoming drives, candidates shortlisted, interviews, offers pending | Recruiter overview | P1 |
| R2 | **Company Profile & Recruiter Accounts** | Edit company profile (4.2, 4.4), add recruiters and HR contacts (4.5, 4.6), upload agreements and documents (4.15) | Maintain company details and team | P2 |
| R3 | **Job Vacancies** | Create vacancy and **submit for approval** (5.1 to 5.13), see status draft/pending/published/closed | Post jobs for TPO approval | P1 |
| R4 | **Campus Drive Requests** | Drive requirements, dates, departments, stages, PPT slot, logistics needs (6.4 to 6.11) | Plan the campus visit | P2 |
| R5 | **Eligible Candidates & Resumes** | Eligible list (8.17), authorised profile and resume view only for permitted candidates (3.13, 26.5, 23.6), AI profile summary (21.11), export approved list (8.18) | See only the candidates you are allowed to see | P1 |
| R6 | **Shortlisting & Round Results** | Shortlist (8.12), round-wise scores and decisions (9.12 to 9.15) | Pick who moves ahead | P1 |
| R7 | **Interviews & Evaluation** | Schedule slots and panel (10.1 to 10.4), scorecards and remarks (10.10, 10.13), assessment results (11.15) | Run interviews and evaluate | P2 |
| R8 | **Offers & Final Selection** | Final selection (9.17), offer details: role, CTC, expiry (14.1 to 14.5), joining updates (14.8) | Release offers | P1 |
| R9 | **History & Feedback** | Past recruitment and placements (4.10), submit feedback on the college and candidate readiness (20.7, 20.10, 4.13) | Look back and give feedback | P3 |

---

## DEPARTMENT COORDINATOR & FACULTY PORTAL (Dev 2), 7 pages

| ID | Page | Options | What it does | Pri |
|---|---|---|---|---|
| F1 | **Department Dashboard** | Department placement overview: registered, eligible, placed, readiness (M1.11 dept view) | HOD's quick view | P2 |
| F2 | **Student Eligibility & Readiness** | Department student list, eligibility reasons (7.7, 7.8), readiness and skill gaps (12.17, 21.10) | Identify who needs help | P2 |
| F3 | **Training Schedules & Attendance** | Schedules, batches, **mark attendance**, feedback (12.12 to 12.15) | Trainers run sessions | P3 |
| F4 | **Mentoring & Progress** | Mentee list, notes, goals and progress (19.11, 19.12) | Mentor students | P3 |
| F5 | **Assessment Performance** | Dept-wise and topic-wise scores (11.18) | Spot weak areas | P3 |
| F6 | **Department Reports** | Department placement reports with export (18.7, 18.20) | Reports for the HOD | P3 |
| F7 | **Internship Monitoring & Approvals** | Approve internships (13.3), monitor attendance, progress and reports (13.8, 13.9), evaluate (13.12) | Faculty oversight | P3 |

---

## MANAGEMENT / PRINCIPAL PORTAL (Dev 3), 7 pages

| ID | Page | Options | What it does | Pri |
|---|---|---|---|---|
| M1 | **Institution Dashboard** | Institution-wide stats and trends (M1.1 to 1.12) | Top-level view | P1 |
| M2 | **Department & Programme Comparison** | Side-by-side charts (1.11, 18.7) | Compare departments | P2 |
| M3 | **Recruitment & Salary Statistics** | Package distribution, highest/average/median, company-wise (18.8, 18.10, 18.11) | Understand outcomes | P2 |
| M4 | **Budget & Training Expenditure** | Budget vs actual (27.9, 27.10), **approve expenses** (27.11) | Oversee spending | P3 |
| M5 | **Company Engagement & Trends** | Company visits, repeat recruiters, trend lines (4.14, 18.17) | See hiring relationships | P3 |
| M6 | **Accreditation Reports** | NAAC / NBA / NIRF data and export (18.18, 18.20) | Accreditation prep | P2 |
| M7 | **Policy Approvals** | Approve or reject new policy versions (22.8, 22.9, 22.10) | Governance sign-off | P2 |

---

## SYSTEM ADMINISTRATOR PORTAL (Dev 3), 8 pages

| ID | Page | Options | What it does | Pri |
|---|---|---|---|---|
| AD1 | **Admin Dashboard** | Service availability and operational status (30.12), error alerts (30.8), job summary | System health at a glance | P2 |
| AD2 | **Users & Accounts** | Create/deactivate users (23.1), link student/staff/recruiter accounts (23.2), approval authority (23.9), temporary access and expiry (23.10) | Manage accounts | P1 |
| AD3 | **Roles & Permissions** | Role-based access (23.3), permission matrix by module and action (23.4), department/programme access (23.5), recruiter limits (23.6), access reviews (23.12) | Control who can do what | P2 |
| AD4 | **Master Data** | Tabs for all of 24.1 to 24.14: academic year/semester, departments/programmes/courses, graduation years and batches, job categories and employment types, industry and skill categories, recruitment rounds, assessment types and criteria, salary/package config, training and certification categories, document types and verification statuses, notification templates, branding and policy settings, application statuses, report definitions | Configure dropdown data used by the whole system | P2 |
| AD5 | **Integrations** | Cards and settings for ERP (25.1), department/course/year (25.2), exams (25.3), attendance (25.4), staff directory (25.5), LMS (25.6), email (25.7), SMS and messaging (25.8), calendar (25.9), assessment platform (25.10), video interview (25.11), job portals / external APIs (25.12), resume parsing and AI (25.13), PDF generation (25.14); API keys and access control (25.16); error logs and retry (25.17) | Connect external systems | P3 |
| AD6 | **Import / Export & Background Jobs** | Import validation and reconciliation (25.15, 25.18), import/export job monitor (30.3), notification and task monitor (30.1), scheduled reports (30.2), integration health (30.4), failed notification retry (30.5) | Watch background work | P3 |
| AD7 | **Security, Privacy & Audit** | Access/edit/export audit trails (26.8), audit log search and export (30.11), login history and suspicious access (23.11), unauthorized-access alerts (26.10), incident log (26.9), data access controls (26.1), encryption and storage status (26.2, 26.3), consent tracking (26.4), recruiter access controls (26.5), offer/salary confidentiality (26.6), retention and deletion policies (26.7, 26.12), data correction requests (26.11), privacy workflows (26.13) | Security and compliance | P2 |
| AD8 | **System Monitoring** | Storage usage (30.6), performance (30.7), error logs (30.8), data consistency checks (30.9), configuration history (30.10) | Operational health | P3 |

---

# 6. Work split into 3

## Dev 1: Foundation + Student + Alumni (32 pages)
**Hour 0 to 4 (blocks others):** project setup, Tailwind theme, router, auth store, `RoleGuard`, `PortalLayout`, the shared kit (DataTable, StatCard, StatusBadge, FormField, Modal, Tabs, Stepper, FileUploader, ApprovalPanel, ExportMenu), MSW mock setup, login page.
**Then:** X1 to X6, S1 to S19, A1 to A6, T26.
**Order:** X1 → S1 → S2 → S3 → S5 → S6 → S7 → S13 → rest.

## Dev 2: TPO Core + Recruiter + Faculty (30 pages)
**Starts Hour 4** (use plain Tailwind until the kit lands, then swap).
**Order:** T1 → T2/T3 → T5 → T8/T7 → T9 → T11 → T12 → T13 → T14 → T4 → T6/T10 → R1 to R9 → F1 to F7.
Dev 2 owns the **core placement flow**, so sync daily with Dev 1 on application and eligibility data shapes.

## Dev 3: TPO Part 2 + Management + Admin (32 pages)
**Starts Hour 4.** Many pages here are config-driven or form-heavy.
**Order:** T21 → T30 → AD2 → M1 → T32/M7 → T22 → T31 → T15/T16/T17 → T18 → AD3 → AD4 → AD7 → rest.
Dev 3 builds the **chart and report templates** (ReportPage, ChartCard variants), reused by T30, M2 to M6, F6.

### Cross-team contracts (agree in the first hour)
- Auth response: `{ token, user: { id, name, role, permissions[] } }`
- Standard list response: `{ data[], page, pageSize, total }`
- Status enums shared across everyone (application, offer, drive, document, job, company)
- Date/time format: ISO-8601 with timezone; Asia/Kolkata default

---

# 7. Hackathon timeline (adjust to your hours)

| Phase | What |
|---|---|
| **Hour 0 to 1** | Agree API contract, enums, mock data shapes, branching rules (feature branches, merge to `dev` several times a day) |
| **Hour 1 to 4** | Dev 1: foundation and kit. Dev 2 and 3: wireframe their P1 pages, create mock JSON |
| **Hour 4 to 14** | All P1 pages (the demo path) wired to mocks, then to real APIs as backend lands |
| **Hour 14 to 24** | P2 pages, polish, loading/empty/error states, responsive layout |
| **Final hours** | P3 pages (template-based), demo data, bug fixing, rehearse the demo story |

**If time runs out:** P3 pages can ship as a template page (table + filters + form with mock data). They still count as the screen exists and shows the option set.

---

# 8. Backend touchpoints (for coordination)
- **Express:** all CRUD and auth, RBAC middleware, file upload, notifications, report queries.
- **Python services:** resume parsing and AI matching (S14, T29), skill-gap and recommendations, coding-test execution (S10, T17), report/PDF generation if needed. Called through Express.
- **SQL:** students, companies, jobs, drives, applications, rounds, interviews, tests, training, internships, offers, notifications, documents, policies, audit logs, master data.

---

# 9. Coverage checklist (nothing missed)

| Master plan module | Built in |
|---|---|
| 1 Dashboard | T1, S1, F1, M1, AD1, R1, A1 |
| 2 Registration and profile | S2, T2, T3, T4 |
| 3 Resume and documents | S3, S4, T4, R5 |
| 4 Company and recruiter | T5, T6, R2, R9 |
| 5 Jobs | T7, T8, R3, S5, S6 |
| 6 Drives | T9, T10, S8, R4 |
| 7 Eligibility and policy | T11, S6, S18 |
| 8 Applications | S6, S7, T12, R5 |
| 9 Rounds and selection | T13, R6 |
| 10 Interviews | T14, S9, R7 |
| 11 Assessments | S10, T15, T16, T17, F5 |
| 12 Training | S11, T18, T19, F3 |
| 13 Internships | S12, T20, F7 |
| 14 Offers and joining | S13, T21, R8 |
| 15 Communication | T22, X4 |
| 16 Alumni | A1 to A6, S16, T26 |
| 17 Events | S17, T23 |
| 18 Reports and accreditation | T30, T31, M2 to M6, F6 |
| 19 Career guidance | S15, T24 |
| 20 Grievance and feedback | S19, T25, R9 |
| 21 AI assistance | S14, T29 |
| 22 Policy and rule engine | T32, M7, S18 |
| 23 Users and access | AD2, AD3, X1 to X3, X5 |
| 24 Master data | AD4 |
| 25 Integrations | AD5, AD6 |
| 26 Security, privacy, audit | AD7, X5 |
| 27 Finance | T27, M4 |
| 28 Documents and agreements | T28, T6 |
| 29 Mobile / student self-service | S1 to S19 built **responsive (mobile-first)** (29.14) |
| 30 System monitoring | AD1, AD6, AD7, AD8 |
| 31 Student Portal | S1 to S19 |
| 32 TPO Portal | T1 to T32 |
| 33 Recruiter Portal | R1 to R9 |
| 34 Faculty Portal | F1 to F7 |
| 35 Management Portal | M1 to M7 |
| 36 Alumni Portal | A1 to A6 |
| 37 Admin Portal | AD1 to AD8 |

**Cross-cutting rules every page must follow**
1. Mobile-first and accessible layout (M29.14): keyboard navigation, labels, contrast.
2. Hide actions the user lacks permission for (M23.4).
3. Sensitive data (salary, rejection reasons, counselling notes, contact details) shown only to authorised roles (M26.5, 26.6, 8.14, 19.13).
4. Every approval and edit shows who did it and when (audit, M7.15, 22.12, 26.8).
5. AI screens only suggest; there is no auto-reject (M21 note).
6. Finance screens track cell expenditure only (M27 note).
