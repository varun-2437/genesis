import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROLES } from '@/lib/constants'
import { ThemeToggle } from '@/components/ThemeProvider'
import { 
  Building2, 
  Bell, 
  Menu, 
  X,
  Search,
  CheckCircle2
} from 'lucide-react'

const PORTAL_NAV = {
  [ROLES.STUDENT]: [
    { label: 'Dashboard', path: '/student/dashboard' },
    { label: 'My Profile', path: '/student/profile' },
    { label: 'Resumes', path: '/student/resumes' },
    { label: 'Documents', path: '/student/documents' },
    { label: 'Jobs & Openings', path: '/student/jobs' },
    { label: 'Placement Drives', path: '/student/drives' },
    { label: 'My Schedule', path: '/student/schedule' },
    { label: 'Assessments', path: '/student/assessments' },
    { label: 'Training Hub', path: '/student/training' },
    { label: 'Internships', path: '/student/internships' },
    { label: 'My Applications', path: '/student/applications' },
    { label: 'Offers & Joining', path: '/student/offers' },
    { label: 'AI Assistant', path: '/student/ai-assistant' },
    { label: 'Career Guidance', path: '/student/guidance' },
    { label: 'Alumni Connect', path: '/student/alumni-connect' },
    { label: 'Campus Events', path: '/student/events' },
    { label: 'Policies & Rules', path: '/student/policies' },
    { label: 'Grievance Desk', path: '/student/grievance' },
    { label: 'Live Interview Room', path: '/student/interview-room' },
  ],
  [ROLES.ALUMNI]: [
    { label: 'Dashboard', path: '/alumni/dashboard' },
    { label: 'Employment Profile', path: '/alumni/profile' },
    { label: 'Mentorship', path: '/alumni/mentorship' },
    { label: 'Referrals & Jobs', path: '/alumni/referrals' },
    { label: 'Guest Lectures', path: '/alumni/lectures' },
    { label: 'Success Stories', path: '/alumni/stories' },
  ],
  [ROLES.TPO]: [
    { label: 'Dashboard', path: '/tpo/dashboard' },
    { label: 'Students', path: '/tpo/students' },
    { label: 'Verification Centre', path: '/tpo/verification' },
    { label: 'Companies', path: '/tpo/companies' },
    { label: 'Job Postings', path: '/tpo/jobs' },
    { label: 'Campus Drives', path: '/tpo/drives' },
    { label: 'Eligibility Rules', path: '/tpo/eligibility' },
    { label: 'Applications', path: '/tpo/applications' },
    { label: 'Rounds Pipeline', path: '/tpo/rounds' },
    { label: 'Interview Scheduler', path: '/tpo/interviews' },
    { label: 'Question Bank', path: '/tpo/questions' },
    { label: 'Test Builder', path: '/tpo/tests' },
    { label: 'Test Results', path: '/tpo/test-results' },
    { label: 'Training Calendar', path: '/tpo/training' },
    { label: 'Internships & PPO', path: '/tpo/internships' },
    { label: 'Offers & Joining', path: '/tpo/offers' },
    { label: 'Comms Centre', path: '/tpo/comms' },
    { label: 'Campus Events', path: '/tpo/events' },
    { label: 'Career Counselling', path: '/tpo/guidance' },
    { label: 'Grievance Redressal', path: '/tpo/grievances' },
    { label: 'Alumni Directory', path: '/tpo/alumni' },
    { label: 'Corporate MoUs & Docs', path: '/tpo/documents' },
    { label: 'AI Review Queue', path: '/tpo/ai-insights' },
    { label: 'Reports & Analytics', path: '/tpo/reports' },
    { label: 'Report Builder', path: '/tpo/report-builder' },
    { label: 'Policy Engine', path: '/tpo/policies' },
  ],
  [ROLES.RECRUITER]: [
    { label: 'Dashboard', path: '/recruiter/dashboard' },
    { label: 'Company Profile & Team', path: '/recruiter/profile' },
    { label: 'Job Vacancies', path: '/recruiter/jobs' },
    { label: 'Campus Drives', path: '/recruiter/drives' },
    { label: 'Candidate Pool & Resumes', path: '/recruiter/candidates' },
    { label: 'Interviews & Scorecards', path: '/recruiter/interviews' },
    { label: 'Offers & Final Selection', path: '/recruiter/offers' },
    { label: 'Hiring History & Feedback', path: '/recruiter/feedback' },
  ],
  [ROLES.FACULTY]: [
    { label: 'Department Dashboard', path: '/faculty/dashboard' },
    { label: 'Student Readiness Radar', path: '/faculty/readiness' },
    { label: 'Training & Attendance', path: '/faculty/training' },
    { label: 'Mentoring & Progress', path: '/faculty/mentoring' },
    { label: 'Assessment Performance', path: '/faculty/assessments' },
    { label: 'Department Reports (NIRF)', path: '/faculty/reports' },
    { label: 'Internship Approvals (NOC)', path: '/faculty/internships' },
  ],
  [ROLES.MANAGEMENT]: [
    { label: 'Overview (M1)', path: '/management/dashboard' },
    { label: 'Dept Comparison (M2)', path: '/management/departments' },
    { label: 'Salary Stats (M3)', path: '/management/salary-stats' },
    { label: 'Budget & Expenditure (M4)', path: '/management/budget' },
    { label: 'Company Trends (M5)', path: '/management/company-trends' },
    { label: 'Accreditation Dossier (M6)', path: '/management/accreditation' },
    { label: 'Policy Approvals (M7)', path: '/management/policy-approvals' },
  ],
  [ROLES.ALUMNI]: [
    { label: 'Dashboard', path: '/alumni/dashboard' },
    { label: 'Mentorship', path: '/alumni/mentorship' },
    { label: 'Referrals', path: '/alumni/referrals' },
  ],
  [ROLES.ADMIN]: [
    { label: 'System Health (AD1/8)', path: '/admin/dashboard' },
    { label: 'Users & Roles (AD2)', path: '/admin/users' },
    { label: 'Permissions Matrix (AD3)', path: '/admin/roles' },
    { label: 'Master Data (AD4)', path: '/admin/master-data' },
    { label: 'Integrations Hub (AD5/6)', path: '/admin/integrations' },
    { label: 'Audit Logs (AD7)', path: '/admin/audit' },
  ],
}

