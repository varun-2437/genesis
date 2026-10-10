import React, { useState } from 'react'
import { Sliders, CheckCircle2, XCircle, AlertTriangle, Play, RefreshCw } from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'
import { DEPARTMENTS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'

export function EligibilityRulesPage() {
  const { students } = useTpoCoreStore()

  // Rule State (M7.1 to M7.14)
  const [minCgpa, setMinCgpa] = useState(7.5)
  const [allowActiveBacklogs, setAllowActiveBacklogs] = useState(false)
  const [maxHistoricalBacklogs, setMaxHistoricalBacklogs] = useState(1)
  const [allowPlacedStudents, setAllowPlacedStudents] = useState(false)
  const [minOfferUpgradePercentage, setMinOfferUpgradePercentage] = useState(150) // Dream policy: 1.5x of current offer
  const [selectedDepts, setSelectedDepts] = useState([
    DEPARTMENTS[0], // CSE
    DEPARTMENTS[1], // IT
    DEPARTMENTS[8], // Data Science & AI
  ])

  // Evaluated Simulation
  const evaluateStudent = (student) => {
    const reasons = []

    // CGPA check
    if (student.cgpa < minCgpa) {
      reasons.push(`CGPA ${student.cgpa} is below minimum cutoff of ${minCgpa}`)
    }

    // Active backlogs check
    if (!allowActiveBacklogs && student.activeBacklogs > 0) {
      reasons.push(`Has ${student.activeBacklogs} active arrears (policy permits 0)`)
    }

    // Historical backlogs check
    if (student.historicalBacklogs > maxHistoricalBacklogs) {
      reasons.push(`Historical arrears (${student.historicalBacklogs}) exceed limit of ${maxHistoricalBacklogs}`)
    }

    // Department eligibility
    if (!selectedDepts.includes(student.department)) {
      reasons.push(`Department '${student.department}' is not in the eligible branches list`)
    }

    // Dream / Placed student policy
    if (student.placementStatus === 'PLACED') {
      if (!allowPlacedStudents) {
        reasons.push('Already placed student (single-offer strict policy)')
      } else {
        // Can apply if dream policy permits
        if (!student.eligibleForDream) {
          reasons.push('Not eligible for Dream/Higher Package Upgrade upgrade policy')
        }
      }
    }

    return {
      isEligible: reasons.length === 0,
      reasons,
    }
  }

  const evaluatedStudents = students.map((s) => ({
    student: s,
    ...evaluateStudent(s),
  }))

  const eligibleCount = evaluatedStudents.filter((e) => e.isEligible).length
  const ineligibleCount = evaluatedStudents.length - eligibleCount

  const handleToggleDept = (dept) => {
    setSelectedDepts((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Sliders className="w-6 h-6 text-indigo-600" /> Placement Eligibility Rules Engine
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure institutional cutoff parameters, backlogs, branch criteria and preview real-time candidate eligibility.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rules Config Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Rule Parameters
            </h3>

            {/* Min CGPA */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Minimum CGPA Threshold</label>
                <span className="text-xs font-bold text-indigo-600">{minCgpa}</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="9.5"
                step="0.1"
                value={minCgpa}
                onChange={(e) => setMinCgpa(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Arrears Policy */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Arrears / Backlog Rules</label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowActiveBacklogs}
                  onChange={(e) => setAllowActiveBacklogs(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span>Allow Candidates with Active Arrears</span>
              </label>

              <div className="pt-1">
                <label className="text-[11px] text-slate-500 block mb-1">Max Historical Arrears Cleared</label>
                <select
                  value={maxHistoricalBacklogs}
                  onChange={(e) => setMaxHistoricalBacklogs(parseInt(e.target.value, 10))}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2"
                >
                  <option value={0}>0 Historical Arrears (Strict Zero)</option>
                  <option value={1}>Max 1 Cleared Arrear</option>
                  <option value={2}>Max 2 Cleared Arrears</option>
                  <option value={5}>No Restriction on Historical Arrears</option>
                </select>
              </div>
            </div>

            {/* Offer Restrictions (M7.11 & M7.12) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-700 block">Dream Company & Multiple Offer Policy</label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowPlacedStudents}
                  onChange={(e) => setAllowPlacedStudents(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span>Allow Placed Students to Apply for Dream Drives</span>
              </label>
            </div>

            {/* Eligible Departments */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-700 block">Eligible Academic Departments</label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {DEPARTMENTS.map((dept) => (
                  <label
                    key={dept}
                    className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDepts.includes(dept)}
                      onChange={() => handleToggleDept(dept)}
                      className="rounded border-slate-300 text-indigo-600"
                    />
                    <span className="truncate">{dept}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Simulator Preview */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Eligible Students</p>
                <p className="text-3xl font-extrabold text-emerald-900 mt-1">{eligibleCount}</p>
                <p className="text-[11px] text-emerald-700">
                  {Math.round((eligibleCount / (students.length || 1)) * 100)}% of cohort qualified
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">Ineligible Students</p>
                <p className="text-3xl font-extrabold text-rose-900 mt-1">{ineligibleCount}</p>
                <p className="text-[11px] text-rose-700">Excluded based on current rules</p>
              </div>
              <XCircle className="w-8 h-8 text-rose-600" />
            </div>
          </div>

          {/* Student Evaluation Results */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Live Cohort Eligibility Evaluation
              </h3>
              <span className="text-xs text-slate-500 font-mono">Evaluating {students.length} students</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {evaluatedStudents.map(({ student, isEligible, reasons }) => (
                <div key={student.id} className="p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{student.name}</span>
                      <span className="font-mono text-xs text-slate-500">[{student.registerNumber}]</span>
                      <span className="text-xs text-slate-400">• {student.department}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <span>CGPA: <strong>{student.cgpa}</strong></span>
                      <span>•</span>
                      <span>Active Arrears: <strong>{student.activeBacklogs}</strong></span>
                      <span>•</span>
                      <span>Status: <strong>{student.placementStatus}</strong></span>
                    </div>

                    {!isEligible && (
                      <div className="pt-1.5 space-y-1">
                        {reasons.map((r, i) => (
                          <div key={i} className="text-xs text-rose-700 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${
                      isEligible
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {isEligible ? 'QUALIFIED' : 'INELIGIBLE'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
