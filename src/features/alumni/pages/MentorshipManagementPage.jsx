import React, { useState } from 'react'
import { Button, StatusBadge } from '@/components/ui'
import { Calendar, CheckCircle2, Clock, Video } from 'lucide-react'

export function MentorshipManagementPage() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      studentName: 'Varun Murugesh',
      topic: 'Azure Cloud Architecture & Microservices',
      batch: 'CSE 2026',
      scheduledDate: 'Saturday, Oct 17 · 04:00 PM IST',
      status: 'CONFIRMED',
      link: 'https://teams.microsoft.com/l/meetup-join/mock-call',
    },
    {
      id: 2,
      studentName: 'Pooja Iyer',
      topic: 'Coding Interview Preparation (Binary Trees)',
      batch: 'IT 2026',
      scheduledDate: 'Sunday, Oct 18 · 11:00 AM IST',
      status: 'CONFIRMED',
      link: 'https://teams.microsoft.com/l/meetup-join/mock-call-2',
    },
  ])

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Mentorship Sessions (M16.4, 16.5)</h2>
        <p className="text-xs text-slate-500 mt-1">
          Confirmed mock interviews, feedback delivery, and student guidance schedule.
        </p>
      </div>

      <div className="space-y-4">
        {sessions.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-slate-900">{s.studentName}</h3>
                <span className="text-xs text-slate-400">({s.batch})</span>
                <StatusBadge status={s.status} />
              </div>
              <p className="text-xs font-semibold text-indigo-600">Track: {s.topic}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {s.scheduledDate}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a href={s.link} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="text-xs flex items-center gap-1.5">
                  <Video className="w-4 h-4" /> Start Video Session
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
