import React, { useState } from 'react'
import { 
  UserCheck, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Bell,
  Send,
  Eye
} from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { VERIFICATION_STATUS } from '@/lib/constants'

// Initial mock pending items for verification queues (M2.14, M2.17, M3.4, M3.10, M3.11)
const INITIAL_VERIFICATION_QUEUES = {
  profileChanges: [
    {
      id: 'pc-1',
      studentId: 'stu-5',
      name: 'Karthik Raja',
      registerNumber: '22CS188',
      field: 'Arrears / Backlogs',
      oldValue: '2 Active Backlogs',
      newValue: '1 Active Backlog (Cleared Math-III)',
      submittedDate: '2026-10-09',
      supportingDoc: 'grade_sheet_sem4_reval.pdf',
    },
    {
      id: 'pc-2',
      studentId: 'stu-3',
      name: 'Rohan Deshmukh',
      registerNumber: '22IT118',
      field: 'CGPA Update',
      oldValue: '7.80 CGPA',
      newValue: '7.92 CGPA (Sem 6 Grade Card)',
      submittedDate: '2026-10-08',
      supportingDoc: 'sem6_official_transcript.pdf',
    },
  ],
  resumes: [
    {
      id: 'res-1',
      studentId: 'stu-4',
      name: 'Sneha Venkatesh',
      registerNumber: '22EC109',
      resumeTitle: 'Embedded Systems & Firmware Specialist Resume v2',
      version: 'v2.1',
      submittedDate: '2026-10-09',
      fileSize: '420 KB',
      aiScore: '92/100',
    },
    {
      id: 'res-2',
      studentId: 'stu-1',
      name: 'Aditya Vardhan',
      registerNumber: '22CS104',
      resumeTitle: 'Google SDE Customized Resume',
      version: 'v1.4',
      submittedDate: '2026-10-10',
      fileSize: '310 KB',
      aiScore: '96/100',
    },
  ],
  documents: [
    {
      id: 'doc-1',
      studentId: 'stu-4',
      name: 'Sneha Venkatesh',
      registerNumber: '22EC109',
      docType: '10th & 12th Consolidated Marksheet',
      fileName: 'sneha_10th_12th_verified.pdf',
      submittedDate: '2026-10-07',
      status: VERIFICATION_STATUS.PENDING,
    },
    {
      id: 'doc-2',
      studentId: 'stu-5',
      name: 'Karthik Raja',
      registerNumber: '22CS188',
      docType: 'Income Certificate (Fee Concession)',
      fileName: 'income_cert_2026.pdf',
      submittedDate: '2026-10-08',
      status: VERIFICATION_STATUS.REQUIRES_UPDATE,
    },
  ],
  missingDocs: [
    {
      id: 'md-1',
      studentId: 'stu-5',
      name: 'Karthik Raja',
      registerNumber: '22CS188',
      department: 'Computer Science and Engineering',
      missing: ['Semester 5 Grade Card', 'Pre-placement Training Undertaking'],
    },
    {
      id: 'md-2',
      studentId: 'stu-4',
      name: 'Sneha Venkatesh',
      registerNumber: '22EC109',
      department: 'Electronics and Communication',
      missing: ['Government Photo ID (Aadhaar / Passport)'],
    },
  ],
}

