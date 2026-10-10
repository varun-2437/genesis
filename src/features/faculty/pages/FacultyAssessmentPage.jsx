import React from 'react'
import { Award, BarChart3, TrendingUp, CheckCircle2 } from 'lucide-react'
import { useFacultyStore } from '../facultyStore'

export function FacultyAssessmentPage() {
  const { assessmentScores, department } = useFacultyStore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="w-6 h-6 text-indigo-600" /> Department Assessment & Mock Test Performance
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Topic-wise performance analysis across online assessments, coding challenges and core computer science domains.
        </p>
      </div>

      {/* Domain Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assessmentScores.map((score, idx) => (
          <div
            key={idx}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">{score.topic}</h3>
              <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Avg: {score.avgScore}%
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{score.totalAttempts} students tested</span>
                <span>Target: 80%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    score.avgScore >= 80 ? 'bg-emerald-600' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${score.avgScore}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
