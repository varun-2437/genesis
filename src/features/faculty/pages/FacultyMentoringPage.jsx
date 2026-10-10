import React, { useState } from 'react'
import { Users, CheckCircle2, MessageSquare, Target, TrendingUp } from 'lucide-react'
import { useFacultyStore } from '../facultyStore'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export function FacultyMentoringPage() {
  const { mentees, updateMenteeNote } = useFacultyStore()
  const [activeMentee, setActiveMentee] = useState(null)
  const [noteText, setNoteText] = useState('')
  const [progressVal, setProgressVal] = useState(50)
  const [notice, setNotice] = useState('')

  const handleOpenEdit = (m) => {
    setActiveMentee(m)
    setNoteText(m.notes)
    setProgressVal(m.progressPercentage)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (activeMentee) {
      updateMenteeNote(activeMentee.id, noteText, progressVal)
      setActiveMentee(null)
      setNotice(`Updated mentoring log for ${activeMentee.studentName}.`)
      setTimeout(() => setNotice(''), 4000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" /> Student Mentorship & Career Guidance
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track assigned mentee progress, set developmental goals, and record faculty advisory remarks.
        </p>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Mentees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mentees.map((m) => (
          <div
            key={m.id}
            className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{m.studentName}</h3>
                <p className="font-mono text-xs text-slate-400">[{m.registerNumber}]</p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                {m.progressPercentage}% Goals Met
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 text-xs">
              <p><strong>Aspirational Role:</strong> {m.targetRole}</p>
              <p><strong>Key Milestones:</strong> {m.goals}</p>
              <div className="pt-2 border-t border-slate-200/60 text-slate-600 italic">
                <p>"{m.notes}"</p>
                <p className="text-[10px] text-slate-400 mt-1 not-italic">
                  Last Session: {m.lastInteractionDate}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleOpenEdit(m)}
                className="text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50 gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Log Advisory Session
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Advisory Modal (F4) */}
      <Modal
        isOpen={!!activeMentee}
        onClose={() => setActiveMentee(null)}
        title={`Mentoring Session: ${activeMentee?.studentName}`}
        subtitle="Log discussion notes and update milestone completion %"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Milestone Progress %</label>
              <span className="text-xs font-bold text-indigo-600">{progressVal}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progressVal}
              onChange={(e) => setProgressVal(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Faculty Advisory Notes</label>
            <textarea
              rows="3"
              required
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" type="button" onClick={() => setActiveMentee(null)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
              Save Log
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
