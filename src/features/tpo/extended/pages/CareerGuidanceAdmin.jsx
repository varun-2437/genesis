import React, { useState } from 'react'
import {
  Compass,
  Calendar,
  Users,
  Lock,
  CheckCircle,
  FileText,
  Clock,
  Shield,
  Search,
  Plus
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const COUNSELLING_SESSIONS = [
  {
    id: 'CG-501',
    studentName: 'Aarav Sharma',
    rollNo: '21CS042',
    department: 'CSE',
    mentor: 'Dr. Ramesh Kulkarni (Head TPO)',
    sessionDate: '2026-10-04',
    topic: 'Career Pathway (Product Engineer vs Higher Studies GRE)',
    notesRestricted: 'Confidential: Candidate prefers top tier US MS programme if Super Dream offer under 35 LPA.',
    outcome: 'Resolved: Decided to attend Microsoft and Amazon drives first.',
    status: 'Completed'
  },
  {
    id: 'CG-502',
    studentName: 'Sneha Patel',
    rollNo: '21ME031',
    department: 'MECH',
    mentor: 'Prof. S. Natarajan',
    sessionDate: '2026-10-12',
    topic: 'Interview Anxiety & GD Communication Clinics',
    notesRestricted: 'Action Plan: Assigned to weekly mock interview clinics (Batch B).',
    outcome: 'Scheduled for follow-up mock evaluation.',
    status: 'Scheduled'
  }
]

export function CareerGuidanceAdmin() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T24</span>
            <h1 className="text-2xl font-bold text-slate-900">Career Guidance & Counselling Admin</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Oversee one-on-one student career counselling (19.10), mentor assignments (19.11), and maintain restricted counselling records (19.13).
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Counselling Sessions"
          value="184 Held"
          icon={Compass}
          change="AY 2025-2026"
          trend="up"
        />
        <StatCard
          title="Active Faculty Mentors"
          value="24 Mentors"
          icon={Users}
          change="Across all departments"
          trend="neutral"
        />
        <StatCard
          title="Access Shield"
          value="Restricted"
          icon={Lock}
          change="Staff & Mentors only"
          trend="neutral"
        />
        <StatCard
          title="Student Satisfaction"
          value="96.2%"
          icon={CheckCircle}
          change="Post-session rating"
          trend="up"
        />
      </div>

      {/* Sessions Ledger */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Student Counselling & Mentorship Registry (19.10)</h3>
          <span className="text-xs text-slate-400">Restricted Privacy Safeguards</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Assigned Mentor</th>
              <th className="py-3 px-4">Focus Area</th>
              <th className="py-3 px-4">Restricted Notes (19.13)</th>
              <th className="py-3 px-4">Session Date</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {COUNSELLING_SESSIONS.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{s.studentName}</div>
                  <div className="text-[11px] text-slate-400">{s.rollNo} • {s.department}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-800">{s.mentor}</td>
                <td className="py-3.5 px-4 text-slate-700">{s.topic}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded border border-slate-200/60 font-mono text-[11px]">
                    <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate max-w-xs">{s.notesRestricted}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{s.sessionDate}</td>
                <td className="py-3.5 px-4 text-right">
                  <StatusBadge status={s.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
