import React, { useState } from 'react'
import { StatusBadge, Button, Modal, Input } from '@/components/ui'
import { Building2, Plus, ExternalLink, ShieldCheck, Search, Users } from 'lucide-react'

export function TpoCompaniesListPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [companies, setCompanies] = useState([
    {
      id: 'comp-1',
      name: 'Google India Private Limited',
      category: 'Tier 1 / Super Dream',
      industry: 'Cloud & Consumer Internet',
      status: 'ACTIVE',
      activeJobs: 2,
      recruiterContact: 'Ananya S (University Campus Lead)',
      recruiterEmail: 'recruiter@google.com',
    },
    {
      id: 'comp-2',
      name: 'Oracle Financial Services',
      category: 'Tier 2 / Dream',
      industry: 'Enterprise Software & Cloud DB',
      status: 'ACTIVE',
      activeJobs: 1,
      recruiterContact: 'Vikram Joshi (Head of Talent Acquisition)',
      recruiterEmail: 'campus@oracle.com',
    },
    {
      id: 'comp-3',
      name: 'Cognizant Technology Solutions',
      category: 'Regular Mass Recruiter',
      industry: 'IT Consulting & Services',
      status: 'ACTIVE',
      activeJobs: 1,
      recruiterContact: 'Priya Raman (Campus Programs)',
      recruiterEmail: 'talent@cognizant.com',
    },
  ])

  const [newCompany, setNewCompany] = useState({ name: '', industry: '', category: 'Tier 1 / Super Dream', hr: '', email: '' })

  const handleAdd = () => {
    if (!newCompany.name) return
    const entry = {
      id: `comp-${Date.now()}`,
      name: newCompany.name,
      category: newCompany.category,
      industry: newCompany.industry,
      status: 'ACTIVE',
      activeJobs: 0,
      recruiterContact: newCompany.hr,
      recruiterEmail: newCompany.email,
    }
    setCompanies([...companies, entry])
    setModalOpen(false)
    setNewCompany({ name: '', industry: '', category: 'Tier 1 / Super Dream', hr: '', email: '' })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Corporate Partners & Onboarding (T5)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Maintain employer records, recruiter contact directories, and company MoU agreements.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Onboard New Corporate Partner (M4.1)
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Hiring Tier</th>
              <th className="px-6 py-4">HR & Recruiter Contact</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Active Roles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {companies.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{c.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{c.industry}</p>
                </td>
                <td className="px-6 py-4 font-semibold text-indigo-700">{c.category}</td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-800">{c.recruiterContact}</p>
                  <p className="text-[11px] text-slate-400">{c.recruiterEmail}</p>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-6 py-4 text-right font-bold text-slate-900">
                  {c.activeJobs} Jobs Active
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Onboard New Recruiting Company (M4.1, 4.3)"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAdd}>
              Approve & Create Account
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <Input label="Company Legal Name" value={newCompany.name} onChange={(e) => setNewCompany({...newCompany, name: e.target.value})} placeholder="e.g. NVIDIA Graphics" />
          <Input label="Industry Sector" value={newCompany.industry} onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})} placeholder="e.g. Semiconductors / AI" />
          <Input label="HR Lead Contact Name" value={newCompany.hr} onChange={(e) => setNewCompany({...newCompany, hr: e.target.value})} placeholder="e.g. Rajesh Kumar" />
          <Input label="Corporate Contact Email" value={newCompany.email} onChange={(e) => setNewCompany({...newCompany, email: e.target.value})} placeholder="talent@nvidia.com" />
        </div>
      </Modal>
    </div>
  )
}
