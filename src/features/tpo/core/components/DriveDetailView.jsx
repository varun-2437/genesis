import React, { useState } from 'react'
import { Calendar, MapPin, Users, CheckCircle2, Clock, Award, FileText, ChevronRight } from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

export function DriveDetailView({ drive }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview & Schedule' },
    { id: 'ppt', label: 'Pre-Placement Talk (PPT)' },
    { id: 'logistics', label: 'Venue & Facilities' },
    { id: 'stages', label: 'Rounds Progress' },
  ]

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{drive.name}</h3>
            <p className="text-xs text-slate-500">
              Company: <span className="font-semibold text-slate-700">{drive.companyName}</span>
            </p>
          </div>
          <StatusBadge status={drive.status} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Registrations
              </span>
              <span className="text-lg font-bold text-indigo-700">{drive.totalRegistered} Candidates</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Target Role
              </span>
              <span className="text-sm font-semibold text-slate-800">{drive.jobTitle}</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Date Span
              </span>
              <span className="text-sm font-semibold text-slate-800">
                {drive.startDate} to {drive.endDate}
              </span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Drive Format
              </span>
              <span className="text-sm font-semibold text-slate-800">{drive.type}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-600">
            <p className="font-bold text-slate-800 uppercase tracking-wider">Faculty In-Charge</p>
            <p className="font-semibold text-slate-900">{drive.coordinatorName}</p>
            <p className="text-slate-500">{drive.coordinatorPhone}</p>
          </div>
        </div>
      )}

      {/* Tab 2: PPT */}
      {activeTab === 'ppt' && (
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-sm">Company Pre-Placement Talk</h4>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 font-semibold text-[10px]">
              Scheduled
            </span>
          </div>
          <p className="text-slate-600">
            Interactive presentation by HR & leadership team explaining work culture, compensation structure, and training expectations.
          </p>
          <div className="p-3 bg-slate-50 rounded-lg space-y-1">
            <p><strong>Scheduled Slot:</strong> {drive.pptDateTime || '2026-10-12 09:30 AM'}</p>
            <p><strong>Venue:</strong> Newton Auditorium (Capacity 500)</p>
          </div>
        </div>
      )}

      {/* Tab 3: Logistics */}
      {activeTab === 'logistics' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
            <p className="font-bold text-slate-800">Assigned Labs & Workstations</p>
            <p className="text-slate-600">Turing Computing Lab 1 (120 Systems with high-speed internet & proctoring software)</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
            <p className="font-bold text-slate-800">Interview Cubicles</p>
            <p className="text-slate-600">Placement Block Interview Rooms #1 to #6 assigned with video conferencing backup.</p>
          </div>
        </div>
      )}

      {/* Tab 4: Stages */}
      {activeTab === 'stages' && (
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-bold text-indigo-900">Current Active Round: {drive.currentRound}</p>
              <p className="text-indigo-700 text-[11px]">Round {drive.currentRoundNumber} of {drive.totalRounds}</p>
            </div>
            <span className="px-2 py-1 bg-indigo-600 text-white rounded text-[10px] font-bold">
              IN PROGRESS
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
