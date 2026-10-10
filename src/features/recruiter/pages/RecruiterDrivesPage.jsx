import React, { useState } from 'react'
import { Calendar, Plus, CheckCircle2, Clock, MapPin, Laptop } from 'lucide-react'
import { useRecruiterStore } from '../recruiterStore'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export function RecruiterDrivesPage() {
  const { driveRequests, addDriveRequest } = useRecruiterStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    preferredDates: '2026-11-18 to 2026-11-20',
    mode: 'On-Campus',
    labsRequired: '80 Systems with Python/Java environments',
    pptRequired: true,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addDriveRequest(formData)
    setIsModalOpen(false)
    setNotice('Campus drive request submitted to college TPO cell for scheduling.')
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" /> Campus Recruitment Drive Requests
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Request campus recruitment drive dates, reserve lab infrastructure, and specify PPT requirements.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm text-xs"
        >
          <Plus className="w-4 h-4" /> Request Drive
        </Button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Drive Requests Grid */}
      <div className="space-y-3">
        {driveRequests.map((req) => (
          <div
            key={req.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{req.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Format: {req.mode}</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-md">
                {req.status}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1">
              <p><strong>Proposed Timing:</strong> {req.preferredDates}</p>
              <p><strong>Lab Requirements:</strong> {req.labsRequired}</p>
              {req.coordinatorAssigned && (
                <p className="text-indigo-700 font-medium">
                  <strong>Assigned TPO Faculty POC:</strong> {req.coordinatorAssigned}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Drive Request Modal (R4) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Campus Hiring Drive"
        subtitle="Submit dates, computing lab needs, and pre-placement presentation requests"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Drive Name / Identifier *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Google Summer Campus Drive 2026"
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Dates *</label>
              <input
                type="text"
                required
                value={formData.preferredDates}
                onChange={(e) => setFormData({ ...formData, preferredDates: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Format</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="On-Campus">On-Campus Visit</option>
                <option value="Virtual">Virtual / Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Workstation & Lab Requirements</label>
            <textarea
              rows="2"
              value={formData.labsRequired}
              onChange={(e) => setFormData({ ...formData, labsRequired: e.target.value })}
              placeholder="e.g. 100 systems, internet speed, video audio equipment..."
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              Submit Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
