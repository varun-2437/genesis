import React, { useState } from 'react'
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  ShieldAlert,
  UserCheck,
  Search,
  Filter,
  Check,
  X,
  MessageSquare
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const GRIEVANCES = [
  {
    id: 'GRV-201',
    complainant: 'Karthik Rao (21IT055)',
    category: 'Assessment Technical Glitch (20.1)',
    priority: 'High',
    description: 'Faced campus lab electricity trip during Amazon Online Coding assessment problem 2. System auto-submitted prematurely.',
    assignedStaff: 'Priya Sundaram (TPO Staff)',
    filedDate: '2026-10-09',
    status: 'In Investigation',
    resolutionNote: 'Lab CCTV verified power fluctuation. Re-test approval requested via T16.'
  },
  {
    id: 'GRV-202',
    complainant: 'Anonymous Candidate',
    category: 'Interview Panel Conduct (20.4)',
    priority: 'Urgent',
    description: 'Inappropriate interview inquiry regarding personal background during Round 2 interview.',
    assignedStaff: 'Dr. Ramesh Kulkarni (Head TPO)',
    filedDate: '2026-10-08',
    status: 'Escalated to Ethics Committee',
    resolutionNote: 'Confidential investigation initiated with company university relations partner.'
  },
  {
    id: 'GRV-203',
    complainant: 'Sneha Patel (21ME031)',
    category: 'Offer Eligibility Policy Clarification (20.11)',
    priority: 'Medium',
    description: 'Requesting permission to apply for Core Energy firm after obtaining standard IT support offer.',
    assignedStaff: 'Prof. S. Natarajan',
    filedDate: '2026-10-04',
    status: 'Resolved & Closed',
    resolutionNote: 'Approved under Dream category exception clause (Section 22.8).'
  }
]

export function GrievanceManagement() {
  const [grievances, setGrievances] = useState(GRIEVANCES)

  const handleResolve = (id) => {
    setGrievances(prev => prev.map(g => g.id === id ? { ...g, status: 'Resolved & Closed' } : g))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T25</span>
            <h1 className="text-2xl font-bold text-slate-900">Grievance & Complaint Redressal</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Resolve student assessment grievances, interview conduct complaints, confidential escalations, and policy disputes.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Grievances"
          value={grievances.filter(g => !g.status.includes('Resolved')).length}
          icon={AlertCircle}
          change="Pending resolution"
          trend="neutral"
        />
        <StatCard
          title="Resolution Cadence"
          value="48 Hours"
          icon={Clock}
          change="Avg turnaround time"
          trend="up"
        />
        <StatCard
          title="Confidential Cases"
          value="1 Active"
          icon={ShieldAlert}
          change="Protected identities"
          trend="neutral"
        />
        <StatCard
          title="Resolved Satisfactorily"
          value="94.8%"
          icon={CheckCircle2}
          change="AY 2025-2026 cases"
          trend="up"
        />
      </div>

      {/* Grievances List */}
      <div className="space-y-4">
        {grievances.map((g) => (
          <div key={g.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {g.id}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{g.category}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  g.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                  g.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {g.priority} Priority
                </span>
                <StatusBadge status={g.status} />
              </div>
              <span className="text-xs text-slate-400 font-mono">Filed: {g.filedDate}</span>
            </div>

            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
              {g.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
              <div className="text-slate-500">
                Assigned Officer: <strong className="text-slate-700">{g.assignedStaff}</strong>
                {g.resolutionNote && (
                  <span className="block text-[11px] text-indigo-600 mt-0.5">
                    Note: {g.resolutionNote}
                  </span>
                )}
              </div>

              {!g.status.includes('Resolved') && (
                <Button
                  size="sm"
                  variant="default"
                  className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleResolve(g.id)}
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Mark as Resolved & Closed
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
