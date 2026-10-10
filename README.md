# GENESIS Placement Management System

Enterprise Placement Management Platform for universities, students, TPO officers, recruiters, faculty, and administrators.

---

## 🚀 Quick Start for Developers

### 1. Clone the repository
```bash
git clone https://github.com/varun-2437/genesis.git
cd genesis
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 3-Developer Division of Work

For the complete architectural design and 94-page specification, see:
- 📖 [docs/TEAM-WORKFLOW.md](docs/TEAM-WORKFLOW.md) — Team guidelines, branching conventions, and contracts.
- 📋 [docs/placement-frontend-plan.md](docs/placement-frontend-plan.md) — Exhaustive 94-page feature mapping.

### Quick Responsibilities:
- **Dev 1**: Foundation & Shared Kit, Student Portal (`src/features/student/`), Alumni Portal (`src/features/alumni/`), Auth (`src/features/shared/`).
- **Dev 2**: TPO Core Operations (`src/features/tpo/core/`), Recruiter Portal (`src/features/recruiter/`), Faculty Portal (`src/features/faculty/`).
- **Dev 3**: TPO Extended Operations (`src/features/tpo/extended/`), Management Portal (`src/features/management/`), Admin Portal (`src/features/admin/`).

---

## 🌿 Git Branching Convention

- Work off the `dev` branch.
- Branch format: `feat/<dev>-<module>-<page>`
  - Example: `feat/dev1-student-profile`
  - Example: `feat/dev2-tpo-drives`
  - Example: `feat/dev3-management-reports`
