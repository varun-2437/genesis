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
  TrendingUp,
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
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Placement Control Room & Executive Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time telemetry of campus recruitment drives, student eligibility, and active company visits.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/tpo/eligibility">
            <Button variant="outline" className="text-xs text-indigo-700 border-indigo-200 hover:bg-indigo-50 gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Eligibility Engine
            </Button>
          </Link>
          <Link to="/tpo/drives">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5 shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Schedule Drive
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Dynamic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Student Registry" 
          value={totalRegistered.toString()} 
          subtitle={`${placedCount} placed (${placementRate}% placement rate)`} 
          icon={Users} 
        />
        <StatCard 
          title="Active Drives" 
          value={activeDrives.toString()} 
          subtitle="Drives scheduled this season" 
          icon={Calendar} 
        />
        <StatCard 
          title="Partner Companies" 
          value={activeCompanies.toString()} 
          subtitle={`${companies.length} onboarded employers`} 
          icon={Building2} 
        />
        <StatCard 
          title="Average CTC" 
          value={`₹ ${avgCtc} LPA`} 
          trend={14} 
          icon={Award} 
        />
      </div>

      {/* Real-time Operations Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Campus Drives */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" /> Active Placement Drives
            </h3>
            <Link to="/tpo/drives" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {drives.slice(0, 3).map((drv) => (
              <div
                key={drv.id}
                className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 text-sm">{drv.companyName}</p>
                    <span className="font-mono text-xs text-slate-400">[{drv.driveCode}]</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{drv.jobTitle} • {drv.venue}</p>
                </div>
                <StatusBadge status={drv.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Live Operations & Selection Pipeline */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-indigo-600" /> Candidate Pipeline Status
            </h3>
            <Link to="/tpo/rounds" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
              Rounds Pipeline <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {applications.slice(0, 3).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100"
              >
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{app.studentName}</p>
                  <p className="text-xs text-slate-500">{app.department} • Stage: {app.currentRoundName}</p>
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
