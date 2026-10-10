import React, { useState } from 'react'
import { StatusBadge, Button, Modal, Input } from '@/components/ui'
import { Calendar, Clock, Video, Users, AlertTriangle, Plus } from 'lucide-react'

export function TpoInterviewSchedulerPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [slots, setSlots] = useState([
    {
      id: 1,
      candidate: 'Varun Murugesh (21CS104)',
      company: 'Google Cloud India',
      panel: 'Google Tech Panel 1 (SDE Leads)',
      date: 'Tomorrow, Oct 11 · 10:30 AM',
      room: 'Virtual Room 4 (Google Meet)',
      status: 'SCHEDULED',
      conflict: false,
    },
    {
      id: 2,
      candidate: 'Pooja Iyer (21CS088)',
      company: 'Google Cloud India',
      panel: 'Google Tech Panel 2',
      date: 'Tomorrow, Oct 11 · 11:30 AM',
      room: 'Virtual Room 4 (Google Meet)',
      status: 'SCHEDULED',
      conflict: false,
    },
  ])

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Campus Interview Scheduler (T14, M10.1–10.15)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Slot allocation, panel room management, timetable conflict detection, and video link dispatches.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Allocate Interview Slot
        </Button>
      </div>

      <div className="space-y-4">
        {slots.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-slate-900">{s.candidate}</h3>
                <StatusBadge status={s.status} />
              </div>
              <p className="text-xs font-semibold text-indigo-600">{s.company} · Panel: {s.panel}</p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                <span>{s.date}</span>
                <span>•</span>
                <span>{s.room}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" className="text-xs" onClick={() => alert('Slot rescheduled and automated reminder sent!')}>
                Reschedule
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Allocate Interview Slot (Conflict Warning Protected M10.6)"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setModalOpen(false); alert('Interview Slot Dispatched!') }}>
              Confirm & Dispatch Invites
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <Input label="Student Name / Roll No" placeholder="e.g. 21CS104" />
          <Input label="Interview Date & Time" placeholder="e.g. Oct 12, 2026 02:00 PM IST" />
          <Input label="Meeting Link / Lab Room" placeholder="e.g. Google Meet Link" />
        </div>
      </Modal>
    </div>
  )
}
