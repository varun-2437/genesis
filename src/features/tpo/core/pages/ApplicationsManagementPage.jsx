import React, { useState } from 'react'
import { 
  GitPullRequest, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Search, 
  Layers, 
  ChevronRight,
  UserCheck
} from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'
import { APPLICATION_STATUS } from '@/lib/constants'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

export function ApplicationsManagementPage() {
  const { applications, drives, updateApplicationStatus, bulkUpdateApplications } = useTpoCoreStore()

  const [selectedDriveId, setSelectedDriveId] = useState(drives[0]?.id || '')
  const [activeTab, setActiveTab] = useState('ALL') // 'ALL' | 'IN_REVIEW' | 'SHORTLISTED' | 'REJECTED'
  const [selectedApps, setSelectedApps] = useState([])
  const [feedbackNotice, setFeedbackNotice] = useState('')

  const showNotice = (msg) => {
    setFeedbackNotice(msg)
    setTimeout(() => setFeedbackNotice(''), 4000)
  }

  // Filter applications by drive and tab status
  const currentDriveApps = applications.filter((app) => app.driveId === selectedDriveId)
  const filteredApps = currentDriveApps.filter((app) => {
    if (activeTab === 'ALL') return true
    return app.status === activeTab
  })

  // Bulk Shortlist (M8.13)
  const handleBulkShortlist = () => {
    if (!selectedApps.length) return
    bulkUpdateApplications(selectedApps, APPLICATION_STATUS.SHORTLISTED)
    showNotice(`Promoted ${selectedApps.length} candidates to Shortlisted status.`)
    setSelectedApps([])
  }

  // Bulk Reject (M8.13)
  const handleBulkReject = () => {
    if (!selectedApps.length) return
    bulkUpdateApplications(selectedApps, APPLICATION_STATUS.REJECTED)
    showNotice(`Marked ${selectedApps.length} candidates as Rejected.`)
    setSelectedApps([])
  }

  const toggleSelect = (id) => {
    setSelectedApps((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedApps.length === filteredApps.length) {
      setSelectedApps([])
    } else {
      setSelectedApps(filteredApps.map((a) => a.id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GitPullRequest className="w-6 h-6 text-indigo-600" /> Applications Management & Selection
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review applicant pools per campus drive, audit assessment scores, and execute bulk shortlisting or advancement.
          </p>
        </div>

        {/* Drive Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600 shrink-0">Active Drive:</label>
          <select
            value={selectedDriveId}
            onChange={(e) => {
              setSelectedDriveId(e.target.value)
              setSelectedApps([])
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
      </div>

      {feedbackNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* Tabs and Bulk Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          {['ALL', APPLICATION_STATUS.IN_REVIEW, APPLICATION_STATUS.SHORTLISTED, APPLICATION_STATUS.REJECTED].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.replace(/_/g, ' ')}
              </button>
            )
          )}
        </div>

        {/* Bulk Action Controls */}
        {selectedApps.length > 0 && (
          <div className="flex items-center gap-2 animate-in fade-in">
            <span className="text-xs font-semibold text-slate-600 mr-1">
              {selectedApps.length} selected:
            </span>
            <Button
              size="sm"
              onClick={handleBulkShortlist}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-1 px-2.5 gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Bulk Shortlist
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleBulkReject}
              className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs py-1 px-2.5 gap-1"
            >
              <XCircle className="w-3.5 h-3.5" /> Bulk Reject
            </Button>
          </div>
        )}
      </div>

      {/* Applications Roster */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedApps.length === filteredApps.length && filteredApps.length > 0}
              onChange={selectAll}
              className="rounded border-slate-300 text-indigo-600"
            />
            <span>Candidate Dossier</span>
          </div>
          <span>Round Status & Score</span>
          <span>Decision Action</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => {
              const isChecked = selectedApps.includes(app.id)
              return (
                <div
                  key={app.id}
                  className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                    isChecked ? 'bg-indigo-50/40' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelect(app.id)}
                      className="rounded border-slate-300 text-indigo-600"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{app.studentName}</span>
                        <span className="font-mono text-xs text-slate-400">[{app.registerNumber}]</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {app.department} • <strong className="text-slate-700">{app.cgpa} CGPA</strong>
                      </p>
                      {app.evaluatorNotes && (
                        <p className="text-[11px] text-slate-500 italic mt-1 bg-slate-50 p-1.5 rounded border border-slate-100 max-w-md">
                          Note: "{app.evaluatorNotes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <StatusBadge status={app.status} />
                    <p className="text-xs font-medium text-slate-700 mt-1">{app.currentRoundName}</p>
                    {app.roundScore !== null && (
                      <p className="text-[11px] font-bold text-emerald-700 mt-0.5">
                        Score: {app.roundScore}/100
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {app.status !== APPLICATION_STATUS.SHORTLISTED && (
                      <Button
                        size="sm"
                        onClick={() => {
                          updateApplicationStatus(app.id, APPLICATION_STATUS.SHORTLISTED)
                          showNotice(`Shortlisted ${app.studentName}.`)
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-1 px-2.5"
                      >
                        Shortlist
                      </Button>
                    )}
                    {app.status !== APPLICATION_STATUS.REJECTED && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          updateApplicationStatus(app.id, APPLICATION_STATUS.REJECTED, 'Candidate rejected at current stage.')
                          showNotice(`Rejected ${app.studentName}.`)
                        }}
                        className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs py-1 px-2.5"
                      >
                        Reject
                      </Button>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="p-12 text-center text-slate-400 text-sm">
              No candidates found matching the selected drive and status filter.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
