import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { MOCK_JOBS } from './JobBrowsePage'
import { Button, Select, StatusBadge, Modal } from '@/components/ui'
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  FileText, 
  ArrowLeft,
  Briefcase,
  AlertTriangle,
  Sparkles
} from 'lucide-react'

export function JobDetailPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const job = MOCK_JOBS.find((j) => j.id === jobId) || MOCK_JOBS[0]

  const [selectedResume, setSelectedResume] = useState('resume-1')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [applied, setApplied] = useState(false)

  const handleApply = () => {
    setConfirmOpen(false)
    setApplied(true)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <Link to="/student/jobs" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to all jobs
      </Link>

      {/* Main Job Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
              {job.category}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-3">{job.title}</h1>
            <p className="text-sm font-semibold text-slate-700 flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4 text-slate-400" /> {job.company} · {job.location}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-2xl font-black text-slate-900">{job.ctc}</p>
            <p className="text-xs text-slate-500 mt-0.5">{job.base}</p>
          </div>
        </div>

        {/* Live Eligibility Engine Status */}
        <div className={`p-5 rounded-xl border flex items-start gap-4 ${
          job.eligibility.eligible 
            ? 'bg-emerald-50/70 border-emerald-200' 
            : 'bg-rose-50/70 border-rose-200'
        }`}>
          <div className={`p-2 rounded-lg ${job.eligibility.eligible ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {job.eligibility.eligible ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          </div>
          <div className="flex-1 text-xs">
            <h4 className={`font-bold ${job.eligibility.eligible ? 'text-emerald-900' : 'text-rose-900'}`}>
              {job.eligibility.eligible ? 'You Meet All Placement Criteria' : 'Ineligible for this Drive'}
            </h4>
            <p className={`mt-0.5 ${job.eligibility.eligible ? 'text-emerald-700' : 'text-rose-700'}`}>
              {job.eligibility.eligible
                ? `Criteria verified: CGPA ≥ ${job.minCgpa} (Your CGPA: 8.82), 0 active arrears, eligible branch (CSE).`
                : job.eligibility.reasons.join(', ')}
            </p>
          </div>
        </div>

        {/* Job Description & Responsibilities */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Role Overview</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {job.description} As an Associate Cloud Engineer at {job.company}, you will participate in architecting scalable infrastructure, managing cloud pipelines, and collaborating with cross-functional global engineering squads.
          </p>
        </div>

        {/* Selection Process / Rounds */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Selection Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {job.rounds.map((round, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400">ROUND 0{idx + 1}</span>
                <p className="text-xs font-semibold text-slate-800 mt-1">{round}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Action Area */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Submit Application</h3>
          
          {applied ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-900">Application Submitted Successfully!</h4>
              <p className="text-xs text-emerald-700">
                Your application has been registered for {job.company}. You will receive round reminders under <strong>My Schedule</strong>.
              </p>
              <div className="pt-2">
                <Link to="/student/applications">
                  <Button size="sm" variant="secondary" className="text-xs">
                    View in My Applications
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex-1 max-w-sm">
                <Select
                  label="Select Resume Version to Attach"
                  value={selectedResume}
                  onChange={(e) => setSelectedResume(e.target.value)}
                >
                  <option value="resume-1">Varun_Murugesh_Cloud_SDE.pdf (Primary · 94% ATS Match)</option>
                  <option value="resume-2">Varun_Systems_DevOps.pdf (Version 1.2)</option>
                </Select>
              </div>

              <Button
                disabled={!job.eligibility.eligible}
                onClick={() => setConfirmOpen(true)}
                className="text-xs py-2.5 px-6 font-semibold"
              >
                Apply for Opportunity
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Campus Job Application"
        size="md"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleApply}>
              Confirm & Submit
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            You are applying for <strong>{job.title}</strong> at <strong>{job.company}</strong> with package <strong>{job.ctc}</strong>.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
            <strong>Policy Reminder:</strong> If shortlisted, attendance at all scheduled drive rounds is mandatory as per placement cell regulations.
          </div>
        </div>
      </Modal>
    </div>
  )
}
