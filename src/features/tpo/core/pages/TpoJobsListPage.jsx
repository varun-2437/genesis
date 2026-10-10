import React, { useState } from 'react'
import { StatusBadge, Button, Modal, Input } from '@/components/ui'
import { Briefcase, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export function TpoJobsListPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [jobs, setJobs] = useState([
    {
      id: 'job-101',
      title: 'Associate Cloud Engineer',
      company: 'Google Cloud India',
      ctc: '₹ 18.0 LPA',
      tier: 'Super Dream',
      minCgpa: 8.0,
      applications: 42,
      status: 'PUBLISHED',
      deadline: 'Oct 11, 2026',
    },
    {
      id: 'job-102',
      title: 'Software Developer 1',
      company: 'Oracle Corporation',
      ctc: '₹ 14.5 LPA',
      tier: 'Dream',
      minCgpa: 7.5,
      applications: 68,
      status: 'PUBLISHED',
      deadline: 'Oct 16, 2026',
    },
    {
      id: 'job-103',
      title: 'Systems & Reliability Engineer',
      company: 'Morgan Stanley',
      ctc: '₹ 22.0 LPA',
      tier: 'Super Dream',
      minCgpa: 8.5,
      applications: 0,
      status: 'PENDING_APPROVAL',
      deadline: 'Pending TPO Signoff',
    },
  ])

  const approveJob = (id) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: 'PUBLISHED' } : j))
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Job Profiles & Approvals (T7, T8)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Review recruiter postings, enforce compensation tiers, and publish job descriptions to the student body (M5.14).
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Create Institutional Opening (T8)
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Job Role & Employer</th>
              <th className="px-6 py-4">Package (CTC)</th>
              <th className="px-6 py-4">Eligibility Rule</th>
              <th className="px-6 py-4">Status (M5.14)</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {jobs.map((j) => (
              <tr key={j.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{j.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{j.company} · {j.tier}</p>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">{j.ctc}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-700">CGPA ≥ {j.minCgpa}</span>
                  <span className="text-[11px] text-slate-400 block">0 Backlogs</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={j.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  {j.status === 'PENDING_APPROVAL' ? (
                    <Button size="sm" onClick={() => approveJob(j.id)} className="text-xs bg-emerald-600 hover:bg-emerald-700">
                      Approve & Publish (5.14)
                    </Button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">
                      {j.applications} Applicants
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create & Configure Job Profile (T8, M5.2–5.13)"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setModalOpen(false); alert('Job profile created and published!') }}>
              Save & Publish Job
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <Input label="Job Title" placeholder="e.g. Associate Software Engineer" />
          <Input label="Company Name" placeholder="e.g. Goldman Sachs" />
          <Input label="Annual CTC Package" placeholder="e.g. ₹ 24,00,000 Per Annum" />
          <Input label="Minimum CGPA Cutoff" placeholder="e.g. 8.5" />
        </div>
      </Modal>
    </div>
  )
}
