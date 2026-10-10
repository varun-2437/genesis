import React, { useState } from 'react'
import { MessageSquare, Star, CheckCircle2, History, Send } from 'lucide-react'
import { useRecruiterStore } from '../recruiterStore'
import { Button } from '@/components/ui/Button'

export function RecruiterFeedbackPage() {
  const { feedbackLog, addFeedback } = useRecruiterStore()
  const [notice, setNotice] = useState('')

  const [formData, setFormData] = useState({
    driveName: 'Google Campus Drive 2026',
    rating: 5,
    year: '2025-2026',
    comments: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addFeedback(formData)
    setFormData({
      driveName: 'Google Campus Drive 2026',
      rating: 5,
      year: '2025-2026',
      comments: '',
    })
    setNotice('Thank you! Feedback submitted directly to Institutional TPO and Principal.')
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-indigo-600" /> Hiring History & Institution Feedback
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review past recruitment results and submit feedback on student curriculum readiness and campus facilities.
        </p>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Submit Recruiter Feedback</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Recruitment Drive Name</label>
              <input
                type="text"
                required
                value={formData.driveName}
                onChange={(e) => setFormData({ ...formData, driveName: e.target.value })}
                className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Candidate Readiness Rating (1 to 5 Stars)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`p-2 rounded-lg border text-xs font-bold transition-colors ${
                      formData.rating >= star
                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Feedback on Candidate Quality & Infrastructure
              </label>
              <textarea
                rows="4"
                required
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                placeholder="Candidate strengths, skill gaps observed, campus facilities..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5">
              <Send className="w-3.5 h-3.5" /> Submit Feedback
            </Button>
          </form>
        </div>

        {/* History Log */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-600" /> Historical Feedback Submitted
          </h3>

          <div className="space-y-3">
            {feedbackLog.map((fb) => (
              <div
                key={fb.id}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{fb.driveName}</span>
                  <span className="text-amber-600 font-bold">★ {fb.rating} / 5</span>
                </div>
                <p className="text-slate-600 italic">"{fb.comments}"</p>
                <p className="text-[10px] text-slate-400 pt-1">Submitted on {fb.submittedAt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
