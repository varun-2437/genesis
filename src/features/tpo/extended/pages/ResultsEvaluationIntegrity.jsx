import React, { useState } from 'react'
import {
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Download,
  Eye,
  ShieldAlert,
  Send,
  UserCheck
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const INITIAL_SUBMISSIONS = [
  {
    id: 'SUB-901',
    studentName: 'Aarav Sharma',
    rollNo: '21CS042',
    department: 'CSE',
    testName: 'Microsoft Campus Screening 2026',
    score: 92,
    maxScore: 100,
    evaluatedDescriptive: true,
    codingPassed: '4/4 Testcases',
    suspiciousFlags: 0,
    status: 'Shortlisted'
  },
  {
    id: 'SUB-902',
    studentName: 'Sneha Patel',
    rollNo: '21ME031',
    department: 'MECH',
    testName: 'Goldman Sachs Diagnostic',
    score: 64,
    maxScore: 100,
    evaluatedDescriptive: true,
    codingPassed: '2/4 Testcases',
    suspiciousFlags: 1,
    status: 'Qualified'
  },
  {
    id: 'SUB-903',
    studentName: 'Karthik Rao',
    rollNo: '21IT055',
    department: 'IT',
    testName: 'Microsoft Campus Screening 2026',
    score: 41,
    maxScore: 100,
    evaluatedDescriptive: true,
    codingPassed: '1/4 Testcases',
    suspiciousFlags: 4,
    status: 'Flagged / Suspicious'
  },
  {
    id: 'SUB-904',
    studentName: 'Ananya Iyer',
    rollNo: '21IT019',
    department: 'IT',
    testName: 'Microsoft Campus Screening 2026',
    score: 88,
    maxScore: 100,
    evaluatedDescriptive: true,
    codingPassed: '4/4 Testcases',
    suspiciousFlags: 0,
    status: 'Shortlisted'
  }
]

export function ResultsEvaluationIntegrity() {
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [inspectModal, setInspectModal] = useState(null)

  const filtered = submissions.filter((s) => {
    const matchesSearch =
      s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.testName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleClearFlag = (id) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, suspiciousFlags: 0, status: 'Qualified' } : s))
    if (inspectModal?.id === id) {
      setInspectModal(prev => ({ ...prev, suspiciousFlags: 0, status: 'Qualified' }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T17</span>
            <h1 className="text-2xl font-bold text-slate-900">Results, Evaluation & Anti-Cheat Integrity</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Review auto-scored tests, grade coding sandbox submissions, and audit suspicious tab-switch activity logs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" className="flex items-center gap-2 text-xs">
            <Send className="w-4 h-4" />
            Publish Results to Students & Recruiters
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assessed Submissions"
          value={submissions.length}
          icon={Award}
          change="Auto-graded via sandbox"
          trend="up"
        />
        <StatCard
          title="Shortlisted Candidates"
          value={submissions.filter(s => s.status === 'Shortlisted').length}
          icon={UserCheck}
          change="Eligible for next round"
          trend="up"
        />
        <StatCard
          title="Cheating / Tab Flags"
          value={submissions.filter(s => s.suspiciousFlags > 0).length}
          icon={ShieldAlert}
          change="Review required"
          trend="neutral"
        />
        <StatCard
          title="Average Score"
          value="71.2 / 100"
          icon={CheckCircle2}
          change="Normal distribution"
          trend="up"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student, roll number, or assessment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs text-slate-500">
          <span>Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Qualified">Qualified</option>
            <option value="Flagged / Suspicious">Flagged / Suspicious</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Assessment</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Coding Pass Rate</th>
                <th className="py-3 px-4">Proctoring Flags</th>
                <th className="py-3 px-4">Decision</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{sub.studentName}</div>
                    <div className="text-[11px] text-slate-400">{sub.rollNo} • {sub.department}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {sub.testName}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-indigo-600">
                    {sub.score} / {sub.maxScore}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 font-semibold">
                    {sub.codingPassed}
                  </td>
                  <td className="py-3.5 px-4">
                    {sub.suspiciousFlags > 0 ? (
                      <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> {sub.suspiciousFlags} Tab Switches
                      </span>
                    ) : (
                      <span className="text-emerald-600 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Clean Attempt
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7"
                      onClick={() => setInspectModal(sub)}
                    >
                      Audit Log
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proctoring Log Audit Modal */}
      {inspectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Integrity Audit: {inspectModal.studentName} ({inspectModal.rollNo})
                </h3>
                <p className="text-xs text-slate-500">{inspectModal.testName}</p>
              </div>
              <StatusBadge status={inspectModal.status} />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
              <div className="font-semibold text-slate-800">Proctoring Telemetry Events:</div>
              {inspectModal.suspiciousFlags > 0 ? (
                <div className="space-y-1.5 text-rose-700">
                  <div>• 10:24:12 AM - Browser lost focus / window minimized (Duration: 14s)</div>
                  <div>• 10:35:48 AM - Secondary display mouse boundary detected</div>
                  <div>• 10:51:02 AM - Paste buffer access in coding problem 2</div>
                </div>
              ) : (
                <div className="text-emerald-700">
                  No anomalous keystroke intervals, camera occlusions, or window focus drops recorded.
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="ghost" onClick={() => setInspectModal(null)}>
                Close
              </Button>
              {inspectModal.suspiciousFlags > 0 && (
                <Button
                  variant="default"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleClearFlag(inspectModal.id)}
                >
                  Clear Flag & Authorize Result
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
