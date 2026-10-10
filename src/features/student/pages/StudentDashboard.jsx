import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  AlertCircle,
  FileCheck
} from 'lucide-react'

export function StudentDashboard() {
  const [profileComplete] = useState(88)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Student Dashboard</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Academic Year 2026-27 · Placement Roster Verified
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/student/jobs">
            <Button variant="primary" size="sm">
              <Briefcase size={16} strokeWidth={1.75} /> Browse Openings
            </Button>
          </Link>
          <Link to="/student/profile">
            <Button variant="secondary" size="sm">
              View Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Readiness & Notice Banner - Restrained Enterprise Look (No gradients or glowing blobs) */}
      <div className="card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-2/40">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <FileCheck size={16} strokeWidth={1.75} className="text-accent" />
            <span className="text-xs font-semibold text-fg">Profile Completeness & Verification</span>
          </div>
          <p className="text-xs text-fg-muted">
            Your primary resume and academic transcripts have been verified by the placement cell.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <span className="text-xs font-medium text-fg-muted block">Readiness Score</span>
            <span className="text-xl font-semibold text-fg tabular-nums">{profileComplete}%</span>
          </div>
          <div className="w-28 bg-surface border border-line h-2 rounded overflow-hidden">
            <div className="bg-accent h-full rounded" style={{ width: `${profileComplete}%` }} />
          </div>
          <Link to="/student/profile">
            <Button variant="secondary" size="sm">Update</Button>
          </Link>
        </div>
      </div>

      {/* Urgent Notice Alert */}
      <div className="p-3.5 bg-warning-soft border border-warning/20 rounded-[6px] text-xs text-warning flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle size={16} strokeWidth={1.75} className="shrink-0" />
          <span><strong>Deadline Alert:</strong> Google Cloud Campus registration closes tonight at 11:59 PM IST.</span>
        </div>
        <Link to="/student/jobs" className="font-semibold underline shrink-0 hover:opacity-80">
          Apply Now
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Applications" value="3" subtitle="1 in technical interview" icon={Briefcase} />
        <StatCard label="Upcoming Drives" value="5" subtitle="Scheduled this month" icon={Calendar} />
        <StatCard label="Offers Released" value="1" subtitle="CTC: INR 14.5 LPA" icon={CheckCircle2} />
        <StatCard label="Verified Skills" value="18" subtitle="Matched against open JDs" delta={8} />
      </div>

      {/* Main Grid: Applications Tracker & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Applications Table */}
        <div className="lg:col-span-2 card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-line flex items-center justify-between bg-surface-2/30">
            <div>
              <h2 className="text-[14px] font-semibold text-fg">Active Applications</h2>
              <p className="text-xs text-fg-muted mt-0.5">Live recruitment pipeline progress</p>
            </div>
            <Link to="/student/applications">
              <Button variant="ghost" size="sm">View History</Button>
            </Link>
          </div>

          <div className="divide-y divide-line text-sm">
            <div className="p-4 flex items-center justify-between gap-3 hover:bg-surface-2/40 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-fg">Google Cloud India</span>
                  <span className="text-xs text-fg-muted">· Associate Cloud Engineer</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-fg-muted">
                  <Clock size={13} strokeWidth={1.75} />
                  <span>Technical Interview · Tomorrow 10:30 AM</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status="SHORTLISTED" />
                <p className="text-xs font-semibold text-fg mt-1 tabular-nums">INR 18.0 LPA</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between gap-3 hover:bg-surface-2/40 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-fg">Oracle Corporation</span>
                  <span className="text-xs text-fg-muted">· Software Developer 1</span>
                </div>
                <p className="text-xs text-fg-muted mt-1">Application under screening</p>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status="IN_REVIEW" />
                <p className="text-xs font-semibold text-fg mt-1 tabular-nums">INR 14.5 LPA</p>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between gap-3 hover:bg-surface-2/40 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-fg">Cognizant</span>
                  <span className="text-xs text-fg-muted">· GenC Next Developer</span>
                </div>
                <p className="text-xs text-success mt-1 font-medium">Offer released & pending confirmation</p>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status="SELECTED" />
                <p className="text-xs font-semibold text-fg mt-1 tabular-nums">INR 6.75 LPA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Offer Action & Recommended Openings */}
        <div className="space-y-4">
          {/* Offer Notification Box */}
          <div className="card p-5 border-l-4 border-l-success space-y-2.5">
            <span className="badge bg-success-soft text-success">Decision Required</span>
            <h3 className="text-[14px] font-semibold text-fg">Formal Offer Received</h3>
            <p className="text-xs text-fg-muted leading-relaxed">
              Cognizant has issued your employment letter. Under institutional placement guidelines, you have <strong>3 days</strong> to respond.
            </p>
            <div className="pt-1">
              <Link to="/student/offers">
                <Button variant="primary" size="sm" className="w-full">
                  Review & Respond
                </Button>
              </Link>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-fg">Recommended Roles</h3>
              <Link to="/student/jobs" className="text-xs text-accent font-medium hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded border border-line bg-surface-2/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-fg">Microsoft India</span>
                  <span className="badge bg-accent-soft text-accent">96% Fit</span>
                </div>
                <p className="text-fg-muted">Software Engineering Intern</p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-fg-muted">
                  <span className="font-medium text-fg tabular-nums">INR 80,000 / mo</span>
                  <span>Closes Oct 20</span>
                </div>
              </div>

              <div className="p-3 rounded border border-line bg-surface-2/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-fg">Amazon Web Services</span>
                  <span className="badge bg-accent-soft text-accent">91% Fit</span>
                </div>
                <p className="text-fg-muted">Cloud Support Associate</p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-fg-muted">
                  <span className="font-medium text-fg tabular-nums">INR 12.0 LPA</span>
                  <span>Closes Oct 24</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
