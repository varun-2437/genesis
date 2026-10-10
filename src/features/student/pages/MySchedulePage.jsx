import React, { useState } from 'react'
import { StatusBadge, Button, Tabs } from '@/components/ui'
import { Calendar, Clock, Video, MapPin, CheckCircle2, AlertCircle, Share2 } from 'lucide-react'

export function MySchedulePage() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const events = [
    {
      id: 1,
      title: 'Google Cloud Technical Interview (Round 1)',
      category: 'INTERVIEW',
      date: 'Tomorrow, Oct 11, 2026',
      time: '10:30 AM – 11:30 AM IST',
      location: 'Virtual Google Meet Link',
      link: 'https://meet.google.com/xyz-placement-tpo',
      interviewer: 'Cloud Solutions Engineering Panel',
      status: 'CONFIRMED',
      instructions: 'Please be ready with your code editor and valid college ID 10 minutes prior.',
    },
    {
      id: 2,
      title: 'Oracle Online Assessment Test',
      category: 'ASSESSMENT',
      date: 'Oct 14, 2026',
      time: '02:00 PM – 03:45 PM IST',
      location: 'Computer Lab 3 / Online Proctor Portal',
      link: '/student/assessments',
      interviewer: 'Auto-Proctored Test Runner',
      status: 'CONFIRMED',
      instructions: 'Calculators and external browser tabs are strictly prohibited.',
    },
    {
      id: 3,
      title: 'Mock Behavioral & HR Interview with Alumni',
      category: 'TRAINING',
      date: 'Oct 18, 2026',
      time: '04:00 PM – 05:00 PM IST',
      location: 'Placement Cell Room 204 / Zoom',
      link: 'https://zoom.us/j/mock-session',
      interviewer: 'Rahul V (SDE-2 at Microsoft, 2023 Batch)',
      status: 'SCHEDULED',
      instructions: 'Prepare STAR technique responses for situational queries.',
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Schedule & Calendar</h2>
          <p className="text-xs text-slate-500 mt-1">
            Personal consolidated calendar of upcoming interviews, online tests, prep sessions, and pre-placement talks.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => alert('Calendar synced to Google Calendar / Outlook (iCal URL generated)!')}
          className="flex items-center gap-1.5 text-xs"
        >
          <Share2 className="w-4 h-4" /> Sync to Google Calendar
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  evt.category === 'INTERVIEW'
                    ? 'bg-purple-100 text-purple-700'
                    : evt.category === 'ASSESSMENT'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {evt.category}
                </span>
                <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
                <StatusBadge status={evt.status} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" /> Date: <strong>{evt.date}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" /> Time: <strong>{evt.time}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" /> Location: <span>{evt.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-400" /> Panel / Assessor: <span>{evt.interviewer}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500">
                <strong>Important Instructions:</strong> {evt.instructions}
              </div>
            </div>

            <div className="self-end md:self-center shrink-0">
              {evt.category === 'INTERVIEW' ? (
                <a href={evt.link} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="flex items-center gap-2 text-xs">
                    <Video className="w-4 h-4" /> Join Interview Room
                  </Button>
                </a>
              ) : (
                <Button size="sm" variant="secondary" className="text-xs">
                  View Assessment Portal
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
