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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" /> Notification Centre
          </h1>
          <p className="text-xs text-fg-muted mt-0.5">
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
              className={`p-4 rounded-[8px] border transition-colors cursor-pointer flex items-start gap-4 ${
                item.unread
                  ? 'bg-surface border-line-strong shadow-xs'
                  : 'bg-surface-2/50 border-line opacity-85'
              }`}
            >
              <div
                className={`p-2 rounded-[6px] shrink-0 ${
                  item.type === 'ACTION_REQUIRED'
                    ? 'bg-danger/10 text-danger'
                    : item.type === 'ANNOUNCEMENT'
                    ? 'bg-accent-soft text-accent'
                    : 'bg-info/10 text-info'
                }`}
              >
                {item.type === 'ACTION_REQUIRED' ? (
                  <AlertCircle className="w-4 h-4" />
                ) : item.type === 'ANNOUNCEMENT' ? (
                  <Megaphone className="w-4 h-4" />
                ) : (
                  <Info className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-sm ${item.unread ? 'font-semibold text-fg' : 'font-medium text-fg-muted'}`}>
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-fg-muted shrink-0 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-fg-subtle" /> {item.date}
                  </span>
                </div>
                <p className="text-xs text-fg-muted mt-1 leading-relaxed">{item.message}</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-line">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted bg-surface-2 px-2 py-0.5 rounded-[4px] border border-line">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-fg-muted">
                      Delivered · {item.unread ? 'Unread' : 'Read & Logged'}
                    </span>
                  </div>
                  {item.type === 'ACTION_REQUIRED' && (
                    <Button
                      size="sm"
                      variant="primary"
                      className="text-xs py-1 px-3"
                      onClick={(e) => {
                        e.stopPropagation()
                        alert(`Acknowledged: "${item.title}"`)
                      }}
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card p-12 text-center text-fg-muted text-xs">
            No notifications in this view.
          </div>
        )}
      </div>
    </div>
  )
}
