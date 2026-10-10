import React, { useState } from 'react'
import { Button, StatusBadge, Modal } from '@/components/ui'
import { Calendar, MapPin, Users, Clock, CheckCircle2 } from 'lucide-react'

export function PlacementEventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState(['evt-1'])

  const events = [
    {
      id: 'evt-1',
      title: 'Annual Campus Placement Orientation & Alumni Keynote',
      type: 'Orientation',
      date: 'Oct 14, 2026 · 10:00 AM – 01:00 PM',
      venue: 'University Grand Auditorium',
      speaker: 'Sundar C (VP of Engineering, PayPal)',
      seats: 'Auditorium Seating (800 Capacity)',
      status: 'UPCOMING',
    },
    {
      id: 'evt-2',
      title: 'Global Tech Careers & Overseas Hiring Seminar',
      type: 'Seminar',
      date: 'Oct 22, 2026 · 03:00 PM – 05:00 PM',
      venue: 'Virtual Global Bridge / Seminar Hall B',
      speaker: 'International Placement Cell Directorate',
      seats: 'Open Registration',
      status: 'UPCOMING',
    },
  ]

  const toggleRegister = (id) => {
    if (registeredEvents.includes(id)) {
      setRegisteredEvents(registeredEvents.filter((e) => e !== id))
    } else {
      setRegisteredEvents([...registeredEvents, id])
      alert('Registered for event! Pass generated.')
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Placement Seminars & Campus Events</h2>
        <p className="text-xs text-slate-500 mt-1">
          Industry tech talks, career orientation conferences, and corporate speaker series.
        </p>
      </div>

      <div className="space-y-4">
        {events.map((evt) => {
          const isReg = registeredEvents.includes(evt.id)
          return (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {evt.type}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
                </div>

                <p className="text-xs text-indigo-600 font-semibold">Keynote: {evt.speaker}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {evt.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.venue}
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <Button
                  size="sm"
                  variant={isReg ? 'secondary' : 'primary'}
                  className="text-xs"
                  onClick={() => toggleRegister(evt.id)}
                >
                  {isReg ? 'Seat Confirmed' : 'Reserve Free Seat'}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
