import React, { useState } from 'react'
import { Briefcase, Plus, CheckCircle2, Clock, MapPin, Users } from 'lucide-react'
import { useRecruiterStore } from '../recruiterStore'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'

export function RecruiterJobsPage() {
  const { vacancies, addVacancy } = useRecruiterStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-time',
    ctc: '',
    openings: '10',
    deadline: '2026-11-20',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addVacancy(formData)
    setIsModalOpen(false)
    setFormData({
      title: '',
      type: 'Full-time',
      ctc: '',
      openings: '10',
      deadline: '2026-11-20',
      description: '',
    })
    setNotice('Job vacancy created and submitted to TPO cell for publishing approval.')
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" /> Employer Job Vacancies & Postings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Post new role requisitions, specify compensation packages, and submit postings for TPO approval.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm text-xs"
        >
          <Plus className="w-4 h-4" /> Post New Vacancy
        </Button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Vacancies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vacancies.map((vac) => (
          <div
            key={vac.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                {vac.type}
              </span>
              <StatusBadge status={vac.status} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base">{vac.title}</h3>
              <p className="text-xs font-bold text-emerald-700 mt-1">CTC: ₹{vac.ctc}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-center justify-between">
              <span>Openings: <strong>{vac.openings} vacancies</strong></span>
              <span>Deadline: <strong>{vac.deadline}</strong></span>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
              <span>{vac.applicationsCount} students applied</span>
              {vac.status === 'PENDING_APPROVAL' && (
                <span className="text-amber-700 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Pending TPO Cell Review
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Vacancy Modal (R3) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Post Job Vacancy"
        subtitle="Submit candidate job requisition for university campus hiring"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Designation / Role Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. SDE - Cloud & Infrastructure"
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Full-time">Full-time Regular</option>
                <option value="Internship + FTE">Internship followed by Full-time</option>
                <option value="Internship">Internship Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Total CTC (LPA) *</label>
              <input
                type="text"
                required
                value={formData.ctc}
                onChange={(e) => setFormData({ ...formData, ctc: e.target.value })}
                placeholder="e.g. 28.5 LPA"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Number of Openings</label>
              <input
                type="number"
                required
                value={formData.openings}
                onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Application Deadline</label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Description & Responsibilities</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Candidate competencies, technologies used, responsibilities..."
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              Submit for Approval
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
