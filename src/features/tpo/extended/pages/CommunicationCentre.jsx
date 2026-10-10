import React, { useState } from 'react'
import {
  Bell,
  Mail,
  MessageSquare,
  Send,
  Plus,
  Users,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  FileText,
  AlertCircle
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const BROADCAST_HISTORY = [
  {
    id: 'MSG-801',
    title: 'Urgent: Microsoft Round 2 Interview Slot Selection',
    channels: ['Email', 'Push Notification'],
    audience: 'Shortlisted Candidates (42)',
    sentTime: '2026-10-10 14:30',
    deliveryRate: '100% (42/42)',
    openRate: '92.8% Read',
    status: 'Sent'
  },
  {
    id: 'MSG-802',
    title: 'Upcoming Amazon PPT & Code Assessment Instructions',
    channels: ['Email', 'SMS'],
    audience: 'All Eligible CSE, IT, ECE (380)',
    sentTime: '2026-10-09 18:00',
    deliveryRate: '98.9% (376/380)',
    openRate: '86.4% Read',
    status: 'Sent'
  },
  {
    id: 'MSG-803',
    title: 'Reminder: Multiple Offer Declaration Deadline',
    channels: ['Email', 'Push Notification'],
    audience: 'Dual Offer Holders (12)',
    sentTime: 'Scheduled for 2026-10-12 09:00',
    deliveryRate: 'Pending Schedule',
    openRate: 'N/A',
    status: 'Scheduled'
  }
]

export function CommunicationCentre() {
  const [messages, setMessages] = useState(BROADCAST_HISTORY)
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [newMsg, setNewMsg] = useState({
    title: '',
    channels: ['Email'],
    audience: 'All Registered Students (880)',
    content: ''
  })

  const handleSend = (e) => {
    e.preventDefault()
    if (!newMsg.title) return
    const created = {
      id: `MSG-${messages.length + 801}`,
      title: newMsg.title,
      channels: newMsg.channels,
      audience: newMsg.audience,
      sentTime: 'Just now',
      deliveryRate: '100% Delivered',
      openRate: '0% Read (Recent)',
      status: 'Sent'
    }
    setMessages([created, ...messages])
    setShowComposeModal(false)
    setNewMsg({ title: '', channels: ['Email'], audience: 'All Registered Students (880)', content: '' })
  }

  const toggleChannel = (channel) => {
    setNewMsg(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T22</span>
            <h1 className="text-2xl font-bold text-slate-900">Communication & Notification Centre</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Dispatch announcements, multi-channel circulars (Email, SMS, Push), deadline reminders, and monitor delivery read receipts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" onClick={() => setShowComposeModal(true)} className="flex items-center gap-2 text-xs">
            <Send className="w-4 h-4" />
            Compose Broadcast
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Dispatched Circulars"
          value={messages.length}
          icon={Mail}
          change="Campus notices"
          trend="up"
        />
        <StatCard
          title="Average Delivery Rate"
          value="99.4%"
          icon={CheckCircle2}
          change="Email / Push gateway"
          trend="up"
        />
        <StatCard
          title="Average Read Engagement"
          value="89.6%"
          icon={Bell}
          change="Within 4 hours of release"
          trend="up"
        />
        <StatCard
          title="Scheduled Reminders"
          value={messages.filter(m => m.status === 'Scheduled').length}
          icon={Clock}
          change="Pending auto-dispatch"
          trend="neutral"
        />
      </div>

      {/* Broadcast Ledger */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recent Communication Broadcasts & Alerts</h3>
          <span className="text-xs text-slate-400">Section 15.1 to 15.17 Spec</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Subject & Notice</th>
              <th className="py-3 px-4">Channels</th>
              <th className="py-3 px-4">Target Audience</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Delivery & Read Status</th>
              <th className="py-3 px-4 text-right">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {messages.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900 text-sm">{m.title}</div>
                  <div className="text-[10px] font-mono text-slate-400">{m.id}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex gap-1 flex-wrap">
                    {m.channels.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-medium">{m.audience}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{m.sentTime}</td>
                <td className="py-3.5 px-4">
                  <div className="text-emerald-600 font-medium">{m.deliveryRate}</div>
                  <div className="text-[10px] text-slate-400">{m.openRate}</div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <StatusBadge status={m.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSend} className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Broadcast Campus Placement Circular</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Subject / Notice Title</label>
                <input
                  type="text"
                  required
                  value={newMsg.title}
                  onChange={(e) => setNewMsg({ ...newMsg, title: e.target.value })}
                  placeholder="e.g. Mandatory Pre-Placement Talk for Google"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Target Audience</label>
                <select
                  value={newMsg.audience}
                  onChange={(e) => setNewMsg({ ...newMsg, audience: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                >
                  <option value="All Registered Students (880)">All Registered Students (880)</option>
                  <option value="Shortlisted Candidates for Drive">Shortlisted Candidates for Drive</option>
                  <option value="Dual Offer Holders">Dual Offer Holders (Policy)</option>
                  <option value="Faculty Coordinators & HODs">Faculty Coordinators & HODs</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Dispatch Channels</label>
                <div className="flex gap-3 pt-1">
                  {['Email', 'SMS', 'Push Notification'].map(ch => (
                    <label key={ch} className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={newMsg.channels.includes(ch)}
                        onChange={() => toggleChannel(ch)}
                        className="rounded text-indigo-600"
                      />
                      {ch}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Announcement Body</label>
                <textarea
                  rows={4}
                  value={newMsg.content}
                  onChange={(e) => setNewMsg({ ...newMsg, content: e.target.value })}
                  placeholder="Provide instructions, link to venue, deadlines, and contact information..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={() => setShowComposeModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Dispatch Broadcast
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
