import React, { useState } from 'react'
import {
  FileCheck,
  Award,
  Download,
  CheckCircle2,
  Calendar,
  Layers,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { Button } from '@/components/ui/Button'

const ACCREDITATION_BODIES = [
  {
    id: 'NIRF',
    name: 'National Institutional Ranking Framework (NIRF)',
    category: 'Ministry of Education, Govt. of India',
    metrics: [
      { label: 'Graduation Outcome (GO) Placement Ratio', val: '88.6% (Passed standard)', status: 'Verified' },
      { label: 'Median Salary of Graduating Cohort', val: 'INR 11.5 LPA', status: 'Compliant' },
      { label: 'Higher Studies Progression Rate', val: '7.2% (64 Candidates)', status: 'Audited' }
    ],
    lastGenerated: '2026-10-06',
    status: 'Ready for Submission'
  },
  {
    id: 'NAAC',
    name: 'National Assessment and Accreditation Council (NAAC)',
    category: 'Criterion V: Student Support and Progression (5.2.1)',
    metrics: [
      { label: 'Placement of Outgoing Students (Metric 5.2.1)', val: '88.6%', status: 'Compliant' },
      { label: 'Guidance for Competitive Exams (Metric 5.1.4)', val: '820 Beneficiaries', status: 'Verified' },
      { label: 'Career Counselling Workshops Held', val: '18 Documented', status: 'Audited' }
    ],
    lastGenerated: '2026-09-28',
    status: 'Ready for Submission'
  },
  {
    id: 'NBA',
    name: 'National Board of Accreditation (NBA - Tier 1)',
    category: 'Criterion 4: Students’ Performance (4.3 Placement & Entrepreneurship)',
    metrics: [
      { label: 'Placement Index (P = N/N_total)', val: 'P = 0.89 (Target >= 0.75)', status: 'Exceeds Goal' },
      { label: 'Core Engineering Placements', val: '64.2% of core intake', status: 'Verified' },
      { label: 'Student Entrepreneurship / Startups', val: '8 Incubated', status: 'Audited' }
    ],
    lastGenerated: '2026-10-02',
    status: 'Ready for Submission'
  }
]

export function AccreditationReports() {
  const [selectedBody, setSelectedBody] = useState('NIRF')
  const [certifiedToast, setCertifiedToast] = useState(false)

  const handleCertify = () => {
    setCertifiedToast(true)
    setTimeout(() => setCertifiedToast(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">Management M6</span>
            <h1 className="text-2xl font-bold text-slate-900">Accreditation Reports (NIRF, NAAC, NBA)</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Generate standardized compliance dossiers, NIRF Table 18.18 exports, and NAAC Criterion 5 evidence documentation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {certifiedToast && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Dossier Digitally Certified by Principal
            </span>
          )}
          <Button variant="default" onClick={handleCertify} className="flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4" />
            Certify & Sign Dossier
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="NIRF GO Metric"
          value="88.6%"
          icon={Award}
          change="+4.2% YoY gain"
          trend="up"
        />
        <StatCard
          title="NAAC Criterion 5.2.1"
          value="A++ Grade Track"
          icon={CheckCircle2}
          change="Full points achievable"
          trend="up"
        />
        <StatCard
          title="NBA Placement Index"
          value="0.89 Index"
          icon={Layers}
          change="Threshold: 0.75"
          trend="up"
        />
        <StatCard
          title="Median Salary (INR)"
          value="11.5 LPA"
          icon={FileCheck}
          change="Audited from bank letters"
          trend="up"
        />
      </div>

      {/* Body Selector Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto self-start gap-1">
        {ACCREDITATION_BODIES.map((body) => (
          <button
            key={body.id}
            onClick={() => setSelectedBody(body.id)}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
              selectedBody === body.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {body.id} Dossier
          </button>
        ))}
      </div>

      {/* Selected Dossier Detail */}
      {(() => {
        const body = ACCREDITATION_BODIES.find(b => b.id === selectedBody)
        if (!body) return null
        return (
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-600 font-semibold">{body.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{body.name}</h3>
                <p className="text-xs text-slate-400">Generated on: {body.lastGenerated}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs flex items-center gap-1.5 h-8">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  Export {body.id} Excel
                </Button>
                <Button size="sm" variant="default" className="text-xs flex items-center gap-1.5 h-8">
                  <Download className="w-3.5 h-3.5" />
                  Download Official PDF Dossier
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {body.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="text-xs text-slate-500 font-medium block">{m.label}</span>
                  <span className="text-lg font-bold text-slate-900 block">{m.val}</span>
                  <div className="pt-2 border-t border-slate-200 text-xs flex items-center justify-between">
                    <span className="text-slate-400">Audit Status</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {m.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Institutional Data Veracity Guarantee
              </div>
              <p className="text-indigo-700 leading-relaxed">
                All records incorporated into this {body.id} export are cross-referenced with student registration profiles (S2), verified offer letters (T21), and institutional enrollment rolls.
              </p>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
