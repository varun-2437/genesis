import React from 'react'
import {
  Building2,
  TrendingUp,
  Repeat,
  Award,
  Users,
  Calendar,
  ExternalLink,
  Download
} from 'lucide-react'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

const RECRUITER_VISIT_HISTORY = [
  { year: '2022', newRecruiters: 24, repeatRecruiters: 68, totalVisits: 92 },
  { year: '2023', yearLabel: '2023', newRecruiters: 32, repeatRecruiters: 76, totalVisits: 108 },
  { year: '2024', yearLabel: '2024', newRecruiters: 38, repeatRecruiters: 84, totalVisits: 122 },
  { year: '2025', yearLabel: '2025', newRecruiters: 41, repeatRecruiters: 94, totalVisits: 135 },
  { year: '2026 (Curr)', yearLabel: '2026', newRecruiters: 45, repeatRecruiters: 92, totalVisits: 137 }
]

const KEY_CORPORATE_PARTNERS = [
  { company: 'Microsoft', yearsPartnered: '8 Consecutive Years', totalHires: 112, avgPackage: '42.0 LPA', status: 'Marquee Super Dream' },
  { company: 'Goldman Sachs', yearsPartnered: '6 Consecutive Years', totalHires: 64, avgPackage: '30.5 LPA', status: 'Super Dream' },
  { company: 'Amazon', yearsPartnered: '7 Consecutive Years', totalHires: 148, avgPackage: '24.0 LPA', status: 'Super Dream' },
  { company: 'Cisco Systems', yearsPartnered: '9 Consecutive Years', totalHires: 160, avgPackage: '18.5 LPA', status: 'Dream Partner' },
  { company: 'Tata Motors', yearsPartnered: '12 Consecutive Years', totalHires: 98, avgPackage: '10.5 LPA', status: 'Core Manufacturing' },
  { company: 'Schneider Electric', yearsPartnered: '5 Consecutive Years', totalHires: 52, avgPackage: '14.2 LPA', status: 'Core Electrical' }
]

export function CompanyEngagementTrends() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Management M5</span>
            <h1 className="text-2xl font-bold text-slate-900">Corporate Engagement & Industry Trends</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Recruiter partnership longitudinal trends (Section 4.14, 18.17), repeat corporate visits, and hiring conversion strength.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-xs">
            <Download className="w-4 h-4 text-emerald-600" />
            Download Recruiter Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Corporate Partners"
          value="137 Companies"
          icon={Building2}
          change="+12 new recruiters this year"
          trend="up"
        />
        <StatCard
          title="Repeat Recruiter Rate"
          value="67.1%"
          icon={Repeat}
          change="High employer retention"
          trend="up"
        />
        <StatCard
          title="Super Dream Recruiter Roster"
          value="32 Organizations"
          icon={Award}
          change="Offering &gt;25 LPA"
          trend="up"
        />
        <StatCard
          title="Total Drives Conducted"
          value="142 Drives"
          icon={Calendar}
          change="Across On-campus & Hybrid"
          trend="neutral"
        />
      </div>

      {/* Charts */}
      <ChartCard
        title="Recruiter Visits Over Time: New vs Repeat Recruiters"
        subtitle="Longitudinal tracking of industry recruitment partnerships"
        type="bar"
        data={RECRUITER_VISIT_HISTORY}
        dataKeys={[
          { key: 'repeatRecruiters', name: 'Repeat Recruiters', color: '#6366f1' },
          { key: 'newRecruiters', name: 'New First-time Recruiters', color: '#10b981' }
        ]}
        xAxisKey="year"
        height={320}
        stacked={true}
      />

      {/* Corporate Partners Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Key Corporate Hiring Partners & Long-Term Retention</h3>
          <span className="text-xs text-slate-400">Institutional MoUs and Hiring Loyalty</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Organization Name</th>
              <th className="py-3 px-4">Partnership Tenure</th>
              <th className="py-3 px-4">Cumulative Campus Hires</th>
              <th className="py-3 px-4">Average Package</th>
              <th className="py-3 px-4 text-right">Relationship Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {KEY_CORPORATE_PARTNERS.map((p) => (
              <tr key={p.company} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-semibold text-slate-900">{p.company}</td>
                <td className="py-3.5 px-4 text-slate-600">{p.yearsPartnered}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{p.totalHires} Graduates</td>
                <td className="py-3.5 px-4 font-semibold text-indigo-600">{p.avgPackage}</td>
                <td className="py-3.5 px-4 text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
