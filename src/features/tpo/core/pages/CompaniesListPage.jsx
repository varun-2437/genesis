import React, { useState } from 'react'
import { Building2, Plus, ExternalLink, ShieldCheck, Mail, Phone, MapPin, Briefcase } from 'lucide-react'
import { useTpoCoreStore } from '../tpoCoreStore'
import { DataTable } from '@/components/shared/DataTable'
import { FilterBar } from '@/components/shared/FilterBar'
import { Drawer } from '@/components/shared/Drawer'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { COMPANY_STATUS, COMPANY_TIER } from '@/lib/constants'
import { CompanyDetailView } from '../components/CompanyDetailView'

export function CompaniesListPage() {
  const { companies, addCompany, updateCompany } = useTpoCoreStore()

  // State
  const [filters, setFilters] = useState({
    tier: 'ALL',
    status: 'ALL',
  })
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  const [duplicateWarning, setDuplicateWarning] = useState('')

  // New Company Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    tier: COMPANY_TIER.TIER_2,
    status: COMPANY_STATUS.ACTIVE,
    industry: 'Software & Technology',
    website: '',
    hq: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    avgPackageLPA: '',
    maxPackageLPA: '',
    description: '',
    mouSigned: false,
    mouValidUntil: '',
  })

  // Duplicate Check Handler (M4.17)
  const handleNameChange = (e) => {
    const val = e.target.value
    setFormData((prev) => ({ ...prev, name: val }))

    if (val.trim()) {
      const isDuplicate = companies.some(
        (c) => c.name.toLowerCase() === val.trim().toLowerCase()
      )
      if (isDuplicate) {
        setDuplicateWarning(`Warning: A company named "${val}" is already registered.`)
      } else {
        setDuplicateWarning('')
      }
    } else {
      setDuplicateWarning('')
    }
  }

  // Handle Onboard Submit
  const handleOnboardSubmit = (e) => {
    e.preventDefault()
    if (!formData.name) return

    addCompany(formData)
    setIsOnboardingOpen(false)
    setFormData({
      name: '',
      code: '',
      tier: COMPANY_TIER.TIER_2,
      status: COMPANY_STATUS.ACTIVE,
      industry: 'Software & Technology',
      website: '',
      hq: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      avgPackageLPA: '',
      maxPackageLPA: '',
      description: '',
      mouSigned: false,
      mouValidUntil: '',
    })
    setDuplicateWarning('')
  }

  // Filter Logic
  const filteredData = companies.filter((c) => {
    if (filters.tier !== 'ALL' && c.tier !== filters.tier) return false
    if (filters.status !== 'ALL' && c.status !== filters.status) return false
    return true
  })

  // Columns definition for DataTable
  const columns = [
    {
      accessorKey: 'name',
      header: 'Company Name',
      cell: ({ row }) => {
        const comp = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
              {comp.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <button
                onClick={() => setSelectedCompany(comp)}
                className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors text-left"
              >
                {comp.name}
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <span className="font-mono text-slate-400">[{comp.code}]</span>
                <span>•</span>
                <span>{comp.industry}</span>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'tier',
      header: 'Tier / Category',
      cell: ({ row }) => (
        <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
          {row.original.tier}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'hq',
      header: 'Location / HQ',
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{row.original.hq || 'Not Specified'}</span>
        </div>
      ),
    },
    {
      accessorKey: 'avgPackageLPA',
      header: 'CTC (Avg / Max)',
      cell: ({ row }) => (
        <div className="text-xs font-semibold text-slate-800">
          ₹{row.original.avgPackageLPA} LPA
          <span className="text-slate-400 font-normal ml-1">/ ₹{row.original.maxPackageLPA}</span>
        </div>
      ),
    },
    {
      accessorKey: 'contactPerson',
      header: 'Primary Recruiter',
      cell: ({ row }) => {
        const comp = row.original
        return (
          <div className="text-xs space-y-0.5">
            <p className="font-medium text-slate-900">{comp.contactPerson || 'N/A'}</p>
            <p className="text-slate-500 text-[11px] truncate max-w-[140px]">{comp.contactEmail}</p>
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const comp = row.original
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedCompany(comp)}
              className="text-xs py-1 px-2.5"
            >
              360° View
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" /> Companies & Recruiter Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage recruiting partners, on-board new companies, configure agreements and tiers.
          </p>
        </div>

        <Button
          onClick={() => setIsOnboardingOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Onboard Company
        </Button>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filters={[
          {
            key: 'tier',
            label: 'Company Tier',
            options: Object.values(COMPANY_TIER),
          },
          {
            key: 'status',
            label: 'Partnership Status',
            options: Object.values(COMPANY_STATUS),
          },
        ]}
        values={filters}
        onChange={setFilters}
        onReset={() => setFilters({ tier: 'ALL', status: 'ALL' })}
      />

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        searchPlaceholder="Search by name, industry or recruiter email..."
        emptyMessage="No companies match the current filter selection."
      />

      {/* 360° Company Detail Drawer (T6) */}
      <Drawer
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        title={selectedCompany?.name || 'Company Profile'}
        subtitle={`Registered code: ${selectedCompany?.code || 'N/A'} • ${selectedCompany?.tier}`}
        size="lg"
      >
        {selectedCompany && (
          <CompanyDetailView
            company={selectedCompany}
            onUpdate={(updates) => {
              updateCompany(selectedCompany.id, updates)
              setSelectedCompany((prev) => ({ ...prev, ...updates }))
            }}
          />
        )}
      </Drawer>

      {/* Onboard Company Modal (M4.1 & M4.17 Duplicate Detection) */}
      <Modal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        title="Onboard New Company"
        subtitle="Register employer profile for placement season campus recruitment"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleOnboardSubmit} className="space-y-4">
          {duplicateWarning && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-medium animate-pulse">
              {duplicateWarning}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Adobe Systems"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Code *</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g. ADBE"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tier Category</label>
              <select
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {Object.values(COMPANY_TIER).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Sector</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g. Fintech / Cloud Services"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Headquarters / Location</label>
              <input
                type="text"
                value={formData.hq}
                onChange={(e) => setFormData({ ...formData, hq: e.target.value })}
                placeholder="e.g. Bengaluru, Karnataka"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://..."
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Recruiter Contact</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="HR Manager Name"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">HR Email Address</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="recruitment@company.com"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Avg CTC (LPA)</label>
              <input
                type="number"
                step="0.5"
                value={formData.avgPackageLPA}
                onChange={(e) => setFormData({ ...formData, avgPackageLPA: e.target.value })}
                placeholder="e.g. 18.5"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Max CTC (LPA)</label>
              <input
                type="number"
                step="0.5"
                value={formData.maxPackageLPA}
                onChange={(e) => setFormData({ ...formData, maxPackageLPA: e.target.value })}
                placeholder="e.g. 26.0"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">About Company / Overview</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of business operations and hiring domains..."
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="mouCheck"
              checked={formData.mouSigned}
              onChange={(e) => setFormData({ ...formData, mouSigned: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <label htmlFor="mouCheck" className="text-xs text-slate-700 font-medium">
              MoU Agreement Signed with Institution
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setIsOnboardingOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Complete Onboarding
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
