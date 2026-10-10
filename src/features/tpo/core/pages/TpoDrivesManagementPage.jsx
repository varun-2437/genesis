import React, { useState } from 'react'
import { StatusBadge, Button, Modal, Input } from '@/components/ui'
import { Calendar, Plus, Building2, MapPin, Users, CheckCircle2 } from 'lucide-react'

export function TpoDrivesManagementPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [drives, setDrives] = useState([
    {
      id: 'drv-1',
      company: 'Google Cloud India',
      type: 'On-Campus Exclusive',
      dates: 'Oct 11 – Oct 12, 2026',
      roundsConfigured: 4,
      registeredStudents: 142,
      coordinator: 'Prof. Sharma (CSE)',
      status: 'ONGOING',
    },
    {
      id: 'drv-2',
      company: 'Oracle Corporation',
      type: 'Pooled Campus Drive',
      dates: 'Oct 15 – Oct 16, 2026',
      roundsConfigured: 3,
      registeredStudents: 210,
      coordinator: 'Dr. Ramesh (IT)',
      status: 'UPCOMING',
    },
  ])

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Campus Drives Scheduling (T9, T10)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure campus, pooled, and virtual recruitment drives, appoint faculty coordinators, and oversee rounds.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Schedule New Drive (T9)
        </Button>
      </div>

      <div className="space-y-4">
        {drives.map((d) => (
          <div key={d.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900">{d.company}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {d.type}
                </span>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-xs text-slate-500">Dates: <strong>{d.dates}</strong> · Coordinator: {d.coordinator}</p>
              <p className="text-xs text-indigo-600 font-semibold">{d.registeredStudents} Candidates Enrolled · {d.roundsConfigured} Stages Configured</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" className="text-xs" onClick={() => alert(`Opening Drive Details for ${d.company}`)}>
                Manage Logistics & PPT (T10)
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule Campus Recruitment Drive (M6.1–6.9)"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setModalOpen(false); alert('Drive scheduled and notifications broadcasted!') }}>
              Save Drive Schedule
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <Input label="Participating Company" placeholder="e.g. Cisco Systems" />
          <Input label="Drive Execution Format" placeholder="e.g. On-Campus / Virtual" />
          <Input label="Drive Target Dates" placeholder="e.g. Oct 28 – Oct 29, 2026" />
          <Input label="Appointed Faculty Coordinator (M6.13)" placeholder="e.g. Prof. Anand (ECE)" />
        </div>
      </Modal>
    </div>
  )
}
