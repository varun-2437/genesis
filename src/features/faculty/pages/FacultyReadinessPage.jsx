import React, { useState } from 'react'
import { Users, AlertTriangle, CheckCircle2, Sparkles, Filter, FileText } from 'lucide-react'
import { useFacultyStore } from '../facultyStore'
import { Button } from '@/components/ui/Button'

export function FacultyReadinessPage() {
  const { studentsReadiness } = useFacultyStore()
  const [filter, setFilter] = useState('ALL')

  const filtered = studentsReadiness.filter((s) => {
    if (filter === 'ALL') return true
    return s.status === filter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" /> Department Student Readiness & Skill Gap Radar
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Detect academic backlogs, target skill deficiencies, and plan personalized faculty mentoring.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          {['ALL', 'HIGH_READINESS', 'MODERATE', 'NEEDS_REMEDIAL'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((stu) => (
          <div
            key={stu.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4 hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{stu.name}</h3>
                  <span className="font-mono text-xs text-slate-400">[{stu.registerNumber}]</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  CGPA: <strong>{stu.cgpa}</strong> • Backlogs: <strong>{stu.activeBacklogs}</strong>
                </p>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  stu.status === 'HIGH_READINESS'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : stu.status === 'NEEDS_REMEDIAL'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {stu.readinessScore}% Ready
              </span>
            </div>

            {/* Identified Skill Gaps (M12.17, 21.10) */}
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Target Skill Deficiencies & Action Plan:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {stu.skillGaps.map((gap, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded text-[11px]"
                  >
                    {gap}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-medium">Status: {stu.placementStatus}</span>
              <Button size="sm" variant="outline" className="text-xs text-indigo-600 border-indigo-200">
                Assign Remedial Trainer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
