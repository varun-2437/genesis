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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Campus Placement Drives</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Schedule, pre-placement talks (PPT), logistics, and attendance tracking for official campus recruitment drives.
          </p>
        </div>
        <div className="px-3 py-1.5 bg-surface-2 border border-line rounded-[6px] text-xs font-medium text-fg flex items-center gap-2">
          <span className="text-fg-muted">Active Drive Limit (6.9):</span>
          <span className="px-2 py-0.5 bg-accent text-accent-fg rounded text-[11px] font-medium">2 / 5 Used</span>
        </div>
      </div>

      {/* Policy Reminder */}
      <div className="card p-4 bg-surface-2/40 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Megaphone className="w-5 h-5 text-accent shrink-0" />
          <p className="text-xs text-fg leading-relaxed">
            <strong className="font-semibold text-fg">Mandatory Drive Attendance Rule (M6.12):</strong> Registering for a drive commits you to attend the Pre-Placement Talk (PPT). Unexcused absences risk drive de-registration.
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
                className="card flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-line-strong transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[15px] font-semibold text-fg">{drive.company}</h3>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-surface-2 text-fg-muted border border-line">
                      {drive.type}
                    </span>
                    <StatusBadge status={drive.status} />
                  </div>

                  <p className="text-xs font-medium text-accent">{drive.rolesOffered}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-fg-muted">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-fg-subtle" /> Dates: <strong className="text-fg font-medium">{drive.dates}</strong>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-fg-subtle" /> PPT Slot: <strong className="text-fg font-medium">{drive.pptSlot}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-fg-muted pt-1">
                    Eligibility Rule: <span className="font-medium text-fg">{drive.eligibility}</span>
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  {drive.status === 'UPCOMING' ? (
                    isRegistered ? (
                      <span className="text-xs font-medium text-success bg-success-soft px-3 py-1.5 rounded-[6px] border border-success/20 flex items-center gap-1.5">
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
        <div className="space-y-3 text-xs text-fg-muted">
          <p>Provide anonymous feedback to the TPO regarding test difficulty, interview fairness, and process quality.</p>
          <textarea
            rows={4}
            placeholder="Share insights on questions asked, interviewer behavior, and logistics..."
            className="w-full p-3 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg"
          />
        </div>
      </Modal>
    </div>
  )
}
