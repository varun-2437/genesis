import React, { useState } from 'react'
import { Button, StatusBadge, Modal } from '@/components/ui'
import { Award, Building2, UserPlus, Heart, MessageSquare } from 'lucide-react'

export function RecruitmentConnectionsPage() {
  const [storyModal, setStoryModal] = useState(false)
  const [stories, setStories] = useState([
    {
      id: 1,
      title: 'From College Labs to SDE 2 at Microsoft: Journey & Tips',
      author: 'Rahul Venkat (Class of 2023)',
      reads: 420,
      likes: 88,
      postedOn: 'Sep 12, 2026',
    },
  ])

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Alumni Stories & Recruiter Contacts (M16.7, 16.10)</h2>
          <p className="text-xs text-slate-500 mt-1">
            Share placement success stories and connect company hiring managers with our university placement cell.
          </p>
        </div>
        <Button onClick={() => setStoryModal(true)} className="flex items-center gap-2 text-xs">
          <Award className="w-4 h-4" /> Share My Placement Story
        </Button>
      </div>

      <div className="space-y-4">
        {stories.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
            <p className="text-xs text-slate-500">By {s.author} · {s.postedOn}</p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-100">
              <span>{s.reads} Student Reads</span>
              <span>•</span>
              <span className="text-rose-600 font-semibold flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-current" /> {s.likes} Likes
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={storyModal}
        onClose={() => setStoryModal(false)}
        title="Publish Placement Success Story (M16.10)"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setStoryModal(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setStoryModal(false); alert('Story published to Student Portal!') }}>
              Publish Story
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-600">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Story Title</label>
            <input type="text" placeholder="e.g. How I Cracked the Google Coding Interview" className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Advice & Preparation Journey</label>
            <textarea rows={5} placeholder="Share resume advice, project tips, and interview learnings..." className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
