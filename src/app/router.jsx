import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PortalLayout } from '@/layouts/PortalLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { RoleGuard } from '@/components/shared/RoleGuard'

// Shared Pages (X1 - X6)
import { LoginPage } from '@/features/shared/pages/LoginPage'
import { ForgotPasswordPage } from '@/features/shared/pages/ForgotPasswordPage'
import { MfaVerificationPage } from '@/features/shared/pages/MfaVerificationPage'
import { NotificationCentrePage } from '@/features/shared/pages/NotificationCentrePage'
import { MyAccountPrivacyPage } from '@/features/shared/pages/MyAccountPrivacyPage'
import { NotFoundPage, UnauthorizedPage, ServerErrorPage } from '@/features/shared/pages/ErrorPages'

// Core Student Pages (Phase 3: S1, S2, S3, S5, S6, S7, S13)
import { StudentDashboard } from '@/features/student/pages/StudentDashboard'
import { PlacementProfilePage } from '@/features/student/pages/PlacementProfilePage'
import { MyResumesPage } from '@/features/student/pages/MyResumesPage'
import { JobBrowsePage } from '@/features/student/pages/JobBrowsePage'
import { JobDetailPage } from '@/features/student/pages/JobDetailPage'
import { MyApplicationsPage } from '@/features/student/pages/MyApplicationsPage'
import { MyOffersJoiningPage } from '@/features/student/pages/MyOffersJoiningPage'

// Phase 4 Student Pages (S4, S8, S9, S10, S11, S14, S18)
import { MyDocumentsPage } from '@/features/student/pages/MyDocumentsPage'
import { PlacementDrivesPage } from '@/features/student/pages/PlacementDrivesPage'
import { MySchedulePage } from '@/features/student/pages/MySchedulePage'
import { AssessmentsPage } from '@/features/student/pages/AssessmentsPage'
import { TrainingPage } from '@/features/student/pages/TrainingPage'
import { AiPlacementAssistantPage } from '@/features/student/pages/AiPlacementAssistantPage'
import { PoliciesAnnouncementsPage } from '@/features/student/pages/PoliciesAnnouncementsPage'

// TPO Dashboards
import { TpoDashboard } from '@/features/tpo/core/pages/TpoDashboard'

