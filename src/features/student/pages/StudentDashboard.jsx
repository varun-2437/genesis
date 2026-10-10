import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  ArrowRight,
  Clock,
  Building,
  Target
} from 'lucide-react'

export function StudentDashboard() {
  const [profileComplete, setProfileComplete] = useState(88)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner with Readiness Indicator & Announcements */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-8 text-white shadow-lg border border-indigo-800/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-indigo-200 rounded-full text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Cycle 2026-27 Active · Verified Candidate
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Welcome back, Varun M</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your placement profile is verified. You qualify for <strong>4 upcoming campus drives</strong> this week.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-5 shrink-0">
            <div>
              <p className="text-xs font-medium text-indigo-200">Placement Readiness</p>
              <p className="text-2xl font-bold text-white mt-0.5">{profileComplete}%</p>
              <div className="w-32 bg-white/20 h-2 rounded-full overflow-hidden mt-1.5">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${profileComplete}%` }} />
              </div>
            </div>
            <Link to="/student/profile">
              <Button size="sm" className="bg-white text-indigo-900 hover:bg-slate-100 text-xs font-semibold">
                Complete 100%
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Urgent Alert Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-indigo-100 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>Urgent Deadline:</strong> Google Cloud Campus registration closes tonight at 11:59 PM.</span>
          </div>
          <Link to="/student/jobs" className="text-white underline font-semibold flex items-center gap-1 hover:text-indigo-200">
            Apply now <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Active Applications" value="3" subtitle="1 in Technical Round" icon={Briefcase} />
        <StatCard title="Upcoming Drives" value="5" subtitle="This month" icon={Calendar} />
        <StatCard title="Offers Pending" value="1" subtitle="CTC: ₹ 14.5 LPA" icon={CheckCircle2} />
        <StatCard title="AI Skill Match Score" value="92%" trend={8} icon={Target} />
      </div>

      {/* Main Content Layout: Active Drives & Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Applications */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">My Applications & Progress</h3>
              <p className="text-xs text-slate-500 mt-0.5">Live tracking through recruitment stages</p>
            </div>
            <Link to="/student/applications">
              <Button variant="ghost" size="sm" className="text-xs">View History</Button>
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            <div className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 bg-indigo-50 text-indigo-700 font-bold rounded-xl flex items-center justify-center shrink-0">
                  GC
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">Google Cloud India</h4>
                  <p className="text-xs text-slate-500">Associate Cloud Engineer · Full Time</p>
                  <p className="text-[11px] text-indigo-600 font-medium mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Next: Technical Interview · Tomorrow 10:30 AM
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status="SHORTLISTED" />
                <p className="text-xs font-bold text-slate-900 mt-1.5">₹ 18.0 LPA</p>
              </div>
            </div>

            <div className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 bg-slate-100 text-slate-700 font-bold rounded-xl flex items-center justify-center shrink-0">
                  ORA
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">Oracle Corporation</h4>
                  <p className="text-xs text-slate-500">Software Developer 1 · Pune/Bengaluru</p>
                  <p className="text-[11px] text-slate-400 mt-1">Under Initial Resume Screening</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status="IN_REVIEW" />
                <p className="text-xs font-bold text-slate-900 mt-1.5">₹ 14.5 LPA</p>
              </div>
            </div>

            <div className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 bg-emerald-50 text-emerald-700 font-bold rounded-xl flex items-center justify-center shrink-0">
                  CTS
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">Cognizant</h4>
                  <p className="text-xs text-slate-500">GenC Next Developer · Chennai</p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Offer Letter Ready to Accept
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status="SELECTED" />
                <p className="text-xs font-bold text-slate-900 mt-1.5">₹ 6.75 LPA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Calendar & Action Hub */}
        <div className="space-y-6">
          {/* Quick Offer Alert */}
          <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sm border border-emerald-800 relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <span className="px-2.5 py-0.5 bg-emerald-700/80 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Action Required
              </span>
              <h4 className="text-lg font-bold">1 Final Offer Letter Received</h4>
              <p className="text-xs text-emerald-100">
                Cognizant has released your formal offer letter. You have <strong>3 days</strong> to respond under institutional policy.
              </p>
              <Link to="/student/offers" className="inline-block pt-1">
                <Button size="sm" className="bg-white text-emerald-900 hover:bg-emerald-50 border-none font-semibold text-xs">
                  Review & Respond
                </Button>
              </Link>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Recommended For You</h4>
              <Link to="/student/jobs" className="text-xs text-indigo-600 font-semibold hover:underline">
                Explore All
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Microsoft India</h5>
                    <p className="text-[11px] text-slate-500">Software Engineering Intern</p>
                  </div>
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">96% Match</span>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">₹ 80,000 / month</span>
                  <span className="text-slate-400">Apply by Oct 20</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Amazon Web Services</h5>
                    <p className="text-[11px] text-slate-500">Cloud Support Associate</p>
                  </div>
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">91% Match</span>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">₹ 12.0 LPA</span>
                  <span className="text-slate-400">Apply by Oct 24</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
