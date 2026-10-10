import React, { useState } from 'react'
import { Button, StatusBadge, Modal } from '@/components/ui'
import { Compass, BookOpen, Target, Calendar, UserCheck, GraduationCap, Award } from 'lucide-react'

export function CareerGuidancePage() {
  const [counsellingModal, setCounsellingModal] = useState(false)

  const careerPaths = [
    {
      role: 'Cloud & Infrastructure Architecture',
      growth: 'High Demand (34% YoY Growth)',
      recommendedCertifications: 'AWS Solutions Architect, CKA (Kubernetes)',
      suggestedExams: 'GATE CS (PSU/M.Tech), GRE / TOEFL (MS Abroad)',
    },
    {
      role: 'Distributed Systems & Backend Engineering',
      growth: 'Very High Demand',
      recommendedCertifications: 'PostgreSQL Professional, Kafka Developer',
      suggestedExams: 'GATE CS',
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-accent" /> Career Guidance & Higher Education Hub
          </h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Interest assessments, competitive exam roadmaps (GATE/GRE/CAT), and 1-on-1 career counselling appointments.
          </p>
        </div>
        <Button onClick={() => setCounsellingModal(true)} className="flex items-center gap-2 text-xs">
          <Calendar className="w-4 h-4" /> Book Counselling Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {careerPaths.map((path, idx) => (
          <div key={idx} className="card space-y-4 hover:border-line-strong transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-success-soft text-success border border-success/20">
                  {path.growth}
                </span>
                <h3 className="text-[15px] font-semibold text-fg mt-2">{path.role}</h3>
              </div>
            </div>

            <div className="text-xs text-fg-muted space-y-2 pt-2 border-t border-line">
              <p>
                <strong className="text-fg font-medium">Recommended Certifications:</strong> {path.recommendedCertifications}
              </p>
              <p>
                <strong className="text-fg font-medium">Higher Ed & Competitive Exams (M19.6):</strong> {path.suggestedExams}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={counsellingModal}
        onClose={() => setCounsellingModal(false)}
        title="Schedule Career Guidance Appointment (M19.10)"
        description="Meet with placement advisors to discuss higher education, startup pathways, or corporate targeting."
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setCounsellingModal(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setCounsellingModal(false); alert('Appointment scheduled! Details sent to your institutional email.') }}>
              Confirm Appointment
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-fg-muted">
          <div>
            <label className="block text-xs font-semibold text-fg mb-1">Advisory Domain</label>
            <select className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg">
              <option>Corporate Placement Targeting & Resume Alignment</option>
              <option>Higher Education Abroad (MS / MBA Guidance)</option>
              <option>GATE & Public Sector Undertakings (PSUs)</option>
              <option>Startup & Entrepreneurship Mentorship</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-fg mb-1">Preferred Slot</label>
            <select className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg">
              <option>Wednesday · 03:00 PM – 04:00 PM</option>
              <option>Friday · 04:00 PM – 05:00 PM</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
