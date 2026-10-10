import React, { useState } from 'react'
import { Button, StatusBadge } from '@/components/ui'
import { Sparkles, Bot, Target, HelpCircle, CheckCircle2, AlertCircle, ArrowRight, BrainCircuit } from 'lucide-react'

export function AiPlacementAssistantPage() {
  const [analyzing, setAnalyzing] = useState(false)
  const [practiceAnswer, setPracticeAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const handlePracticeEvaluate = () => {
    if (!practiceAnswer) return
    setFeedback(
      'Strong explanation of container orchestration principles! Recommendation: quantify your answer by referencing cluster node counts and deployment latency metrics to impress Tier-1 interview panels.'
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-indigo-600" /> AI Placement Assistant & Skill Coach
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Intelligent resume parsing, automated skill-gap analysis, and realistic interview question simulators.
        </p>
      </div>

      {/* Mandatory Ethical AI Disclaimer Banner (M21 Note) */}
      <div className="p-4 bg-indigo-950 text-white rounded-2xl border border-indigo-900 shadow-sm flex items-start gap-4">
        <div className="p-2.5 bg-indigo-800 rounded-xl shrink-0">
          <BrainCircuit className="w-5 h-5 text-indigo-300" />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-indigo-200 uppercase tracking-wider">
            Ethical AI & Non-Discrimination Policy (M21):
          </h4>
          <p className="text-slate-300 leading-relaxed">
            "GENESIS AI algorithms assist you strictly for skill preparation and job matching recommendations. AI is strictly prohibited from making hiring, shortlisting, or rejection decisions. Final outcomes remain 100% human-evaluated."
          </p>
        </div>
      </div>

      {/* Grid: Resume Match Score & Skill Gap Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ATS Parsing Engine</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">94%</span>
            <span className="text-xs text-emerald-600 font-semibold">+6% vs average</span>
          </div>
          <p className="text-xs text-slate-500">
            Primary resume (Varun_Murugesh_Cloud_SDE.pdf) parsed across 28 technical keywords.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Top Skill Strengths</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[11px] font-semibold">React & Frontend</span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[11px] font-semibold">Cloud Infrastructure</span>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[11px] font-semibold">PostgreSQL</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Identified Skill Gaps</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-[11px] font-semibold">System Concurrency</span>
            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-[11px] font-semibold">Kafka Streams</span>
          </div>
        </div>
      </div>

      {/* Interactive Mock Interview Practice Simulator */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Interactive Technical Practice Simulator</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Practice answering real company interview prompts with immediate AI structure and delivery feedback.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2">
          <span className="font-bold text-indigo-600 uppercase tracking-wider text-[10px]">
            Google Cloud Prompt · Technical System Design
          </span>
          <p className="text-sm font-semibold text-slate-900">
            "How would you design an auto-scaling containerized microservice that handles sudden 10x traffic spikes with minimal latency?"
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">Type Your Answer / Solution Approach:</label>
          <textarea
            rows={4}
            value={practiceAnswer}
            onChange={(e) => setPracticeAnswer(e.target.value)}
            placeholder="Structure your answer using architectural components: load balancer, HPA, caching layer, and database replicas..."
            className="w-full text-xs p-3.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
          />
        </div>

        <div className="flex justify-end">
          <Button size="sm" onClick={handlePracticeEvaluate} className="text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Evaluate My Answer
          </Button>
        </div>

        {feedback && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1 animate-fade-in">
            <h4 className="font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Coach Feedback
            </h4>
            <p className="text-emerald-800 leading-relaxed">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  )
}
