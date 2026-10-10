import React, { useState } from 'react'
import { StatusBadge, Button, ApprovalPanel } from '@/components/ui'
import { CheckCircle2, XCircle, Users, ArrowRight, Download, Filter } from 'lucide-react'

export function TpoApplicationsOpsPage() {
  const [applications, setApplications] = useState([
    {
      id: 'app-1',
      studentName: 'Varun Murugesh (21CS104)',
      job: 'Google Cloud India · Associate Cloud Engineer',
      cgpa: 8.82,
      appliedOn: 'Oct 08, 2026',
      status: 'SHORTLISTED',
      resume: 'Varun_Cloud_SDE.pdf',
    },
    {
      id: 'app-2',
      studentName: 'Pooja Iyer (21CS088)',
      job: 'Google Cloud India · Associate Cloud Engineer',
      cgpa: 9.15,
      appliedOn: 'Oct 08, 2026',
      status: 'SHORTLISTED',
      resume: 'Pooja_Resume.pdf',
    },
    {
      id: 'app-3',
      studentName: 'Karthik Raja (21IT045)',
      job: 'Google Cloud India · Associate Cloud Engineer',
      cgpa: 7.42,
      appliedOn: 'Oct 09, 2026',
      status: 'REJECTED',
      resume: 'Karthik_Resume.pdf',
    },
  ])

  const bulkShortlist = () => {
    alert('Bulk Shortlisting executed (M8.13): Candidate rosters notified and synchronized to Recruiter Portal.')
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Applications Review & Bulk Operations (T12)</h2>
          <p className="text-xs text-slate-500 mt-1">
            TPO candidate processing, automated shortlisting, duplicate detection, and recruiter roster exports (M8.13).
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={bulkShortlist} className="text-xs bg-indigo-600 hover:bg-indigo-700">
            Execute Bulk Shortlist (8.13)
          </Button>
          <Button size="sm" variant="secondary" className="text-xs" onClick={() => alert('Approved candidate list exported to CSV')}>
            Export Approved List (8.18)
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Applicant Student</th>
              <th className="px-6 py-4">Job Opening</th>
              <th className="px-6 py-4">CGPA</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Review Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{app.studentName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Resume: {app.resume}</p>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-800">{app.job}</td>
                <td className="px-6 py-4 font-bold text-slate-900">{app.cgpa}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={app.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button size="sm" variant="secondary" className="text-xs" onClick={() => alert(`Reviewing application #${app.id}`)}>
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
