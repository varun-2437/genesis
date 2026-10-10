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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Internships & Work Experience</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track approved internships, faculty mentor oversight, weekly reports, and PPO full-time conversions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setReportModalOpen(true)} className="flex items-center gap-2 text-xs">
            <Upload className="w-4 h-4" /> Submit Monthly Report
          </Button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'active' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'
          }`}
        >
          My Registered Internships (1)
        </button>
        <button
          onClick={() => setActiveTab('openings')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'openings' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'
          }`}
        >
          Explore Campus Internship Openings (2)
        </button>
      </div>

      {activeTab === 'openings' ? (
        <div className="space-y-4">
          {openings.map((op) => (
            <div key={op.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">{op.role}</h3>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">{op.company} · {op.duration}</p>
                <p className="text-xs text-slate-400 mt-1">Eligibility: {op.eligibility} · Apply before: {op.deadline}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{op.stipend}</p>
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
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-900">{intern.company}</h3>
                  <StatusBadge status={intern.status} />
                </div>
                <p className="text-xs font-semibold text-indigo-600 mt-0.5">{intern.role}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-extrabold text-slate-900">{intern.stipend}</p>
                <p className="text-[11px] text-slate-400">{intern.duration}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block">Faculty Mentor (M13.7):</span>
                <span className="font-semibold text-slate-800">{intern.facultyMentor}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Industry Supervisor:</span>
                <span className="font-semibold text-slate-800">{intern.industrySupervisor}</span>
              </div>
              <div>
                <span className="text-slate-400 block">PPO Conversion Status (M13.15):</span>
                <span className="font-bold text-emerald-600">{intern.ppoConversion}</span>
              </div>
            </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="text-slate-500">
                  Monthly Performance Reports Uploaded: <strong>{intern.reportsSubmitted} / 2 Verified</strong>
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
        <div className="space-y-4 text-xs text-slate-600">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Report Period</label>
            <select className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
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
