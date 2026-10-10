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
      <Link to="/student/jobs" className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-muted hover:text-fg transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to all jobs
      </Link>

      {/* Main Job Card */}
      <div className="card p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-line">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent-soft px-2.5 py-1 rounded-[4px] border border-accent/20">
              {job.category}
            </span>
            <h1 className="text-2xl font-semibold text-fg tracking-tight mt-3">{job.title}</h1>
            <p className="text-sm font-medium text-fg-muted flex items-center gap-2 mt-1">
              <Building2 className="w-4 h-4 text-fg-subtle" /> {job.company} · {job.location}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-2xl font-bold text-fg tabular-nums">{job.ctc}</p>
            <p className="text-xs text-fg-muted mt-0.5">{job.base}</p>
          </div>
        </div>

        {/* Live Eligibility Engine Status */}
        <div className={`p-4 rounded-[6px] border flex items-start gap-4 ${
          job.eligibility.eligible 
            ? 'bg-success-soft border-success/20 text-success' 
            : 'bg-danger-soft border-danger/20 text-danger'
        }`}>
          <div className="p-2 rounded bg-surface border border-line shrink-0">
            {job.eligibility.eligible ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-danger" />}
          </div>
          <div className="flex-1 text-xs">
            <h4 className="font-semibold text-fg">
              {job.eligibility.eligible ? 'You Meet All Placement Criteria' : 'Ineligible for this Drive'}
            </h4>
            <p className="mt-0.5 text-fg-muted">
              {job.eligibility.eligible
                ? `Criteria verified: CGPA ≥ ${job.minCgpa} (Your CGPA: 8.82), 0 active arrears, eligible branch (CSE).`
                : job.eligibility.reasons.join(', ')}
            </p>
          </div>
        </div>

        {/* Job Description & Responsibilities */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg">Role Overview</h3>
          <p className="text-xs text-fg-muted leading-relaxed">
            {job.description} As an Associate Cloud Engineer at {job.company}, you will participate in architecting scalable infrastructure, managing cloud pipelines, and collaborating with cross-functional global engineering squads.
          </p>
        </div>

        {/* Selection Process / Rounds */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg">Selection Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {job.rounds.map((round, idx) => (
              <div key={idx} className="p-3.5 bg-surface-2/60 border border-line rounded-[6px]">
                <span className="text-[10px] font-semibold text-fg-muted">ROUND 0{idx + 1}</span>
                <p className="text-xs font-semibold text-fg mt-1">{round}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Action Area */}
        <div className="pt-6 border-t border-line space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-fg">Submit Application</h3>
          
          {applied ? (
            <div className="p-4 bg-success-soft border border-success/20 rounded-[6px] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-success mx-auto" />
              <h4 className="text-sm font-semibold text-success">Application Submitted Successfully!</h4>
              <p className="text-xs text-fg">
                Your application has been registered for {job.company}. You will receive round reminders under <strong className="text-fg">My Schedule</strong>.
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
                className="text-xs py-2 px-5 font-semibold"
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
        <div className="space-y-3 text-xs text-fg-muted">
          <p>
            You are applying for <strong className="text-fg">{job.title}</strong> at <strong className="text-fg">{job.company}</strong> with package <strong className="text-fg">{job.ctc}</strong>.
          </p>
          <div className="p-3 bg-warning-soft border border-warning/20 rounded-[6px] text-warning">
            <strong className="text-fg">Policy Reminder:</strong> If shortlisted, attendance at all scheduled drive rounds is mandatory as per placement cell regulations.
          </div>
        </div>
      </Modal>
    </div>
  )
}
