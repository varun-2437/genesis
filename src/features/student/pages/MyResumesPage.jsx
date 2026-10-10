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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">My Resumes</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Maintain role-tailored resumes for specific campus opportunities and view verification status.
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Upload New Version
        </Button>
      </div>

      {/* AI Suggestion Banner */}
      <div className="card p-4 bg-surface-2/60 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent text-accent-fg rounded-[6px] shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-fg">AI Resume Optimizer & Parser Available</h4>
            <p className="text-xs text-fg-muted">
              Your primary resume scored <strong className="text-fg font-semibold">94/100</strong> against current Tier-1 recruitment parameters.
            </p>
          </div>
        </div>
        <Button variant="secondary" size="sm" className="text-xs">
          View ATS Recommendations
        </Button>
      </div>

      {/* Resume Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className={`card flex flex-col justify-between transition-colors ${
              resume.isDefault ? 'border-accent ring-1 ring-accent/30' : 'hover:border-line-strong'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 bg-surface-2 rounded-[6px] text-accent border border-line">
                  <FileText className="w-5 h-5" />
                </div>
                <StatusBadge status={resume.status} />
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-fg">{resume.title}</h3>
                </div>
                <p className="text-xs text-fg-muted mt-0.5 truncate">{resume.fileName}</p>
                
                <div className="mt-3 flex items-center gap-2 text-[11px] text-fg-subtle">
                  <span>Version {resume.version}</span>
                  <span>•</span>
                  <span>{resume.updatedAt}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs">
                <span className="text-fg-muted">AI Match Score:</span>
                <span className="font-semibold text-accent tabular-nums">{resume.aiScore}%</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-line flex items-center justify-between gap-2">
              {resume.isDefault ? (
                <span className="text-[11px] font-semibold text-success flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Primary Resume
                </span>
              ) : (
                <button
                  onClick={() => setDefault(resume.id)}
                  className="text-[11px] font-medium text-accent hover:underline cursor-pointer"
                >
                  Make Primary
                </button>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={() => alert(`Downloading ${resume.fileName}`)}
                  className="p-1.5 text-fg-muted hover:text-fg rounded hover:bg-surface-2 transition-colors cursor-pointer"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
                {!resume.isDefault && (
                  <button
                    onClick={() => deleteResume(resume.id)}
                    className="p-1.5 text-fg-muted hover:text-danger rounded hover:bg-surface-2 transition-colors cursor-pointer"
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
            <label className="block text-xs font-semibold text-fg mb-1.5">Resume Label / Target Role</label>
            <input
              type="text"
              placeholder="e.g. Frontend Engineer Version"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg"
            />
          </div>
          <FileUploader label="Attach PDF Document" accept=".pdf" maxSizeMB={4} />
        </div>
      </Modal>
    </div>
  )
}
