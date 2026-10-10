import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Building2, 
  Briefcase, 
  Users, 
  Calendar, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Plus
} from 'lucide-react'
import { useRecruiterStore } from '../recruiterStore'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

export function RecruiterDashboardPage() {
  const { companyProfile, vacancies, driveRequests, candidates, offers } = useRecruiterStore()

  return (
    <div className="space-y-6">
      {/* Header Banner - Restrained Enterprise Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Recruiter Operations Portal</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            {companyProfile.name} · Campus Hiring Cycle 2026 · Account: {companyProfile.leadContact}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/recruiter/jobs">
            <Button variant="primary" size="sm">
              <Plus size={14} strokeWidth={1.75} /> Post Job Vacancy
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Vacancies"
          value={vacancies.length.toString()}
          subtitle={`${vacancies.filter((v) => v.status === 'PUBLISHED').length} Published`}
          icon={Briefcase}
        />
        <StatCard
          label="Campus Drives"
          value={driveRequests.length.toString()}
          subtitle="1 Approved by TPO"
          icon={Calendar}
        />
        <StatCard
          label="Shortlisted Pool"
          value={candidates.length.toString()}
          subtitle="Verified profiles"
          icon={Users}
        />
        <StatCard
          label="Offers Extended"
          value={offers.length.toString()}
          subtitle="Final selections"
          icon={Award}
        />
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Openings */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-line flex items-center justify-between bg-surface-2/30">
            <div>
              <h2 className="text-[14px] font-semibold text-fg">Current Job Postings</h2>
              <p className="text-xs text-fg-muted mt-0.5">Active vacancies and applicant volumes</p>
            </div>
            <Link to="/recruiter/jobs" className="text-xs text-accent font-medium hover:underline flex items-center gap-1">
              All Vacancies <ArrowRight size={13} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="divide-y divide-line text-xs">
            {vacancies.map((job) => (
              <div key={job.id} className="p-3.5 flex items-center justify-between hover:bg-surface-2/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-fg">{job.title}</span>
                    <span className="text-fg-muted">({job.type})</span>
                  </div>
                  <p className="text-fg-muted mt-0.5">{job.department} · {job.location} · INR {job.ctcLpa} LPA</p>
                </div>
                <StatusBadge status={job.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Shortlisted Candidates */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-line flex items-center justify-between bg-surface-2/30">
            <div>
              <h2 className="text-[14px] font-semibold text-fg">Candidate Evaluation Pool</h2>
              <p className="text-xs text-fg-muted mt-0.5">Applicants screened and in evaluation</p>
            </div>
            <Link to="/recruiter/candidates" className="text-xs text-accent font-medium hover:underline flex items-center gap-1">
              Candidate Pool <ArrowRight size={13} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="divide-y divide-line text-xs">
            {candidates.map((cand) => (
              <div key={cand.id} className="p-3.5 flex items-center justify-between hover:bg-surface-2/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-fg">{cand.name}</span>
                    <span className="font-mono text-[11px] text-fg-muted">[{cand.regNo}]</span>
                  </div>
                  <p className="text-fg-muted mt-0.5">{cand.department} · CGPA: {cand.cgpa} · Match: {cand.skillMatchScore}%</p>
                </div>
                <StatusBadge status={cand.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
