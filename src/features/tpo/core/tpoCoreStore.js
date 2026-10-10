import { create } from 'zustand'
import { 
  INITIAL_COMPANIES, 
  INITIAL_JOBS, 
  INITIAL_DRIVES, 
  INITIAL_STUDENTS, 
  INITIAL_APPLICATIONS 
} from './mockData'
import { COMPANY_STATUS, JOB_STATUS, APPLICATION_STATUS, VERIFICATION_STATUS } from '@/lib/constants'

export const useTpoCoreStore = create((set, get) => ({
  companies: INITIAL_COMPANIES,
  jobs: INITIAL_JOBS,
  drives: INITIAL_DRIVES,
  students: INITIAL_STUDENTS,
  applications: INITIAL_APPLICATIONS,

  // Company Actions
  addCompany: (newCompany) => {
    const company = {
      ...newCompany,
      id: `comp-${Date.now()}`,
      status: newCompany.status || COMPANY_STATUS.PROSPECT,
      activeDrivesCount: 0,
      totalHires: 0,
      avgPackageLPA: Number(newCompany.avgPackageLPA || 0),
      maxPackageLPA: Number(newCompany.maxPackageLPA || 0),
    }
    set((state) => ({ companies: [company, ...state.companies] }))
    return company
  },

  updateCompany: (id, updates) => {
    set((state) => ({
      companies: state.companies.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }))
  },

  // Job Actions
  addJob: (newJob) => {
    const job = {
      ...newJob,
      id: `job-${Date.now()}`,
      status: newJob.status || JOB_STATUS.PENDING_APPROVAL,
      applicantsCount: 0,
      shortlistedCount: 0,
      openDate: newJob.openDate || new Date().toISOString().slice(0, 10),
    }
    set((state) => ({ jobs: [job, ...state.jobs] }))
    return job
  },

  updateJobStatus: (id, status) => {
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, status } : j)),
    }))
  },

  // Drive Actions
  addDrive: (newDrive) => {
    const drive = {
      ...newDrive,
      id: `drv-${Date.now()}`,
      driveCode: `DRV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
      totalRegistered: 0,
      offersReleased: 0,
      currentRoundNumber: 1,
    }
    set((state) => ({ drives: [drive, ...state.drives] }))
    return drive
  },

  // Student Actions & Verification
  updateStudentVerification: (id, verificationStatus) => {
    set((state) => ({
      students: state.students.map((s) => (s.id === id ? { ...s, verificationStatus } : s)),
    }))
  },

  importStudents: (importedList) => {
    set((state) => {
      const existingRegs = new Set(state.students.map((s) => s.registerNumber))
      const deduplicated = importedList.filter((s) => !existingRegs.has(s.registerNumber))
      return {
        students: [...deduplicated, ...state.students],
      }
    })
  },

  // Application & Pipeline Actions
  updateApplicationStatus: (appId, status, notes = '') => {
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === appId
          ? {
              ...app,
              status,
              evaluatorNotes: notes || app.evaluatorNotes,
            }
          : app
      ),
    }))
  },

  bulkUpdateApplications: (appIds, status) => {
    const idSet = new Set(appIds)
    set((state) => ({
      applications: state.applications.map((app) =>
        idSet.has(app.id) ? { ...app, status } : app
      ),
    }))
  },
}))
