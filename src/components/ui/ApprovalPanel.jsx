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
    <div className={`p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 ${className || ''}`}>
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-slate-500" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">{title}</h4>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
          Reviewer Remarks / Feedback (Optional)
        </label>
        <textarea
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Add reason for approval, rejection, or required corrections..."
          className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800"
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
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
        >
          <CheckCircle className="w-4 h-4" /> Approve
        </Button>
      </div>
    </div>
  )
}
