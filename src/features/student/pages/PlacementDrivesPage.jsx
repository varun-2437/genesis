import React, { useState } from 'react'
import { StatusBadge, Button, Tabs, Modal } from '@/components/ui'
import { Building2, Calendar, MapPin, Users, CheckCircle2, Clock, Megaphone, AlertCircle } from 'lucide-react'

export function PlacementDrivesPage() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [registeredDrives, setRegisteredDrives] = useState(['drive-1', 'drive-2'])

  const drives = [
    {
      id: 'drive-1',
      company: 'Google Cloud India',
      type: 'On-Campus Hybrid',
      dates: 'Oct 11 – Oct 12, 2026',
      pptSlot: 'Auditorium Hall A · 09:30 AM (Mandatory)',
      rolesOffered: 'Associate Cloud Engineer (₹ 18.0 LPA)',
      status: 'UPCOMING',
      eligibility: 'Eligible · B.Tech CSE / IT with CGPA ≥ 8.0',
      attendanceMarked: false,
      deadline: 'Today 11:59 PM',
    },
    {
      id: 'drive-2',
      company: 'Oracle Financial Services',
      type: 'Pooled Campus Drive',
      dates: 'Oct 15 – Oct 16, 2026',
      pptSlot: 'Virtual Zoom Bridge · 11:00 AM',
      rolesOffered: 'Software Developer 1 (₹ 14.5 LPA)',
      status: 'UPCOMING',
      eligibility: 'Eligible · All Engineering Branches ≥ 7.5',
      attendanceMarked: false,
      deadline: 'Oct 14, 2026',
    },
    {
      id: 'drive-3',
      company: 'Cognizant Technology Solutions',
      type: 'On-Campus Exclusive',
      dates: 'Sep 25 – Sep 28, 2026',
      pptSlot: 'Main Seminar Hall · Completed',
      rolesOffered: 'GenC Next & GenC Elevate (₹ 6.75 LPA)',
      status: 'COMPLETED',
      eligibility: 'Attended · All Rounds Finished',
      attendanceMarked: true,
      deadline: 'Closed',
    },
  ]

  const registerForDrive = (id) => {
    setRegisteredDrives([...registeredDrives, id])
    alert('Registered for Campus Drive attendance and Pre-Placement Talk!')
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Campus Placement Drives</h2>
        <p className="text-xs text-slate-500 mt-1">
          Schedule, pre-placement talks (PPT), logistics, and attendance tracking for official campus recruitment drives.
        </p>
      </div>

      {/* Policy Reminder */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Megaphone className="w-5 h-5 text-indigo-700" />
          <p className="text-xs text-indigo-950 font-medium">
            <strong>Mandatory Drive Attendance Rule (M6.12):</strong> Registering for a drive commits you to attend the Pre-Placement Talk (PPT). Unexcused absences risk drive de-registration.
          </p>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 'upcoming', label: 'Upcoming Drives', badge: 2 },
          { id: 'completed', label: 'Completed Drives', badge: 1 },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="space-y-4">
        {drives
          .filter((d) => (activeTab === 'upcoming' ? d.status === 'UPCOMING' : d.status === 'COMPLETED'))
          .map((drive) => {
            const isRegistered = registeredDrives.includes(drive.id)
            return (
              <div
                key={drive.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900">{drive.company}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {drive.type}
                    </span>
                    <StatusBadge status={drive.status} />
                  </div>

                  <p className="text-xs font-semibold text-indigo-600">{drive.rolesOffered}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" /> Dates: <strong>{drive.dates}</strong>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" /> PPT Slot: <strong>{drive.pptSlot}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1">
                    Eligibility Rule: <span className="font-semibold text-slate-700">{drive.eligibility}</span>
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  {drive.status === 'UPCOMING' ? (
                    isRegistered ? (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Registered for Drive
                      </span>
                    ) : (
                      <Button size="sm" onClick={() => registerForDrive(drive.id)} className="text-xs">
                        Register for Drive
                      </Button>
                    )
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setFeedbackOpen(true)}
                      className="text-xs"
                    >
                      Submit Drive Feedback
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
      </div>

      {/* Feedback Modal */}
      <Modal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        title="Submit Drive Experience & Feedback"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setFeedbackOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setFeedbackOpen(false); alert('Feedback submitted to TPO!') }}>
              Submit Feedback
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs text-slate-600">
          <p>Provide anonymous feedback to the TPO regarding test difficulty, interview fairness, and process quality.</p>
          <textarea
            rows={4}
            placeholder="Share insights on questions asked, interviewer behavior, and logistics..."
            className="w-full p-3 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </Modal>
    </div>
  )
}
