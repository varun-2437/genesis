import { create } from 'zustand'

export const useRecruiterStore = create((set, get) => ({
  companyProfile: {
    name: 'Google India',
    code: 'GOOG',
    tier: 'Tier 1 (Dream)',
    industry: 'Software & Cloud',
    hq: 'Bengaluru, Karnataka',
    website: 'https://careers.google.com',
    leadContact: 'Ananya Sharma',
    leadEmail: 'ananya.s@google.recruitment.in',
    team: [
      { id: 'tm-1', name: 'Satish Rao', role: 'Staff SDE / Tech Panelist', email: 'satish.rao@google.com' },
      { id: 'tm-2', name: 'Priya Narayanan', role: 'Engineering Manager', email: 'priya.n@google.com' },
      { id: 'tm-3', name: 'Kabir Varma', role: 'Campus HR Lead', email: 'kabir.v@google.com' },
    ],
    mouStatus: 'Signed & Active (Valid till 2027)',
  },

  vacancies: [
    {
      id: 'rv-1',
      title: 'Software Development Engineer - Campus 2026',
      type: 'Full-time',
      status: 'PUBLISHED',
      ctc: '32.5 LPA',
      openings: 15,
      deadline: '2026-10-25',
      applicationsCount: 142,
    },
    {
      id: 'rv-2',
      title: 'Associate Cloud Engineer (Intern to FTE)',
      type: 'Internship + Full-time',
      status: 'PENDING_APPROVAL',
      ctc: '24.0 LPA',
      openings: 8,
      deadline: '2026-11-10',
      applicationsCount: 0,
    },
  ],

  driveRequests: [
    {
      id: 'rdr-1',
      title: 'Google Fall 2026 Campus Drive',
      preferredDates: '2026-10-12 to 2026-10-16',
      mode: 'On-Campus',
      status: 'APPROVED',
      pptRequired: true,
      labsRequired: '120 Systems with high-speed proctoring',
      coordinatorAssigned: 'Prof. Rajesh Khanna (CSE)',
    },
  ],

  candidates: [
    {
      id: 'rc-1',
      studentId: 'stu-1',
      name: 'Aditya Vardhan',
      registerNumber: '22CS104',
      department: 'Computer Science and Engineering',
      cgpa: 9.15,
      currentRound: 'Technical Interview 1',
      roundScore: 94,
      aiMatchScore: 96,
      status: 'SHORTLISTED',
      resumeUrl: '/resumes/22cs104_aditya.pdf',
      interviewSlot: '2026-10-14 10:30 AM',
      scorecard: {
        codingScore: 95,
        systemDesignScore: 90,
        communicationScore: 92,
        feedback: 'Superb grasp of concurrency and distributed caching.',
      },
    },
    {
      id: 'rc-2',
      studentId: 'stu-2',
      name: 'Pooja Sundar',
      registerNumber: '22CS142',
      department: 'Computer Science and Engineering',
      cgpa: 8.82,
      currentRound: 'Technical Interview 1',
      roundScore: 88,
      aiMatchScore: 91,
      status: 'SHORTLISTED',
      resumeUrl: '/resumes/22cs142_pooja.pdf',
      interviewSlot: '2026-10-14 11:30 AM',
      scorecard: {
        codingScore: 88,
        systemDesignScore: 85,
        communicationScore: 90,
        feedback: 'Very solid backend fundamentals in Python and Docker.',
      },
    },
  ],

  offers: [
    {
      id: 'off-1',
      candidateId: 'rc-1',
      candidateName: 'Aditya Vardhan',
      role: 'Software Development Engineer - Campus 2026',
      ctcFixed: '24.0 LPA',
      ctcVariable: '8.5 LPA',
      totalCtc: '32.5 LPA',
      issueDate: '2026-10-15',
      expiryDate: '2026-10-25',
      status: 'EXTENDED',
    },
  ],

  feedbackLog: [
    {
      id: 'fb-1',
      year: '2025-2026',
      driveName: 'Google Campus Drive',
      rating: 5,
      comments: 'Exceptional candidate preparation in data structures and prompt coordination by placement cell.',
      submittedAt: '2026-04-12',
    },
  ],

  // Actions
  addVacancy: (vacancy) => {
    const newV = {
      ...vacancy,
      id: `rv-${Date.now()}`,
      status: 'PENDING_APPROVAL',
      applicationsCount: 0,
    }
    set((state) => ({ vacancies: [newV, ...state.vacancies] }))
    return newV
  },

  addDriveRequest: (request) => {
    const newR = {
      ...request,
      id: `rdr-${Date.now()}`,
      status: 'SUBMITTED',
    }
    set((state) => ({ driveRequests: [newR, ...state.driveRequests] }))
    return newR
  },

  updateCandidateScorecard: (candidateId, scorecard) => {
    set((state) => ({
      candidates: state.candidates.map((c) =>
        c.id === candidateId ? { ...c, scorecard, roundScore: scorecard.codingScore } : c
      ),
    }))
  },

  releaseOffer: (offerData) => {
    const newOff = {
      ...offerData,
      id: `off-${Date.now()}`,
      issueDate: new Date().toISOString().slice(0, 10),
      status: 'EXTENDED',
    }
    set((state) => ({
      offers: [newOff, ...state.offers],
      candidates: state.candidates.map((c) =>
        c.id === offerData.candidateId ? { ...c, status: 'OFFER_EXTENDED' } : c
      ),
    }))
    return newOff
  },

  addFeedback: (fb) => {
    const newFb = {
      ...fb,
      id: `fb-${Date.now()}`,
      submittedAt: new Date().toISOString().slice(0, 10),
    }
    set((state) => ({ feedbackLog: [newFb, ...state.feedbackLog] }))
    return newFb
  },
}))
