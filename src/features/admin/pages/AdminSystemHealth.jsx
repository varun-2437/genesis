import React, { useState } from 'react'
import {
  Activity,
  Server,
  Cpu,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Clock,
  Layers,
  Database
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const SYSTEM_SERVICES = [
  { name: 'Core Placement API Gateway', uptime: '99.98%', latency: '24ms', status: 'Operational' },
  { name: 'Auth & RBAC Identity Provider', uptime: '100.0%', latency: '18ms', status: 'Operational' },
  { name: 'Coding Sandbox Evaluation Engine (Python)', uptime: '99.85%', latency: '142ms', status: 'Operational' },
  { name: 'Email & WhatsApp Notification Dispatcher', uptime: '99.92%', latency: '58ms', status: 'Operational' },
  { name: 'Document Store (AES-256 S3 Storage)', uptime: '100.0%', latency: '35ms', status: 'Operational' }
]

const ACTIVE_BACKGROUND_JOBS = [
  {
    id: 'JOB-941',
    task: 'Bulk Student Profile Sync with ERP (25.1)',
    progress: '100% Completed',
    recordsProcessed: '880/880 Students',
    duration: '14.2s',
    status: 'Completed'
  },
  {
    id: 'JOB-942',
    task: 'Hourly Assessment Cheating Telemetry Aggregation',
    progress: 'Running in Background',
    recordsProcessed: '220 Telemetry Logs',
    duration: 'Ongoing',
    status: 'In Progress'
  },
  {
    id: 'JOB-943',
    task: 'Nightly NIRF Table 18.18 Snapshot Backup',
    progress: 'Scheduled for 02:00 AM',
    recordsProcessed: 'Pending',
    duration: 'Scheduled',
    status: 'Scheduled'
  }
]

export function AdminSystemHealth() {
  const [services, setServices] = useState(SYSTEM_SERVICES)
  const [jobs, setJobs] = useState(ACTIVE_BACKGROUND_JOBS)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Admin AD1 & AD8</span>
            <h1 className="text-2xl font-bold text-slate-900">System Operations & Service Monitoring</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time server availability (30.12), operational latency, background import/export jobs (30.3), and storage usage (30.6).
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Service Health"
          value="100% Operational"
          icon={Activity}
          change="All 5 microservices healthy"
          trend="up"
        />
        <StatCard
          title="Average API Latency"
          value="28 ms"
          icon={Cpu}
          change="-4ms optimization"
          trend="up"
        />
        <StatCard
          title="Storage Consumption"
          value="42.8 GB / 500 GB"
          icon={HardDrive}
          change="8.5% capacity utilized"
          trend="neutral"
        />
        <StatCard
          title="Background Tasks"
          value="3 Tasks"
          icon={Clock}
          change="0 failed queue retries"
          trend="up"
        />
      </div>

      {/* Service Health Cards */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Microservice Availability & Health Check Matrix (30.12)</h3>
          <span className="text-xs text-slate-400">Heartbeat: Every 15 seconds</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((srv, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-900">{srv.name}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                <span>Uptime: <strong className="text-slate-700">{srv.uptime}</strong></span>
                <span>Latency: <strong className="text-slate-700">{srv.latency}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Jobs Monitor */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Import/Export & Background Worker Monitor (30.3)</h3>
          <span className="text-xs text-slate-400">Celery / Worker Queues</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Task Identifier</th>
              <th className="py-3 px-4">Operation Description</th>
              <th className="py-3 px-4">Progress Vector</th>
              <th className="py-3 px-4">Throughput</th>
              <th className="py-3 px-4 text-right">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-mono font-medium text-slate-500">{job.id}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900">{job.task}</td>
                <td className="py-3.5 px-4 font-medium text-indigo-600">{job.progress}</td>
                <td className="py-3.5 px-4 text-slate-600">{job.recordsProcessed}</td>
                <td className="py-3.5 px-4 text-right">
                  <StatusBadge status={job.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
