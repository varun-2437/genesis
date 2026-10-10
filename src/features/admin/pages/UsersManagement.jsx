import React, { useState } from 'react'
import {
  Users,
  UserPlus,
  Shield,
  Key,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Building,
  Lock,
  UserCheck
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const INITIAL_USERS = [
  {
    id: 'USR-001',
    name: 'Dr. Ramesh Kulkarni',
    email: 'tpo.head@college.edu',
    role: 'TPO_ADMIN',
    department: 'Central Placement Cell',
    status: 'Active',
    lastLogin: '2026-10-10 16:40',
    approvalAuthority: true
  },
  {
    id: 'USR-002',
    name: 'Priya Sundaram',
    email: 'p.sundaram@college.edu',
    role: 'TPO_STAFF',
    department: 'Central Placement Cell',
    status: 'Active',
    lastLogin: '2026-10-10 15:12',
    approvalAuthority: false
  },
  {
    id: 'USR-003',
    name: 'Prof. S. Natarajan',
    email: 'hod.cse@college.edu',
    role: 'FACULTY_HOD',
    department: 'Computer Science',
    status: 'Active',
    lastLogin: '2026-10-09 11:20',
    approvalAuthority: true
  },
  {
    id: 'USR-004',
    name: 'Vikramaditya Bose',
    email: 'v.bose@microsoft.com',
    role: 'RECRUITER',
    department: 'University Relations (Microsoft)',
    status: 'Active',
    lastLogin: '2026-10-10 09:15',
    approvalAuthority: false
  },
  {
    id: 'USR-005',
    name: 'Sunita Rao',
    email: 's.rao@college.edu',
    role: 'FACULTY_COORDINATOR',
    department: 'Electronics & Comm.',
    status: 'Deactivated',
    lastLogin: '2026-08-14 18:00',
    approvalAuthority: false
  },
  {
    id: 'USR-006',
    name: 'SysAdmin Root',
    email: 'admin.infra@college.edu',
    role: 'SYSTEM_ADMIN',
    department: 'IT Infrastructure',
    status: 'Active',
    lastLogin: '2026-10-10 17:01',
    approvalAuthority: true
  }
]

export function UsersManagement() {
  const [users, setUsers] = useState(INITIAL_USERS)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'TPO_STAFF',
    department: 'Central Placement Cell',
    approvalAuthority: false
  })

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'All' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Deactivated' : 'Active'
        return { ...u, status: nextStatus }
      }
      return u
    }))
  }

  const handleCreateUser = (e) => {
    e.preventDefault()
    if (!newUser.name || !newUser.email) return

    const created = {
      id: `USR-00${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: 'Active',
      lastLogin: 'Never',
      approvalAuthority: newUser.approvalAuthority
    }

    setUsers([created, ...users])
    setShowAddModal(false)
    setNewUser({
      name: '',
      email: '',
      role: 'TPO_STAFF',
      department: 'Central Placement Cell',
      approvalAuthority: false
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Admin AD2</span>
            <h1 className="text-2xl font-bold text-slate-900">Users & Accounts Management</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Provision, manage roles, configure authorization levels, and audit account access across all portals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Provision New User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total User Accounts"
          value={users.length}
          icon={Users}
          change="Across 5 active roles"
          trend="neutral"
        />
        <StatCard
          title="Active Accounts"
          value={users.filter(u => u.status === 'Active').length}
          icon={CheckCircle}
          change="92% active usage"
          trend="up"
        />
        <StatCard
          title="Approval Authorities"
          value={users.filter(u => u.approvalAuthority).length}
          icon={Shield}
          change="Can sign policies/budgets"
          trend="neutral"
        />
        <StatCard
          title="Recruiter Accounts"
          value={users.filter(u => u.role === 'RECRUITER').length}
          icon={Building}
          change="Company representatives"
          trend="up"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Role Filter:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          >
            <option value="All">All Roles</option>
            <option value="SYSTEM_ADMIN">System Admin</option>
            <option value="TPO_ADMIN">TPO Admin</option>
            <option value="TPO_STAFF">TPO Staff</option>
            <option value="FACULTY_HOD">Faculty HOD</option>
            <option value="RECRUITER">Company Recruiter</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role Assigned</th>
                <th className="py-3.5 px-4">Department / Affiliation</th>
                <th className="py-3.5 px-4">Authority</th>
                <th className="py-3.5 px-4">Last Login</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{u.name}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {u.email}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-700">
                    {u.department}
                  </td>
                  <td className="py-3.5 px-4">
                    {u.approvalAuthority ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        <Shield className="w-3 h-3" /> Authorized Signer
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Standard Access</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-500">
                    {u.lastLogin}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                          u.status === 'Active'
                            ? 'text-rose-600 hover:bg-rose-50 border border-rose-200'
                            : 'text-emerald-600 hover:bg-emerald-50 border border-emerald-200'
                        }`}
                      >
                        {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateUser} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Provision User Account</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Dr. Jane Doe"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="e.g. j.doe@college.edu"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="TPO_STAFF">TPO Staff</option>
                  <option value="TPO_ADMIN">TPO Administrator</option>
                  <option value="FACULTY_HOD">Faculty / HOD</option>
                  <option value="RECRUITER">Company Recruiter</option>
                  <option value="SYSTEM_ADMIN">System Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Department</label>
                <input
                  type="text"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="approvalAuth"
                  checked={newUser.approvalAuthority}
                  onChange={(e) => setNewUser({ ...newUser, approvalAuthority: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="approvalAuth" className="text-slate-700 font-medium">
                  Grant Policy / Financial Approval Authority
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default">
                Create User
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
