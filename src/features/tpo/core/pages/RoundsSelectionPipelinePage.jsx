import React, { useState } from 'react'
import { 
  GitMerge, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Star, 
  Award,
  ChevronRight,
  TrendingUp
} from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'
import { ROUND_TYPE, APPLICATION_STATUS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'

export function RoundsSelectionPipelinePage() {
  const { drives, jobs, applications, updateApplicationStatus } = useTpoCoreStore()

  const [selectedDriveId, setSelectedDriveId] = useState(drives[0]?.id || '')
  const [selectedRoundIndex, setSelectedRoundIndex] = useState(1) // 0-indexed round
  const [statusMessage, setStatusMessage] = useState('')

  const activeDrive = drives.find((d) => d.id === selectedDriveId) || drives[0]
  const activeJob = jobs.find((j) => j.id === activeDrive?.jobId) || jobs[0]
  const rounds = activeJob?.selectionRounds || []

  // Candidates in active drive
  const driveApps = applications.filter((a) => a.driveId === selectedDriveId)

  const showStatus = (msg) => {
    setStatusMessage(msg)
    setTimeout(() => setStatusMessage(''), 4000)
  }

  // Promote to Next Round (M9.15)
  const handlePromoteCandidate = (app) => {
    const nextRoundIndex = selectedRoundIndex + 1
    if (nextRoundIndex < rounds.length) {
      const nextRound = rounds[nextRoundIndex]
      updateApplicationStatus(
        app.id,
        APPLICATION_STATUS.IN_REVIEW,
        `Promoted to ${nextRound.name}`
      )
      showStatus(`Promoted ${app.studentName} to ${nextRound.name}.`)
    } else {
      // Final Round Reached -> Final Selection (M9.17)
      updateApplicationStatus(
        app.id,
        APPLICATION_STATUS.SELECTED,
        'Final offer extended!'
      )
      showStatus(`🎉 Final Selection! Offer extended to ${app.studentName}.`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GitMerge className="w-6 h-6 text-indigo-600" /> Rounds & Candidate Selection Pipeline
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Visual stage-by-stage hiring funnel. Track candidates moving across technical assessments, interviews, and final offers.
          </p>
        </div>

        {/* Drive Selector */}
        <select
          value={selectedDriveId}
          onChange={(e) => {
            setSelectedDriveId(e.target.value)
            setSelectedRoundIndex(0)
          }}
          className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          {drives.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.companyName})
            </option>
          ))}
        </select>
      </div>

      {statusMessage && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Visual Rounds Pipeline Stepper (M9.1 to M9.11) */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[700px]">
          {rounds.map((round, idx) => {
            const isSelected = selectedRoundIndex === idx
            return (
              <React.Fragment key={round.id}>
                <button
                  onClick={() => setSelectedRoundIndex(idx)}
                  className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isSelected ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      Stage {idx + 1}
                    </span>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? 'bg-white text-indigo-600' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs font-bold mt-1 truncate">{round.name}</p>
                  <p
                    className={`text-[10px] truncate ${
                      isSelected ? 'text-indigo-100' : 'text-slate-500'
                    }`}
                  >
                    {round.type.replace(/_/g, ' ')}
                  </p>
                </button>

                {idx < rounds.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Active Stage Candidate Bench */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Candidates in {rounds[selectedRoundIndex]?.name || 'Current Stage'}
            </h3>
            <p className="text-xs text-slate-500">
              Evaluate performance scorecards and advance qualified students to next stage
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
            {driveApps.length} Candidates in Pipeline
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {driveApps.map((app) => (
            <div key={app.id} className="p-4 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{app.studentName}</span>
                  <span className="font-mono text-xs text-slate-400">[{app.registerNumber}]</span>
                  <StatusBadge status={app.status} />
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span>{app.department}</span>
                  <span>•</span>
                  <span>CGPA: <strong>{app.cgpa}</strong></span>
                  {app.roundScore !== null && (
                    <>
                      <span>•</span>
                      <span className="font-bold text-emerald-700">Score: {app.roundScore}%</span>
                    </>
                  )}
                </div>
                {app.evaluatorNotes && (
                  <p className="text-[11px] text-slate-500 italic mt-0.5">
                    Evaluator: "{app.evaluatorNotes}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => handlePromoteCandidate(app)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5 py-1 px-3 shadow-xs"
                >
                  <span>Advance to Next Round</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
