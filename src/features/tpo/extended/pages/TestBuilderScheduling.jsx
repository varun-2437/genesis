import React, { useState } from 'react'
import {
  CalendarClock,
  Clock,
  Shuffle,
  Shield,
  Plus,
  Play,
  Users,
  CheckCircle,
  FileCheck2,
  Calendar,
  AlertCircle
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const SCHEDULED_TESTS = [
  {
    id: 'TST-501',
    name: 'Microsoft Campus Screening 2026',
    assessmentType: 'Pre-Interview Screening (11.7)',
    batchesAssigned: ['2027 CSE-A', '2027 CSE-B', '2027 IT'],
    candidateCount: 220,
    durationMins: 90,
    startTime: '2026-10-15 10:00 AM',
    randomizeQuestions: true,
    cameraProctoring: true,
    status: 'Scheduled',
    questionCount: 32
  },
  {
    id: 'TST-502',
    name: 'Goldman Sachs Quantitative & Aptitude Diagnostic',
    assessmentType: 'Diagnostic / Aptitude',
    batchesAssigned: ['2027 All Engineering'],
    candidateCount: 450,
    durationMins: 60,
    startTime: '2026-10-18 02:00 PM',
    randomizeQuestions: true,
    cameraProctoring: true,
    status: 'Scheduled',
    questionCount: 45
  },
  {
    id: 'TST-503',
    name: 'Core Embedded & Hardware Assessment',
    assessmentType: 'Department Mock',
    batchesAssigned: ['2027 ECE', '2027 EEE'],
    candidateCount: 160,
    durationMins: 75,
    startTime: '2026-10-09 11:00 AM',
    randomizeQuestions: false,
    cameraProctoring: false,
    status: 'Completed',
    questionCount: 25
  }
]

export function TestBuilderScheduling() {
  const [tests, setTests] = useState(SCHEDULED_TESTS)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTest, setNewTest] = useState({
    name: '',
    assessmentType: 'Pre-Interview Screening (11.7)',
    batchesAssigned: '2027 CSE-A, 2027 IT',
    durationMins: 60,
    startTime: '2026-10-22 10:00 AM',
    randomizeQuestions: true,
    cameraProctoring: true,
    questionCount: 30
  })

  const handleCreateTest = (e) => {
    e.preventDefault()
    if (!newTest.name) return
    const created = {
      id: `TST-${tests.length + 501}`,
      name: newTest.name,
      assessmentType: newTest.assessmentType,
      batchesAssigned: newTest.batchesAssigned.split(',').map(b => b.trim()),
      candidateCount: 180,
      durationMins: Number(newTest.durationMins),
      startTime: newTest.startTime,
      randomizeQuestions: newTest.randomizeQuestions,
      cameraProctoring: newTest.cameraProctoring,
      status: 'Scheduled',
      questionCount: Number(newTest.questionCount)
    }
    setTests([created, ...tests])
    setShowCreateModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T16</span>
            <h1 className="text-2xl font-bold text-slate-900">Test Builder & Scheduling</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Assemble multi-section assessments from question pools, set timers, assign batch rosters, and configure anti-cheat proctoring.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default" onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 text-xs">
            <Plus className="w-4 h-4" />
            Schedule New Assessment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Scheduled Upcoming Tests"
          value={tests.filter(t => t.status === 'Scheduled').length}
          icon={CalendarClock}
          change="Across this academic cycle"
          trend="up"
        />
        <StatCard
          title="Assigned Candidates"
          value="830 Students"
          icon={Users}
          change="Ready to take assessments"
          trend="neutral"
        />
        <StatCard
          title="Proctored Assessments"
          value="100%"
          icon={Shield}
          change="Tab-switch & webcam flags"
          trend="up"
        />
        <StatCard
          title="Completed Evaluations"
          value={tests.filter(t => t.status === 'Completed').length}
          icon={CheckCircle}
          change="Ready for review"
          trend="neutral"
        />
      </div>

      {/* Tests Schedule List */}
      <div className="space-y-4">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {test.id}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{test.name}</h3>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                  {test.assessmentType}
                </span>
                <StatusBadge status={test.status} />
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {test.durationMins} Minutes
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {test.startTime}
                </span>
                <span>•</span>
                <span>{test.questionCount} Questions Selected</span>
                <span>•</span>
                <span className="text-indigo-600 font-medium">
                  Batches: {test.batchesAssigned.join(', ')} ({test.candidateCount} Candidates)
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                {test.randomizeQuestions && (
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex items-center gap-1">
                    <Shuffle className="w-3 h-3" /> Question Randomization Enabled
                  </span>
                )}
                {test.cameraProctoring && (
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                    <Shield className="w-3 h-3" /> Anti-Cheat Proctoring Active
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="outline" className="text-xs h-8">
                Edit Roster
              </Button>
              {test.status === 'Completed' ? (
                <Button size="sm" variant="default" className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700">
                  View Results (T17)
                </Button>
              ) : (
                <Button size="sm" variant="default" className="text-xs h-8">
                  Launch Console
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateTest} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Schedule Campus Assessment</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Assessment Title</label>
                <input
                  type="text"
                  required
                  value={newTest.name}
                  onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                  placeholder="e.g. Amazon Round 1 Online Aptitude & Coding"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Assessment Category</label>
                <select
                  value={newTest.assessmentType}
                  onChange={(e) => setNewTest({ ...newTest, assessmentType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                >
                  <option value="Pre-Interview Screening (11.7)">Pre-Interview Screening (11.7)</option>
                  <option value="Diagnostic / Aptitude">Diagnostic / Aptitude</option>
                  <option value="Company Specific Test">Company Specific Test</option>
                  <option value="Department Mock">Department Mock</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newTest.durationMins}
                    onChange={(e) => setNewTest({ ...newTest, durationMins: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Total Questions</label>
                  <input
                    type="number"
                    value={newTest.questionCount}
                    onChange={(e) => setNewTest({ ...newTest, questionCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Assigned Batches</label>
                <input
                  type="text"
                  value={newTest.batchesAssigned}
                  onChange={(e) => setNewTest({ ...newTest, batchesAssigned: e.target.value })}
                  placeholder="Comma separated batches"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={newTest.randomizeQuestions}
                    onChange={(e) => setNewTest({ ...newTest, randomizeQuestions: e.target.checked })}
                    className="rounded text-indigo-600"
                  />
                  Randomize Order
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={newTest.cameraProctoring}
                    onChange={(e) => setNewTest({ ...newTest, cameraProctoring: e.target.checked })}
                    className="rounded text-indigo-600"
                  />
                  Proctoring Shield
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default">
                Schedule Assessment
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
