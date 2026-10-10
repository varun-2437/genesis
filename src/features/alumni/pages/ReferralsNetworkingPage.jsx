import React, { useState } from 'react'
import { Button, StatusBadge, Modal } from '@/components/ui'
import { Briefcase, Plus, Building2, Send, ExternalLink } from 'lucide-react'

export function ReferralsNetworkingPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [referrals, setReferrals] = useState([
    {
      id: 1,
      role: 'Software Engineer 1 (Full Stack)',
      company: 'Microsoft India',
      location: 'Bengaluru / Hyderabad',
      openings: '3 Roles',
      postedOn: 'Oct 04, 2026',
      applicationsReceived: 14,
    },
    {
      id: 2,
      role: 'Cloud Operations Associate',
      company: 'Microsoft India',
      location: 'Noida',
      openings: '1 Role',
      postedOn: 'Sep 28, 2026',
      applicationsReceived: 8,
    },
  ])

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Alumni Referrals & Openings (M16.6, 16.7)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Post direct corporate openings and referral requisitions for junior campus candidates.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Post New Job Opening
        </Button>
      </div>

      <div className="space-y-4">
        {referrals.map((ref) => (
          <div key={ref.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">{ref.role}</h3>
              <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" /> {ref.company} · {ref.location}
              </p>
              <p className="text-xs text-indigo-600 font-medium mt-2">
                {ref.applicationsReceived} Student Profiles Submitted for Internal Referral
              </p>
            </div>
            <Button variant="secondary" size="sm" className="text-xs">
              Review Candidate Resumes
            </Button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Post Corporate Referral Opening"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setModalOpen(false); alert('Referral posted to Student Portal!') }}>
              Publish Opening
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-600">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
            <input type="text" placeholder="e.g. SDE 1 - Backend" className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Company Portal Requisition URL</label>
            <input type="text" placeholder="https://careers.microsoft.com/job/..." className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
