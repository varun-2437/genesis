import React from 'react'
import { StatCard } from '@/components/shared/StatCard'
import { Button, StatusBadge } from '@/components/ui'
import { Users, Briefcase, Award, Send, Calendar } from 'lucide-react'

export function AlumniDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">
            Alumni Mentorship Network · Verified Member
          </span>
          <h2 className="text-2xl font-bold mt-2">Welcome, Rahul Venkat (Class of 2023)</h2>
          <p className="text-slate-300 text-xs mt-1 max-w-xl">
            Currently Software Development Engineer 2 at <strong>Microsoft India</strong>. Thank you for guiding current campus batches.
          </p>
        </div>
        <Button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold text-xs border-none">
          Post Internal Referral
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Active Mentees" value="4" subtitle="Final Year Students" icon={Users} />
        <StatCard title="Referrals Posted" value="12" subtitle="3 Shortlisted" icon={Briefcase} />
        <StatCard title="Mock Sessions Taken" value="8" subtitle="Average Rating: 4.9/5" icon={Award} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Pending Student Mentorship Inquiries</h3>
        <div className="space-y-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">Varun Murugesh (CSE 2026 Batch)</p>
              <p className="text-[11px] text-slate-500">Requesting mock interview for Azure Cloud Engineer track</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="text-xs">Decline</Button>
              <Button size="sm" className="text-xs">Accept & Schedule</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
