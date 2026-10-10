import React, { useState } from 'react'
import { StatusBadge, Button, ApprovalPanel, Tabs } from '@/components/ui'
import { ShieldCheck, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

export function TpoVerificationCentrePage() {
  const [activeTab, setActiveTab] = useState('resumes')
  const [pendingItems, setPendingItems] = useState([
    {
      id: 1,
      type: 'RESUME',
      studentName: 'Varun Murugesh (21CS104)',
      title: 'Cloud & Systems SDE Resume (v2_Cloud)',
      submittedOn: 'Oct 09, 2026',
      status: 'PENDING',
      file: 'Varun_Murugesh_Cloud_SDE.pdf',
    },
    {
      id: 2,
      type: 'DOCUMENT',
      studentName: 'Pooja Iyer (21CS088)',
      title: 'Consolidated Grade Sheet Sem 1-6 Transcripts',
      submittedOn: 'Oct 08, 2026',
      status: 'PENDING',
      file: 'Pooja_Grade_Transcripts.pdf',
    },
  ])

  const handleAction = (id, action, remarks) => {
    alert(`Item #${id} marked as ${action} with notes: "${remarks}"`)
    setPendingItems(pendingItems.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Placement Verification Centre (T4)</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review queues for student profile modifications, specialized resumes, and semester academic mark sheets.
        </p>
      </div>

      <Tabs
        tabs={[
          { id: 'resumes', label: 'Resume Review Queue', badge: pendingItems.filter(i => i.type === 'RESUME').length },
          { id: 'documents', label: 'Academic Certificates', badge: pendingItems.filter(i => i.type === 'DOCUMENT').length },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="space-y-4">
        {pendingItems.length > 0 ? (
          pendingItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {item.type} VERIFICATION
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.studentName} · Submitted {item.submittedOn}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-700 font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" /> Attached File: <strong>{item.file}</strong>
                </span>
                <Button variant="ghost" size="sm" className="text-xs text-indigo-600" onClick={() => alert(`Previewing ${item.file}`)}>
                  View Document
                </Button>
              </div>

              <ApprovalPanel
                title="TPO Verification Verdict"
                onApprove={(rem) => handleAction(item.id, 'APPROVED', rem)}
                onReject={(rem) => handleAction(item.id, 'REJECTED', rem)}
                onRequestCorrection={(rem) => handleAction(item.id, 'REQUIRES_UPDATE', rem)}
              />
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
            All student submissions have been processed and verified!
          </div>
        )}
      </div>
    </div>
  )
}