// Reusable placeholder component for other pages
function PagePlaceholder({ title, portal, devOwner }) {
  return (
    <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-2xl mx-auto my-12 shadow-sm space-y-4">
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
        Assigned to: {devOwner}
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500">
        This screen is mapped to the {portal} specification in <code className="text-indigo-600 bg-slate-50 px-1 py-0.5 rounded">placement-frontend-plan.md</code>.
      </p>
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 text-left">
        <strong>How to implement:</strong> Create page component in <code className="text-indigo-600">src/features/{portal.toLowerCase()}/pages/</code>, attach API service, and plug into router.
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  // Authentication Routes (AuthLayout)
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/mfa', element: <MfaVerificationPage /> },
    ],
  },

  // Main Portals (PortalLayout + RoleGuard)
  {
    path: '/',
    element: (
      <RoleGuard>
        <PortalLayout />
      </RoleGuard>
    ),
    children: [
      { index: true, element: <Navigate to="/student/dashboard" replace /> },
      
      // Shared in-app pages (X4, X5)
      { path: 'notifications', element: <NotificationCentrePage /> },
      { path: 'account', element: <MyAccountPrivacyPage /> },

      // Student Portal (Phase 3 + Phase 4 Complete)
      { path: 'student/dashboard', element: <StudentDashboard /> },
      { path: 'student/profile', element: <PlacementProfilePage /> },
      { path: 'student/resumes', element: <MyResumesPage /> },
      { path: 'student/documents', element: <MyDocumentsPage /> },
      { path: 'student/jobs', element: <JobBrowsePage /> },
      { path: 'student/jobs/:jobId', element: <JobDetailPage /> },
      { path: 'student/drives', element: <PlacementDrivesPage /> },
      { path: 'student/schedule', element: <MySchedulePage /> },
      { path: 'student/assessments', element: <AssessmentsPage /> },
      { path: 'student/training', element: <TrainingPage /> },
      { path: 'student/applications', element: <MyApplicationsPage /> },
      { path: 'student/offers', element: <MyOffersJoiningPage /> },
      { path: 'student/ai-assistant', element: <AiPlacementAssistantPage /> },
      { path: 'student/policies', element: <PoliciesAnnouncementsPage /> },

      // S12, S15, S16, S17, S19 mapped to Phase 5
      { path: 'student/internships', element: <PagePlaceholder title="S12: My Internships Tracker" portal="student" devOwner="Dev 1" /> },
      { path: 'student/guidance', element: <PagePlaceholder title="S15: Career Guidance & Counselling" portal="student" devOwner="Dev 1" /> },
      { path: 'student/alumni-connect', element: <PagePlaceholder title="S16: Alumni Connect & Mentorship" portal="student" devOwner="Dev 1" /> },
      { path: 'student/events', element: <PagePlaceholder title="S17: Placement Events & Seminars" portal="student" devOwner="Dev 1" /> },
      { path: 'student/grievance', element: <PagePlaceholder title="S19: Grievance & Student Feedback" portal="student" devOwner="Dev 1" /> },

      // TPO Portal (Dev 2 Core + Dev 3 Extended)
      { path: 'tpo/dashboard', element: <TpoDashboard /> },
      { path: 'tpo/students', element: <PagePlaceholder title="T2: Students List & 360 View" portal="tpo" devOwner="Dev 2" /> },
      { path: 'tpo/companies', element: <PagePlaceholder title="T5: Companies Onboarding & List" portal="tpo" devOwner="Dev 2" /> },
      { path: 'tpo/drives', element: <PagePlaceholder title="T9: Drives List & Scheduling" portal="tpo" devOwner="Dev 2" /> },
      { path: 'tpo/applications', element: <PagePlaceholder title="T12: Applications Management & Bulk Shortlist" portal="tpo" devOwner="Dev 2" /> },
      { path: 'tpo/reports', element: <PagePlaceholder title="T30: Reports, NAAC/NIRF & Analytics" portal="tpo" devOwner="Dev 3" /> },

      // Recruiter Portal (Dev 2)
      { path: 'recruiter/dashboard', element: <PagePlaceholder title="R1: Recruiter Dashboard" portal="recruiter" devOwner="Dev 2" /> },
      { path: 'recruiter/jobs', element: <PagePlaceholder title="R3: Job Vacancies & Applications" portal="recruiter" devOwner="Dev 2" /> },
      { path: 'recruiter/candidates', element: <PagePlaceholder title="R5: Eligible Candidates & Resumes" portal="recruiter" devOwner="Dev 2" /> },
      { path: 'recruiter/interviews', element: <PagePlaceholder title="R7: Interviews & Evaluation" portal="recruiter" devOwner="Dev 2" /> },

      // Faculty Portal (Dev 2)
      { path: 'faculty/dashboard', element: <PagePlaceholder title="F1: Department Placement Overview" portal="faculty" devOwner="Dev 2" /> },
      { path: 'faculty/readiness', element: <PagePlaceholder title="F2: Student Readiness & Skill Gap" portal="faculty" devOwner="Dev 2" /> },
      { path: 'faculty/internships', element: <PagePlaceholder title="F7: Internship Monitoring & Approval" portal="faculty" devOwner="Dev 2" /> },

      // Management Portal (Dev 3)
      { path: 'management/dashboard', element: <PagePlaceholder title="M1: Institution-wide Placement Metrics" portal="management" devOwner="Dev 3" /> },
      { path: 'management/departments', element: <PagePlaceholder title="M2: Department & Program Comparison" portal="management" devOwner="Dev 3" /> },
      { path: 'management/accreditation', element: <PagePlaceholder title="M6: Accreditation Reports (NIRF / NBA)" portal="management" devOwner="Dev 3" /> },

      // Alumni Portal (Dev 1)
      { path: 'alumni/dashboard', element: <PagePlaceholder title="A1: Alumni Dashboard & Network" portal="alumni" devOwner="Dev 1" /> },
      { path: 'alumni/mentorship', element: <PagePlaceholder title="A3: Mentorship Requests & Sessions" portal="alumni" devOwner="Dev 1" /> },
      { path: 'alumni/referrals', element: <PagePlaceholder title="A4: Job Referrals & Openings" portal="alumni" devOwner="Dev 1" /> },

      // Admin Portal (Dev 3)
      { path: 'admin/dashboard', element: <PagePlaceholder title="AD1: System Health & Monitoring" portal="admin" devOwner="Dev 3" /> },
      { path: 'admin/users', element: <PagePlaceholder title="AD2: User Accounts & Roles" portal="admin" devOwner="Dev 3" /> },
      { path: 'admin/master-data', element: <PagePlaceholder title="AD4: Master Data Configurations" portal="admin" devOwner="Dev 3" /> },
      { path: 'admin/audit', element: <PagePlaceholder title="AD7: Security, Privacy & Audit Trail" portal="admin" devOwner="Dev 3" /> },
    ],
  },

  // Error Routes
  { path: '/unauthorized', element: <UnauthorizedPage /> },
  { path: '/server-error', element: <ServerErrorPage /> },
  { path: '*', element: <NotFoundPage /> },
])
