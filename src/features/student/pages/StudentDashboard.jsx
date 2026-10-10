import React from 'react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Briefcase, Calendar, CheckCircle2, TrendingUp } from 'lucide-react'

export function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-2xl p-8 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            Placement Cycle 2026-27
          </span>
          <h2 className="text-2xl font-bold">Welcome back, Varun</h2>
          <p className="text-indigo-100 text-sm mt-1 max-w-xl">
            Your placement readiness score is <strong className="text-white">88%</strong>. You are currently eligible for 4 upcoming campus drives.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="border-none text-indigo-950 font-semibold">
            View Eligibility
          </Button>
          <Button className="bg-white text-indigo-700 hover:bg-indigo-50 border-none font-semibold">
            Update Resume
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Active Applications" value="3" subtitle="1 in Technical Round" icon={Briefcase} />
        <StatCard title="Upcoming Drives" value="5" subtitle="This month" icon={Calendar} />
        <StatCard title="Offers Received" value="1" subtitle="CTC: 12.5 LPA" icon={CheckCircle2} />
        <StatCard title="Readiness Score" value="88%" trend={12} icon={TrendingUp} />
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Recent Applications</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">CTC / Package</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Next Step</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-6 py-4 font-medium text-slate-900">Google Cloud</td>
                <td className="px-6 py-4">Associate Cloud Engineer</td>
                <td className="px-6 py-4">18.0 LPA</td>
                <td className="px-6 py-4"><StatusBadge status="SHORTLISTED" /></td>
                <td className="px-6 py-4 text-xs font-medium text-indigo-600">Coding Round - Oct 14</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-slate-900">Oracle</td>
                <td className="px-6 py-4">Software Developer 1</td>
                <td className="px-6 py-4">14.5 LPA</td>
                <td className="px-6 py-4"><StatusBadge status="IN_REVIEW" /></td>
                <td className="px-6 py-4 text-xs font-medium text-slate-500">Resume Screening</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-slate-900">Cognizant</td>
                <td className="px-6 py-4">GenC Next Developer</td>
                <td className="px-6 py-4">6.75 LPA</td>
                <td className="px-6 py-4"><StatusBadge status="SELECTED" /></td>
                <td className="px-6 py-4 text-xs font-medium text-emerald-600">Offer Letter Issued</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
