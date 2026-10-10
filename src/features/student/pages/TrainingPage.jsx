import React, { useState } from 'react'
import { StatusBadge, Button, Tabs, Modal } from '@/components/ui'
import { GraduationCap, Award, Calendar, CheckCircle2, UserCheck, BookOpen, Clock } from 'lucide-react'

export function TrainingPage() {
  const [activeTab, setActiveTab] = useState('programmes')
  const [mockBookingOpen, setMockBookingOpen] = useState(false)
  const [enrolled, setEnrolled] = useState(['train-1', 'train-2'])

  const programmes = [
    {
      id: 'train-1',
      title: 'Advanced DSA & Problem Solving Bootcamp',
      trainer: 'Er. Sandeep (Ex-Amazon Staff Engineer)',
      batch: 'Batch CSE-Alpha · 40 Hours',
      dates: 'Every Mon, Wed, Fri (05:00 PM - 07:00 PM)',
      attendance: '92% (11 of 12 Sessions Attended)',
      status: 'ONGOING',
      category: 'Technical',
      certificateReady: false,
    },
    {
      id: 'train-2',
      title: 'Aptitude & Logical Reasoning Mastery',
      trainer: 'Prof. K. Venkatesh (Senior Quant Trainer)',
      batch: 'All Final Year Batches · 24 Hours',
      dates: 'Completed (Sep 2026)',
      attendance: '100% (Completed)',
      status: 'COMPLETED',
      category: 'Quantitative',
      certificateReady: true,
    },
    {
      id: 'train-3',
      title: 'Corporate Communication & Group Discussion (GD) Prep',
      trainer: 'Ms. Priyadarshini (Soft Skills Lead)',
      batch: 'Weekend Intensive Batch',
      dates: 'Starts Oct 18, 2026',
      attendance: 'Upcoming',
      status: 'UPCOMING',
      category: 'Soft Skills',
      certificateReady: false,
    },
  ]

  const toggleEnroll = (id) => {
    if (enrolled.includes(id)) {
      setEnrolled(enrolled.filter((e) => e !== id))
    } else {
      setEnrolled([...enrolled, id])
      alert('Enrolled in Training Programme! Batch assignment has been generated.')
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Placement Preparation & Training Hub</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Skill development programmes, corporate bootcamps, mock interview scheduling, and training certifications.
          </p>
        </div>
        <Button onClick={() => setMockBookingOpen(true)} className="flex items-center gap-2 text-xs">
          <UserCheck className="w-4 h-4" /> Book Mock Interview
        </Button>
      </div>

      {/* Program Cards */}
      <div className="space-y-4">
        {programmes.map((p) => {
          const isEnrolled = enrolled.includes(p.id)
          return (
            <div
              key={p.id}
              className="card flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-line-strong transition-colors"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent-soft text-accent border border-accent/20">
                    {p.category}
                  </span>
                  <h3 className="text-[15px] font-semibold text-fg">{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>

                <p className="text-xs font-medium text-fg-muted">
                  Trainer: <span className="text-accent">{p.trainer}</span> · {p.batch}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-fg-muted pt-2 border-t border-line">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-fg-subtle" /> Schedule: <strong className="text-fg font-medium">{p.dates}</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" /> Attendance: <strong className="text-fg font-medium">{p.attendance}</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                {p.certificateReady && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-xs text-success flex items-center gap-1.5"
                    onClick={() => alert(`Downloading Certificate for ${p.title}`)}
                  >
                    <Award className="w-3.5 h-3.5" /> Download Certificate
                  </Button>
                )}
                <Button
                  size="sm"
                  variant={isEnrolled ? 'secondary' : 'primary'}
                  className="text-xs"
                  onClick={() => toggleEnroll(p.id)}
                >
                  {isEnrolled ? 'Enrolled in Batch' : 'Enrol in Programme'}
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mock Interview Modal */}
      <Modal
        isOpen={mockBookingOpen}
        onClose={() => setMockBookingOpen(false)}
        title="Book 1-on-1 Mock Interview Session"
        description="Simulate real technical or behavioral interviews with our panel of alumni & industry mentors."
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setMockBookingOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setMockBookingOpen(false); alert('Mock interview slot booked! Check My Schedule.') }}>
              Confirm Slot Booking
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-fg-muted">
          <div>
            <label className="block text-xs font-semibold text-fg mb-1">Select Interview Track</label>
            <select className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg">
              <option>Technical DSA & Architecture (Alumni Panel)</option>
              <option>Cloud & DevOps System Design</option>
              <option>HR & Leadership Competency Evaluation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-fg mb-1">Preferred Time Window</label>
            <select className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg">
              <option>Saturday (Oct 17) · 04:00 PM – 05:00 PM IST</option>
              <option>Sunday (Oct 18) · 11:00 AM – 12:00 PM IST</option>
              <option>Tuesday (Oct 20) · 06:00 PM – 07:00 PM IST</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