export function VerificationCentrePage() {
  const { students, updateStudentVerification } = useTpoCoreStore()

  const [activeQueue, setActiveQueue] = useState('profiles') // 'profiles' | 'resumes' | 'documents' | 'missing'
  const [queues, setQueues] = useState(INITIAL_VERIFICATION_QUEUES)
  const [actionNotice, setActionNotice] = useState('')

  const showNotice = (msg) => {
    setActionNotice(msg)
    setTimeout(() => setActionNotice(''), 4000)
  }

  // Handle Profile Change Approval (M2.17)
  const handleProfileApproval = (id, approved, studentId) => {
    setQueues((prev) => ({
      ...prev,
      profileChanges: prev.profileChanges.filter((item) => item.id !== id),
    }))
    if (approved) {
      updateStudentVerification(studentId, VERIFICATION_STATUS.VERIFIED)
      showNotice(`Approved profile modification for student. Record updated.`)
    } else {
      updateStudentVerification(studentId, VERIFICATION_STATUS.REQUIRES_UPDATE)
      showNotice(`Rejected profile modification. Request sent back for correction.`)
    }
  }

  // Handle Resume Approval (M3.4)
  const handleResumeApproval = (id, approved, studentName) => {
    setQueues((prev) => ({
      ...prev,
      resumes: prev.resumes.filter((item) => item.id !== id),
    }))
    showNotice(
      approved
        ? `Verified and certified resume for ${studentName}.`
        : `Flagged resume for revision for ${studentName}.`
    )
  }

  // Handle Document Approval (M3.10)
  const handleDocumentApproval = (id, approved, studentId) => {
    setQueues((prev) => ({
      ...prev,
      documents: prev.documents.filter((item) => item.id !== id),
    }))
    if (approved) {
      updateStudentVerification(studentId, VERIFICATION_STATUS.VERIFIED)
      showNotice(`Document marked as officially verified.`)
    } else {
      updateStudentVerification(studentId, VERIFICATION_STATUS.REQUIRES_UPDATE)
      showNotice(`Document rejected. Student notified to re-upload.`)
    }
  }

  // Bulk Reminders for Missing Docs (M3.11)
  const handleSendBulkReminders = () => {
    showNotice(`Sent automated notification & email reminders to ${queues.missingDocs.length} students with missing documents.`)
  }

  const queueTabs = [
    { id: 'profiles', label: 'Profile Changes', count: queues.profileChanges.length },
    { id: 'resumes', label: 'Resume Approvals', count: queues.resumes.length },
    { id: 'documents', label: 'Document Verification', count: queues.documents.length },
    { id: 'missing', label: 'Missing Docs & Alerts', count: queues.missingDocs.length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-indigo-600" /> Verification & Approval Centre
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and certify student profile edits, resumes, academic certificates, and dispatch missing document alerts.
          </p>
        </div>

        {activeQueue === 'missing' && queues.missingDocs.length > 0 && (
          <Button
            onClick={handleSendBulkReminders}
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm text-xs"
          >
            <Send className="w-3.5 h-3.5" /> Dispatch Reminders to All
          </Button>
        )}
      </div>

      {actionNotice && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Queue Selection Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {queueTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveQueue(tab.id)}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeQueue === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeQueue === tab.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Queue 1: Profile Changes Queue */}
      {activeQueue === 'profiles' && (
        <div className="space-y-3">
          {queues.profileChanges.length > 0 ? (
            queues.profileChanges.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                    <span className="font-mono text-xs text-slate-500">[{item.registerNumber}]</span>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold rounded-md">
                      Pending Audit
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    Requested Field Update: <span className="text-indigo-600">{item.field}</span>
                  </p>
                  <div className="flex items-center gap-3 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 max-w-xl">
                    <span className="text-slate-500 line-through">Old: {item.oldValue}</span>
                    <span className="text-slate-400">➔</span>
                    <span className="font-bold text-emerald-700">New: {item.newValue}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span>Submitted: {item.submittedDate}</span>
                    <span>•</span>
                    <span className="text-indigo-600 underline cursor-pointer flex items-center gap-1">
                      <FileText className="w-3 h-3" /> {item.supportingDoc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleProfileApproval(item.id, true, item.studentId)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve Change
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleProfileApproval(item.id, false, item.studentId)}
                    className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs"
                  >
                    Reject & Request Info
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-xl text-slate-400 text-sm">
              All student profile change requests have been audited.
            </div>
          )}
        </div>
      )}

      {/* Queue 2: Resumes Queue */}
      {activeQueue === 'resumes' && (
        <div className="space-y-3">
          {queues.resumes.length > 0 ? (
            queues.resumes.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                    <span className="font-mono text-xs text-slate-500">[{item.registerNumber}]</span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-semibold rounded-md">
                      Version: {item.version}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{item.resumeTitle}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>File size: {item.fileSize}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">ATS/AI Score: {item.aiScore}</span>
                    <span>•</span>
                    <span>Submitted: {item.submittedDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-slate-700 border-slate-200 gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview PDF
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleResumeApproval(item.id, true, item.name)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Certify Resume
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResumeApproval(item.id, false, item.name)}
                    className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs"
                  >
                    Flag Revision
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-xl text-slate-400 text-sm">
              All student resumes are up to date and approved.
            </div>
          )}
        </div>
      )}

      {/* Queue 3: Documents Queue */}
      {activeQueue === 'documents' && (
        <div className="space-y-3">
          {queues.documents.length > 0 ? (
            queues.documents.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                    <span className="font-mono text-xs text-slate-500">[{item.registerNumber}]</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{item.docType}</p>
                  <p className="text-xs text-indigo-600 flex items-center gap-1 cursor-pointer underline">
                    <FileText className="w-3.5 h-3.5" /> {item.fileName}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleDocumentApproval(item.id, true, item.studentId)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verify Official
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDocumentApproval(item.id, false, item.studentId)}
                    className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs"
                  >
                    Reject Document
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-xl text-slate-400 text-sm">
              No pending documents requiring staff audit.
            </div>
          )}
        </div>
      )}

      {/* Queue 4: Missing Documents & Bulk Reminders */}
      {activeQueue === 'missing' && (
        <div className="space-y-3">
          {queues.missingDocs.length > 0 ? (
            queues.missingDocs.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                    <span className="font-mono text-xs text-slate-500">[{item.registerNumber}]</span>
                    <span className="text-xs text-slate-500">• {item.department}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-rose-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Missing Mandatory Items:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.missing.map((doc, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => showNotice(`Sent direct reminder SMS/email to ${item.name}.`)}
                    className="text-xs text-indigo-700 border-indigo-200 hover:bg-indigo-50 gap-1.5"
                  >
                    <Bell className="w-3.5 h-3.5" /> Send Alert
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white border border-slate-200 rounded-xl text-slate-400 text-sm">
              All students have submitted their mandatory placement dossiers.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
