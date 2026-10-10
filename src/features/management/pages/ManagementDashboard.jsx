import React, { useState } from 'react'
import {
  TrendingUp,
  Award,
  Building2,
  Users,
  CheckCircle,
  FileCheck,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react'
import { ChartCard } from '@/components/shared/ChartCard'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'

const PLACEMENT_BY_DISCIPLINE = [
  { name: 'Computer Science', placedPct: 91, avgCTC: 17.4 },
  { name: 'Information Tech', placedPct: 88, avgCTC: 14.8 },
  { name: 'Electronics & Comm', placedPct: 82, avgCTC: 12.2 },
  { name: 'Electrical Engg', placedPct: 74, avgCTC: 9.6 },
  { name: 'Mechanical Engg', placedPct: 69, avgCTC: 8.5 },
  { name: 'Civil Engg', placedPct: 61, avgCTC: 7.2 }
]

const MONTHLY_DRIVE_ACTIVITY = [
  { name: 'Jul', companies: 8, offers: 32 },
  { name: 'Aug', companies: 24, offers: 112 },
  { name: 'Sep', companies: 38, offers: 198 },
  { name: 'Oct', companies: 45, offers: 240 },
  { name: 'Nov (Proj)', companies: 22, offers: 95 }
]

const PENDING_GOVERNANCE_ITEMS = [
  {
    id: 'GOV-201',
    title: 'Multiple Offer Policy Rev. 2026',
    module: 'Policy Engine (T32)',
    submittedBy: 'Head TPO',
    status: 'Pending Approval',
    date: '2026-10-08',
    urgency: 'High'
  },
  {
    id: 'GOV-202',
    title: 'Campus Hackathon & Training Budget (Q3)',
    module: 'Finance & Budget (T27)',
    submittedBy: 'Training Lead',
    status: 'Pending Approval',
    date: '2026-10-09',
    urgency: 'Medium'
  },
  {
    id: 'GOV-203',
    title: 'NIRF 2026 Placement Data Certification',
    module: 'Accreditation (M6)',
    submittedBy: 'Dean Academic',
    status: 'Under Review',
    date: '2026-10-06',
    urgency: 'High'
  }
]

export function ManagementDashboard() {
  const [governanceItems, setGovernanceItems] = useState(PENDING_GOVERNANCE_ITEMS)

  const handleApprove = (id) => {
    setGovernanceItems(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item))
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Management M1</span>
            <h1 className="text-2xl font-bold text-slate-900">Executive Placement Dashboard</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Top-level institutional health, recruiter engagement, package statistics, and governance sign-offs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            Academic Session 2025-2026
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            Generate Principal Report
          </Button>
        </div>
      </div>

      {/* High-Level Institutional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Campus Placement Rate"
          value="88.6%"
          icon={TrendingUp}
          change="+4.2% vs previous cohort"
          trend="up"
        />
        <StatCard
          title="Average CTC Package"
          value="INR 13.8 LPA"
          icon={Award}
          change="Median: 11.5 LPA"
          trend="up"
        />
        <StatCard
          title="Visiting Recruiters"
          value="137 Companies"
          icon={Building2}
          change="32 Super Dream partners"
          trend="up"
        />
        <StatCard
          title="Offers Released"
          value="628 Total"
          icon={Users}
          change="84% acceptance rate"
          trend="neutral"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Department-wise Placement % & Average Salary"
          subtitle="Cross-faculty comparison of placement conversions and package scale"
          type="bar"
          data={PLACEMENT_BY_DISCIPLINE}
          dataKeys={[
            { key: 'placedPct', name: 'Placement Rate (%)', color: '#6366f1' },
            { key: 'avgCTC', name: 'Average CTC (LPA)', color: '#10b981' }
          ]}
          height={320}
        />

        <ChartCard
          title="Recruiter Visits & Offers Generated Over Time"
          subtitle="Monthly recruitment drive throughput and candidate selections"
          type="area"
          data={MONTHLY_DRIVE_ACTIVITY}
          dataKeys={[
            { key: 'offers', name: 'Offers Released', color: '#3b82f6' },
            { key: 'companies', name: 'Companies Visited', color: '#f59e0b' }
          ]}
          height={320}
        />
      </div>

      {/* Governance & Policy Approvals Section */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-indigo-600" />
              Executive Governance & Policy Approval Queue (M7 Sync)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Requires institutional authorization from Principal / Management Board before taking legal effect.
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {governanceItems.filter(i => i.status === 'Pending Approval').length} Items Awaiting Sign-off
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {governanceItems.map((item) => (
            <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 text-sm">{item.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    item.urgency === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.urgency} Priority
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>{item.module}</span>
                  <span>•</span>
                  <span>Submitted by: <strong>{item.submittedBy}</strong></span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={item.status} />
                {item.status !== 'Approved' && (
                  <Button
                    size="sm"
                    variant="default"
                    className="text-xs h-8"
                    onClick={() => handleApprove(item.id)}
                  >
                    Authorize & Sign
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
