import { create } from 'zustand'

export const useFacultyStore = create((set, get) => ({
  department: 'Computer Science and Engineering',
  hodName: 'Dr. S. R. Ramanathan',
  totalStudents: 180,
  placedStudents: 132,
  avgPackageLPA: 11.2,
  highestPackageLPA: 44.0,

  // Student Readiness Data (F2)
  studentsReadiness: [
    {
      id: 'fs-1',
      registerNumber: '22CS104',
      name: 'Aditya Vardhan',
      cgpa: 9.15,
      activeBacklogs: 0,
      readinessScore: 94,
      status: 'HIGH_READINESS',
      skillGaps: ['Advanced Cloud Native Deployments'],
      placementStatus: 'OFFER_IN_PROGRESS',
    },
    {
      id: 'fs-2',
      registerNumber: '22CS142',
      name: 'Pooja Sundar',
      cgpa: 8.82,
      activeBacklogs: 0,
      readinessScore: 90,
      status: 'HIGH_READINESS',
      skillGaps: ['Distributed System Design'],
      placementStatus: 'PLACED',
    },
    {
      id: 'fs-3',
      registerNumber: '22CS188',
      name: 'Karthik Raja',
      cgpa: 6.85,
      activeBacklogs: 1,
      readinessScore: 58,
      status: 'NEEDS_REMEDIAL',
      skillGaps: ['Data Structures', 'Mock Interview Practice', 'Aptitude Quant'],
      placementStatus: 'UNPLACED',
    },
    {
      id: 'fs-4',
      registerNumber: '22CS192',
      name: 'Nandini Swaminathan',
      cgpa: 7.42,
      activeBacklogs: 0,
      readinessScore: 76,
      status: 'MODERATE',
      skillGaps: ['System Architecture', 'Verbal Communication'],
      placementStatus: 'UNPLACED',
    },
  ],

  // Training Sessions & Attendance (F3)
  trainingBatches: [
    {
      id: 'tb-1',
      title: 'Advanced DSA & Dynamic Programming Masterclass',
      batch: 'CSE Final Year - Batch A',
      trainer: 'Er. Sandeep Reddy',
      date: '2026-10-10',
      totalEnrolled: 60,
      presentCount: 54,
    },
    {
      id: 'tb-2',
      title: 'Company Specific Preparation: Google & Microsoft',
      batch: 'CSE Dream Candidates Cohort',
      trainer: 'Prof. Rajesh Khanna',
      date: '2026-10-11',
      totalEnrolled: 45,
      presentCount: 42,
    },
  ],

  // Mentoring & Progress (F4)
  mentees: [
    {
      id: 'm-1',
      studentName: 'Karthik Raja',
      registerNumber: '22CS188',
      targetRole: 'Junior Frontend Developer',
      goals: 'Clear Math-III arrear, complete 50 LeetCode Mediums',
      progressPercentage: 65,
      lastInteractionDate: '2026-10-08',
      notes: 'Showed marked improvement in binary search trees. Advised to focus on mock interviews.',
    },
    {
      id: 'm-2',
      studentName: 'Nandini Swaminathan',
      registerNumber: '22CS192',
      targetRole: 'Data Analyst / Associate Software Engineer',
      goals: 'SQL Mastery, Python Pandas Case Studies',
      progressPercentage: 80,
      lastInteractionDate: '2026-10-09',
      notes: 'Completed 3 end-to-end analytics projects. Good communication.',
    },
  ],

  // Mock Assessment Performance (F5)
  assessmentScores: [
    { topic: 'Data Structures & Algorithms', avgScore: 82, totalAttempts: 175 },
    { topic: 'Aptitude & Quantitative Analysis', avgScore: 76, totalAttempts: 178 },
    { topic: 'Object-Oriented Programming (OOP)', avgScore: 88, totalAttempts: 172 },
    { topic: 'Database Systems & SQL', avgScore: 84, totalAttempts: 170 },
  ],

  // Internships Monitoring & NOC Approvals (F7)
  internships: [
    {
      id: 'int-noc-1',
      studentName: 'Aditya Vardhan',
      registerNumber: '22CS104',
      company: 'Google India',
      duration: '6 Months (Jan 2026 - Jun 2026)',
      stipend: '₹ 1,10,000 / month',
      status: 'APPROVED',
      facultyMentor: 'Prof. Rajesh Khanna',
      monthlyReportsSubmitted: 2,
    },
    {
      id: 'int-noc-2',
      studentName: 'Pooja Sundar',
      registerNumber: '22CS142',
      company: 'Zoho Corporation',
      duration: '4 Months (Jan 2026 - Apr 2026)',
      stipend: '₹ 25,000 / month',
      status: 'PENDING_APPROVAL',
      facultyMentor: 'Dr. Meenakshi S',
      monthlyReportsSubmitted: 0,
    },
    {
      id: 'int-noc-3',
      studentName: 'Karthik Raja',
      registerNumber: '22CS188',
      company: 'StartupByte Infotech',
      duration: '3 Months (Feb 2026 - Apr 2026)',
      stipend: '₹ 15,000 / month',
      status: 'PENDING_APPROVAL',
      facultyMentor: 'Prof. Sridhar V',
      monthlyReportsSubmitted: 0,
    },
  ],

  // Actions
  updateInternshipStatus: (id, status) => {
    set((state) => ({
      internships: state.internships.map((item) => (item.id === id ? { ...item, status } : item)),
    }))
  },

  updateMenteeNote: (id, notes, progressPercentage) => {
    set((state) => ({
      mentees: state.mentees.map((m) =>
        m.id === id ? { ...m, notes, progressPercentage, lastInteractionDate: new Date().toISOString().slice(0, 10) } : m
      ),
    }))
  },

  markAttendance: (batchId, presentCount) => {
    set((state) => ({
      trainingBatches: state.trainingBatches.map((b) =>
        b.id === batchId ? { ...b, presentCount } : b
      ),
    }))
  },
}))
