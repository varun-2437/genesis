import React, { useState } from 'react'
import {
  FileSpreadsheet,
  Filter,
  Calendar,
  Save,
  Download,
  Clock,
  CheckCircle2,
  Layers,
  Search,
  Plus
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

const AVAILABLE_FIELDS = [
  'Student Name', 'Roll Number', 'Department', 'CGPA', 'Backlog History',
  'Primary Placement Status', 'Company Recruited', 'Job Designation',
  'Total CTC (LPA)', 'Base Salary', 'Multiple Offers Flag', 'PPO Converted',
  'Internship Stipend', 'Gender Diversity Flag', 'Admission Category'
]

const SAVED_DEFINITIONS = [
  {
    id: 'RPT-DEF-01',
    name: 'Executive Board Annual Placement Summary',
    fieldsCount: 8,
    schedule: 'Weekly Every Monday 08:00 AM',
    recipient: 'Principal & Management Board',
    lastRun: '2026-10-06'
  },
  {
    id: 'RPT-DEF-02',
    name: 'NIRF Table 18.18 Placement & Higher Studies Audit',
    fieldsCount: 11,
    schedule: 'Monthly 1st Calendar Day',
    recipient: 'Dean Academics & Accreditation Cell',
    lastRun: '2026-10-01'
  }
]

export function CustomReportBuilder() {
  const [selectedFields, setSelectedFields] = useState([
    'Student Name', 'Roll Number', 'Department', 'Primary Placement Status', 'Company Recruited', 'Total CTC (LPA)'
  ])
  const [reportTitle, setReportTitle] = useState('')
  const [savedDefs, setSavedDefs] = useState(SAVED_DEFINITIONS)
  const [toast, setToast] = useState(false)

  const toggleField = (field) => {
    setSelectedFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    )
  }

  const handleSaveDef = (e) => {
    e.preventDefault()
    if (!reportTitle) return
    const created = {
      id: `RPT-DEF-0${savedDefs.length + 1}`,
      name: reportTitle,
      fieldsCount: selectedFields.length,
      schedule: 'On Demand (Manual Export)',
      recipient: 'Authorized TPO Operator',
      lastRun: 'Just now'
    }
    setSavedDefs([created, ...savedDefs])
    setReportTitle('')
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T31</span>
            <h1 className="text-2xl font-bold text-slate-900">Custom Report Builder & Automation</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Pick custom attributes and filters (18.19), save report schema definitions (24.14), and schedule recurring dispatches (18.21).
          </p>
        </div>
        <div className="flex items-center gap-3">
          {toast && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Definition saved to catalog
            </span>
          )}
          <Button variant="default" className="flex items-center gap-2 text-xs">
            <Download className="w-4 h-4" />
            Generate Custom Export ({selectedFields.length} Fields)
          </Button>
        </div>
      </div>

      {/* Field Selector Grid */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Select Dataset Fields to Include in Output</h3>
          <p className="text-xs text-slate-400 mt-0.5">Toggle attributes to construct tailored CSV/Excel extraction layouts</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {AVAILABLE_FIELDS.map((f) => {
            const isSelected = selectedFields.includes(f)
            return (
              <button
                key={f}
                type="button"
                onClick={() => toggleField(f)}
                className={`p-2.5 rounded-lg border text-xs text-left font-medium transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span>{f}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Saved Schemas Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Saved Report Definitions & Scheduled Dispatches (18.21)</h3>
          <span className="text-xs text-slate-400">Audit Log Tracked (18.22)</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Report Definition Name</th>
              <th className="py-3 px-4">Fields Configured</th>
              <th className="py-3 px-4">Dispatch Schedule</th>
              <th className="py-3 px-4">Target Recipient</th>
              <th className="py-3 px-4">Last Execution</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {savedDefs.map((def) => (
              <tr key={def.id} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-semibold text-slate-900">{def.name}</td>
                <td className="py-3.5 px-4">{def.fieldsCount} Columns Selected</td>
                <td className="py-3.5 px-4 font-medium text-indigo-600">{def.schedule}</td>
                <td className="py-3.5 px-4 text-slate-700">{def.recipient}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{def.lastRun}</td>
                <td className="py-3.5 px-4 text-right">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    Run Now
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
