import React, { useState } from 'react'
import { StatusBadge, Button, Stepper } from '@/components/ui'
import { GitCommit, Users, CheckCircle2, ArrowRight } from 'lucide-react'

export function TpoRoundsSelectionPage() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    { title: 'Screening Round', description: 'Online Aptitude & MCQ' },
    { title: 'Technical Round 1', description: 'DSA & Systems Design' },
    { title: 'Technical Round 2', description: 'Architecture & Live Code' },
    { title: 'HR & Final Offer', description: 'Culture Fit & Offer Rollout' },
  ]

  const candidatesInRound = [
    { name: 'Varun Murugesh (21CS104)', score: '92/100', status: 'SHORTLISTED' },
    { name: 'Pooja Iyer (21CS088)', score: '96/100', status: 'SHORTLISTED' },
    { name: 'Rohan Deshmukh (21CS120)', score: '78/100', status: 'IN_REVIEW' },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Rounds & Selection Engine (T13, M9.1–9.18)</h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure stage gates per drive, record panel scores, and move candidates between rounds in bulk.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Google Cloud Drive Pipeline Stages</h3>
        <Stepper steps={steps} currentStep={activeStep} onStepClick={setActiveStep} />

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900">
            Candidates in {steps[activeStep].title} ({candidatesInRound.length})
          </h4>
          <Button
            size="sm"
            className="text-xs bg-emerald-600 hover:bg-emerald-700"
            onClick={() => alert('Candidates promoted to the subsequent round!')}
          >
            Promote Shortlisted to Next Round (M9.15)
          </Button>
        </div>

        <div className="space-y-2">
          {candidatesInRound.map((cand, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">{cand.name}</span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-indigo-600">Score: {cand.score}</span>
                <StatusBadge status={cand.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
