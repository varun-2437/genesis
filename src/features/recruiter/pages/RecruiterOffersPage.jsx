import React, { useState } from 'react'
import { Award, Plus, CheckCircle2, FileText, Send, Clock, DollarSign } from 'lucide-react'
import { useRecruiterStore } from '../recruiterStore'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export function RecruiterOffersPage() {
  const { candidates, offers, releaseOffer } = useRecruiterStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const [formData, setFormData] = useState({
    candidateId: candidates[0]?.id || '',
    role: 'Software Development Engineer - Campus 2026',
    ctcFixed: '24.0 LPA',
    ctcVariable: '8.5 LPA',
    totalCtc: '32.5 LPA',
    expiryDate: '2026-10-25',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const cand = candidates.find((c) => c.id === formData.candidateId) || candidates[0]
    releaseOffer({
      ...formData,
      candidateName: cand.name,
    })
    setIsModalOpen(false)
    setNotice(`Official offer letter released for ${cand.name}.`)
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-600" /> Offers & Final Selection Release
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Roll out official employment offer letters, configure CTC breakdowns, and track acceptance deadlines.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm text-xs"
        >
          <Plus className="w-4 h-4" /> Extend Placement Offer
        </Button>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Offers Extended List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((off) => (
          <div
            key={off.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{off.candidateName}</h3>
                <p className="text-xs text-slate-500">{off.role}</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                {off.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Total Annual Package:</span>
                <span className="text-emerald-700 text-sm">₹{off.totalCtc}</span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Base: {off.ctcFixed} + Performance Bonus: {off.ctcVariable}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Issued: {off.issueDate}</span>
              <span className="font-semibold text-rose-700">Accept by: {off.expiryDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Extend Offer Modal (R8) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Extend Official Placement Offer"
        subtitle="Formal offer release with compensation packages and validity dates"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Candidate *</label>
            <select
              value={formData.candidateId}
              onChange={(e) => setFormData({ ...formData, candidateId: e.target.value })}
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.registerNumber} - {c.department})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Designation / Role Title *</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Total CTC *</label>
              <input
                type="text"
                required
                value={formData.totalCtc}
                onChange={(e) => setFormData({ ...formData, totalCtc: e.target.value })}
                placeholder="e.g. 32.5 LPA"
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Acceptance Expiry</label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
              Release Offer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
