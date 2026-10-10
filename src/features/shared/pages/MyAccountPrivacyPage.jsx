import React, { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Input, Button, Tabs, StatusBadge } from '@/components/ui'
import { User, Shield, Laptop, Lock, DownloadCloud, Trash2, CheckCircle2 } from 'lucide-react'

export function MyAccountPrivacyPage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [passwordSaved, setPasswordSaved] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || 'Varun M',
    email: user?.email || 'varun@student.genesis.edu',
    phone: '+91 98765 43210',
    currentPassword: '',
    newPassword: '',
  })

  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    setPasswordSaved(true)
    setTimeout(() => setPasswordSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Account & Privacy Settings</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal institutional identity, security parameters, and data rights.
        </p>
      </div>

      <Tabs
        tabs={[
          { id: 'profile', label: 'Profile Information', icon: User },
          { id: 'security', label: 'Security & Sessions', icon: Shield },
          { id: 'privacy', label: 'Privacy & Data Rights', icon: Lock },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Institutional Email"
              disabled
              value={formData.email}
              helperText="Managed by university single sign-on"
            />
            <Input
              label="Mobile Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Designated Role</label>
              <div className="pt-2">
                <StatusBadge status={user?.role?.toUpperCase() || 'STUDENT'} />
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button size="sm">Save Changes</Button>
          </div>
        </div>
      )}

      {/* Tab 2: Security */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <form onSubmit={handlePasswordUpdate} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Change Password</h3>
            {passwordSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Password updated successfully.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Current Password"
                type="password"
                required
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              />
              <Input
                label="New Password"
                type="password"
                required
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button type="submit" size="sm">Update Password</Button>
            </div>
          </form>

          {/* Active Sessions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Active Device Sessions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Chrome on macOS (Current Device)</p>
                    <p className="text-[11px] text-slate-400">IP: 103.21.24.12 · Active now</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Privacy & Rights */}
      {activeTab === 'privacy' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Institutional Data Rights & Consent</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your placement records are stored in compliance with Digital Personal Data Protection (DPDP) guidelines.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3 text-xs text-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Recruiter Profile Visibility</p>
                <p className="text-slate-500 text-[11px]">Allow verified corporate recruiters in registered drives to inspect your profile.</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">Alumni Mentorship Matchmaking</p>
                <p className="text-slate-500 text-[11px]">Allow your profile to be recommended to verified alumni for mock interviews.</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <Button variant="secondary" size="sm" className="flex items-center gap-1.5">
              <DownloadCloud className="w-4 h-4" /> Download Complete Placement Dossier (JSON/PDF)
            </Button>
            <Button variant="danger" size="sm" className="flex items-center gap-1.5">
              <Trash2 className="w-4 h-4" /> Submit Data Rectification Request
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
