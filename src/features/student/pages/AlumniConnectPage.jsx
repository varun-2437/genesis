import React, { useState } from 'react'
import { Button, StatusBadge, Modal } from '@/components/ui'
import { Users, Building2, MessageSquare, Send, CheckCircle2, Award } from 'lucide-react'

export function AlumniConnectPage() {
  const [requestModal, setRequestModal] = useState({ open: false, mentor: null })

  const mentors = [
    {
      id: 1,
      name: 'Rahul Venkat',
      batch: 'Class of 2023 · B.Tech CSE',
      company: 'Microsoft India',
      role: 'Software Development Engineer 2',
      domain: 'Cloud Services & Distributed Systems',
      status: 'AVAILABLE',
      openReferrals: '2 Openings at Microsoft',
    },
    {
      id: 2,
      name: 'Sneha Patel',
      batch: 'Class of 2022 · B.Tech IT',
      company: 'Google',
      role: 'Cloud Architect',
      domain: 'Kubernetes & Site Reliability',
      status: 'AVAILABLE',
      openReferrals: 'Google Early Career Referral Pool',
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">Alumni Connect & Mentorship Directory</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Connect with verified college alumni at top tech firms for 1-on-1 career guidance, mock interviews, and referral opportunities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentors.map((m) => (
          <div key={m.id} className="card space-y-4 flex flex-col justify-between hover:border-line-strong transition-colors">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-fg">{m.name}</h3>
                  <p className="text-xs text-fg-muted">{m.batch}</p>
                </div>
                <StatusBadge status={m.status} />
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-accent flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-fg-subtle" /> {m.role} at {m.company}
                </p>
                <p className="text-[11px] text-fg-muted mt-1">Mentoring Domain: {m.domain}</p>
              </div>

              <div className="p-2.5 bg-success-soft rounded-[6px] border border-success/20 text-success text-xs font-semibold">
                {m.openReferrals}
              </div>
            </div>

            <div className="pt-3 border-t border-line flex items-center justify-between">
              <Button
                size="sm"
                className="w-full text-xs flex items-center justify-center gap-1.5"
                onClick={() => setRequestModal({ open: true, mentor: m })}
              >
                <Send className="w-3.5 h-3.5" /> Request Mentorship / Referral
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={requestModal.open}
        onClose={() => setRequestModal({ open: false, mentor: null })}
        title={`Request Mentorship from ${requestModal.mentor?.name}`}
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setRequestModal({ open: false, mentor: null })}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setRequestModal({ open: false, mentor: null }); alert('Mentorship request transmitted!') }}>
              Send Invitation
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-fg-muted">
          <p>
            Alumnus at <strong className="text-fg">{requestModal.mentor?.company}</strong> will review your placement dossier and resume.
          </p>
          <textarea
            rows={4}
            placeholder="Introduce yourself and describe specific questions or mock interview areas you need help with..."
            className="w-full p-3 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg"
          />
        </div>
      </Modal>
    </div>
  )
}
