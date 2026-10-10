import React, { useState } from 'react'
import { StatusBadge, Button, Tabs } from '@/components/ui'
import { Bell, CheckCheck, Megaphone, AlertCircle, Info, Calendar } from 'lucide-react'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Google Cloud Campus Drive Shortlist Announced',
    message: 'Shortlist for the Coding Round has been published. 42 candidates selected for tomorrow at 10:00 AM.',
    type: 'ANNOUNCEMENT',
    category: 'DRIVES',
    date: '10 Mins ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Resume Verification Approved',
    message: 'Your Technical Resume (v2_Cloud) has been formally approved by TPO coordinator Prof. Sharma.',
    type: 'STATUS',
    category: 'PROFILE',
    date: '2 Hours ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Placement Policy Acknowledgment Due',
    message: 'Please review and digitally acknowledge the updated 2026-27 Campus Policy before Friday.',
    type: 'ACTION_REQUIRED',
    category: 'POLICY',
    date: 'Yesterday',
    unread: false,
  },
  {
    id: 4,
    title: 'Mock Interview Session Scheduled',
    message: 'Alumni Mock Interview slot confirmed with Rahul V (SDE-2 at Microsoft) for Saturday 4:00 PM.',
    type: 'EVENT',
    category: 'TRAINING',
    date: '2 Days ago',
    unread: false,
  },
]

export function NotificationCentrePage() {
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const markSingleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    )
  }

  const filtered = notifications.filter((n) => {
    if (activeTab === 'unread') return n.unread
    if (activeTab === 'announcements') return n.type === 'ANNOUNCEMENT'
    return true
  })

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-indigo-600" /> Notification Centre
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Centralized inbox for placement alerts, circulars, drive announcements, and action items.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={markAllRead} className="flex items-center gap-1.5">
          <CheckCheck className="w-4 h-4" /> Mark all as read
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'all', label: 'All Notifications', badge: notifications.length },
          { id: 'unread', label: 'Unread', badge: notifications.filter((n) => n.unread).length },
          { id: 'announcements', label: 'Official Circulars' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Notifications Feed */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => markSingleRead(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                item.unread
                  ? 'bg-white border-indigo-200 shadow-sm'
                  : 'bg-slate-50/70 border-slate-200 opacity-80'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  item.type === 'ACTION_REQUIRED'
                    ? 'bg-rose-50 text-rose-600'
                    : item.type === 'ANNOUNCEMENT'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                {item.type === 'ACTION_REQUIRED' ? (
                  <AlertCircle className="w-5 h-5" />
                ) : item.type === 'ANNOUNCEMENT' ? (
                  <Megaphone className="w-5 h-5" />
                ) : (
                  <Info className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-sm ${item.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.date}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200">
            No notifications in this view.
          </div>
        )}
      </div>
    </div>
  )
}
