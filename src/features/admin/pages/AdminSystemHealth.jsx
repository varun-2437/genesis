import React, { useState } from 'react'
import {
  Activity,
  Cpu,
  HardDrive,
  CheckCircle2,
  Clock
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'

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
  const [services] = useState(SYSTEM_SERVICES)
  const [jobs] = useState(ACTIVE_BACKGROUND_JOBS)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">System Infrastructure & Operations</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Microservice health telemetry, background asynchronous task queues, and storage allocation.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Cluster Status"
          value="100% Uptime"
          icon={Activity}
          subtitle="5 microservices healthy"
        />
        <StatCard
          label="API Latency"
          value="28 ms"
          icon={Cpu}
          delta={-4}
        />
        <StatCard
          label="Storage Allocated"
          value="42.8 GB / 500 GB"
          icon={HardDrive}
          subtitle="8.5% capacity consumed"
        />
        <StatCard
          label="Background Tasks"
          value="3 Active"
          icon={Clock}
          subtitle="0 queue retries"
        />
      </div>

      {/* Service Health Cards */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-fg">Service Availability Matrix</h2>
          <span className="text-xs text-fg-muted">Heartbeat: 15s interval</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((srv, idx) => (
            <div key={idx} className="p-3.5 rounded border border-line bg-surface-2/40 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-fg">{srv.name}</span>
                <span className="badge bg-success-soft text-success text-[11px]">
                  <CheckCircle2 size={12} strokeWidth={1.75} /> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between text-fg-muted pt-1 border-t border-line text-[11px]">
                <span>Uptime: <strong className="text-fg tabular-nums">{srv.uptime}</strong></span>
                <span>Latency: <strong className="text-fg tabular-nums">{srv.latency}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Jobs Monitor */}
      <div className="table-wrap">
        <div className="p-3.5 border-b border-line flex items-center justify-between bg-surface-2/30">
          <h2 className="text-[14px] font-semibold text-fg">Background Task Monitor</h2>
          <span className="text-xs text-fg-muted">Asynchronous Worker Queue</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Task Identifier</th>
              <th>Task Name</th>
              <th>Progress</th>
              <th>Volume</th>
              <th className="text-right">State</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="font-mono text-fg-muted text-xs">{job.id}</td>
                <td className="font-medium text-fg">{job.task}</td>
                <td className="text-accent font-medium">{job.progress}</td>
                <td className="text-fg-muted">{job.recordsProcessed}</td>
                <td className="text-right">
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
