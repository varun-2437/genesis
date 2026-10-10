import React, { useState } from 'react'
import { StatusBadge, Button, FileUploader, Modal } from '@/components/ui'
import { Briefcase, Building2, Calendar, FileText, Upload, Award, CheckCircle2, Clock } from 'lucide-react'

export function MyInternshipsPage() {
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: 'Zoho Corporation',
      role: 'Full Stack Engineering Intern',
      duration: 'May 2025 – July 2025 (8 Weeks)',
      stipend: '₹ 25,000 / month',
      facultyMentor: 'Dr. S. Sundaram (Associate Professor, CSE)',
      industrySupervisor: 'Karthik N (Lead Architect)',
      status: 'COMPLETED',
      ppoConversion: 'Eligible for PPO / Fast-Track Evaluation',
      reportsSubmitted: 2,
    },
  ])

  const [activeTab, setActiveTab] = useState('active')
  const [reportModalOpen, setReportModalOpen] = useState(false)

  const openings = [
    {
      id: 'open-1',
      company: 'Amazon Development Centre',
      role: 'Software Development Engineering Intern (Summer 2027)',
      stipend: '₹ 1,10,000 / month',
      duration: '8 Weeks',
      eligibility: 'B.Tech CSE/IT with CGPA ≥ 8.5',
      deadline: 'Oct 30, 2026',
    },
    {
      id: 'open-2',
      company: 'Cisco Systems',
      role: 'Network Software Intern',
      stipend: '₹ 65,000 / month',
      duration: '6 Months',
      eligibility: 'All Engineering Streams ≥ 7.5',
      deadline: 'Nov 05, 2026',
    },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">My Internships & Work Experience</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Track approved internships, faculty mentor oversight, weekly reports, and PPO full-time conversions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setReportModalOpen(true)} className="flex items-center gap-2 text-xs">
            <Upload className="w-4 h-4" /> Submit Monthly Report
          </Button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-line">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'active' ? 'border-accent text-accent' : 'border-transparent text-fg-muted hover:text-fg'
          }`}
        >
          My Registered Internships (1)
        </button>
        <button
          onClick={() => setActiveTab('openings')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'openings' ? 'border-accent text-accent' : 'border-transparent text-fg-muted hover:text-fg'
          }`}
        >
          Explore Campus Internship Openings (2)
        </button>
      </div>

      {activeTab === 'openings' ? (
        <div className="space-y-4">
          {openings.map((op) => (
            <div key={op.id} className="card flex items-center justify-between gap-4 hover:border-line-strong transition-colors">
              <div>
                <h3 className="text-[15px] font-semibold text-fg">{op.role}</h3>
                <p className="text-xs font-medium text-fg-muted mt-0.5">{op.company} · {op.duration}</p>
                <p className="text-xs text-fg-muted mt-1">Eligibility: <span className="text-fg">{op.eligibility}</span> · Apply before: {op.deadline}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-fg tabular-nums">{op.stipend}</p>
                <Button size="sm" className="mt-2 text-xs" onClick={() => alert(`Application submitted for ${op.role}`)}>
                  Apply for Internship
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
        {internships.map((intern) => (
          <div
            key={intern.id}
            className="card space-y-4 hover:border-line-strong transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-line">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-[15px] font-semibold text-fg">{intern.company}</h3>
                  <StatusBadge status={intern.status} />
                </div>
                <p className="text-xs font-medium text-accent mt-0.5">{intern.role}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-bold text-fg tabular-nums">{intern.stipend}</p>
                <p className="text-[11px] text-fg-muted">{intern.duration}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs bg-surface-2/60 p-4 rounded-[6px] border border-line">
              <div>
                <span className="text-fg-subtle block">Faculty Mentor (M13.7):</span>
                <span className="font-semibold text-fg">{intern.facultyMentor}</span>
              </div>
              <div>
                <span className="text-fg-subtle block">Industry Supervisor:</span>
                <span className="font-semibold text-fg">{intern.industrySupervisor}</span>
              </div>
              <div>
                <span className="text-fg-subtle block">PPO Conversion Status (M13.15):</span>
                <span className="font-semibold text-success">{intern.ppoConversion}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-fg-muted">
                Monthly Performance Reports Uploaded: <strong className="text-fg font-medium">{intern.reportsSubmitted} / 2 Verified</strong>
              </span>
              <Button
                variant="secondary"
                size="sm"
                className="text-xs flex items-center gap-1.5"
                onClick={() => alert('Downloading official Internship Completion Dossier')}
              >
                <Award className="w-3.5 h-3.5" /> Download Completion Certificate
              </Button>
            </div>
          </div>
        ))}
        </div>
      )}

      <Modal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title="Submit Internship Progress Report (M13.9)"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setReportModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setReportModalOpen(false); alert('Report submitted for faculty review!') }}>
              Submit Report
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-fg-muted">
          <div>
            <label className="block text-xs font-semibold text-fg mb-1">Report Period</label>
            <select className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg">
              <option>Month 1 Technical Progress Report</option>
              <option>Month 2 Technical Progress Report</option>
              <option>Final Internship Project Summary & Evaluation</option>
            </select>
          </div>
          <FileUploader label="Attach PDF Report Signed by Supervisor" accept=".pdf" maxSizeMB={5} />
        </div>
      </Modal>
    </div>
  )
}
