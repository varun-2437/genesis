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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" /> AI Placement Assistant & Skill Coach
          </h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Intelligent resume parsing, automated skill-gap analysis, and realistic interview question simulators.
          </p>
        </div>
      </div>

      {/* Mandatory Ethical AI Disclaimer Banner (M21 Note) */}
      <div className="card p-4 bg-surface-2/60 border border-line flex items-start gap-3.5">
        <div className="p-2 rounded bg-surface border border-line text-accent shrink-0">
          <BrainCircuit className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-1">
          <h4 className="font-semibold text-fg tracking-tight">
            Ethical AI & Non-Discrimination Policy (M21):
          </h4>
          <p className="text-fg-muted leading-relaxed">
            "GENESIS AI algorithms assist you strictly for skill preparation and job matching recommendations. AI is strictly prohibited from making hiring, shortlisting, or rejection decisions. Final outcomes remain 100% human-evaluated."
          </p>
        </div>
      </div>

      {/* Grid: Resume Match Score & Skill Gap Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">ATS Parsing Engine</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-fg tabular-nums">94%</span>
            <span className="text-xs text-success font-medium">+6% vs average</span>
          </div>
          <p className="text-xs text-fg-muted">
            Primary resume (Varun_Murugesh_Cloud_SDE.pdf) parsed across 28 technical keywords.
          </p>
        </div>

        <div className="card p-5 space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">Top Skill Strengths</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 bg-success-soft text-success rounded text-[11px] font-medium border border-success/20">React & Frontend</span>
            <span className="px-2 py-0.5 bg-success-soft text-success rounded text-[11px] font-medium border border-success/20">Cloud Infrastructure</span>
            <span className="px-2 py-0.5 bg-success-soft text-success rounded text-[11px] font-medium border border-success/20">PostgreSQL</span>
          </div>
        </div>

        <div className="card p-5 space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">Identified Skill Gaps</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 bg-warning-soft text-warning rounded text-[11px] font-medium border border-warning/20">System Concurrency</span>
            <span className="px-2 py-0.5 bg-warning-soft text-warning rounded text-[11px] font-medium border border-warning/20">Kafka Streams</span>
          </div>
        </div>
      </div>

      {/* Interactive Mock Interview Practice Simulator */}
      <div className="card p-6 space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-accent" />
            <h3 className="text-[15px] font-semibold text-fg">Interactive Technical Practice Simulator</h3>
          </div>
          <p className="text-xs text-fg-muted mt-0.5">
            Practice answering real company interview prompts with immediate AI structure and delivery feedback.
          </p>
        </div>

        <div className="p-3.5 bg-surface-2/60 rounded-[6px] border border-line text-xs space-y-1.5">
          <span className="font-semibold text-accent uppercase tracking-wider text-[10px]">
            Google Cloud Prompt · Technical System Design
          </span>
          <p className="text-sm font-semibold text-fg">
            "How would you design an auto-scaling containerized microservice that handles sudden 10x traffic spikes with minimal latency?"
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-fg">Type Your Answer / Solution Approach:</label>
          <textarea
            rows={4}
            value={practiceAnswer}
            onChange={(e) => setPracticeAnswer(e.target.value)}
            placeholder="Structure your answer using architectural components: load balancer, HPA, caching layer, and database replicas..."
            className="w-full text-xs p-3 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg placeholder:text-fg-subtle"
          />
        </div>

        <div className="flex justify-end">
          <Button size="sm" onClick={handlePracticeEvaluate} className="text-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Evaluate My Answer
          </Button>
        </div>

        {feedback && (
          <div className="p-3.5 bg-success-soft border border-success/20 rounded-[6px] text-xs space-y-1">
            <h4 className="font-semibold text-success flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> AI Coach Feedback
            </h4>
            <p className="text-fg leading-relaxed">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  )
}
