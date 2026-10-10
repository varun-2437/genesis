import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { PortalLayout } from '@/layouts/PortalLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { RoleGuard } from '@/components/shared/RoleGuard'

// Dev 3 Extended TPO Components
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

// Dev 3 Management Components
import { ManagementDashboard } from '@/features/management/pages/ManagementDashboard'
import { DepartmentComparison } from '@/features/management/pages/DepartmentComparison'
import { RecruitmentSalaryStats } from '@/features/management/pages/RecruitmentSalaryStats'
import { BudgetExpenditure } from '@/features/management/pages/BudgetExpenditure'
import { CompanyEngagementTrends } from '@/features/management/pages/CompanyEngagementTrends'
import { AccreditationReports } from '@/features/management/pages/AccreditationReports'
import { PolicyApprovals } from '@/features/management/pages/PolicyApprovals'

// Dev 3 Admin Components
import { AdminSystemHealth } from '@/features/admin/pages/AdminSystemHealth'
import { UsersManagement } from '@/features/admin/pages/UsersManagement'
import { RolesPermissions } from '@/features/admin/pages/RolesPermissions'
import { MasterData } from '@/features/admin/pages/MasterData'
import { IntegrationsHub } from '@/features/admin/pages/IntegrationsHub'
import { SecurityAuditTrail } from '@/features/admin/pages/SecurityAuditTrail'

// Shared Pages (X1 - X6)
import { LoginPage } from '@/features/shared/pages/LoginPage'
import { ForgotPasswordPage } from '@/features/shared/pages/ForgotPasswordPage'
import { MfaVerificationPage } from '@/features/shared/pages/MfaVerificationPage'
import { NotificationCentrePage } from '@/features/shared/pages/NotificationCentrePage'
import { MyAccountPrivacyPage } from '@/features/shared/pages/MyAccountPrivacyPage'
import { NotFoundPage, UnauthorizedPage, ServerErrorPage } from '@/features/shared/pages/ErrorPages'

// Student Pages (S1 - S19)
import { StudentDashboard } from '@/features/student/pages/StudentDashboard'
import { PlacementProfilePage } from '@/features/student/pages/PlacementProfilePage'
import { MyResumesPage } from '@/features/student/pages/MyResumesPage'
import { MyDocumentsPage } from '@/features/student/pages/MyDocumentsPage'
import { JobBrowsePage } from '@/features/student/pages/JobBrowsePage'
import { JobDetailPage } from '@/features/student/pages/JobDetailPage'
import { PlacementDrivesPage } from '@/features/student/pages/PlacementDrivesPage'
import { MySchedulePage } from '@/features/student/pages/MySchedulePage'
import { AssessmentsPage } from '@/features/student/pages/AssessmentsPage'
import { TrainingPage } from '@/features/student/pages/TrainingPage'
import { MyInternshipsPage } from '@/features/student/pages/MyInternshipsPage'
import { MyOffersJoiningPage } from '@/features/student/pages/MyOffersJoiningPage'
import { AiPlacementAssistantPage } from '@/features/student/pages/AiPlacementAssistantPage'
import { CareerGuidancePage } from '@/features/student/pages/CareerGuidancePage'
import { AlumniConnectPage } from '@/features/student/pages/AlumniConnectPage'
import { PlacementEventsPage } from '@/features/student/pages/PlacementEventsPage'
import { PoliciesAnnouncementsPage } from '@/features/student/pages/PoliciesAnnouncementsPage'
import { GrievanceFeedbackPage } from '@/features/student/pages/GrievanceFeedbackPage'
import { MyApplicationsPage } from '@/features/student/pages/MyApplicationsPage'
import { InterviewRoomPage } from '@/features/student/pages/InterviewRoomPage'

// Alumni Pages (A1 - A6)
import { AlumniDashboardPage } from '@/features/alumni/pages/AlumniDashboardPage'
import { EmploymentProfilePage } from '@/features/alumni/pages/EmploymentProfilePage'
import { MentorshipManagementPage } from '@/features/alumni/pages/MentorshipManagementPage'
import { ReferralsNetworkingPage } from '@/features/alumni/pages/ReferralsNetworkingPage'
import { GuestLecturesSessionsPage } from '@/features/alumni/pages/GuestLecturesSessionsPage'
import { RecruitmentConnectionsPage } from '@/features/alumni/pages/RecruitmentConnectionsPage'

// TPO Core Ops (T1 - T14) - Dev 2
import { TpoDashboard } from '@/features/tpo/core/pages/TpoDashboard'
import { StudentsListPage } from '@/features/tpo/core/pages/StudentsListPage'
import { VerificationCentrePage } from '@/features/tpo/core/pages/VerificationCentrePage'
import { CompaniesListPage } from '@/features/tpo/core/pages/CompaniesListPage'
import { JobsListPage } from '@/features/tpo/core/pages/JobsListPage'
import { DrivesListPage } from '@/features/tpo/core/pages/DrivesListPage'
import { EligibilityRulesPage } from '@/features/tpo/core/pages/EligibilityRulesPage'
import { ApplicationsManagementPage } from '@/features/tpo/core/pages/ApplicationsManagementPage'
import { RoundsSelectionPipelinePage } from '@/features/tpo/core/pages/RoundsSelectionPipelinePage'
import { InterviewSchedulerPage } from '@/features/tpo/core/pages/InterviewSchedulerPage'
import { StudentProfile360View } from '@/features/tpo/core/components/StudentProfile360View'

// TPO Extended Ops (T26 Complete) - Dev 1
import { TpoAlumniManagementPage } from '@/features/tpo/extended/pages/TpoAlumniManagementPage'

