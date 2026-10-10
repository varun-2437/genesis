import React from 'react'
import { Link } from 'react-router-dom'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { 
  Users, 
  Building2, 
  Calendar, 
  Award, 
  Plus, 
  Sliders,
  GitPullRequest,
  ArrowRight,
  Clock
} from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'

export function TpoDashboard() {
  const { students, companies, drives, jobs, applications } = useTpoCoreStore()

  // Calculated Dynamic Metrics
  const totalRegistered = students.length
  const placedCount = students.filter((s) => s.placementStatus === 'PLACED').length
  const placementRate = totalRegistered > 0 ? Math.round((placedCount / totalRegistered) * 100) : 0
  const activeCompanies = companies.filter((c) => c.status === 'ACTIVE').length
  const activeDrives = drives.filter((d) => d.status === 'ONGOING' || d.status === 'UPCOMING').length

  const avgCtc = companies.length > 0
    ? (companies.reduce((acc, c) => acc + (c.avgPackageLPA || 0), 0) / companies.length).toFixed(1)
    : '0.0'

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Placement Operations Control</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Institutional recruitment drive telemetry, student eligibility roster, and corporate visit tracking.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/tpo/eligibility">
            <Button variant="secondary" size="sm">
              <Sliders size={14} strokeWidth={1.75} /> Eligibility Rules
            </Button>
          </Link>
          <Link to="/tpo/drives">
            <Button variant="primary" size="sm">
              <Plus size={14} strokeWidth={1.75} /> Schedule Drive
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Dynamic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Registered Students" 
          value={totalRegistered.toString()} 
          subtitle={`${placedCount} placed (${placementRate}% rate)`} 
          icon={Users} 
        />
        <StatCard 
          label="Active Drives" 
          value={activeDrives.toString()} 
          subtitle="Drives in progress or upcoming" 
          icon={Calendar} 
        />
        <StatCard 
          label="Partner Companies" 
          value={activeCompanies.toString()} 
          subtitle={`${companies.length} total enrolled`} 
          icon={Building2} 
        />
        <StatCard 
          label="Average CTC" 
          value={`INR ${avgCtc} LPA`} 
          delta={14} 
          icon={Award} 
        />
      </div>

      {/* Operations Monitor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Campus Drives */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-line flex items-center justify-between bg-surface-2/30">
            <div>
              <h2 className="text-[14px] font-semibold text-fg">Active Placement Drives</h2>
              <p className="text-xs text-fg-muted mt-0.5">Campus and virtual recruitment status</p>
            </div>
            <Link to="/tpo/drives" className="text-xs text-accent font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight size={13} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="divide-y divide-line text-xs">
            {drives.slice(0, 4).map((drv) => (
              <div
                key={drv.id}
                className="flex items-center justify-between p-3.5 hover:bg-surface-2/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-fg">{drv.companyName}</span>
                    <span className="font-mono text-[11px] text-fg-muted">[{drv.driveCode}]</span>
                  </div>
                  <p className="text-fg-muted mt-0.5">{drv.jobTitle} · {drv.venue}</p>
                </div>
                <StatusBadge status={drv.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Live Operations & Selection Pipeline */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-line flex items-center justify-between bg-surface-2/30">
            <div>
              <h2 className="text-[14px] font-semibold text-fg">Candidate Pipeline Status</h2>
              <p className="text-xs text-fg-muted mt-0.5">Shortlisting and round movement queue</p>
            </div>
            <Link to="/tpo/rounds" className="text-xs text-accent font-medium hover:underline flex items-center gap-1">
              Pipeline <ArrowRight size={13} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="divide-y divide-line text-xs">
            {applications.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-3.5 hover:bg-surface-2/40 transition-colors"
              >
                <div>
                  <p className="font-semibold text-fg">{app.studentName}</p>
                  <p className="text-fg-muted mt-0.5">{app.department} · Round: {app.currentRoundName}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
