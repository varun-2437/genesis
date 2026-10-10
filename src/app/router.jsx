import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PortalLayout } from '@/layouts/PortalLayout'
import { StudentDashboard } from '@/features/student/pages/StudentDashboard'
import { TpoDashboard } from '@/features/tpo/core/pages/TpoDashboard'

import { CompaniesListPage } from '@/features/tpo/core/pages/CompaniesListPage'
import { JobsListPage } from '@/features/tpo/core/pages/JobsListPage'
import { StudentsListPage } from '@/features/tpo/core/pages/StudentsListPage'
import { VerificationCentrePage } from '@/features/tpo/core/pages/VerificationCentrePage'
import { DrivesListPage } from '@/features/tpo/core/pages/DrivesListPage'
import { EligibilityRulesPage } from '@/features/tpo/core/pages/EligibilityRulesPage'
import { ApplicationsManagementPage } from '@/features/tpo/core/pages/ApplicationsManagementPage'
import { RoundsSelectionPipelinePage } from '@/features/tpo/core/pages/RoundsSelectionPipelinePage'
import { InterviewSchedulerPage } from '@/features/tpo/core/pages/InterviewSchedulerPage'

import { RecruiterDashboardPage } from '@/features/recruiter/pages/RecruiterDashboardPage'
import { RecruiterProfilePage } from '@/features/recruiter/pages/RecruiterProfilePage'
import { RecruiterJobsPage } from '@/features/recruiter/pages/RecruiterJobsPage'
import { RecruiterDrivesPage } from '@/features/recruiter/pages/RecruiterDrivesPage'
import { RecruiterCandidatesPage } from '@/features/recruiter/pages/RecruiterCandidatesPage'
import { RecruiterInterviewsPage } from '@/features/recruiter/pages/RecruiterInterviewsPage'
import { RecruiterOffersPage } from '@/features/recruiter/pages/RecruiterOffersPage'
import { RecruiterFeedbackPage } from '@/features/recruiter/pages/RecruiterFeedbackPage'

import { FacultyDashboardPage } from '@/features/faculty/pages/FacultyDashboardPage'
import { FacultyReadinessPage } from '@/features/faculty/pages/FacultyReadinessPage'
import { FacultyTrainingPage } from '@/features/faculty/pages/FacultyTrainingPage'
import { FacultyMentoringPage } from '@/features/faculty/pages/FacultyMentoringPage'
import { FacultyAssessmentPage } from '@/features/faculty/pages/FacultyAssessmentPage'
import { FacultyReportsPage } from '@/features/faculty/pages/FacultyReportsPage'
import { FacultyInternshipsPage } from '@/features/faculty/pages/FacultyInternshipsPage'

// Reusable placeholder component for pages being implemented across Dev 1, 2, 3
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
  {
    path: '/',
    element: <PortalLayout />,
    children: [
      { index: true, element: <Navigate to="/student/dashboard" replace /> },
      
      // Student Portal (Dev 1)
      { path: 'student/dashboard', element: <StudentDashboard /> },
      { path: 'student/profile', element: <PagePlaceholder title="S2: Placement Registration & Profile" portal="student" devOwner="Dev 1" /> },
      { path: 'student/resumes', element: <PagePlaceholder title="S3: My Resumes (Builder & Versions)" portal="student" devOwner="Dev 1" /> },
      { path: 'student/jobs', element: <PagePlaceholder title="S5: Jobs & Internships (Browse)" portal="student" devOwner="Dev 1" /> },
      { path: 'student/applications', element: <PagePlaceholder title="S7: My Applications Tracker" portal="student" devOwner="Dev 1" /> },
      { path: 'student/offers', element: <PagePlaceholder title="S13: My Offers & Joining" portal="student" devOwner="Dev 1" /> },

      // TPO Portal (Dev 2 Core + Dev 3 Extended)
      { path: 'tpo/dashboard', element: <TpoDashboard /> },
      { path: 'tpo/students', element: <StudentsListPage /> },
      { path: 'tpo/verification', element: <VerificationCentrePage /> },
      { path: 'tpo/companies', element: <CompaniesListPage /> },
      { path: 'tpo/jobs', element: <JobsListPage /> },
      { path: 'tpo/drives', element: <DrivesListPage /> },
      { path: 'tpo/eligibility', element: <EligibilityRulesPage /> },
      { path: 'tpo/applications', element: <ApplicationsManagementPage /> },
      { path: 'tpo/rounds', element: <RoundsSelectionPipelinePage /> },
      { path: 'tpo/interviews', element: <InterviewSchedulerPage /> },
      { path: 'tpo/reports', element: <PagePlaceholder title="T30: Reports, NAAC/NIRF & Analytics" portal="tpo" devOwner="Dev 3" /> },

      // Recruiter Portal (Dev 2)
      { path: 'recruiter/dashboard', element: <RecruiterDashboardPage /> },
      { path: 'recruiter/profile', element: <RecruiterProfilePage /> },
      { path: 'recruiter/jobs', element: <RecruiterJobsPage /> },
      { path: 'recruiter/drives', element: <RecruiterDrivesPage /> },
      { path: 'recruiter/candidates', element: <RecruiterCandidatesPage /> },
      { path: 'recruiter/interviews', element: <RecruiterInterviewsPage /> },
      { path: 'recruiter/offers', element: <RecruiterOffersPage /> },
      { path: 'recruiter/feedback', element: <RecruiterFeedbackPage /> },

      // Faculty Portal (Dev 2)
      { path: 'faculty/dashboard', element: <FacultyDashboardPage /> },
      { path: 'faculty/readiness', element: <FacultyReadinessPage /> },
      { path: 'faculty/training', element: <FacultyTrainingPage /> },
      { path: 'faculty/mentoring', element: <FacultyMentoringPage /> },
      { path: 'faculty/assessments', element: <FacultyAssessmentPage /> },
      { path: 'faculty/reports', element: <FacultyReportsPage /> },
      { path: 'faculty/internships', element: <FacultyInternshipsPage /> },

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
])