// Recruiter Portal (R1 - R8) - Dev 2
import { RecruiterDashboardPage } from '@/features/recruiter/pages/RecruiterDashboardPage'
import { RecruiterProfilePage } from '@/features/recruiter/pages/RecruiterProfilePage'
import { RecruiterJobsPage } from '@/features/recruiter/pages/RecruiterJobsPage'
import { RecruiterDrivesPage } from '@/features/recruiter/pages/RecruiterDrivesPage'
import { RecruiterCandidatesPage } from '@/features/recruiter/pages/RecruiterCandidatesPage'
import { RecruiterInterviewsPage } from '@/features/recruiter/pages/RecruiterInterviewsPage'
import { RecruiterOffersPage } from '@/features/recruiter/pages/RecruiterOffersPage'
import { RecruiterFeedbackPage } from '@/features/recruiter/pages/RecruiterFeedbackPage'

// Faculty Portal (F1 - F7) - Dev 2
import { FacultyDashboardPage } from '@/features/faculty/pages/FacultyDashboardPage'
import { FacultyReadinessPage } from '@/features/faculty/pages/FacultyReadinessPage'
import { FacultyTrainingPage } from '@/features/faculty/pages/FacultyTrainingPage'
import { FacultyMentoringPage } from '@/features/faculty/pages/FacultyMentoringPage'
import { FacultyAssessmentPage } from '@/features/faculty/pages/FacultyAssessmentPage'
import { FacultyReportsPage } from '@/features/faculty/pages/FacultyReportsPage'
import { FacultyInternshipsPage } from '@/features/faculty/pages/FacultyInternshipsPage'
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

      // Student Portal (S1 - S19)
      { path: 'student/dashboard', element: <StudentDashboard /> },
      { path: 'student/profile', element: <PlacementProfilePage /> },
      { path: 'student/resumes', element: <MyResumesPage /> },
      { path: 'student/documents', element: <MyDocumentsPage /> },
      { path: 'student/jobs', element: <JobBrowsePage /> },
      { path: 'student/jobs/:jobId', element: <JobDetailPage /> },
      { path: 'student/applications', element: <MyApplicationsPage /> },
      { path: 'student/drives', element: <PlacementDrivesPage /> },
      { path: 'student/schedule', element: <MySchedulePage /> },
      { path: 'student/assessments', element: <AssessmentsPage /> },
      { path: 'student/training', element: <TrainingPage /> },
      { path: 'student/internships', element: <MyInternshipsPage /> },
      { path: 'student/offers', element: <MyOffersJoiningPage /> },
      { path: 'student/ai-assistant', element: <AiPlacementAssistantPage /> },
      { path: 'student/guidance', element: <CareerGuidancePage /> },
      { path: 'student/alumni-connect', element: <AlumniConnectPage /> },
      { path: 'student/events', element: <PlacementEventsPage /> },
      { path: 'student/policies', element: <PoliciesAnnouncementsPage /> },
      { path: 'student/grievance', element: <GrievanceFeedbackPage /> },
      { path: 'student/interview-room', element: <InterviewRoomPage /> },

      // Alumni Portal (A1 - A6)
      { path: 'alumni/dashboard', element: <AlumniDashboardPage /> },
      { path: 'alumni/profile', element: <EmploymentProfilePage /> },
      { path: 'alumni/mentorship', element: <MentorshipManagementPage /> },
      { path: 'alumni/referrals', element: <ReferralsNetworkingPage /> },
      { path: 'alumni/lectures', element: <GuestLecturesSessionsPage /> },
      { path: 'alumni/stories', element: <RecruitmentConnectionsPage /> },

      // TPO Portal Core (T1 - T14 Complete)
      { path: 'tpo/dashboard', element: <TpoDashboard /> },
      { path: 'tpo/students', element: <StudentsListPage /> },
      { path: 'tpo/students/:studentId', element: <StudentProfile360View /> },
      { path: 'tpo/verification', element: <VerificationCentrePage /> },
      { path: 'tpo/companies', element: <CompaniesListPage /> },
      { path: 'tpo/jobs', element: <JobsListPage /> },
      { path: 'tpo/drives', element: <DrivesListPage /> },
      { path: 'tpo/eligibility', element: <EligibilityRulesPage /> },
      { path: 'tpo/applications', element: <ApplicationsManagementPage /> },
      { path: 'tpo/rounds', element: <RoundsSelectionPipelinePage /> },
      { path: 'tpo/interviews', element: <InterviewSchedulerPage /> },
      { path: 'tpo/scheduler', element: <InterviewSchedulerPage /> },
      { path: 'tpo/alumni', element: <TpoAlumniManagementPage /> },
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
      { path: 'management/dashboard', element: <ManagementDashboard /> },
      { path: 'management/departments', element: <DepartmentComparison /> },
      { path: 'management/salary-stats', element: <RecruitmentSalaryStats /> },
      { path: 'management/budget', element: <BudgetExpenditure /> },
      { path: 'management/company-trends', element: <CompanyEngagementTrends /> },
      { path: 'management/accreditation', element: <AccreditationReports /> },
      { path: 'management/policy-approvals', element: <PolicyApprovals /> },

      // Admin Portal (Dev 3)
      { path: 'admin/dashboard', element: <AdminSystemHealth /> },
      { path: 'admin/users', element: <UsersManagement /> },
      { path: 'admin/roles', element: <RolesPermissions /> },
      { path: 'admin/master-data', element: <MasterData /> },
      { path: 'admin/integrations', element: <IntegrationsHub /> },
      { path: 'admin/audit', element: <SecurityAuditTrail /> },
    ],
  },

  // Error Routes
  { path: '/unauthorized', element: <UnauthorizedPage /> },
  { path: '/server-error', element: <ServerErrorPage /> },
  { path: '*', element: <NotFoundPage /> },
])
