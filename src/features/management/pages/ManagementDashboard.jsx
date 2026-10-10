import React, { useState } from 'react'
import {
  TrendingUp,
  Award,
  Building2,
  Users,
  CheckCircle,
  Calendar,
  AlertCircle
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
  { name: 'Nov', companies: 22, offers: 95 }
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
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Executive Management Overview</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Institutional placement conversions, salary distributions, and governance approvals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Calendar size={14} strokeWidth={1.75} /> Session 2025-2026
          </Button>
          <Button variant="primary" size="sm">
            Generate Principal Report
          </Button>
        </div>
      </div>

      {/* Institutional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Placement Rate"
          value="88.6%"
          icon={TrendingUp}
          delta={4.2}
        />
        <StatCard
          label="Average CTC"
          value="INR 13.8 LPA"
          icon={Award}
          subtitle="Median: 11.5 LPA"
        />
        <StatCard
          label="Visiting Recruiters"
          value="137"
          icon={Building2}
          subtitle="32 Super Dream tier"
        />
        <StatCard
          label="Total Offers Released"
          value="628"
          icon={Users}
          subtitle="84% acceptance rate"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Discipline Placement & Average Salary"
          subtitle="Cross-department conversions and package distribution"
          type="bar"
          data={PLACEMENT_BY_DISCIPLINE}
          dataKeys={[
            { key: 'placedPct', name: 'Placement Rate (%)' },
            { key: 'avgCTC', name: 'Average CTC (LPA)' }
          ]}
          height={280}
        />

        <ChartCard
          title="Drive Activity & Offers Volume"
          subtitle="Monthly corporate visits and offer releases"
          type="area"
          data={MONTHLY_DRIVE_ACTIVITY}
          dataKeys={[
            { key: 'companies', name: 'Companies Visited' },
            { key: 'offers', name: 'Offers Released' }
          ]}
          height={280}
        />
      </div>

      {/* Governance & Policy Approvals Queue */}
      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-line flex items-center justify-between bg-surface-2/30">
          <div>
            <h2 className="text-[14px] font-semibold text-fg">Executive Sign-off Queue</h2>
            <p className="text-xs text-fg-muted mt-0.5">Policy revisions and institutional budgets pending approval</p>
          </div>
          <span className="text-xs text-fg-muted">
            {governanceItems.filter(i => i.status !== 'Approved').length} items awaiting sign-off
          </span>
        </div>

        <div className="divide-y divide-line text-xs">
          {governanceItems.map(item => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-2/40 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-fg text-sm">{item.title}</span>
                  <span className="font-mono text-[11px] text-fg-muted">[{item.id}]</span>
                  <span className="badge bg-surface-2 text-fg-muted border-line">{item.module}</span>
                </div>
                <p className="text-fg-muted">
                  Submitted by {item.submittedBy} · {item.date} · Urgency: {item.urgency}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {item.status === 'Approved' ? (
                  <span className="badge bg-success-soft text-success">
                    <CheckCircle size={12} strokeWidth={1.75} /> Signed off
                  </span>
                ) : (
                  <>
                    <Button variant="secondary" size="sm" onClick={() => handleApprove(item.id)}>
                      Review Details
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => handleApprove(item.id)}>
                      Authorize & Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
