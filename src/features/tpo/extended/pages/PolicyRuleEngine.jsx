import React, { useState } from 'react'
import {
  ShieldCheck,
  Scale,
  Plus,
  Edit3,
  CheckCircle2,
  Clock,
  History,
  AlertCircle,
  FileText,
  Sliders,
  Send
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const INITIAL_POLICIES = [
  {
    id: 'POL-01',
    name: 'Multiple Offer Policy (Dream / Super Dream)',
    code: 'PL-DREAM-2026',
    category: 'Student Eligibility & Offers',
    effectiveDate: '2026-08-01',
    status: 'Active',
    version: 'v3.2',
    rulesSummary: 'Students placed below 12 LPA can apply for Dream (>=15 LPA). Students placed below 25 LPA can apply for Super Dream (>=25 LPA). Once Super Dream is accepted, no further applications permitted.',
    lastModified: '2026-08-15',
    acknowledgedByStudents: 840
  },
  {
    id: 'POL-02',
    name: 'Internship-to-PPO Conversion Protocol',
    code: 'PL-PPO-CONV',
    category: 'Internship Regulations',
    effectiveDate: '2026-07-15',
    status: 'Active',
    version: 'v2.0',
    rulesSummary: 'Mandatory 6-month attendance logs signed by industrial mentors. PPOs must be confirmed through central TPO portal within 14 calendar days of receipt.',
    lastModified: '2026-07-20',
    acknowledgedByStudents: 412
  },
  {
    id: 'POL-03',
    name: 'Placement Drive Absence & Disciplinary Rule',
    code: 'PL-DISCIPLINE-ABSENCE',
    category: 'Drive Conduct & Ethics',
    effectiveDate: '2026-08-10',
    status: 'Active',
    version: 'v1.4',
    rulesSummary: 'Unexcused no-show after shortlisting incurs automatic suspension from next 2 campus recruitment drives unless approved by Faculty HOD.',
    lastModified: '2026-08-12',
    acknowledgedByStudents: 872
  },
  {
    id: 'POL-04',
    name: 'Revised Off-Campus Offer Declaration & NOC Norms',
    code: 'PL-OFFCAMPUS-2026',
    category: 'External Recruitment',
    effectiveDate: 'Pending Sign-off',
    status: 'Draft / In Review',
    version: 'v4.0 (Draft)',
    rulesSummary: 'Students obtaining off-campus offers must declare within 72 hours for institutional NOC verification before joining dates are ratified.',
    lastModified: '2026-10-08',
    acknowledgedByStudents: 0
  }
]

export function PolicyRuleEngine() {
  const [policies, setPolicies] = useState(INITIAL_POLICIES)
  const [selectedPolicy, setSelectedPolicy] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    category: 'Student Eligibility & Offers',
    rulesSummary: '',
    version: 'v1.0 (Draft)'
  })

  const handleCreatePolicy = (e) => {
    e.preventDefault()
    if (!newPolicy.name) return
    const created = {
      id: `POL-0${policies.length + 1}`,
      name: newPolicy.name,
      code: `PL-${newPolicy.name.toUpperCase().slice(0, 8).replace(/\s+/g, '-')}`,
      category: newPolicy.category,
      effectiveDate: 'Awaiting Principal Approval',
      status: 'Draft / In Review',
      version: newPolicy.version,
      rulesSummary: newPolicy.rulesSummary,
      lastModified: '2026-10-10',
      acknowledgedByStudents: 0
    }
    setPolicies([created, ...policies])
    setShowCreateModal(false)
    setNewPolicy({ name: '', category: 'Student Eligibility & Offers', rulesSummary: '', version: 'v1.0 (Draft)' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T32</span>
            <h1 className="text-2xl font-bold text-slate-900">Placement Policy & Rule Engine</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Author campus placement regulations, configure dream/core offer criteria, track student consent acknowledgements, and submit revisions for Principal approval.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Draft New Policy
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Placement Policies"
          value={policies.filter(p => p.status === 'Active').length}
          icon={ShieldCheck}
          change="Campus-wide enforceability"
          trend="up"
        />
        <StatCard
          title="In Review / Pending M7"
          value={policies.filter(p => p.status.includes('Review')).length}
          icon={Clock}
          change="Requires Principal sign-off"
          trend="neutral"
        />
        <StatCard
          title="Student Acknowledgements"
          value="872 Signed"
          icon={CheckCircle2}
          change="98.5% batch coverage"
          trend="up"
        />
        <StatCard
          title="Policy Rule Categories"
          value="4 Distinct"
          icon={Scale}
          change="Offers, Leaves, Conduct, NOC"
          trend="neutral"
        />
      </div>

      {/* Policies List */}
      <div className="space-y-4">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-semibold">
                  {policy.code}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{policy.name}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                  {policy.version}
                </span>
                <StatusBadge status={policy.status} />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {policy.rulesSummary}
              </p>

              <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                <span>Category: <strong>{policy.category}</strong></span>
                <span>•</span>
                <span>Effective Date: <strong>{policy.effectiveDate}</strong></span>
                <span>•</span>
                <span>Student Acknowledgements: <strong>{policy.acknowledgedByStudents}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPolicy(policy)}
                className="text-xs h-8"
              >
                Inspect Policy Rules
              </Button>
              {policy.status.includes('Review') && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded font-medium">
                  Awaiting Principal
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Policy Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-indigo-600 font-semibold">{selectedPolicy.code}</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedPolicy.name}</h3>
                <span className="text-xs text-slate-500">Version {selectedPolicy.version}</span>
              </div>
              <StatusBadge status={selectedPolicy.status} />
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-2">
              <div className="font-semibold text-slate-800">Rule Parameters & Logic Engine:</div>
              <p className="text-slate-600 leading-relaxed">{selectedPolicy.rulesSummary}</p>
              <div className="pt-2 border-t border-slate-200 text-slate-500 flex justify-between">
                <span>Enforced by: Central Placement Governance</span>
                <span>Last Modified: {selectedPolicy.lastModified}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setSelectedPolicy(null)}>
                Close
              </Button>
              <Button variant="default" onClick={() => setSelectedPolicy(null)}>
                Update Version
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Draft New Policy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreatePolicy} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Draft Placement Policy Revision</h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Policy Title</label>
                <input
                  type="text"
                  required
                  value={newPolicy.name}
                  onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                  placeholder="e.g. 2026 Tiered Minimum Package Policy"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Policy Category</label>
                <select
                  value={newPolicy.category}
                  onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Student Eligibility & Offers">Student Eligibility & Offers</option>
                  <option value="Internship Regulations">Internship Regulations</option>
                  <option value="Drive Conduct & Ethics">Drive Conduct & Ethics</option>
                  <option value="External Recruitment">External Recruitment</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Policy Rules & Thresholds</label>
                <textarea
                  rows={3}
                  required
                  value={newPolicy.rulesSummary}
                  onChange={(e) => setNewPolicy({ ...newPolicy, rulesSummary: e.target.value })}
                  placeholder="Specify eligibility gates, multiple offer ceilings, or attendance penalty conditions..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default">
                Submit for M7 Approval
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
