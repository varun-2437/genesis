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
  Plus,
  FileCheck
} from 'lucide-react'
import { useRecruiterStore } from '../recruiterStore'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

export function RecruiterDashboardPage() {
  const { companyProfile, vacancies, driveRequests, candidates, offers } = useRecruiterStore()

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl text-white shadow-sm">
        <div>
          <span className="px-2.5 py-1 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-full text-xs font-semibold uppercase tracking-wider">
            Employer Portal
          </span>
          <h1 className="text-2xl font-bold mt-2 tracking-tight">
            Welcome back, {companyProfile.leadContact} ({companyProfile.name})
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Campus Recruitment Season 2026 • Code: {companyProfile.code} • {companyProfile.mouStatus}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/recruiter/jobs">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs gap-1.5 shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Post Job Vacancy
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Active Job Openings"
          value={vacancies.length.toString()}
          subtitle={`${vacancies.filter((v) => v.status === 'PUBLISHED').length} Published`}
          icon={Briefcase}
        />
        <StatCard
          title="Campus Drives"
          value={driveRequests.length.toString()}
          subtitle="1 Approved by TPO"
          icon={Calendar}
        />
        <StatCard
          title="Candidates in Pipeline"
          value={candidates.length.toString()}
          subtitle="Under Active Evaluation"
          icon={Users}
        />
        <StatCard
          title="Offers Extended"
          value={offers.length.toString()}
          subtitle="Final selections released"
          icon={Award}
        />
      </div>

      {/* Main Recruiter Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidates in Evaluation */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" /> Interview & Evaluation Roster
            </h3>
            <Link to="/recruiter/candidates" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
              Candidate Pool <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {candidates.map((cand) => (
              <div
                key={cand.id}
                className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{cand.name}</span>
                    <span className="font-mono text-xs text-slate-400">[{cand.registerNumber}]</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {cand.department} • <strong className="text-slate-700">{cand.cgpa} CGPA</strong>
                  </p>
                  <p className="text-[11px] text-indigo-600 font-semibold mt-1">
                    Slot: {cand.interviewSlot}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md block">
                    AI Match: {cand.aiMatchScore}%
                  </span>
                  <StatusBadge status={cand.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links & Drive Summary */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" /> Campus Drive Schedules
          </h3>

          <div className="space-y-3">
            {driveRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{req.title}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                    {req.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Preferred Dates:</strong> {req.preferredDates}</p>
                  <p><strong>Logistics Allocated:</strong> {req.labsRequired}</p>
                  <p><strong>Faculty Coordinator:</strong> {req.coordinatorAssigned}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link to="/recruiter/profile" className="text-xs text-slate-600 hover:text-indigo-600 font-medium flex items-center gap-1">
              Company Team & MoU <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/recruiter/offers" className="text-xs text-emerald-700 hover:underline font-semibold flex items-center gap-1">
              View Offer Letters <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
