import React from 'react'
import { cn } from '@/lib/utils'

const STATUS_CONFIG = {
  // Application & General
  APPLIED: { bg: 'bg-info/10 text-info border-info/20', dot: 'bg-info' },
  SHORTLISTED: { bg: 'bg-accent-soft text-accent border-accent/20', dot: 'bg-accent' },
  IN_REVIEW: { bg: 'bg-warning-soft text-warning border-warning/20', dot: 'bg-warning' },
  SELECTED: { bg: 'bg-success-soft text-success border-success/20', dot: 'bg-success' },
  REJECTED: { bg: 'bg-danger-soft text-danger border-danger/20', dot: 'bg-danger' },
  WITHDRAWN: { bg: 'bg-surface-2 text-fg-muted border-line', dot: 'bg-fg-subtle' },
  
  // Verification
  VERIFIED: { bg: 'bg-success-soft text-success border-success/20', dot: 'bg-success' },
  PENDING: { bg: 'bg-warning-soft text-warning border-warning/20', dot: 'bg-warning' },
  REQUIRES_UPDATE: { bg: 'bg-warning-soft text-warning border-warning/20', dot: 'bg-warning' },

  // Active/Upcoming
  UPCOMING: { bg: 'bg-info/10 text-info border-info/20', dot: 'bg-info' },
  ONGOING: { bg: 'bg-accent-soft text-accent border-accent/20', dot: 'bg-accent' },
  COMPLETED: { bg: 'bg-success-soft text-success border-success/20', dot: 'bg-success' },
  CANCELLED: { bg: 'bg-surface-2 text-fg-muted border-line', dot: 'bg-fg-subtle' },

  // Company Status
  PROSPECT: { bg: 'bg-info/10 text-info border-info/20', dot: 'bg-info' },
  ACTIVE: { bg: 'bg-success-soft text-success border-success/20', dot: 'bg-success' },
  INACTIVE: { bg: 'bg-surface-2 text-fg-muted border-line', dot: 'bg-fg-subtle' },
  RESTRICTED: { bg: 'bg-danger-soft text-danger border-danger/20', dot: 'bg-danger' },

  // Job Status
  DRAFT: { bg: 'bg-surface-2 text-fg-muted border-line', dot: 'bg-fg-subtle' },
  PENDING_APPROVAL: { bg: 'bg-warning-soft text-warning border-warning/20', dot: 'bg-warning' },
  PUBLISHED: { bg: 'bg-success-soft text-success border-success/20', dot: 'bg-success' },
  PAUSED: { bg: 'bg-warning-soft text-warning border-warning/20', dot: 'bg-warning' },
  CLOSED: { bg: 'bg-surface-2 text-fg-muted border-line', dot: 'bg-fg-subtle' },
}

export function StatusBadge({ status, className }) {
  const normalizedStatus = String(status || '').toUpperCase()
  const cfg = STATUS_CONFIG[normalizedStatus] || {
    bg: 'bg-surface-2 text-fg-muted border-line',
    dot: 'bg-fg-subtle',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[12px] font-medium border tabular',
        cfg.bg,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', cfg.dot)} />
      {status}
    </span>
  )
}
