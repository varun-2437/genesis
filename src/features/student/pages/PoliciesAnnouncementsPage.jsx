import React, { useState } from 'react'
import { StatusBadge, Button, Tabs } from '@/components/ui'
import { BookOpen, ShieldCheck, CheckCircle2, Megaphone, FileText, Download } from 'lucide-react'

export function PoliciesAnnouncementsPage() {
  const [activeTab, setActiveTab] = useState('policy')
  const [acknowledged, setAcknowledged] = useState(true)

  const circulars = [
    {
      id: 1,
      title: 'Circular No. 42: Academic Eligibility Cutoffs for Super Dream Recruiters',
      date: 'Oct 08, 2026',
      issuer: 'Prof. Sharma (Director of Placements)',
      summary: 'Re-iteration of policy regarding eligibility criteria for Tier-1 companies offering >15 LPA.',
    },
    {
      id: 2,
      title: 'Circular No. 39: Dress Code & Professional Conduct Guidelines during In-Person PPTs',
      date: 'Sep 22, 2026',
      issuer: 'Placement Cell Disciplinary Board',
      summary: 'Strict business formals required for all auditorium presentations and personal interviews.',
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Placement Policies & Circulars</h2>
        <p className="text-xs text-slate-500 mt-1">
          Official regulations, multiple-offer limits, dream policies, and administrative announcements.
        </p>
      </div>

      <Tabs
        tabs={[
          { id: 'policy', label: 'Campus Placement Policy 2026-27' },
          { id: 'circulars', label: 'Official Circulars & Notices', badge: circulars.length },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'policy' ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">
                Official Document · Revision 2026.1
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Placement Code of Conduct & Offer Regulations
              </h3>
            </div>
            {acknowledged ? (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Policy Digitally Acknowledged
              </span>
            ) : (
              <Button size="sm" onClick={() => setAcknowledged(true)} className="text-xs">
                Acknowledge Placement Policy
              </Button>
            )}
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <h4 className="font-bold text-slate-900 uppercase tracking-wide">1. One-Job-Per-Student & Dream Company Policy (M7.11, 7.12)</h4>
            <p>
              Students who secure a regular category job offer (up to 8 LPA) are eligible to participate in upcoming <strong>Dream Category (8 - 15 LPA)</strong> and <strong>Super Dream Category (&gt;15 LPA)</strong> drives. Upon securing a Dream offer, the student is exclusively permitted to participate in Super Dream drives thereafter.
            </p>

            <h4 className="font-bold text-slate-900 uppercase tracking-wide pt-2">2. Mandatory Drive Attendance & Punctuality</h4>
            <p>
              Once registered for a company drive, attendance at the Pre-Placement Talk (PPT) and initial screening round is mandatory. Failure to attend without prior TPO authorization will result in temporary suspension for the next two consecutive drives.
            </p>

            <h4 className="font-bold text-slate-900 uppercase tracking-wide pt-2">3. Ethical Conduct & Single Offer Acceptance</h4>
            <p>
              A student cannot hold more than one confirmed final offer without formal release from the institution. The choice between multiple eligible offers must be exercised within 5 working days of issuance.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {circulars.map((circ) => (
            <div key={circ.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">{circ.title}</h4>
                <span className="text-[11px] text-slate-400">{circ.date}</span>
              </div>
              <p className="text-xs text-slate-600">{circ.summary}</p>
              <p className="text-[11px] text-indigo-600 font-medium">Issued by: {circ.issuer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
