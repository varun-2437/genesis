import React from 'react'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Users, Briefcase, Award } from 'lucide-react'

export function AlumniDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Alumni Network & Mentorship</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Rahul Venkat (Class of 2023) · Software Development Engineer 2, Microsoft India
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm">
            Post Internal Referral
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Active Mentees" value="4" subtitle="Assigned students" icon={Users} />
        <StatCard label="Referrals Posted" value="12" subtitle="3 currently shortlisted" icon={Briefcase} />
        <StatCard label="Mock Interviews" value="8" subtitle="Average rating: 4.9/5" icon={Award} />
      </div>

      {/* Mentorship Requests Card */}
      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-line flex items-center justify-between bg-surface-2/30">
          <div>
            <h2 className="text-[14px] font-semibold text-fg">Mentorship Inquiries</h2>
            <p className="text-xs text-fg-muted mt-0.5">Undergraduate requests for career guidance and mock interviews</p>
          </div>
          <span className="text-xs text-fg-muted">1 pending inquiry</span>
        </div>

        <div className="p-4 divide-y divide-line text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="space-y-0.5">
              <span className="font-semibold text-fg text-sm">Varun Murugesh (CSE 2026 Batch)</span>
              <p className="text-fg-muted">Requesting guidance session for Cloud Engineering / Systems track</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="secondary" size="sm">Decline</Button>
              <Button variant="primary" size="sm">Accept & Schedule</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
