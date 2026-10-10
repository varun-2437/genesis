import React, { useState } from 'react'
import { FileUploader, Button, StatusBadge, Modal } from '@/components/ui'
import { FileText, Plus, Download, Sparkles, Trash2, Eye, CheckCircle2 } from 'lucide-react'

export function MyResumesPage() {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: 'Full Stack & Cloud SDE Resume',
      version: 'v2.4',
      fileName: 'Varun_Murugesh_Cloud_SDE.pdf',
      updatedAt: 'Yesterday at 4:30 PM',
      status: 'VERIFIED',
      isDefault: true,
      downloads: 4,
      aiScore: 94,
    },
    {
      id: 2,
      title: 'Systems & DevOps Resume',
      version: 'v1.2',
      fileName: 'Varun_Systems_DevOps.pdf',
      updatedAt: '3 days ago',
      status: 'VERIFIED',
      isDefault: false,
      downloads: 1,
      aiScore: 89,
    },
    {
      id: 3,
      title: 'Data Science & ML Engineering',
      version: 'v1.0',
      fileName: 'Varun_ML_Resume_Draft.pdf',
      updatedAt: 'Oct 02, 2026',
      status: 'PENDING',
      isDefault: false,
      downloads: 0,
      aiScore: 81,
    },
  ])

  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const handleUploadNew = () => {
    if (!newTitle) return
    const newDoc = {
      id: Date.now(),
      title: newTitle,
      version: 'v1.0',
      fileName: `${newTitle.replace(/\s+/g, '_')}.pdf`,
      updatedAt: 'Just now',
      status: 'PENDING',
      isDefault: false,
      downloads: 0,
      aiScore: 85,
    }
    setResumes([newDoc, ...resumes])
    setIsUploadOpen(false)
    setNewTitle('')
  }

  const setDefault = (id) => {
    setResumes(resumes.map((r) => ({ ...r, isDefault: r.id === id })))
  }

  const deleteResume = (id) => {
    setResumes(resumes.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Resumes</h2>
          <p className="text-xs text-slate-500 mt-1">
            Maintain role-tailored resumes for specific campus opportunities and view verification status.
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Upload New Version
        </Button>
      </div>

      {/* AI Suggestion Banner */}
      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-indigo-950">AI Resume Optimizer & Parser Available</h4>
            <p className="text-xs text-indigo-800">
              Your primary resume scored <strong>94/100</strong> against current Tier-1 recruitment parameters.
            </p>
          </div>
        </div>
        <Button variant="secondary" size="sm" className="text-xs text-indigo-700 bg-white border-indigo-200">
          View ATS Recommendations
        </Button>
      </div>

      {/* Resume Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-sm transition-all ${
              resume.isDefault ? 'border-indigo-500 ring-2 ring-indigo-50' : 'border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-700">
                  <FileText className="w-6 h-6" />
                </div>
                <StatusBadge status={resume.status} />
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{resume.title}</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{resume.fileName}</p>
                
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Version {resume.version}</span>
                  <span>•</span>
                  <span>{resume.updatedAt}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">AI Match Score:</span>
                <span className="font-bold text-indigo-600">{resume.aiScore}%</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              {resume.isDefault ? (
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Primary Resume
                </span>
              ) : (
                <button
                  onClick={() => setDefault(resume.id)}
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Make Primary
                </button>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={() => alert(`Downloading ${resume.fileName}`)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                {!resume.isDefault && (
                  <button
                    onClick={() => deleteResume(resume.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Specialized Resume"
        description="Uploaded resumes undergo fast verification by the TPO committee."
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleUploadNew}>
              Upload & Submit
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Resume Label / Target Role</label>
            <input
              type="text"
              placeholder="e.g. Frontend Engineer Version"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <FileUploader label="Attach PDF Document" accept=".pdf" maxSizeMB={4} />
        </div>
      </Modal>
    </div>
  )
}
