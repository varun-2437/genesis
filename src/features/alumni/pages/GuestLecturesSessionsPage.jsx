import React, { useState } from 'react'
import { Button, StatusBadge, Modal } from '@/components/ui'
import { BookOpen, Calendar, Video, Plus, CheckCircle2 } from 'lucide-react'

export function GuestLecturesSessionsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'Real-World Microservices Architecture in Azure',
      date: 'Saturday, Nov 07, 2026',
      duration: '2 Hours (Tech Keynote + Q&A)',
      status: 'CONFIRMED',
      audience: 'B.Tech CSE & IT 3rd & 4th Year',
      venue: 'Auditorium Hall B + YouTube Live',
    },
  ])

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Guest Lectures & Skill Sessions (M16.8, 16.11)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Conduct technical workshops, masterclasses, and skill-sharing lectures for campus students.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Propose Tech Session
        </Button>
      </div>

      <div className="space-y-4">
        {sessions.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <StatusBadge status={s.status} />
              </div>
              <p className="text-xs text-slate-500">{s.duration} · {s.audience}</p>
              <p className="text-xs text-indigo-600 font-semibold">{s.date} · {s.venue}</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              Approved by HOD
            </span>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Propose Guest Lecture / Masterclass"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setModalOpen(false); alert('Proposal sent to Placement Cell & HOD!') }}>
              Submit Proposal
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-600">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Session Title</label>
            <input type="text" placeholder="e.g. Scaling Kubernetes for High Availability" className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Proposed Duration & Format</label>
            <select className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none">
              <option>1 Hour Tech Talk + 30 Mins Q&A</option>
              <option>2 Hours Hands-on Coding Lab</option>
              <option>Half-Day Weekend Masterclass</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
