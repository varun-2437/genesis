import React, { useState } from 'react'
import {
  Shield,
  Key,
  Users,
  Check,
  X,
  Lock,
  Unlock,
  AlertCircle,
  Save,
  CheckCircle2
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

// Modules and default permissions across roles
const SYSTEM_MODULES = [
  { id: 'students', name: 'Student Directory & Profiles' },
  { id: 'jobs', name: 'Job Postings & Approvals' },
  { id: 'drives', name: 'Recruitment Drives & Rounds' },
  { id: 'offers', name: 'Offers & CTC Verification' },
  { id: 'tests', name: 'Question Bank & Assessments' },
  { id: 'finance', name: 'Placement Cell Budgets' },
  { id: 'policy', name: 'Policy & Governance' },
  { id: 'admin_sys', name: 'System Integrations & Audit' }
]

const ROLE_PERMISSIONS_INIT = {
  SYSTEM_ADMIN: {
    students: { read: true, write: true, delete: true, export: true },
    jobs: { read: true, write: true, delete: true, export: true },
    drives: { read: true, write: true, delete: true, export: true },
    offers: { read: true, write: true, delete: true, export: true },
    tests: { read: true, write: true, delete: true, export: true },
    finance: { read: true, write: true, delete: true, export: true },
    policy: { read: true, write: true, delete: true, export: true },
    admin_sys: { read: true, write: true, delete: true, export: true }
  },
  TPO_ADMIN: {
    students: { read: true, write: true, delete: false, export: true },
    jobs: { read: true, write: true, delete: true, export: true },
    drives: { read: true, write: true, delete: true, export: true },
    offers: { read: true, write: true, delete: false, export: true },
    tests: { read: true, write: true, delete: true, export: true },
    finance: { read: true, write: true, delete: false, export: true },
    policy: { read: true, write: true, delete: false, export: true },
    admin_sys: { read: false, write: false, delete: false, export: false }
  },
  FACULTY_HOD: {
    students: { read: true, write: false, delete: false, export: true },
    jobs: { read: true, write: false, delete: false, export: false },
    drives: { read: true, write: false, delete: false, export: false },
    offers: { read: true, write: false, delete: false, export: false },
    tests: { read: true, write: false, delete: false, export: false },
    finance: { read: false, write: false, delete: false, export: false },
    policy: { read: true, write: false, delete: false, export: false },
    admin_sys: { read: false, write: false, delete: false, export: false }
  },
  RECRUITER: {
    students: { read: true, write: false, delete: false, export: true },
    jobs: { read: true, write: true, delete: false, export: false },
    drives: { read: true, write: false, delete: false, export: false },
    offers: { read: true, write: true, delete: false, export: false },
    tests: { read: false, write: false, delete: false, export: false },
    finance: { read: false, write: false, delete: false, export: false },
    policy: { read: true, write: false, delete: false, export: false },
    admin_sys: { read: false, write: false, delete: false, export: false }
  }
}

export function RolesPermissions() {
  const [selectedRole, setSelectedRole] = useState('TPO_ADMIN')
  const [permMatrix, setPermMatrix] = useState(ROLE_PERMISSIONS_INIT)
  const [saveToast, setSaveToast] = useState(false)

  const togglePermission = (moduleId, action) => {
    setPermMatrix((prev) => {
      const currentRolePerms = prev[selectedRole]
      const currentModPerms = currentRolePerms[moduleId] || { read: false, write: false, delete: false, export: false }
      return {
        ...prev,
        [selectedRole]: {
          ...currentRolePerms,
          [moduleId]: {
            ...currentModPerms,
            [action]: !currentModPerms[action]
          }
        }
      }
    })
  }

  const handleSave = () => {
    setSaveToast(true)
    setTimeout(() => setSaveToast(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Admin AD3</span>
            <h1 className="text-2xl font-bold text-slate-900">Roles & Permissions Matrix</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Configure fine-grained Role-Based Access Control (RBAC) across system modules and CRUD capability vectors.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveToast && (
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Changes saved to security registry
            </span>
          )}
          <Button variant="default" onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Permission Matrix
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Configured RBAC Roles"
          value="4 Active Roles"
          icon={Users}
          change="System-wide coverage"
          trend="neutral"
        />
        <StatCard
          title="Monitored Modules"
          value={SYSTEM_MODULES.length}
          icon={Shield}
          change="Fine-grained security gates"
          trend="neutral"
        />
        <StatCard
          title="Active Permission Keys"
          value="32 Checks"
          icon={Key}
          change="Read, Write, Delete, Export"
          trend="up"
        />
        <StatCard
          title="Access Review Cadence"
          value="Quarterly"
          icon={Lock}
          change="Next audit: 01 Nov 2026"
          trend="neutral"
        />
      </div>

      {/* Role Picker Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto self-start gap-1">
        {[
          { key: 'SYSTEM_ADMIN', label: 'System Administrator' },
          { key: 'TPO_ADMIN', label: 'TPO Administrator' },
          { key: 'FACULTY_HOD', label: 'Faculty / HOD' },
          { key: 'RECRUITER', label: 'Recruiter Partner' }
        ].map((role) => (
          <button
            key={role.key}
            onClick={() => setSelectedRole(role.key)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedRole === role.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Module Permissions Matrix for: <span className="text-indigo-600">{selectedRole}</span>
            </h3>
            <p className="text-xs text-slate-400">Click checkboxes to grant or restrict specific operation vectors.</p>
          </div>
        </div>

        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">System Module</th>
              <th className="py-3 px-4 text-center">Read / View</th>
              <th className="py-3 px-4 text-center">Create / Update</th>
              <th className="py-3 px-4 text-center">Delete / Purge</th>
              <th className="py-3 px-4 text-center">Export Data (CSV/PDF)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {SYSTEM_MODULES.map((mod) => {
              const currentMod = permMatrix[selectedRole]?.[mod.id] || { read: false, write: false, delete: false, export: false }
              return (
                <tr key={mod.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {mod.name}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={currentMod.read}
                      onChange={() => togglePermission(mod.id, 'read')}
                      className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer h-4 w-4"
                    />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={currentMod.write}
                      onChange={() => togglePermission(mod.id, 'write')}
                      className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer h-4 w-4"
                    />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={currentMod.delete}
                      onChange={() => togglePermission(mod.id, 'delete')}
                      className="rounded text-rose-600 focus:ring-rose-500 cursor-pointer h-4 w-4"
                    />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={currentMod.export}
                      onChange={() => togglePermission(mod.id, 'export')}
                      className="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer h-4 w-4"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
