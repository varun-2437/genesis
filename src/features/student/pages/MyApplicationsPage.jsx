import React, { useState } from 'react'
import { StatusBadge, Button, Modal } from '@/components/ui'
import { Briefcase, Building2, Calendar, Clock, CheckCircle2, AlertTriangle, X } from 'lucide-react'

export function MyApplicationsPage() {
  const [applications, setApplications] = useState([
    {
      id: 'app-101',
      company: 'Google Cloud India',
      role: 'Associate Cloud Engineer',
      ctc: '₹ 18.0 LPA',
      appliedOn: 'Oct 08, 2026',
      status: 'SHORTLISTED',
      currentRound: 'Round 2: Technical Interview 1',
      scheduledAt: 'Tomorrow, Oct 11 at 10:30 AM',
      resumeUsed: 'Varun_Murugesh_Cloud_SDE.pdf',
      canWithdraw: false,
    },
    {
      id: 'app-102',
      company: 'Oracle Corporation',
      role: 'Software Developer 1',
      ctc: '₹ 14.5 LPA',
      appliedOn: 'Oct 05, 2026',
      status: 'IN_REVIEW',
      currentRound: 'Round 1: Online Coding Test',
      scheduledAt: 'Oct 14, 2026 at 02:00 PM',
      resumeUsed: 'Varun_Murugesh_Cloud_SDE.pdf',
      canWithdraw: true,
    },
    {
      id: 'app-103',
      company: 'Cognizant',
      role: 'GenC Next Developer',
      ctc: '₹ 6.75 LPA',
      appliedOn: 'Sep 28, 2026',
      status: 'SELECTED',
      currentRound: 'Final Selection Approved',
      scheduledAt: 'Offer Letter Released',
      resumeUsed: 'Varun_Systems_DevOps.pdf',
      canWithdraw: false,
    },
    {
      id: 'app-104',
      company: 'Amazon Web Services',
      role: 'Cloud Support Associate',
      ctc: '₹ 12.0 LPA',
      appliedOn: 'Sep 20, 2026',
      status: 'REJECTED',
      currentRound: 'Aptitude Round Screening',
      scheduledAt: 'Completed',
      resumeUsed: 'Varun_Murugesh_Cloud_SDE.pdf',
      canWithdraw: false,
    },
  ])

  const [withdrawModal, setWithdrawModal] = useState({ open: false, app: null })

  const handleWithdrawConfirm = () => {
    if (!withdrawModal.app) return
    setApplications(
      applications.map((a) =>
        a.id === withdrawModal.app.id ? { ...a, status: 'WITHDRAWN', canWithdraw: false } : a
      )
    )
    setWithdrawModal({ open: false, app: null })
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Applications Tracker</h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor your application lifecycle, round-wise evaluation status, and drive schedules.
        </p>
      </div>

      {/* Applications Cards */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-slate-900">{app.company}</h3>
                <StatusBadge status={app.status} />
              </div>
              <p className="text-xs font-semibold text-slate-700">
                {app.role} · <span className="text-indigo-600 font-bold">{app.ctc}</span>
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Applied: {app.appliedOn}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" /> {app.currentRound}
                </span>
                <span className="text-slate-400">({app.scheduledAt})</span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              {app.canWithdraw && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setWithdrawModal({ open: true, app })}
                  className="text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                >
                  Withdraw Application
                </Button>
              )}
              {app.status === 'SELECTED' && (
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                  View Offer
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Withdraw Modal */}
      <Modal
        isOpen={withdrawModal.open}
        onClose={() => setWithdrawModal({ open: false, app: null })}
        title="Withdraw Application"
        size="sm"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setWithdrawModal({ open: false, app: null })}>
              Keep Application
            </Button>
            <Button variant="danger" size="sm" onClick={handleWithdrawConfirm}>
              Confirm Withdrawal
            </Button>
          </>
        }
      >
        <div className="space-y-2 text-xs text-slate-600">
          <p>
            Are you sure you want to withdraw your application for <strong>{withdrawModal.app?.company}</strong>?
          </p>
          <p className="text-rose-600 font-medium">
            Note: As per placement rules, you will not be permitted to re-apply for this drive cycle once withdrawn.
          </p>
        </div>
      </Modal>
    </div>
  )
}
