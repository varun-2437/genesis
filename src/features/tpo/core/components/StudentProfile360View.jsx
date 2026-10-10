import React, { useState } from 'react'
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  Award, 
  FileText, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  History,
  ShieldCheck,
  Check,
  X
} from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { VERIFICATION_STATUS } from '@/lib/constants'

export function StudentProfile360View({ student, onUpdateVerification }) {
  const [activeTab, setActiveTab] = useState('academic')

  const tabs = [
    { id: 'academic', label: 'Academic & Eligibility' },
    { id: 'skills', label: 'Skills & Resumes' },
    { id: 'applications', label: 'Drives & Applications' },
    { id: 'audit', label: 'Audit & Changes' },
  ]

  return (
    <div className="space-y-6">
      {/* Student Banner Header */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">
            {student.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">{student.name}</h3>
              <StatusBadge status={student.verificationStatus} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Reg: <span className="font-mono font-semibold">{student.registerNumber}</span> • {student.programme} ({student.graduationYear})
            </p>
          </div>
        </div>

        {/* Verification Status Actions (M2.14, M2.18) */}
        <div className="flex items-center gap-2">
          {student.verificationStatus !== VERIFICATION_STATUS.VERIFIED && (
            <Button
              size="sm"
              onClick={() => onUpdateVerification(VERIFICATION_STATUS.VERIFIED)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Verify Profile
            </Button>
          )}

          {student.verificationStatus !== VERIFICATION_STATUS.REQUIRES_UPDATE && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateVerification(VERIFICATION_STATUS.REQUIRES_UPDATE)}
              className="text-amber-700 border-amber-300 hover:bg-amber-50 text-xs gap-1"
            >
              Request Fix
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
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

      {/* Tab 1: Academic & Eligibility */}
      {activeTab === 'academic' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Cumulative CGPA
              </span>
              <span className="text-lg font-bold text-slate-900">{student.cgpa} / 10.0</span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Active Arrears / Backlogs
              </span>
              <span
                className={`text-lg font-bold ${
                  student.activeBacklogs > 0 ? 'text-rose-600' : 'text-emerald-600'
                }`}
              >
                {student.activeBacklogs} Backlogs
              </span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Historical Cleared Arrears
              </span>
              <span className="text-sm font-semibold text-slate-700">{student.historicalBacklogs} Cleared</span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Tier 1 Dream Policy Eligibility
              </span>
              <span
                className={`text-xs font-bold inline-block mt-1 px-2 py-0.5 rounded ${
                  student.eligibleForDream
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {student.eligibleForDream ? 'Eligible for Dream Offers' : 'Ineligible'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider">Contact & Registration</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {student.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {student.phone}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Skills & Resumes */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Technical Competencies</h4>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Official Placement Resume</p>
                  <p className="text-xs text-slate-500">Verified master resume version</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs text-indigo-600 border-indigo-200">
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Applications & Offers */}
      {activeTab === 'applications' && (
        <div className="space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">Placement Offer Outcome</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {student.offersCount > 0 ? (
                  <span className="text-emerald-700">
                    {student.currentOfferCompany} • ₹{student.currentOfferPackageLPA} LPA
                  </span>
                ) : (
                  <span className="text-slate-500">No offers secured yet</span>
                )}
              </p>
            </div>
            <StatusBadge status={student.placementStatus === 'PLACED' ? 'SELECTED' : 'IN_REVIEW'} />
          </div>
        </div>
      )}

      {/* Tab 4: Audit & Change History */}
      {activeTab === 'audit' && (
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
            <History className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">ERP Sync Synchronized</p>
              <p className="text-slate-500">Automated semester grade verification completed with 0 errors.</p>
              <p className="text-[10px] text-slate-400 mt-1">2026-10-09 14:32 IST</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
