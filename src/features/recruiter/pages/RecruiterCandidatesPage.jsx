import React, { useState } from 'react'
import { Users, FileText, CheckCircle2, XCircle, Eye, Sparkles, Filter } from 'lucide-react'
import { useRecruiterStore } from '../recruiterStore'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/shared/Drawer'

export function RecruiterCandidatesPage() {
  const { candidates } = useRecruiterStore()
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [departmentFilter, setDepartmentFilter] = useState('ALL')

  const filteredCandidates = candidates.filter((c) => {
    if (departmentFilter !== 'ALL' && c.department !== departmentFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" /> Authorized Eligible Candidates & Resumes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Access authorized student dossiers, certified resumes, and AI job-competency matching scores.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Department:</label>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700"
          >
            <option value="ALL">All Departments</option>
            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
            <option value="Information Technology">Information Technology</option>
          </select>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCandidates.map((cand) => (
          <div
            key={cand.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4 hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{cand.name}</h3>
                  <span className="font-mono text-xs text-slate-400">[{cand.registerNumber}]</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{cand.department}</p>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-bold">
                  <Sparkles className="w-3 h-3 text-indigo-600" /> AI Match: {cand.aiMatchScore}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center text-xs">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Cumulative CGPA</p>
                <p className="font-bold text-slate-900 mt-0.5">{cand.cgpa}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Current Round</p>
                <p className="font-semibold text-slate-800 mt-0.5 truncate">{cand.currentRound}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Assessment</p>
                <p className="font-bold text-emerald-700 mt-0.5">{cand.roundScore}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500 font-medium">Slot: {cand.interviewSlot}</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedCandidate(cand)}
                  className="text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50 gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View Profile & Resume
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Profile Drawer */}
      <Drawer
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        title={selectedCandidate?.name || 'Candidate Dossier'}
        subtitle={`Reg: ${selectedCandidate?.registerNumber} • ${selectedCandidate?.department}`}
        size="md"
      >
        {selectedCandidate && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Academic Benchmarks</h4>
              <p>CGPA: <strong>{selectedCandidate.cgpa} / 10.0</strong></p>
              <p>Active Stage: <strong>{selectedCandidate.currentRound}</strong></p>
              <p>AI Alignment Score: <strong>{selectedCandidate.aiMatchScore}% Match</strong></p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Certified Placement Resume</h4>
              <p className="text-slate-500">Authorized by Institutional Placement Officer for Campus Hiring</p>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5 mt-2">
                <FileText className="w-3.5 h-3.5" /> Download Authorized Resume
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
