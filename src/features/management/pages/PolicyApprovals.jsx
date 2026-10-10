import React, { useState } from 'react'
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  History,
  Scale,
  Calendar,
  Check,
  X,
  ShieldAlert
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const PENDING_POLICIES_M7 = [
  {
    id: 'POL-04',
    code: 'PL-OFFCAMPUS-2026',
    title: 'Revised Off-Campus Offer Declaration & NOC Norms',
    submittedBy: 'Dr. Ramesh Kulkarni (Head TPO)',
    submissionDate: '2026-10-08',
    urgency: 'High',
    version: 'v4.0',
    summary: 'Requires mandatory 72-hour student reporting for off-campus offers. Imposes an institutional verification protocol to ensure valid joining dates and prevent attendance fraud during final semester credits.',
    status: 'Pending Executive Approval',
    impactedStudents: 880,
    impactedDepts: 'All Engineering & MCA Departments'
  },
  {
    id: 'POL-05',
    code: 'PL-CTC-DREAM-EXP',
    title: 'Dream Offer CTC Ceiling Expansion (15 to 18 LPA)',
    submittedBy: 'Prof. S. Natarajan (TPO Advisory Board)',
    submissionDate: '2026-10-09',
    urgency: 'Medium',
    version: 'v1.1',
    summary: 'Proposes lifting the Dream category threshold from 15.0 LPA to 18.0 LPA in response to market inflation and salary benchmark shifts across product firms.',
    status: 'Pending Executive Approval',
    impactedStudents: 420,
    impactedDepts: 'CSE, IT, ECE'
  }
]

const APPROVED_POLICIES_HISTORY = [
  {
    id: 'POL-01',
    code: 'PL-DREAM-2026',
    title: 'Multiple Offer Policy (Dream / Super Dream)',
    approvedBy: 'Principal & Governing Council',
    approvalDate: '2026-08-01',
    version: 'v3.2',
    status: 'Approved & Active'
  },
  {
    id: 'POL-02',
    code: 'PL-PPO-CONV',
    title: 'Internship-to-PPO Conversion Protocol',
    approvedBy: 'Principal & Governing Council',
    approvalDate: '2026-07-15',
    version: 'v2.0',
    status: 'Approved & Active'
  }
]

export function PolicyApprovals() {
  const [pendingList, setPendingList] = useState(PENDING_POLICIES_M7)
  const [historyList, setHistoryList] = useState(APPROVED_POLICIES_HISTORY)
  const [rejectReasonModal, setRejectReasonModal] = useState(null)
  const [rejectNote, setRejectNote] = useState('')

  const handleApprove = (id) => {
    const item = pendingList.find(p => p.id === id)
    if (!item) return
    setPendingList(prev => prev.filter(p => p.id !== id))
    setHistoryList([
      {
        id: item.id,
        code: item.code,
        title: item.title,
        approvedBy: 'Principal (Executive Sign-off)',
        approvalDate: '2026-10-10 (Today)',
        version: item.version,
        status: 'Approved & Active'
      },
      ...historyList
    ])
  }

  const handleConfirmReject = () => {
    if (!rejectReasonModal) return
    setPendingList(prev => prev.filter(p => p.id !== rejectReasonModal.id))
    setRejectReasonModal(null)
    setRejectNote('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Management M7</span>
            <h1 className="text-2xl font-bold text-slate-900">Governance & Policy Sign-offs</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Executive approval workflow for institutional placement policies, eligibility gates, and disciplinary resolutions.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Awaiting Executive Sign-off"
          value={pendingList.length}
          icon={ShieldAlert}
          change="Pending Principal signature"
          trend={pendingList.length > 0 ? 'up' : 'neutral'}
        />
        <StatCard
          title="Ratified Policies in Force"
          value={historyList.length}
          icon={CheckCircle2}
          change="Fully enacted on portal"
          trend="up"
        />
        <StatCard
          title="Governance Authority"
          value="Principal / Board"
          icon={Scale}
          change="Highest statutory sign-off"
          trend="neutral"
        />
      </div>

      {/* Pending Items */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Policies Requiring Immediate Ratification ({pendingList.length})
          </h2>
          <span className="text-xs text-slate-400">Institutional Governance Workflow</span>
        </div>

        {pendingList.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            All submitted placement policies have been processed and ratified.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingList.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-amber-200/70 bg-amber-50/20 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {item.code}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      {item.version}
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-800 self-start sm:self-auto">
                    {item.urgency} Priority
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-white/70 p-3 rounded-lg border border-amber-100">
                  {item.summary}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span>Submitted by: <strong>{item.submittedBy}</strong></span>
                    <span>•</span>
                    <span>Date: {item.submissionDate}</span>
                    <span>•</span>
                    <span>Coverage: {item.impactedDepts}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRejectReasonModal(item)}
                      className="text-xs h-8 text-rose-600 border-rose-200 hover:bg-rose-50"
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Reject / Request Changes
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApprove(item.id)}
                      className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Ratify & Enact Policy
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historical Ratified Policies Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" />
            Executive Ratification History & Active Registry
          </h3>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Policy Code</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Version</th>
              <th className="py-3 px-4">Authorized By</th>
              <th className="py-3 px-4">Ratification Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {historyList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-mono font-medium text-slate-700">{item.code}</td>
                <td className="py-3 px-4 font-semibold text-slate-800">{item.title}</td>
                <td className="py-3 px-4">{item.version}</td>
                <td className="py-3 px-4 text-slate-600">{item.approvedBy}</td>
                <td className="py-3 px-4 font-mono text-slate-500">{item.approvalDate}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Enacted
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {rejectReasonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Return Policy for Revision
            </h3>
            <p className="text-xs text-slate-500">
              Provide constructive guidance for the TPO team regarding why <strong>{rejectReasonModal.code}</strong> cannot be ratified in its current form.
            </p>
            <textarea
              rows={3}
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder="e.g. Ensure grievance committee consultation is explicitly included in section 4..."
              className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setRejectReasonModal(null)}>
                Cancel
              </Button>
              <Button
                variant="default"
                className="bg-rose-600 hover:bg-rose-700"
                onClick={handleConfirmReject}
              >
                Send Back for Revisions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
