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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Placement Policies & Circulars</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Official regulations, multiple-offer limits, dream policies, and administrative announcements.
          </p>
        </div>
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
        <div className="card p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent-soft px-2.5 py-1 rounded-[4px] border border-accent/20">
                Official Document · Revision 2026.1
              </span>
              <h3 className="text-base font-semibold text-fg mt-2">
                Placement Code of Conduct & Offer Regulations
              </h3>
            </div>
            {acknowledged ? (
              <span className="text-xs font-semibold text-success bg-success-soft px-3 py-1.5 rounded-[6px] border border-success/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" /> Policy Digitally Acknowledged
              </span>
            ) : (
              <Button size="sm" onClick={() => setAcknowledged(true)} className="text-xs">
                Acknowledge Placement Policy
              </Button>
            )}
          </div>

          <div className="space-y-4 text-xs text-fg-muted leading-relaxed">
            <h4 className="font-semibold text-fg uppercase tracking-wide">1. One-Job-Per-Student & Dream Company Policy (M7.11, 7.12)</h4>
            <p>
              Students who secure a regular category job offer (up to 8 LPA) are eligible to participate in upcoming <strong className="text-fg">Dream Category (8 - 15 LPA)</strong> and <strong className="text-fg">Super Dream Category (&gt;15 LPA)</strong> drives. Upon securing a Dream offer, the student is exclusively permitted to participate in Super Dream drives thereafter.
            </p>

            <h4 className="font-semibold text-fg uppercase tracking-wide pt-2">2. Mandatory Drive Attendance & Punctuality</h4>
            <p>
              Once registered for a company drive, attendance at the Pre-Placement Talk (PPT) and initial screening round is mandatory. Failure to attend without prior TPO authorization will result in temporary suspension for the next two consecutive drives.
            </p>

            <h4 className="font-semibold text-fg uppercase tracking-wide pt-2">3. Ethical Conduct & Single Offer Acceptance</h4>
            <p>
              A student cannot hold more than one confirmed final offer without formal release from the institution. The choice between multiple eligible offers must be exercised within 5 working days of issuance.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {circulars.map((circ) => (
            <div key={circ.id} className="card space-y-2 hover:border-line-strong transition-colors">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-fg">{circ.title}</h4>
                <span className="text-[11px] text-fg-muted">{circ.date}</span>
              </div>
              <p className="text-xs text-fg-muted leading-relaxed">{circ.summary}</p>
              <p className="text-[11px] text-accent font-medium">Issued by: {circ.issuer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
