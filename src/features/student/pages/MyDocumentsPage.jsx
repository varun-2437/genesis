import React, { useState } from 'react'
import { StatusBadge, Button, FileUploader, Modal } from '@/components/ui'
import { FileText, ShieldCheck, Download, Plus, AlertCircle, Eye, Trash2, CheckCircle2 } from 'lucide-react'

export function MyDocumentsPage() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: '10th Secondary School Certificate & Mark Sheet',
      category: 'Academic Proof',
      fileName: '10th_Marksheet_Verified.pdf',
      uploadedOn: 'Sep 15, 2026',
      status: 'VERIFIED',
      recruiterAccess: true,
      size: '1.2 MB',
    },
    {
      id: 2,
      title: '12th Higher Secondary Certificate & Mark Sheet',
      category: 'Academic Proof',
      fileName: '12th_Marksheet_Verified.pdf',
      uploadedOn: 'Sep 15, 2026',
      status: 'VERIFIED',
      recruiterAccess: true,
      size: '1.4 MB',
    },
    {
      id: 3,
      title: 'Semester 1 to 6 Consolidated Grade Transcripts',
      category: 'Official Transcripts',
      fileName: 'Sem_1_to_6_Consolidated_COE.pdf',
      uploadedOn: 'Oct 02, 2026',
      status: 'VERIFIED',
      recruiterAccess: true,
      size: '3.8 MB',
    },
    {
      id: 4,
      title: 'Government Identity Proof (Aadhaar / Passport)',
      category: 'Identity Verification',
      fileName: 'Govt_ID_Proof_Redacted.pdf',
      uploadedOn: 'Sep 16, 2026',
      status: 'VERIFIED',
      recruiterAccess: false,
      size: '0.8 MB',
    },
    {
      id: 5,
      title: 'Zoho Corporation Summer Internship Certificate',
      category: 'Work Experience',
      fileName: 'Zoho_Internship_Completion_Letter.pdf',
      uploadedOn: 'Oct 06, 2026',
      status: 'PENDING',
      recruiterAccess: true,
      size: '1.1 MB',
    },
    {
      id: 6,
      title: 'AWS Certified Cloud Practitioner Certificate',
      category: 'Certifications',
      fileName: 'AWS_Cloud_Practitioner_Cert.pdf',
      uploadedOn: 'Oct 08, 2026',
      status: 'PENDING',
      recruiterAccess: true,
      size: '0.9 MB',
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Academic Proof')

  const toggleRecruiterAccess = (id) => {
    setDocuments(
      documents.map((d) => (d.id === id ? { ...d, recruiterAccess: !d.recruiterAccess } : d))
    )
  }

  const handleUpload = () => {
    if (!newTitle) return
    const newDoc = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      fileName: `${newTitle.replace(/\s+/g, '_')}.pdf`,
      uploadedOn: 'Just now',
      status: 'PENDING',
      recruiterAccess: true,
      size: '1.5 MB',
    }
    setDocuments([newDoc, ...documents])
    setIsModalOpen(false)
    setNewTitle('')
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-[22px] font-semibold text-fg tracking-tight">My Placement Documents</h1>
          <p className="text-xs text-fg-muted mt-0.5">
            Official academic mark sheets, degree proofs, and professional certifications verified for drive eligibility.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 text-xs">
          <Plus className="w-4 h-4" /> Upload Document
        </Button>
      </div>

      {/* Recruiter Privacy Notice */}
      <div className="card p-4 bg-surface-2/60 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <div className="text-xs">
            <span className="font-semibold text-fg">Recruiter Document Permissions (M3.13, 26.5):</span>
            <p className="text-fg-muted mt-0.5">
              Only documents marked with "Recruiter Access" are visible to verified company HRs during shortlisting.
            </p>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Document Details</th>
              <th>Category</th>
              <th>Verification</th>
              <th>Recruiter Access</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface-2 text-accent border border-line rounded-[6px] shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-fg truncate">{doc.title}</p>
                      <p className="text-[11px] text-fg-muted mt-0.5">{doc.fileName} · {doc.size}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="px-2 py-0.5 bg-surface-2 text-fg-muted rounded-[4px] border border-line font-medium text-[11px]">
                    {doc.category}
                  </span>
                </td>
                <td>
                  <StatusBadge status={doc.status} />
                </td>
                <td>
                  <button
                    onClick={() => toggleRecruiterAccess(doc.id)}
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border cursor-pointer ${
                      doc.recruiterAccess
                        ? 'bg-success-soft text-success border-success/20'
                        : 'bg-surface-2 text-fg-muted border-line'
                    }`}
                  >
                    {doc.recruiterAccess ? 'Visible to Recruiters' : 'Confidential / TPO Only'}
                  </button>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => alert(`Downloading ${doc.fileName}`)}
                    className="p-1.5 text-fg-muted hover:text-fg rounded hover:bg-surface-2 inline-block cursor-pointer"
                    title="Download Document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Placement Verification Document"
        size="md"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleUpload}>
              Submit for Verification
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-fg mb-1">Document Title</label>
            <input
              type="text"
              placeholder="e.g. 5th Semester Mark Sheet"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-fg mb-1">Classification Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full text-xs p-2.5 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg"
            >
              <option value="Academic Proof">Academic Proof</option>
              <option value="Official Transcripts">Official Transcripts</option>
              <option value="Work Experience">Work Experience</option>
              <option value="Certifications">Certifications</option>
              <option value="Identity Verification">Identity Verification</option>
            </select>
          </div>

          <FileUploader label="Attach PDF or Certified Scan" accept=".pdf,.png,.jpg" maxSizeMB={5} />
        </div>
      </Modal>
    </div>
  )
}
