import React, { useState } from 'react'
import { Calendar, Users, Award, Star, CheckCircle2, MessageSquare } from 'lucide-react'
import { useRecruiterStore } from '../recruiterStore'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export function RecruiterInterviewsPage() {
  const { candidates, updateCandidateScorecard } = useRecruiterStore()
  const [activeCandidate, setActiveCandidate] = useState(null)
  const [notice, setNotice] = useState('')

  const [scoreData, setScoreData] = useState({
    codingScore: 90,
    systemDesignScore: 85,
    communicationScore: 90,
    feedback: '',
  })

  const handleOpenScorecard = (cand) => {
    setActiveCandidate(cand)
    setScoreData({
      codingScore: cand.scorecard?.codingScore || 85,
      systemDesignScore: cand.scorecard?.systemDesignScore || 80,
      communicationScore: cand.scorecard?.communicationScore || 85,
      feedback: cand.scorecard?.feedback || '',
    })
  }

  const handleSaveScorecard = (e) => {
    e.preventDefault()
    if (activeCandidate) {
      updateCandidateScorecard(activeCandidate.id, scoreData)
      setActiveCandidate(null)
      setNotice(`Evaluation score submitted for ${activeCandidate.name}.`)
      setTimeout(() => setNotice(''), 4000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-600" /> Technical Interviews & Evaluation Scorecards
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Evaluate candidates during live interview slots, record domain scores and submit hiring panel remarks.
        </p>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Candidates Evaluation Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidates.map((cand) => (
          <div
            key={cand.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{cand.name}</h3>
                <p className="text-xs text-slate-500 font-mono">[{cand.registerNumber}] • {cand.department}</p>
              </div>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md border border-indigo-200">
                {cand.interviewSlot}
              </span>
            </div>

            {/* Scorecard Summary */}
            <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <p className="text-[10px] text-slate-400 font-semibold">Coding</p>
                  <p className="font-bold text-slate-900 mt-0.5">{cand.scorecard?.codingScore || 'N/A'}/100</p>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <p className="text-[10px] text-slate-400 font-semibold">System Design</p>
                  <p className="font-bold text-slate-900 mt-0.5">{cand.scorecard?.systemDesignScore || 'N/A'}/100</p>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <p className="text-[10px] text-slate-400 font-semibold">Communication</p>
                  <p className="font-bold text-slate-900 mt-0.5">{cand.scorecard?.communicationScore || 'N/A'}/100</p>
                </div>
              </div>

              {cand.scorecard?.feedback && (
                <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded border border-slate-100">
                  Panel Note: "{cand.scorecard.feedback}"
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Button
                size="sm"
                onClick={() => handleOpenScorecard(cand)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1.5"
              >
                <Star className="w-3.5 h-3.5" /> Submit / Edit Scorecard
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Scorecard Modal (R7) */}
      <Modal
        isOpen={!!activeCandidate}
        onClose={() => setActiveCandidate(null)}
        title={`Evaluation Scorecard: ${activeCandidate?.name}`}
        subtitle="Submit technical rating and comprehensive panel feedback"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveScorecard} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Coding & Problem Solving</label>
              <span className="text-xs font-bold text-indigo-600">{scoreData.codingScore}/100</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={scoreData.codingScore}
              onChange={(e) => setScoreData({ ...scoreData, codingScore: parseInt(e.target.value, 10) })}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">System Design & Tech Depth</label>
              <span className="text-xs font-bold text-indigo-600">{scoreData.systemDesignScore}/100</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={scoreData.systemDesignScore}
              onChange={(e) => setScoreData({ ...scoreData, systemDesignScore: parseInt(e.target.value, 10) })}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Communication & Team Fit</label>
              <span className="text-xs font-bold text-indigo-600">{scoreData.communicationScore}/100</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={scoreData.communicationScore}
              onChange={(e) => setScoreData({ ...scoreData, communicationScore: parseInt(e.target.value, 10) })}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Interviewer Notes & Remarks</label>
            <textarea
              rows="3"
              required
              value={scoreData.feedback}
              onChange={(e) => setScoreData({ ...scoreData, feedback: e.target.value })}
              placeholder="Candidate strengths, areas for development, final recommendation..."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setActiveCandidate(null)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              Save Scorecard
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
