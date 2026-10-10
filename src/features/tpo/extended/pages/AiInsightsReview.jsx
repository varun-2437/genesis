import React, { useState } from 'react'
import {
  Sparkles,
  UserCheck,
  BrainCircuit,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Shield,
  HelpCircle,
  Check,
  X
} from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'

const AI_RECOMMENDATION_QUEUE = [
  {
    id: 'AIR-901',
    studentName: 'Aarav Sharma',
    rollNo: '21CS042',
    department: 'CSE',
    jobRole: 'Cloud Systems Engineer (Microsoft)',
    aiConfidence: '96.4%',
    rationale: 'Demonstrated exceptional match in Distributed Systems coursework (Grade A+), high LeetCode rank (Top 1.2%), and previous AWS cloud internship experience.',
    readinessScore: '94/100',
    humanReviewDecision: 'Pending Staff Review',
    status: 'Pending'
  },
  {
    id: 'AIR-902',
    studentName: 'Sneha Patel',
    rollNo: '21ME031',
    department: 'MECH',
    jobRole: 'Simulation Trainee (Tata Motors)',
    aiConfidence: '88.2%',
    rationale: 'Strong finite-element analysis capstone project, verified ANSYS certification, 8.4 CGPA in thermal and mechanics modules.',
    readinessScore: '86/100',
    humanReviewDecision: 'Pending Staff Review',
    status: 'Pending'
  },
  {
    id: 'AIR-903',
    studentName: 'Rohan Gupta',
    rollNo: '21EC088',
    department: 'ECE',
    jobRole: 'VLSI Design Engineer (Texas Instruments)',
    aiConfidence: '92.0%',
    rationale: 'Direct alignment with Verilog & FPGA hardware labs. Completed Texas Instruments PPO internship with distinction.',
    readinessScore: '91/100',
    humanReviewDecision: 'Verified & Approved by Staff',
    status: 'Approved'
  }
]

export function AiInsightsReview() {
  const [queue, setQueue] = useState(AI_RECOMMENDATION_QUEUE)

  const handleApprove = (id) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved', humanReviewDecision: 'Approved & Passed to Recruiter' } : item))
  }

  const handleOverride = (id) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'Overridden', humanReviewDecision: 'Staff Overridden (Not Recommended)' } : item))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">TPO T29</span>
            <h1 className="text-2xl font-bold text-slate-900">AI Candidate Insights & Human Review Queue</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Explainable AI matching recommendations (21.11, 21.12) with human staff governance and oversight (Section 21.13).
          </p>
        </div>
      </div>

      {/* Mandatory Statutory Banner per Plan Spec */}
      <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-5 h-5 text-indigo-600 shrink-0" />
          <div className="text-xs text-indigo-900">
            <strong className="block font-semibold">Statutory Governance Principle: AI Assists, Never Auto-Rejects</strong>
            <span>All algorithmic scorecards and recommendations are explainable and subject to human placement officer discretion.</span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-indigo-200/60 text-indigo-800">
          Responsible AI Active
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Candidate Recommendations"
          value="412 Generated"
          icon={Sparkles}
          change="AY 2025-2026 Cohort"
          trend="up"
        />
        <StatCard
          title="Staff Human Approval Rate"
          value="94.2%"
          icon={UserCheck}
          change="High algorithmic veracity"
          trend="up"
        />
        <StatCard
          title="Pending Human Queue"
          value={queue.filter(q => q.status === 'Pending').length}
          icon={AlertCircle}
          change="Requires TPO verification"
          trend="neutral"
        />
        <StatCard
          title="Average Candidate Match"
          value="91.4% Confidence"
          icon={Shield}
          change="Semantic skill extraction"
          trend="up"
        />
      </div>

      {/* Queue Cards */}
      <div className="space-y-4">
        {queue.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-base">{item.studentName}</span>
                  <span className="text-xs text-slate-400 font-mono">({item.rollNo} • {item.department})</span>
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-bold text-indigo-600 bg-indigo-50">
                    Match Confidence: {item.aiConfidence}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-0.5">
                  Target Opening: {item.jobRole}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                  Readiness: {item.readinessScore}
                </span>
                <StatusBadge status={item.status} />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
              <strong className="text-slate-900 block">Explainable AI Recommendation Rationale:</strong>
              <p className="leading-relaxed">{item.rationale}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
              <span className="text-slate-500">
                Staff Review State: <strong>{item.humanReviewDecision}</strong>
              </span>

              {item.status === 'Pending' && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 text-rose-600 border-rose-200 hover:bg-rose-50"
                    onClick={() => handleOverride(item.id)}
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Override Recommendation
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleApprove(item.id)}
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Authorize & Forward to Recruiter
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
