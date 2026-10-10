import React, { useState } from 'react'
import { Building2, Globe, MapPin, Mail, Phone, Calendar, ShieldCheck, FileText, CheckCircle2, Award } from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { COMPANY_STATUS } from '@/lib/constants'

export function CompanyDetailView({ company, onUpdate }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview & Profile' },
    { id: 'contacts', label: 'Recruiters & Contacts' },
    { id: 'hiring', label: 'Hiring History' },
    { id: 'documents', label: 'MoU & Compliance' },
  ]

  const toggleStatus = (newStatus) => {
    onUpdate({ status: newStatus })
  }

  return (
    <div className="space-y-6">
      {/* Company Header Card */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
            {company.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{company.name}</h3>
              <StatusBadge status={company.status} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Code: <span className="font-mono font-semibold">{company.code}</span> • {company.tier}
            </p>
          </div>
        </div>

        {/* Status Actions */}
        <div className="flex items-center gap-2">
          {company.status === COMPANY_STATUS.PROSPECT && (
            <Button
              size="sm"
              onClick={() => toggleStatus(COMPANY_STATUS.ACTIVE)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Approve Partner
            </Button>
          )}
          {company.status === COMPANY_STATUS.ACTIVE && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleStatus(COMPANY_STATUS.RESTRICTED)}
              className="text-rose-600 border-rose-200 hover:bg-rose-50 text-xs"
            >
              Restrict Hiring
            </Button>
          )}
          {company.status === COMPANY_STATUS.RESTRICTED && (
            <Button
              size="sm"
              onClick={() => toggleStatus(COMPANY_STATUS.ACTIVE)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs"
            >
              Reinstate Access
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Profile */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Industry Domain
              </span>
              <span className="text-sm font-semibold text-slate-800">{company.industry}</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Headquarters
              </span>
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {company.hq || 'Not Specified'}
              </span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Average Annual CTC
              </span>
              <span className="text-sm font-semibold text-emerald-600">₹{company.avgPackageLPA} LPA</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Maximum CTC Offered
              </span>
              <span className="text-sm font-semibold text-indigo-600">₹{company.maxPackageLPA} LPA</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">About Company</h4>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {company.description || 'No detailed overview supplied during onboarding.'}
            </p>
          </div>

          {company.website && (
            <div className="flex items-center gap-2 text-xs text-indigo-600 hover:underline">
              <Globe className="w-3.5 h-3.5" />
              <a href={company.website} target="_blank" rel="noreferrer">
                {company.website}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Contacts & Recruiters */}
      {activeTab === 'contacts' && (
        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Lead Campus Recruiter</p>
                <p className="text-sm font-bold text-slate-900">{company.contactPerson || 'Not Assigned'}</p>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-md border border-emerald-200">
                Primary POC
              </span>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{company.contactEmail || 'No email registered'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{company.contactPhone || 'No contact number provided'}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-center">
            <p className="text-xs text-slate-500">Additional recruiter accounts can be authorized under Recruiter Access Settings.</p>
          </div>
        </div>
      )}

      {/* Tab 3: Hiring History */}
      {activeTab === 'hiring' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="text-2xl font-bold text-indigo-700">{company.totalHires || 0}</p>
              <p className="text-[11px] font-medium text-indigo-600">Total Hires All-Time</p>
            </div>
            <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg">
              <p className="text-2xl font-bold text-slate-800">{company.activeDrivesCount || 0}</p>
              <p className="text-[11px] font-medium text-slate-600">Active Drives This Season</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-700 mb-2">Target Roles Recruited</p>
            <div className="flex flex-wrap gap-1.5">
              {company.rolesRecruited && company.rolesRecruited.length > 0 ? (
                company.rolesRecruited.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700"
                  >
                    {role}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">No specific role designations logged.</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Documents & MoU */}
      {activeTab === 'documents' && (
        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Institutional Placement Agreement (MoU)</p>
                <p className="text-xs text-slate-500">
                  {company.mouSigned
                    ? `Active agreement valid until ${company.mouValidUntil || '2027'}`
                    : 'MoU pending execution'}
                </p>
              </div>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                company.mouSigned
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {company.mouSigned ? 'Signed & Verified' : 'Pending Signature'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
