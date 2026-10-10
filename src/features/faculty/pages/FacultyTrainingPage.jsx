import React, { useState } from 'react'
import { Calendar, Users, CheckCircle2, UserCheck, Plus } from 'lucide-react'
import { useFacultyStore } from '../facultyStore'
import { Button } from '@/components/ui/Button'

export function FacultyTrainingPage() {
  const { trainingBatches, markAttendance } = useFacultyStore()
  const [notice, setNotice] = useState('')

  const handleUpdate = (batchId, count) => {
    markAttendance(batchId, count)
    setNotice(`Attendance record updated (${count} students present).`)
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-600" /> Training Batches & Attendance Register
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor technical preparation sessions, company-specific bootcamps, and record daily batch attendance.
        </p>
      </div>

      {notice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trainingBatches.map((batch) => {
          const attendancePercent = Math.round((batch.presentCount / batch.totalEnrolled) * 100)
          return (
            <div
              key={batch.id}
              className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {batch.batch}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-2">{batch.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Faculty Trainer: {batch.trainer}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-700">
                  <span>Attendance: {batch.presentCount} / {batch.totalEnrolled} Present</span>
                  <span className="text-emerald-700 font-bold">{attendancePercent}% Turnout</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: `${attendancePercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-400">Date: {batch.date}</span>
                <Button
                  size="sm"
                  onClick={() => handleUpdate(batch.id, Math.min(batch.presentCount + 1, batch.totalEnrolled))}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs gap-1 py-1"
                >
                  <UserCheck className="w-3.5 h-3.5" /> Mark Present +1
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
