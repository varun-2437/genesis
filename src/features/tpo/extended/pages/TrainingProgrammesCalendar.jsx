import React, { useState } from 'react'
import {
  GraduationCap,
  Calendar,
  Users,
  Award,
  Plus,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  Layers,
  ChevronRight
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const TRAINING_PROGRAMMES = [
  {
    id: 'TRN-301',
    title: 'Advanced DSA & Problem Solving Bootcamp',
    category: 'Technical Programming (12.4)',
    trainer: 'CodeNation Industry Experts',
    startDate: '2026-08-01',
    endDate: '2026-09-15',
    batches: ['2027 CSE', '2027 IT'],
    enrolled: 320,
    attendanceRate: '94.2%',
    skillGapReduction: '+38% LeetCode baseline',
    budgetAllocated: 'INR 2,40,000',
    status: 'Completed'
  },
  {
    id: 'TRN-302',
    title: 'Corporate Soft Skills & Mock GD/PI Masterclass',
    category: 'Soft Skills & Personal Interview (12.7, 12.8)',
    trainer: 'Apex Corporate Consultants',
    startDate: '2026-09-20',
    endDate: '2026-10-25',
    batches: ['All Final Year Branches'],
    enrolled: 640,
    attendanceRate: '88.5%',
    skillGapReduction: '+42% Communication metric',
    budgetAllocated: 'INR 1,80,000',
    status: 'In Progress'
  },
  {
    id: 'TRN-303',
    title: 'Quantitative Aptitude & Logical Speed-Math',
    category: 'Aptitude & Speed Reasoning (12.3)',
    trainer: 'Campus Career Cell',
    startDate: '2026-10-15',
    endDate: '2026-11-10',
    batches: ['2027 ECE', '2027 MECH', '2027 CIVIL'],
    enrolled: 280,
    attendanceRate: 'Upcoming',
    skillGapReduction: 'Baseline Diagnostic Set',
    budgetAllocated: 'INR 95,000',
    status: 'Scheduled'
  }
]

export function TrainingProgrammesCalendar() {
  const [trainings, setTrainings] = useState(TRAINING_PROGRAMMES)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTraining, setNewTraining] = useState({
    title: '',
    category: 'Technical Programming (12.4)',
    trainer: '',
    startDate: '2026-11-01',
    endDate: '2026-11-20',
    batches: '2027 EEE, 2027 MECH',
    enrolled: 150,
    budgetAllocated: 'INR 1,20,000'
  })

  const handleCreate = (e) => {
    e.preventDefault()
    if (!newTraining.title) return
    const created = {
      id: `TRN-${trainings.length + 301}`,
      title: newTraining.title,
      category: newTraining.category,
      trainer: newTraining.trainer || 'External Industry Partner',
      startDate: newTraining.startDate,
      endDate: newTraining.endDate,
      batches: newTraining.batches.split(',').map(b => b.trim()),
      enrolled: Number(newTraining.enrolled),
      attendanceRate: 'Scheduled',
      skillGapReduction: 'Diagnostic Scheduled',
      budgetAllocated: newTraining.budgetAllocated,
      status: 'Scheduled'
    }
    setTrainings([created, ...trainings])
    setShowAddModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T18 & T19</span>
            <h1 className="text-2xl font-bold text-slate-900">Training Programmes, Calendar & Effectiveness</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Annual training calendar (12.1), batch allocation, trainer scheduling, session attendance logs, and pre/post skill gap audits.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-xs">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Download Attendance Matrix
          </Button>
          <Button variant="default" onClick={() => setShowAddModal(true)} className="flex items-center gap-2 text-xs">
            <Plus className="w-4 h-4" />
            Add Training Workshop
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active & Scheduled Programmes"
          value={trainings.length}
          icon={Calendar}
          change="Campus-wide calendar"
          trend="up"
        />
        <StatCard
          title="Trained Candidates"
          value="1,240 Enrolled"
          icon={Users}
          change="All disciplines"
          trend="up"
        />
        <StatCard
          title="Average Attendance"
          value="91.4%"
          icon={CheckCircle}
          change="Biometric / RFID logs"
          trend="up"
        />
        <StatCard
          title="Total Training Outlay"
          value="INR 5.15 Lakhs"
          icon={Award}
          change="Placement budget (T27)"
          trend="neutral"
        />
      </div>

      {/* Programmes List */}
      <div className="space-y-4">
        {trainings.map((trn) => (
          <div
            key={trn.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {trn.id}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{trn.title}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                  {trn.category}
                </span>
                <StatusBadge status={trn.status} />
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                Budget: {trn.budgetAllocated}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50/80 p-3 rounded-lg text-xs">
              <div>
                <span className="text-slate-400 block">Lead Trainer</span>
                <span className="font-semibold text-slate-800">{trn.trainer}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Calendar Window</span>
                <span className="font-medium text-slate-700">{trn.startDate} to {trn.endDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Enrolled Candidates</span>
                <span className="font-medium text-slate-700">{trn.enrolled} Students ({trn.batches.join(', ')})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Effectiveness & Skill-Gap</span>
                <span className="font-semibold text-indigo-600">{trn.skillGapReduction}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-xs text-slate-500">
                Attendance Log: <strong>{trn.attendanceRate}</strong>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs h-8">
                  Mark Attendance (12.14)
                </Button>
                <Button size="sm" variant="default" className="text-xs h-8">
                  Effectiveness Report (12.20)
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add Training Workshop</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Programme Title</label>
                <input
                  type="text"
                  required
                  value={newTraining.title}
                  onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
                  placeholder="e.g. AWS Cloud Architecture Hands-on"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Category</label>
                <select
                  value={newTraining.category}
                  onChange={(e) => setNewTraining({ ...newTraining, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                >
                  <option value="Technical Programming (12.4)">Technical Programming (12.4)</option>
                  <option value="Soft Skills & PI (12.7, 12.8)">Soft Skills & PI (12.7, 12.8)</option>
                  <option value="Aptitude & Speed Reasoning (12.3)">Aptitude & Speed Reasoning (12.3)</option>
                  <option value="Resume & GD Clinics (12.5)">Resume & GD Clinics (12.5)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Trainer / Consultancy Firm</label>
                <input
                  type="text"
                  required
                  value={newTraining.trainer}
                  onChange={(e) => setNewTraining({ ...newTraining, trainer: e.target.value })}
                  placeholder="e.g. Industry Specialists Ltd."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newTraining.startDate}
                    onChange={(e) => setNewTraining({ ...newTraining, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">End Date</label>
                  <input
                    type="date"
                    value={newTraining.endDate}
                    onChange={(e) => setNewTraining({ ...newTraining, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Budget Allocation</label>
                <input
                  type="text"
                  value={newTraining.budgetAllocated}
                  onChange={(e) => setNewTraining({ ...newTraining, budgetAllocated: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default">
                Schedule Training
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
