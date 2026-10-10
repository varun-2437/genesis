import React, { useState } from 'react'
import { StatusBadge, Button, Modal } from '@/components/ui'
import { AlertCircle, Shield, CheckCircle2, MessageSquare, Plus } from 'lucide-react'

export function GrievanceFeedbackPage() {
  const [grievances, setGrievances] = useState([
    {
      id: 'GRV-2026-08',
      category: 'Drive Slot Clashing',
      subject: 'Interview slot clash between Oracle & Google Cloud rounds',
      submittedOn: 'Oct 09, 2026',
      status: 'IN_REVIEW',
      confidential: true,
      tpoResponse: 'Assigned to Officer Dr. Sharma. Rescheduling request forwarded to Google campus recruiter.',
    },
  ])

  const [modalOpen, setModalOpen] = useState(false)
  const [newSubject, setNewSubject] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [isConfidential, setIsConfidential] = useState(true)

  const handleSubmit = () => {
    if (!newSubject) return
    const item = {
      id: `GRV-2026-${Math.floor(Math.random() * 90 + 10)}`,
      category: 'Drive Logistics & Policy',
      subject: newSubject,
      submittedOn: 'Just now',
      status: 'PENDING',
      confidential: isConfidential,
      tpoResponse: 'Acknowledged by TPO Grievance Desk. Pending officer assignment.',
    }
    setGrievances([item, ...grievances])
    setModalOpen(false)
    setNewSubject('')
    setNewDesc('')
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Student Grievance & Feedback Desk</h2>
          <p className="text-xs text-slate-500 mt-1">
            Confidential reporting for drive disputes, scheduling clashes, evaluation fairness, or policy appeals (M20.1).
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> File New Grievance
        </Button>
      </div>

      <div className="space-y-4">
        {grievances.map((g) => (
          <div key={g.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600">{g.id}</span>
                  <StatusBadge status={g.status} />
                  {g.confidential && (
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-600" /> Confidential
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{g.subject}</h3>
                <p className="text-xs text-slate-400">Category: {g.category} · Submitted {g.submittedOn}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
              <strong>TPO Cell Response / Action Taken:</strong> {g.tpoResponse}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Submit Placement Grievance / Appeal (M20.1, 20.4)"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSubmit}>
              Submit to TPO Desk
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-600">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Subject</label>
            <input
              type="text"
              placeholder="e.g. Schedule clash with mandatory university lab exam"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Explanation</label>
            <textarea
              rows={4}
              placeholder="Describe the drive name, dates, and grievance details..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="conf"
              checked={isConfidential}
              onChange={(e) => setIsConfidential(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            />
            <label htmlFor="conf" className="cursor-pointer text-xs text-slate-700">
              Keep identity strictly confidential from company recruiters (M20.4)
            </label>
          </div>
        </div>
      </Modal>
    </div>
  )
}
