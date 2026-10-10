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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Student Grievance & Feedback Desk</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Confidential reporting for drive disputes, scheduling clashes, evaluation fairness, or policy appeals (M20.1).
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> File New Grievance
        </Button>
      </div>

      <div className="space-y-4">
        {grievances.map((g) => (
          <div key={g.id} className="card space-y-3 hover:border-line-strong transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-accent">{g.id}</span>
                  <StatusBadge status={g.status} />
                  {g.confidential && (
                    <span className="text-[10px] bg-surface-2 text-fg-muted border border-line px-2 py-0.5 rounded font-medium flex items-center gap-1">
                      <Shield className="w-3 h-3 text-success" /> Confidential
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-fg mt-2">{g.subject}</h3>
                <p className="text-xs text-fg-muted">Category: {g.category} · Submitted {g.submittedOn}</p>
              </div>
            </div>

            <div className="p-3 bg-surface-2/60 rounded-[6px] border border-line text-xs text-fg">
              <strong className="text-fg font-semibold">TPO Cell Response / Action Taken:</strong> {g.tpoResponse}
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
        <div className="space-y-4 text-xs text-fg-muted">
          <div>
            <label className="block text-xs font-semibold text-fg mb-1">Issue Subject</label>
            <input
              type="text"
              placeholder="e.g. Schedule clash with mandatory university lab exam"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-fg mb-1">Detailed Explanation</label>
            <textarea
              rows={4}
              placeholder="Describe the drive name, dates, and grievance details..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="conf"
              checked={isConfidential}
              onChange={(e) => setIsConfidential(e.target.checked)}
              className="rounded border-line-strong text-accent focus:ring-accent h-4 w-4"
            />
            <label htmlFor="conf" className="cursor-pointer text-xs text-fg">
              Keep identity strictly confidential from company recruiters (M20.4)
            </label>
          </div>
        </div>
      </Modal>
    </div>
  )
}
