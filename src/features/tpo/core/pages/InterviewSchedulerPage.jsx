import React, { useState } from 'react'
import { 
  CalendarClock, 
  Plus, 
  MapPin, 
  Video, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Send 
} from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

// Initial Interview Slots (M10.1 to M10.7)
const INITIAL_INTERVIEWS = [
  {
    id: 'int-1',
    candidateName: 'Aditya Vardhan',
    registerNumber: '22CS104',
    companyName: 'Google India',
    roundName: 'Technical Interview 1 (Algorithms)',
    panelName: 'Satish Rao (Google Senior Staff Eng)',
    date: '2026-10-14',
    time: '10:30 AM - 11:15 AM',
    room: 'Interview Cubicle #3 (Placement Block)',
    mode: 'In-Person',
    status: 'SCHEDULED',
    conflict: false,
  },
  {
    id: 'int-2',
    candidateName: 'Pooja Sundar',
    registerNumber: '22CS142',
    companyName: 'Google India',
    roundName: 'Technical Interview 1 (System Design)',
    panelName: 'Priya Narayanan (Google Tech Lead)',
    date: '2026-10-14',
    time: '11:30 AM - 12:15 PM',
    room: 'Google Meet (Virtual Link)',
    mode: 'Virtual',
    status: 'SCHEDULED',
    conflict: false,
  },
  {
    id: 'int-3',
    candidateName: 'Rohan Deshmukh',
    registerNumber: '22IT118',
    companyName: 'Microsoft IDC',
    roundName: 'Live Cloud Architecture Review',
    panelName: 'Arun V (Microsoft Principal Architect)',
    date: '2026-10-14',
    time: '10:30 AM - 11:15 AM',
    room: 'Newton Lab Workstation #8',
    mode: 'Hybrid',
    status: 'CONFIRMED',
    conflict: false,
  },
]

export function InterviewSchedulerPage() {
  const { students, drives } = useTpoCoreStore()

  const [interviews, setInterviews] = useState(INITIAL_INTERVIEWS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [conflictAlert, setConflictAlert] = useState('')
  const [notice, setNotice] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    candidateName: students[0]?.name || '',
    registerNumber: students[0]?.registerNumber || '',
    companyName: drives[0]?.companyName || '',
    roundName: 'Technical Interview',
    panelName: 'Panel Member 1',
    date: '2026-10-15',
    time: '02:00 PM - 02:45 PM',
    room: 'Cubicle 2',
    mode: 'In-Person',
  })

  const showNotice = (msg) => {
    setNotice(msg)
    setTimeout(() => setNotice(''), 4000)
  }

  // Conflict Detection on submit (M10.6)
  const handleSubmitSlot = (e) => {
    e.preventDefault()

    // Check panel or student slot collision
    const hasCollision = interviews.some(
      (int) =>
        int.date === formData.date &&
        int.time === formData.time &&
        (int.panelName.toLowerCase() === formData.panelName.toLowerCase() ||
          int.candidateName.toLowerCase() === formData.candidateName.toLowerCase())
    )

    if (hasCollision) {
      setConflictAlert('Schedule Conflict Detected: The interviewer or candidate is already assigned at this time slot!')
      return
    }

    const newInterview = {
      ...formData,
      id: `int-${Date.now()}`,
      status: 'SCHEDULED',
      conflict: false,
    }

    setInterviews([newInterview, ...interviews])
    setIsModalOpen(false)
    setConflictAlert('')
    showNotice(`Successfully scheduled interview for ${formData.candidateName}.`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-indigo-600" /> Interview Scheduler & Panels
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Allocate interview slots, assign evaluator panels, detect venue/candidate conflicts, and dispatch reminders.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Schedule Interview Slot
        </Button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Interviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interviews.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3 hover:border-indigo-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-md">
                {item.companyName}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {item.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base">{item.candidateName}</h3>
              <p className="font-mono text-xs text-slate-400">[{item.registerNumber}]</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">{item.roundName}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-900">{item.date} • {item.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.mode === 'Virtual' ? (
                  <Video className="w-3.5 h-3.5 text-indigo-600" />
                ) : (
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span className="truncate">{item.room}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[11px] truncate">Panel: {item.panelName}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => showNotice(`Sent invitation & calendar sync email to ${item.candidateName}.`)}
                className="text-xs py-1 px-2.5 text-indigo-600 border-indigo-200 hover:bg-indigo-50 gap-1"
              >
                <Send className="w-3 h-3" /> Send Reminder
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Slot Modal (M10.1 to M10.6 Conflict Warning) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Interview Session"
        subtitle="Assign candidate, panel interviewer, room or video link with automated collision checks"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmitSlot} className="space-y-4">
          {conflictAlert && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{conflictAlert}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Candidate *</label>
            <select
              value={formData.candidateName}
              onChange={(e) => {
                const s = students.find((item) => item.name === e.target.value)
                setFormData({
                  ...formData,
                  candidateName: e.target.value,
                  registerNumber: s?.registerNumber || '',
                })
              }}
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            >
              {students.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.registerNumber} - {s.department})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Drive *</label>
              <select
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                {drives.map((d) => (
                  <option key={d.id} value={d.companyName}>
                    {d.companyName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Round Designation</label>
              <input
                type="text"
                required
                value={formData.roundName}
                onChange={(e) => setFormData({ ...formData, roundName: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Interviewer / Panel Name *</label>
            <input
              type="text"
              required
              value={formData.panelName}
              onChange={(e) => setFormData({ ...formData, panelName: e.target.value })}
              placeholder="e.g. Anand Kumar (Senior Architect)"
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="10:00 AM - 10:45 AM">10:00 AM - 10:45 AM</option>
                <option value="11:00 AM - 11:45 AM">11:00 AM - 11:45 AM</option>
                <option value="02:00 PM - 02:45 PM">02:00 PM - 02:45 PM</option>
                <option value="03:00 PM - 03:45 PM">03:00 PM - 03:45 PM</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Format</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="In-Person">In-Person Campus</option>
                <option value="Virtual">Virtual Video Call</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Video Link</label>
              <input
                type="text"
                required
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                placeholder="Room # / URL"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Confirm Slot
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
