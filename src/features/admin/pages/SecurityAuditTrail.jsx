import React, { useState } from 'react'
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Lock,
  Eye,
  Key,
  Database,
  FileCheck,
  CheckCircle2
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const AUDIT_LOGS = [
  {
    id: 'LOG-8812',
    timestamp: '2026-10-10 16:54:12',
    user: 'tpo.head@college.edu',
    role: 'TPO_ADMIN',
    action: 'POLICY_SUBMIT_FOR_APPROVAL',
    resource: 'PL-OFFCAMPUS-2026',
    ipAddress: '192.168.1.104',
    status: 'Success',
    severity: 'Medium'
  },
  {
    id: 'LOG-8811',
    timestamp: '2026-10-10 16:32:05',
    user: 'v.bose@microsoft.com',
    role: 'RECRUITER',
    action: 'RESUME_MASS_EXPORT',
    resource: 'Batch 2027 CSE Shortlist (42 records)',
    ipAddress: '103.22.45.18',
    status: 'Success',
    severity: 'High'
  },
  {
    id: 'LOG-8810',
    timestamp: '2026-10-10 15:45:22',
    user: 'unknown_ip@guest',
    role: 'ANONYMOUS',
    action: 'FAILED_AUTHENTICATION_ATTEMPT',
    resource: '/api/v1/admin/users',
    ipAddress: '45.130.229.12',
    status: 'Blocked',
    severity: 'Critical'
  },
  {
    id: 'LOG-8809',
    timestamp: '2026-10-10 14:10:00',
    user: 'admin.infra@college.edu',
    role: 'SYSTEM_ADMIN',
    action: 'RBAC_PERMISSION_UPDATE',
    resource: 'Role: RECRUITER (Module: Offers)',
    ipAddress: '192.168.1.5',
    status: 'Success',
    severity: 'Medium'
  },
  {
    id: 'LOG-8808',
    timestamp: '2026-10-10 11:20:41',
    user: 'hod.cse@college.edu',
    role: 'FACULTY_HOD',
    action: 'STUDENT_ELIGIBILITY_OVERRIDE',
    resource: 'Student: 21CS042',
    ipAddress: '192.168.1.44',
    status: 'Success',
    severity: 'High'
  }
]

export function SecurityAuditTrail() {
  const [logs, setLogs] = useState(AUDIT_LOGS)
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('All')

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm)
    const matchesSeverity = severityFilter === 'All' || log.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Admin AD7</span>
            <h1 className="text-2xl font-bold text-slate-900">Security, Privacy & Audit Trail</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Immutable audit logging, recruiter candidate download tracking, unauthorized access alerts, and data privacy safeguards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Audit Bundle (Encrypted)
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Audited Events"
          value="14,290"
          icon={FileCheck}
          change="Last 30 days"
          trend="neutral"
        />
        <StatCard
          title="Critical Alerts"
          value="1 Blocked"
          icon={AlertTriangle}
          change="Auto-mitigated by firewall"
          trend="up"
        />
        <StatCard
          title="Data Encryption At Rest"
          value="AES-256 GCM"
          icon={Lock}
          change="Resumes & CTC figures"
          trend="neutral"
        />
        <StatCard
          title="Recruiter Access Expiries"
          value="Zero Leakage"
          icon={CheckCircle2}
          change="All tokens time-bounded"
          trend="up"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by user, action, IP or resource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">System Activity & Access Ledger</h3>
          <span className="text-xs text-slate-400">SOC 2 / ISO 27001 Auditable</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Operator & Role</th>
              <th className="py-3 px-4">Action Vector</th>
              <th className="py-3 px-4">Resource Target</th>
              <th className="py-3 px-4">IP Address</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-mono text-slate-500">{log.timestamp}</td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{log.user}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{log.role}</div>
                </td>
                <td className="py-3.5 px-4 font-mono text-indigo-700 font-medium">
                  {log.action}
                </td>
                <td className="py-3.5 px-4 text-slate-700">
                  {log.resource}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{log.ipAddress}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    log.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                    log.severity === 'High' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {log.severity}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={log.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
