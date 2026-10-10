import React from 'react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Users, Building2, Calendar, Award, Plus, FileSpreadsheet } from 'lucide-react'

export function TpoDashboard() {
  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Placement Control Room</h2>
          <p className="text-sm text-slate-500 mt-1">Live tracking of drives, student eligibility, and company visits.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Export NAAC Data
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Schedule New Drive
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Registered" value="1,240" subtitle="89% Verified" icon={Users} />
        <StatCard title="Active Drives" value="14" subtitle="6 Completed this week" icon={Calendar} />
        <StatCard title="Partner Companies" value="84" subtitle="22 Premium / Super Dream" icon={Building2} />
        <StatCard title="Average CTC" value="₹ 9.4 LPA" trend={18} icon={Award} />
      </div>

      {/* Real-time Operations Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Upcoming Drives (Next 7 Days)</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="font-medium text-slate-900">Microsoft India</p>
                <p className="text-xs text-slate-500">Full Time SDE · Minimum CGPA: 8.0</p>
              </div>
              <StatusBadge status="UPCOMING" />
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="font-medium text-slate-900">Deloitte USI</p>
                <p className="text-xs text-slate-500">Analyst Trainee · All Branches</p>
              </div>
              <StatusBadge status="ONGOING" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Pending Approvals Queue</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="font-medium text-slate-900">Student Profile Updates</p>
                <p className="text-xs text-slate-500">18 documents awaiting verification</p>
              </div>
              <Button size="sm" variant="secondary">Review</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="font-medium text-slate-900">New Recruiter Postings</p>
                <p className="text-xs text-slate-500">3 Job Descriptions pending signoff</p>
              </div>
              <Button size="sm" variant="secondary">Review</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
