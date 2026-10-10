import React, { useState } from 'react'
import { StatusBadge, Button, Modal, Input } from '@/components/ui'
import { ShieldCheck, CheckCircle2, AlertTriangle, Scale, Plus } from 'lucide-react'

export function TpoEligibilityRulesPage() {
  const [rules, setRules] = useState([
    {
      id: 1,
      tier: 'Super Dream Category (>15 LPA)',
      minCgpa: 8.0,
      maxBacklogs: 0,
      allowedBranches: 'All Circuit Branches (CSE, IT, ECE, EEE, AI&DS)',
      exceptionsAllowed: 'With Dean Approval Only',
    },
    {
      id: 2,
      tier: 'Dream Category (8 – 15 LPA)',
      minCgpa: 7.5,
      maxBacklogs: 0,
      allowedBranches: 'All Engineering Streams',
      exceptionsAllowed: 'HOD Recommendation Permitted',
    },
    {
      id: 3,
      tier: 'Regular / Mass Recruiter (Up to 8 LPA)',
      minCgpa: 6.5,
      maxBacklogs: 1,
      allowedBranches: 'All Registered Eligible Students',
      exceptionsAllowed: 'Automatic',
    },
  ])

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Institutional Eligibility Rules Engine (T11)</h2>
        <p className="text-xs text-slate-500 mt-1">
          Automated rule gates (M7.1–7.16) for CGPA cutoffs, active backlogs, dream package policy, and exception approvals.
        </p>
      </div>

      <div className="space-y-4">
        {rules.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{r.tier}</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">Departments: {r.allowedBranches}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Active Rule
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block">Minimum Cutoff CGPA:</span>
                <span className="font-bold text-slate-800">{r.minCgpa} / 10.0</span>
              </div>
              <div>
                <span className="text-slate-400 block">Permitted Active Backlogs:</span>
                <span className="font-bold text-slate-800">{r.maxBacklogs}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Manual Exception Policy (7.9):</span>
                <span className="font-bold text-slate-800">{r.exceptionsAllowed}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
