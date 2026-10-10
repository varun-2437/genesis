import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export function ApprovalPanel({
  title = 'Application Review',
  onApprove,
  onReject,
  onRequestCorrection,
  loading = false,
  className,
}) {
  const [remarks, setRemarks] = useState('')

  return (
    <div className={`p-5 card bg-surface-2/40 space-y-4 ${className || ''}`}>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-fg-muted" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-fg">{title}</h4>
      </div>

      <div>
        <label className="block text-xs font-semibold text-fg-muted mb-1.5">
          Reviewer Remarks / Feedback (Optional)
        </label>
        <textarea
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Add reason for approval, rejection, or required corrections..."
          className="w-full text-xs p-3 bg-surface border border-line-strong rounded-[6px] outline-none focus:border-accent text-fg"
        />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
        {onRequestCorrection && (
          <Button
            size="sm"
            variant="secondary"
            disabled={loading}
            onClick={() => onRequestCorrection(remarks)}
          >
            Request Update
          </Button>
        )}
        <Button
          size="sm"
          variant="danger"
          disabled={loading}
          onClick={() => onReject(remarks)}
          className="flex items-center gap-1.5"
        >
          <XCircle className="w-4 h-4" /> Reject
        </Button>
        <Button
          size="sm"
          variant="primary"
          disabled={loading}
          onClick={() => onApprove(remarks)}
          className="flex items-center gap-1.5"
        >
          <CheckCircle className="w-4 h-4" /> Approve
        </Button>
      </div>
    </div>
  )
}
