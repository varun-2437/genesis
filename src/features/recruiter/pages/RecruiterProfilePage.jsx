import React, { useState } from 'react'
import { Building2, Users, FileText, CheckCircle2, Globe, MapPin, Mail } from 'lucide-react'
import { useRecruiterStore } from '../recruiterStore'
import { Button } from '@/components/ui/Button'

export function RecruiterProfilePage() {
  const { companyProfile } = useRecruiterStore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Building2 className="w-6 h-6 text-indigo-600" /> Employer Profile & Recruiting Team
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Maintain corporate recruitment contact persons, authorized panelists, and compliance MoU documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Card */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg">
            {companyProfile.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{companyProfile.name}</h3>
            <p className="text-xs text-slate-500 font-mono">[{companyProfile.code}] • {companyProfile.tier}</p>
          </div>

          <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {companyProfile.hq}
            </p>
            <p className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <a href={companyProfile.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                {companyProfile.website}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> {companyProfile.leadEmail}
            </p>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Institutional MoU Agreement
            </p>
            <p className="text-[11px] mt-0.5">{companyProfile.mouStatus}</p>
          </div>
        </div>

        {/* Team Members */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" /> Authorized Interviewers & Recruiters
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {companyProfile.team.map((member) => (
                <div key={member.id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{member.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
