import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useTpoCoreStore } from '../tpoCoreStore'
import { DEPARTMENTS, ROUND_TYPE, JOB_STATUS } from '@/lib/constants'
import { Plus, Trash2 } from 'lucide-react'

export function JobCreateModal({ isOpen, onClose }) {
  const { companies, addJob } = useTpoCoreStore()

  const [formData, setFormData] = useState({
    companyId: companies[0]?.id || '',
    title: '',
    jobType: 'Full-time',
    category: 'Engineering & Technology',
    status: JOB_STATUS.PUBLISHED,
    locations: 'Bengaluru, Hyderabad',
    workMode: 'On-site',
    ctcFixedLPA: '12.0',
    ctcVariableLPA: '2.5',
    vacancies: '10',
    minCgpa: '7.5',
    maxBacklogs: '0',
    allowedDepartments: [DEPARTMENTS[0], DEPARTMENTS[1]],
    gradYear: '2026',
    deadline: '2026-11-15',
    selectionRounds: [
      { id: 'r1', name: 'Resume Screening', type: ROUND_TYPE.RESUME_SCREENING, order: 1 },
      { id: 'r2', name: 'Technical Assessment', type: ROUND_TYPE.ONLINE_ASSESSMENT, order: 2 },
      { id: 'r3', name: 'Technical Interview', type: ROUND_TYPE.TECHNICAL_INTERVIEW_1, order: 3 },
      { id: 'r4', name: 'HR & Fitment Interview', type: ROUND_TYPE.HR_INTERVIEW, order: 4 },
    ],
  })

  const handleDeptToggle = (dept) => {
    setFormData((prev) => {
      const exists = prev.allowedDepartments.includes(dept)
      return {
        ...prev,
        allowedDepartments: exists
          ? prev.allowedDepartments.filter((d) => d !== dept)
          : [...prev.allowedDepartments, dept],
      }
    })
  }

  const addRound = () => {
    const nextOrder = formData.selectionRounds.length + 1
    setFormData((prev) => ({
      ...prev,
      selectionRounds: [
        ...prev.selectionRounds,
        {
          id: `r${Date.now()}`,
          name: `Round ${nextOrder}`,
          type: ROUND_TYPE.TECHNICAL_INTERVIEW_1,
          order: nextOrder,
        },
      ],
    }))
  }

  const removeRound = (index) => {
    setFormData((prev) => ({
      ...prev,
      selectionRounds: prev.selectionRounds.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedCompany = companies.find((c) => c.id === formData.companyId) || companies[0]
    const fixed = parseFloat(formData.ctcFixedLPA) || 0
    const variable = parseFloat(formData.ctcVariableLPA) || 0

    addJob({
      ...formData,
      companyName: selectedCompany.name,
      totalCtcLPA: fixed + variable,
      ctcFixedLPA: fixed,
      ctcVariableLPA: variable,
      vacancies: parseInt(formData.vacancies, 10) || 1,
      minCgpa: parseFloat(formData.minCgpa) || 6.0,
      maxBacklogs: parseInt(formData.maxBacklogs, 10) || 0,
      locations: formData.locations.split(',').map((s) => s.trim()),
    })

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create & Configure Job Posting"
      subtitle="Define hiring role, eligibility thresholds, salary packages and round pipeline"
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 max-h-[75vh] overflow-y-auto pr-2">
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hiring Company *</label>
            <select
              value={formData.companyId}
              onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.tier})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Designation *</label>
            <input
              type="text"
              required
              placeholder="e.g. Associate SDE - Cloud"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
            <select
              value={formData.jobType}
              onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="Full-time">Full-time Regular</option>
              <option value="Internship + FTE">Internship followed by Full-time</option>
              <option value="Internship Only">Internship Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Work Mode</label>
            <select
              value={formData.workMode}
              onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="On-site">On-site Campus/Office</option>
              <option value="Hybrid">Hybrid Model</option>
              <option value="Remote">100% Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Locations (comma separated)</label>
            <input
              type="text"
              value={formData.locations}
              onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
              placeholder="Bengaluru, Hyderabad, Pune"
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

        {/* CTC & Package Details */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Salary & CTC Package</h4>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Fixed Component (LPA)</label>
              <input
                type="number"
                step="0.5"
                value={formData.ctcFixedLPA}
                onChange={(e) => setFormData({ ...formData, ctcFixedLPA: e.target.value })}
                className="w-full text-sm px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Variable / Bonus (LPA)</label>
              <input
                type="number"
                step="0.5"
                value={formData.ctcVariableLPA}
                onChange={(e) => setFormData({ ...formData, ctcVariableLPA: e.target.value })}
                className="w-full text-sm px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Total Vacancies</label>
              <input
                type="number"
                value={formData.vacancies}
                onChange={(e) => setFormData({ ...formData, vacancies: e.target.value })}
                className="w-full text-sm px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Eligibility Thresholds */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Eligibility Rules</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Minimum CGPA</label>
              <input
                type="number"
                step="0.1"
                value={formData.minCgpa}
                onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
                className="w-full text-sm px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Max Active Backlogs Allowed</label>
              <input
                type="number"
                value={formData.maxBacklogs}
                onChange={(e) => setFormData({ ...formData, maxBacklogs: e.target.value })}
                className="w-full text-sm px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Eligible Departments</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DEPARTMENTS.slice(0, 6).map((dept) => {
                const checked = formData.allowedDepartments.includes(dept)
                return (
                  <label
                    key={dept}
                    className={`flex items-center gap-1.5 text-xs p-2 rounded-lg border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-800 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleDeptToggle(dept)}
                      className="sr-only"
                    />
                    <span className="truncate">{dept}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        {/* Selection Stages Configuration */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Selection Rounds Pipeline
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRound}
              className="text-xs py-1 px-2 text-indigo-600 border-indigo-200"
            >
              <Plus className="w-3.5 h-3.5" /> Add Round
            </Button>
          </div>

          <div className="space-y-2">
            {formData.selectionRounds.map((round, idx) => (
              <div
                key={round.id}
                className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200 text-xs"
              >
                <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-[11px]">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={round.name}
                  onChange={(e) => {
                    const updated = [...formData.selectionRounds]
                    updated[idx].name = e.target.value
                    setFormData({ ...formData, selectionRounds: updated })
                  }}
                  className="flex-1 px-2.5 py-1 border border-slate-200 rounded text-slate-800 font-medium"
                />
                <select
                  value={round.type}
                  onChange={(e) => {
                    const updated = [...formData.selectionRounds]
                    updated[idx].type = e.target.value
                    setFormData({ ...formData, selectionRounds: updated })
                  }}
                  className="px-2 py-1 border border-slate-200 rounded text-slate-700 bg-slate-50"
                >
                  {Object.values(ROUND_TYPE).map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
                {formData.selectionRounds.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRound(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Publish Job Posting
          </Button>
        </div>
      </form>
    </Modal>
  )
}
