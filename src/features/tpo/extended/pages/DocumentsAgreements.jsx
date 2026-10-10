import React, { useState } from 'react'
import {
  FileText,
  Building,
  UploadCloud,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Eye,
  Plus
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const INITIAL_DOCS = [
  {
    id: 'DOC-101',
    title: 'Microsoft India Campus Recruitment MoU 2024-2027',
    category: 'Corporate MoU & Recruiter Agreement (28.1)',
    company: 'Microsoft India Pvt Ltd',
    fileType: 'PDF (Signed)',
    effectiveDate: '2024-07-01',
    expiryDate: '2027-06-30',
    status: 'Active & Verified',
    accessLevel: 'Central TPO & Management'
  },
  {
    id: 'DOC-102',
    title: 'Goldman Sachs Standard NDA & Campus Interview Charter',
    category: 'Non-Disclosure Agreement',
    company: 'Goldman Sachs Services',
    fileType: 'PDF (Signed)',
    effectiveDate: '2025-08-15',
    expiryDate: '2028-08-14',
    status: 'Active & Verified',
    accessLevel: 'Central TPO Only'
  },
  {
    id: 'DOC-103',
    title: 'Texas Instruments Core Industrial Internship Agreement',
    category: 'Internship Agreement (28.7)',
    company: 'Texas Instruments India',
    fileType: 'PDF (Signed)',
    effectiveDate: '2026-01-10',
    expiryDate: '2026-12-31',
    status: 'Active & Verified',
    accessLevel: 'TPO & Faculty HODs'
  }
]

export function DocumentsAgreements() {
  const [docs, setDocs] = useState(INITIAL_DOCS)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T28</span>
            <h1 className="text-2xl font-bold text-slate-900">Documents & Corporate Agreements Store</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Central repository for recruiter MoUs (28.1), NDAs, placement circulars, internship agreements, and retention policies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" className="flex items-center gap-2 text-xs">
            <UploadCloud className="w-4 h-4" />
            Upload Signed Agreement
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Corporate MoUs"
          value={docs.length}
          icon={FileText}
          change="Multi-year hiring charters"
          trend="up"
        />
        <StatCard
          title="Expiring Within 90 Days"
          value="0 MoUs"
          icon={Clock}
          change="All charters up-to-date"
          trend="neutral"
        />
        <StatCard
          title="Verification Rate"
          value="100%"
          icon={ShieldCheck}
          change="Signed by Principal"
          trend="up"
        />
        <StatCard
          title="Authorized Download Logs"
          value="48 Downloads"
          icon={Download}
          change="Audited in AD7 ledger"
          trend="neutral"
        />
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Registered Institutional Legal Documents & MoUs</h3>
          <span className="text-xs text-slate-400">Section 28.1 to 28.12 Spec</span>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Document Title</th>
              <th className="py-3 px-4">Partner Entity</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Validity Window</th>
              <th className="py-3 px-4">Access Restriction</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {docs.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-semibold text-slate-900">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{d.title}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-800">{d.company}</td>
                <td className="py-3.5 px-4 text-slate-600">{d.category}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{d.effectiveDate} to {d.expiryDate}</td>
                <td className="py-3.5 px-4 text-slate-500">{d.accessLevel}</td>
                <td className="py-3.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    <CheckCircle2 className="w-3 h-3" /> {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
