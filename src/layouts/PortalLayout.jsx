import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROLES } from '@/lib/constants'
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  Award,
  Bell,
  LogOut,
  Sparkles
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
    { label: 'TPO Dashboard', path: '/tpo/dashboard' },
    { label: 'Students', path: '/tpo/students' },
    { label: 'Companies', path: '/tpo/companies' },
    { label: 'Drives & Jobs', path: '/tpo/drives' },
    { label: 'Applications', path: '/tpo/applications' },
    { label: 'Alumni Directory (T26)', path: '/tpo/alumni' },
    { label: 'Reports', path: '/tpo/reports' },
  ],
  [ROLES.RECRUITER]: [
    { label: 'Dashboard', path: '/recruiter/dashboard' },
    { label: 'Job Vacancies', path: '/recruiter/jobs' },
    { label: 'Candidates', path: '/recruiter/candidates' },
    { label: 'Interviews', path: '/recruiter/interviews' },
  ],
  [ROLES.FACULTY]: [
    { label: 'Department Stats', path: '/faculty/dashboard' },
    { label: 'Student Readiness', path: '/faculty/readiness' },
    { label: 'Internships', path: '/faculty/internships' },
  ],
  [ROLES.MANAGEMENT]: [
    { label: 'Overview', path: '/management/dashboard' },
    { label: 'Department Comparison', path: '/management/departments' },
    { label: 'Accreditation (NIRF/NAAC)', path: '/management/accreditation' },
  ],
  [ROLES.ALUMNI]: [
    { label: 'Dashboard', path: '/alumni/dashboard' },
    { label: 'Mentorship', path: '/alumni/mentorship' },
    { label: 'Referrals', path: '/alumni/referrals' },
  ],
  [ROLES.ADMIN]: [
    { label: 'System Overview', path: '/admin/dashboard' },
    { label: 'Users & Roles', path: '/admin/users' },
    { label: 'Master Data', path: '/admin/master-data' },
    { label: 'Audit Logs', path: '/admin/audit' },
  ],
}

export function PortalLayout() {
  const { user, setRole } = useAuthStore()
  const activeRole = user?.role || ROLES.STUDENT
  const navItems = PORTAL_NAV[activeRole] || []

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" /> GENESIS
            </h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">Placement Engine</p>
          </div>
        </div>

        {/* Role Switcher for Hackathon Testing */}
        <div className="px-4 py-3 bg-slate-800/60 border-b border-slate-800">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Active Role Switcher
          </label>
          <select
            value={activeRole}
            onChange={(e) => setRole(e.target.value)}
            className="w-full text-xs bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
        <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-semibold flex items-center justify-center text-xs">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
            <p className="text-[11px] text-slate-400 truncate capitalize">{activeRole}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="text-sm font-medium text-slate-600">
            Current Workspace: <span className="font-semibold text-slate-900 capitalize">{activeRole} Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
