import React, { useState } from 'react'
import { StatusBadge, Button, ApprovalPanel } from '@/components/ui'
import { Users, ShieldCheck, CheckCircle2, Building2, Search, Filter } from 'lucide-react'

export function TpoAlumniManagementPage() {
  const [alumniList, setAlumniList] = useState([
    {
      id: 1,
      name: 'Rahul Venkat',
      batch: '2023 · B.Tech CSE',
      company: 'Microsoft India',
      designation: 'SDE 2',
      status: 'VERIFIED',
      activeMenteeCount: 4,
      referralsPosted: 2,
    },
    {
      id: 2,
      name: 'Sneha Patel',
      batch: '2022 · B.Tech IT',
      company: 'Google',
      designation: 'Cloud Architect',
      status: 'PENDING',
      activeMenteeCount: 1,
      referralsPosted: 1,
    },
    {
      id: 3,
      name: 'Arjun Swaminathan',
      batch: '2021 · B.Tech ECE',
      company: 'Qualcomm',
      designation: 'Hardware Systems Engineer',
      status: 'VERIFIED',
      activeMenteeCount: 3,
      referralsPosted: 0,
    },
  ])

  const verifyAlumnus = (id) => {
    setAlumniList(alumniList.map((a) => (a.id === id ? { ...a, status: 'VERIFIED' } : a)))
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Alumni Directory & Verification (T26, M16.1–16.3)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Placement officer console for verifying graduate employment records and overseeing mentorship cohorts.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Alumnus Name & Batch</th>
                <th className="px-6 py-4">Current Corporate Role</th>
                <th className="px-6 py-4">Mentorship & Referrals</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">TPO Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {alumniList.map((alumnus) => (
                <tr key={alumnus.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{alumnus.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{alumnus.batch}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{alumnus.company}</p>
                    <p className="text-[11px] text-slate-500">{alumnus.designation}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-700">
                      {alumnus.activeMenteeCount} Mentees · {alumnus.referralsPosted} Referrals
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={alumnus.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    {alumnus.status === 'PENDING' ? (
                      <Button size="sm" onClick={() => verifyAlumnus(alumnus.id)} className="text-xs">
                        Verify Employment
                      </Button>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-600">
                        Authenticated
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
