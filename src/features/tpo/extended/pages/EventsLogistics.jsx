import React, { useState } from 'react'
import {
  Calendar,
  Building,
  Users,
  MapPin,
  Clock,
  Plus,
  FileCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const CAMPUS_EVENTS = [
  {
    id: 'EVT-701',
    title: 'Microsoft Annual Campus Recruitment Drive (PPT & Interviews)',
    type: 'Corporate Placement Drive (17.1)',
    date: '2026-10-15',
    time: '09:00 AM - 06:00 PM',
    venue: 'Main Auditorium & CS Lab 1-4',
    coordinators: 'Prof. S. Natarajan & 6 Student Volunteers',
    attendees: '220 Registered Candidates',
    budgetSpent: 'INR 34,000',
    status: 'Confirmed'
  },
  {
    id: 'EVT-702',
    title: 'Autumn Mega Engineering Job Fair 2026',
    type: 'Multi-Employer Job Fair (17.2)',
    date: '2026-11-04',
    time: '08:30 AM - 07:00 PM',
    venue: 'Indoor Sports Complex & Seminar Halls',
    coordinators: 'Central TPO Operations Team',
    attendees: '38 Companies • 850 Students',
    budgetSpent: 'INR 1,10,000',
    status: 'Planning'
  },
  {
    id: 'EVT-703',
    title: 'Resume & Personal Interview Masterclass by Amazon Leaders',
    type: 'Guest Seminar & Workshop (17.3)',
    date: '2026-10-22',
    time: '02:00 PM - 05:00 PM',
    venue: 'Mechanical Seminar Hall',
    coordinators: 'Training & Career Cell',
    attendees: '320 Students',
    budgetSpent: 'INR 12,500',
    status: 'Confirmed'
  }
]

export function EventsLogistics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T23</span>
            <h1 className="text-2xl font-bold text-slate-900">Events, Campus Logistics & Venues</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Book auditoriums, computer labs, interview cabins (17.5–17.7), assign student volunteers, and track drive event expenses.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Scheduled Campus Events"
          value={CAMPUS_EVENTS.length}
          icon={Calendar}
          change="AY 2025-2026 Cycle"
          trend="up"
        />
        <StatCard
          title="Booked Lab Capacity"
          value="450 Terminals"
          icon={Building}
          change="CS Labs 1, 2, 3 & 4"
          trend="neutral"
        />
        <StatCard
          title="Active Student Volunteers"
          value="34 Volunteers"
          icon={Users}
          change="Campus logistics squad"
          trend="up"
        />
        <StatCard
          title="Event Expenditures"
          value="INR 1.56 Lakhs"
          icon={DollarSign}
          change="Within cell budget (T27)"
          trend="neutral"
        />
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {CAMPUS_EVENTS.map((evt) => (
          <div key={evt.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {evt.id}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{evt.title}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                  {evt.type}
                </span>
                <StatusBadge status={evt.status} />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                Expenses: {evt.budgetSpent}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/80 p-3 rounded-lg text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{evt.date} • {evt.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-800">{evt.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{evt.attendees}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
              <span>Coordinators: <strong>{evt.coordinators}</strong></span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs h-8">
                  Logistics Sheet
                </Button>
                <Button size="sm" variant="default" className="text-xs h-8">
                  Manage Bookings
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
