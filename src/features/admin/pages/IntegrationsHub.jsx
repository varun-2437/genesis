import React, { useState } from 'react'
import {
  Link2,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Shield,
  Key,
  Database,
  Mail,
  Calendar,
  Layers,
  Sliders,
  Settings
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

const SYSTEM_INTEGRATIONS = [
  {
    id: 'INT-ERP',
    name: 'College ERP & Student Information System (25.1)',
    category: 'Student Data, Grades, Backlogs',
    type: 'REST Webhook Sync',
    lastSync: '2026-10-10 16:00',
    status: 'Connected & Active',
    icon: Database
  },
  {
    id: 'INT-LMS',
    name: 'Canvas / Moodle LMS (25.6)',
    category: 'Coursework, Attendance, Credits',
    type: 'LTI 1.3 Protocol',
    lastSync: '2026-10-10 14:15',
    status: 'Connected & Active',
    icon: Layers
  },
  {
    id: 'INT-COMM',
    name: 'SendGrid & Twilio Messaging Gateway (25.7, 25.8)',
    category: 'Email, SMS, Circulars',
    type: 'Cloud API Relay',
    lastSync: '2026-10-10 16:54',
    status: 'Connected & Active',
    icon: Mail
  },
  {
    id: 'INT-AI',
    name: 'OpenAI / Python Resume Parsing Service (25.13)',
    category: 'Semantic Skills & Explainable AI',
    type: 'Microservice API',
    lastSync: '2026-10-10 15:30',
    status: 'Connected & Active',
    icon: Key
  }
]

export function IntegrationsHub() {
  const [integrations, setIntegrations] = useState(SYSTEM_INTEGRATIONS)
  const [syncToast, setSyncToast] = useState(false)

  const handleSyncAll = () => {
    setSyncToast(true)
    setTimeout(() => setSyncToast(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Admin AD5 & AD6</span>
            <h1 className="text-2xl font-bold text-slate-900">External Integrations & Connectors Hub</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Connect institutional ERPs, LMS platforms, automated SMS/Email gateways, resume parsers, and API access keys.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {syncToast && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Full ERP sync triggered successfully
            </span>
          )}
          <Button variant="default" onClick={handleSyncAll} className="flex items-center gap-2 text-xs">
            <RefreshCw className="w-4 h-4" />
            Trigger Full ERP Sync (25.15)
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Integrations"
          value="4 Connected"
          icon={Link2}
          change="Zero broken connectors"
          trend="up"
        />
        <StatCard
          title="Daily Webhook Invocations"
          value="4,820 Events"
          icon={Layers}
          change="Across ERP & LMS"
          trend="neutral"
        />
        <StatCard
          title="API Key Health"
          value="100% Valid"
          icon={Shield}
          change="All tokens active"
          trend="up"
        />
        <StatCard
          title="Last Synchronisation"
          value="16:00 Today"
          icon={RefreshCw}
          change="Auto scheduled"
          trend="neutral"
        />
      </div>

      {/* Integration Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.category}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3" /> Active
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-center justify-between text-slate-500">
                <span>Protocol: <strong className="text-slate-700">{item.type}</strong></span>
                <span>Last Sync: <strong className="text-slate-700">{item.lastSync}</strong></span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-slate-400">{item.id}</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    Configure Keys
                  </Button>
                  <Button size="sm" variant="default" className="text-xs h-7">
                    Test Handshake
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
