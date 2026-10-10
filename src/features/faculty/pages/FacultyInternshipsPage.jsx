import React, { useState } from 'react'
import { BookOpen, CheckCircle2, XCircle, Clock, FileText, Check, AlertCircle } from 'lucide-react'
import { useFacultyStore } from '../facultyStore'
import { Button } from '@/components/ui/Button'

export function FacultyInternshipsPage() {
  const { internships, updateInternshipStatus } = useFacultyStore()
  const [notice, setNotice] = useState('')

  const handleAction = (id, studentName, status) => {
    updateInternshipStatus(id, status)
    setNotice(
      status === 'APPROVED'
        ? `NOC granted & internship approved for ${studentName}.`
        : `Internship application returned for revision for ${studentName}.`
    )
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" /> Internship Monitoring & Faculty NOC Approvals
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review student internship offers, issue official No Objection Certificates (NOC), and track mentor progress reports.
        </p>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Internships List */}
      <div className="space-y-3">
        {internships.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base">{item.studentName}</span>
                <span className="font-mono text-xs text-slate-400">[{item.registerNumber}]</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    item.status === 'APPROVED'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                Host Organization: <span className="text-indigo-600">{item.company}</span> • Stipend: {item.stipend}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>Duration: {item.duration}</span>
                <span>•</span>
                <span>Assigned Faculty Mentor: {item.facultyMentor}</span>
                <span>•</span>
                <span>Monthly Reports Submitted: {item.monthlyReportsSubmitted}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {item.status !== 'APPROVED' && (
                <Button
                  size="sm"
                  onClick={() => handleAction(item.id, item.studentName, 'APPROVED')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" /> Issue NOC Approval
                </Button>
              )}
              {item.status !== 'REJECTED' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(item.id, item.studentName, 'REJECTED')}
                  className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs"
                >
                  Request Clarification
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
