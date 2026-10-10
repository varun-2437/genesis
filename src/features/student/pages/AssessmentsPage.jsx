import React, { useState, useEffect } from 'react'
import { StatusBadge, Button, Modal } from '@/components/ui'
import { Clock, AlertTriangle, CheckCircle2, Play, Code2, Award, ArrowRight } from 'lucide-react'

export function AssessmentsPage() {
  const [testMode, setTestMode] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 mins in seconds
  const [submitted, setSubmitted] = useState(false)

  const questions = [
    {
      id: 1,
      type: 'MCQ',
      category: 'Data Structures & Algorithms',
      question: 'What is the worst-case time complexity of searching an element in a Balanced Binary Search Tree (AVL Tree) of N nodes?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      correct: 1,
    },
    {
      id: 2,
      type: 'MCQ',
      category: 'Operating Systems',
      question: 'Which of the following conditions is NOT required for a deadlock to occur?',
      options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
      correct: 2,
    },
    {
      id: 3,
      type: 'CODING',
      category: 'System Programming',
      question: 'Write a JavaScript function to reverse words in a given sentence without modifying punctuation.',
      starterCode: 'function reverseWords(str) {\n  // Your code here\n  return str.split(" ").reverse().join(" ");\n}',
    },
  ]

  useEffect(() => {
    let timer
    if (testMode && timeLeft > 0 && !submitted) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [testMode, timeLeft, submitted])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSelect = (qIdx, optIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })
  }

  if (testMode) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Test Topbar */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
          <div>
            <h2 className="text-sm font-bold">Google Cloud Campus Screening Assessment 2026</h2>
            <p className="text-xs text-slate-400">Total 3 Questions · Secure Proctoring Active</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-300 font-mono text-sm font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-400 animate-pulse" /> {formatTime(timeLeft)}
            </div>
            <Button
              size="sm"
              variant="danger"
              className="text-xs"
              onClick={() => {
                setSubmitted(true)
                setTestMode(false)
              }}
            >
              End & Submit
            </Button>
          </div>
        </div>

        {/* Question Panel */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Question {currentQ + 1} of {questions.length} ({questions[currentQ].category})
            </span>
            <span className="text-xs text-slate-400">{questions[currentQ].type} Question</span>
          </div>

          <h3 className="text-base font-semibold text-slate-900 leading-relaxed">
            {questions[currentQ].question}
          </h3>

          {questions[currentQ].type === 'MCQ' ? (
            <div className="space-y-3 pt-2">
              {questions[currentQ].options.map((opt, optIdx) => (
                <div
                  key={optIdx}
                  onClick={() => handleSelect(currentQ, optIdx)}
                  className={`p-4 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                    selectedAnswers[currentQ] === optIdx
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-100'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedAnswers[currentQ] === optIdx
                        ? 'border-indigo-600 bg-indigo-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {selectedAnswers[currentQ] === optIdx && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700">Code Solution (Monaco Editor Mock)</label>
              <textarea
                rows={6}
                defaultValue={questions[currentQ].starterCode}
                className="w-full font-mono text-xs p-4 bg-slate-900 text-emerald-400 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <Button
              variant="secondary"
              size="sm"
              disabled={currentQ === 0}
              onClick={() => setCurrentQ((q) => q - 1)}
            >
              Previous Question
            </Button>

            {currentQ < questions.length - 1 ? (
              <Button size="sm" onClick={() => setCurrentQ((q) => q + 1)}>
                Next Question
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  setSubmitted(true)
                  setTestMode(false)
                }}
              >
                Complete & Finish Test
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Online Assessments & Code Tests</h2>
        <p className="text-xs text-slate-500 mt-1">
          Take company online evaluations, technical tests, and review performance reports.
        </p>
      </div>

      {submitted && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="text-base font-bold text-emerald-950">Assessment Submitted Successfully!</h3>
          <p className="text-xs text-emerald-700 max-w-md mx-auto">
            Your answers and code submissions have been recorded and sent to the secure evaluation runner. Results will be published on your performance dossier.
          </p>
        </div>
      )}

      {/* Available Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                DRIVE SCREENING
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                Google Cloud Aptitude & Technical Screening
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Duration: 30 Minutes · 3 Questions</p>
            </div>
            <StatusBadge status="ACTIVE" />
          </div>

          <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p>• Sections: Algorithms (MCQ), OS Concepts (MCQ), System Code (Coding).</p>
            <p>• Negative Marking: None.</p>
            <p>• Proctoring: Tab switches and multi-monitor setups flagged.</p>
          </div>

          <Button
            onClick={() => setTestMode(true)}
            className="w-full text-xs flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" /> Start Test Now
          </Button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 opacity-75">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                UPCOMING
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                Oracle Core Java & Database Proficiency Test
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Duration: 60 Minutes · Oct 14, 2026</p>
            </div>
            <StatusBadge status="UPCOMING" />
          </div>

          <div className="text-xs text-slate-600 space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <p>• Sections: Java 17 Streams, SQL Complex Joins, Distributed Transactions.</p>
            <p>• Opens automatically at scheduled window: 02:00 PM IST.</p>
          </div>

          <Button disabled variant="secondary" className="w-full text-xs">
            Test Locked until Scheduled Date
          </Button>
        </div>
      </div>
    </div>
  )
}
