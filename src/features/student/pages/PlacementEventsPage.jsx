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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Placement Seminars & Campus Events</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Industry tech talks, career orientation conferences, and corporate speaker series.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((evt) => {
          const isReg = registeredEvents.includes(evt.id)
          return (
            <div
              key={evt.id}
              className="card flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-line-strong transition-colors"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent-soft text-accent border border-accent/20">
                    {evt.type}
                  </span>
                  <h3 className="text-[15px] font-semibold text-fg">{evt.title}</h3>
                </div>

                <p className="text-xs text-accent font-medium">Keynote: {evt.speaker}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-fg-muted pt-2 border-t border-line">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-fg-subtle" /> {evt.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-fg-subtle" /> {evt.venue}
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
