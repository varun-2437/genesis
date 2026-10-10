import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Tabs, StatusBadge, Button, ApprovalPanel } from '@/components/ui'
import { ArrowLeft, User, GraduationCap, FileText, CheckCircle2, Award, Briefcase, Clock, ShieldCheck } from 'lucide-react'

export function TpoStudentProfile360Page() {
  const { studentId } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const student = {
    id: studentId || '21CS104',
    name: 'Varun Murugesh',
    dept: 'Computer Science and Engineering',
    degree: 'B.Tech (2022 - 2026)',
    email: 'varun@student.genesis.edu',
    phone: '+91 98765 43210',
    cgpa: '8.82 / 10.0',
    backlogs: '0 Active (0 Historical)',
    tenth: '94.2%',
    twelfth: '92.6%',
    skills: 'React, Node.js, Python, PostgreSQL, Docker, Tailwind CSS',
    resume: 'Varun_Murugesh_Cloud_SDE.pdf (Approved)',
    applications: [
      { company: 'Google Cloud India', role: 'Associate Cloud Engineer', status: 'SHORTLISTED', round: 'Technical Interview 1' },
      { company: 'Oracle Corporation', role: 'Software Developer 1', status: 'IN_REVIEW', round: 'Coding Assessment' },
      { company: 'Cognizant', role: 'GenC Next Developer', status: 'SELECTED', round: 'Offer Released (₹ 6.75 LPA)' },
    ],
    status: 'VERIFIED',
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link to="/tpo/students" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800">
        <ArrowLeft className="w-4 h-4" /> Back to Student Roster
      </Link>

      {/* 360 Header Dossier */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
            VM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{student.name}</h2>
              <StatusBadge status={student.status} />
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Roll No: {student.id} · {student.dept}</p>
            <p className="text-xs text-indigo-600 font-semibold mt-1">Primary CGPA: {student.cgpa} · {student.backlogs}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="text-xs"
            onClick={() => alert('Exporting full candidate dossier with verified marks and PDF resumes.')}
          >
            Export Dossier (PDF)
          </Button>
          <Button size="sm" className="text-xs">
            Direct Drive Invite
          </Button>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 'overview', label: 'Academic & Personal 360°', icon: GraduationCap },
          { id: 'applications', label: 'Active Applications & Offers', icon: Briefcase },
          { id: 'verification', label: 'Verification & Review Panel', icon: ShieldCheck },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'overview' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Academic & Skills Performance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block">10th Secondary:</span>
              <span className="font-bold text-slate-800">{student.tenth}</span>
            </div>
            <div>
              <span className="text-slate-400 block">12th Higher Secondary:</span>
              <span className="font-bold text-slate-800">{student.twelfth}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Official Resume:</span>
              <span className="font-bold text-indigo-600">{student.resume}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Technical Competency Profile</h4>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.split(', ').map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Application Lifecycle History</h3>
          <div className="space-y-3">
            {student.applications.map((app, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{app.company}</h4>
                  <p className="text-xs text-slate-500">{app.role} · {app.round}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'verification' && (
        <div className="space-y-4">
          <ApprovalPanel
            title="TPO Placement Certification & Undertaking Review"
            onApprove={(remarks) => alert(`Candidate verified with remarks: ${remarks}`)}
            onReject={(remarks) => alert(`Verification flagged with remarks: ${remarks}`)}
            onRequestCorrection={(remarks) => alert(`Correction requested: ${remarks}`)}
          />
        </div>
      )}
    </div>
  )
}
