import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PortalLayout } from '@/layouts/PortalLayout'
import { StudentDashboard } from '@/features/student/pages/StudentDashboard'
import { TpoDashboard } from '@/features/tpo/core/pages/TpoDashboard'
import { OffersManagement } from '@/features/tpo/extended/pages/OffersManagement'
import { ReportsAnalytics } from '@/features/tpo/extended/pages/ReportsAnalytics'
import { PolicyRuleEngine } from '@/features/tpo/extended/pages/PolicyRuleEngine'
import { QuestionBank } from '@/features/tpo/extended/pages/QuestionBank'
import { TestBuilderScheduling } from '@/features/tpo/extended/pages/TestBuilderScheduling'
import { ResultsEvaluationIntegrity } from '@/features/tpo/extended/pages/ResultsEvaluationIntegrity'
import { TrainingProgrammesCalendar } from '@/features/tpo/extended/pages/TrainingProgrammesCalendar'
import { CommunicationCentre } from '@/features/tpo/extended/pages/CommunicationCentre'
import { InternshipManagement } from '@/features/tpo/extended/pages/InternshipManagement'
import { EventsLogistics } from '@/features/tpo/extended/pages/EventsLogistics'
import { CareerGuidanceAdmin } from '@/features/tpo/extended/pages/CareerGuidanceAdmin'
import { GrievanceManagement } from '@/features/tpo/extended/pages/GrievanceManagement'
import { DocumentsAgreements } from '@/features/tpo/extended/pages/DocumentsAgreements'
import { AiInsightsReview } from '@/features/tpo/extended/pages/AiInsightsReview'
import { CustomReportBuilder } from '@/features/tpo/extended/pages/CustomReportBuilder'
import { ManagementDashboard } from '@/features/management/pages/ManagementDashboard'
import { DepartmentComparison } from '@/features/management/pages/DepartmentComparison'
import { RecruitmentSalaryStats } from '@/features/management/pages/RecruitmentSalaryStats'
import { BudgetExpenditure } from '@/features/management/pages/BudgetExpenditure'
import { CompanyEngagementTrends } from '@/features/management/pages/CompanyEngagementTrends'
import { AccreditationReports } from '@/features/management/pages/AccreditationReports'
import { PolicyApprovals } from '@/features/management/pages/PolicyApprovals'
import { AdminSystemHealth } from '@/features/admin/pages/AdminSystemHealth'
import { UsersManagement } from '@/features/admin/pages/UsersManagement'
import { RolesPermissions } from '@/features/admin/pages/RolesPermissions'
import { MasterData } from '@/features/admin/pages/MasterData'
import { IntegrationsHub } from '@/features/admin/pages/IntegrationsHub'
import { SecurityAuditTrail } from '@/features/admin/pages/SecurityAuditTrail'

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
      { path: 'tpo/students', element: <PagePlaceholder title="T2: Students List & 360 View" portal="tpo" devOwner="Dev 2" /> },
      { path: 'tpo/companies', element: <PagePlaceholder title="T5: Companies Onboarding & List" portal="tpo" devOwner="Dev 2" /> },
      { path: 'tpo/drives', element: <PagePlaceholder title="T9: Drives List & Scheduling" portal="tpo" devOwner="Dev 2" /> },
      { path: 'tpo/applications', element: <PagePlaceholder title="T12: Applications Management & Bulk Shortlist" portal="tpo" devOwner="Dev 2" /> },
      { path: 'tpo/offers', element: <OffersManagement /> },
      { path: 'tpo/internships', element: <InternshipManagement /> },
      { path: 'tpo/policies', element: <PolicyRuleEngine /> },
      { path: 'tpo/questions', element: <QuestionBank /> },
      { path: 'tpo/tests', element: <TestBuilderScheduling /> },
      { path: 'tpo/test-results', element: <ResultsEvaluationIntegrity /> },
      { path: 'tpo/training', element: <TrainingProgrammesCalendar /> },
      { path: 'tpo/events', element: <EventsLogistics /> },
      { path: 'tpo/guidance', element: <CareerGuidanceAdmin /> },
      { path: 'tpo/grievances', element: <GrievanceManagement /> },
      { path: 'tpo/documents', element: <DocumentsAgreements /> },
      { path: 'tpo/ai-insights', element: <AiInsightsReview /> },
      { path: 'tpo/comms', element: <CommunicationCentre /> },
      { path: 'tpo/reports', element: <ReportsAnalytics /> },
      { path: 'tpo/report-builder', element: <CustomReportBuilder /> },

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
      { path: 'management/dashboard', element: <ManagementDashboard /> },
      { path: 'management/departments', element: <DepartmentComparison /> },
      { path: 'management/salary-stats', element: <RecruitmentSalaryStats /> },
      { path: 'management/budget', element: <BudgetExpenditure /> },
      { path: 'management/company-trends', element: <CompanyEngagementTrends /> },
      { path: 'management/accreditation', element: <AccreditationReports /> },
      { path: 'management/policy-approvals', element: <PolicyApprovals /> },

      // Alumni Portal (Dev 1)
      { path: 'alumni/dashboard', element: <PagePlaceholder title="A1: Alumni Dashboard & Network" portal="alumni" devOwner="Dev 1" /> },
      { path: 'alumni/mentorship', element: <PagePlaceholder title="A3: Mentorship Requests & Sessions" portal="alumni" devOwner="Dev 1" /> },
      { path: 'alumni/referrals', element: <PagePlaceholder title="A4: Job Referrals & Openings" portal="alumni" devOwner="Dev 1" /> },

      // Admin Portal (Dev 3)
      { path: 'admin/dashboard', element: <AdminSystemHealth /> },
      { path: 'admin/users', element: <UsersManagement /> },
      { path: 'admin/roles', element: <RolesPermissions /> },
      { path: 'admin/master-data', element: <MasterData /> },
      { path: 'admin/integrations', element: <IntegrationsHub /> },
      { path: 'admin/audit', element: <SecurityAuditTrail /> },
    ],
  },
])