export function PortalLayout() {
  const { user, setRole } = useAuthStore()
  const activeRole = user?.role || ROLES.STUDENT
  const navItems = PORTAL_NAV[activeRole] || []
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-canvas text-fg">
      {/* Skip to Main Content Link for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-accent focus:text-accent-fg focus:rounded"
      >
        Skip to main content
      </a>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar: 232px wide, bg-surface, right border */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[232px] bg-surface border-r border-line flex flex-col shrink-0 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-14 px-5 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-accent text-accent-fg flex items-center justify-center font-bold text-xs">
              P
            </div>
            <div>
              <span className="text-[15px] font-semibold tracking-tight text-fg block leading-tight">
                PlaceHub
              </span>
              <span className="text-[10px] text-fg-muted uppercase tracking-wider block font-medium">
                Enterprise Placement
              </span>
            </div>
          </div>
          <button
            type="button"
            className="lg:hidden p-1 text-fg-muted hover:text-fg rounded"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>

        {/* Role Switcher */}
        <div className="px-3 py-2.5 bg-surface-2 border-b border-line">
          <label className="text-[10px] font-semibold text-fg-muted uppercase tracking-wider block mb-1">
            Active Role
          </label>
          <select
            value={activeRole}
            onChange={(e) => setRole(e.target.value)}
            className="w-full text-xs bg-surface border border-line-strong text-fg rounded px-2 py-1 focus:border-accent outline-none cursor-pointer"
          >
            <option value={ROLES.STUDENT}>Student Portal</option>
            <option value={ROLES.TPO}>TPO Staff Portal</option>
            <option value={ROLES.RECRUITER}>Company Recruiter</option>
            <option value={ROLES.FACULTY}>Faculty / HOD</option>
            <option value={ROLES.MANAGEMENT}>Management / Principal</option>
            <option value={ROLES.ALUMNI}>Alumni Portal</option>
            <option value={ROLES.ADMIN}>System Admin</option>
          </select>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 flex-1 space-y-0.5 overflow-y-auto">
          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
            Menu
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Card */}
        <div className="p-3.5 border-t border-line flex items-center gap-2.5 bg-surface-2/40">
          <div className="w-7 h-7 rounded-full bg-surface-2 border border-line-strong text-fg font-semibold flex items-center justify-center text-xs">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-fg truncate leading-tight">{user?.name || 'Authorized User'}</p>
            <p className="text-[11px] text-fg-muted truncate capitalize">{activeRole}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar: 56px high, bg-surface, bottom border */}
        <header className="h-14 bg-surface border-b border-line px-5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-1.5 text-fg-muted hover:text-fg hover:bg-surface-2 rounded"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} strokeWidth={1.75} />
            </button>
            <div className="text-xs text-fg-muted font-medium flex items-center gap-1.5">
              <span>Workspace:</span>
              <span className="font-semibold text-fg capitalize">{activeRole}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Notifications"
              className="p-2 text-fg-muted hover:text-fg hover:bg-surface-2 rounded border border-line bg-surface relative transition-colors"
            >
              <Bell size={16} strokeWidth={1.75} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main id="main-content" tabIndex={-1} className="p-4 md:p-6 lg:p-7 max-w-[1200px] w-full mx-auto flex-1 overflow-y-auto outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
