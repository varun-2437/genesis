import React from 'react'
import { cn } from '@/lib/utils'

const STATUS_VARIANTS = {
  // Application & General
  APPLIED: 'bg-blue-50 text-blue-700 border-blue-200',
  SHORTLISTED: 'bg-purple-50 text-purple-700 border-purple-200',
  IN_REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
  SELECTED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
  WITHDRAWN: 'bg-slate-50 text-slate-600 border-slate-200',
  // Verification
  VERIFIED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  REQUIRES_UPDATE: 'bg-orange-50 text-orange-700 border-orange-200',
  // Active/Upcoming
  UPCOMING: 'bg-sky-50 text-sky-700 border-sky-200',
  ONGOING: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CANCELLED: 'bg-slate-100 text-slate-600 border-slate-300',
  // Company Status
  PROSPECT: 'bg-blue-50 text-blue-700 border-blue-200',
  ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  INACTIVE: 'bg-slate-100 text-slate-600 border-slate-200',
  RESTRICTED: 'bg-rose-50 text-rose-700 border-rose-200',
  // Job Status
  DRAFT: 'bg-slate-100 text-slate-700 border-slate-200',
  PENDING_APPROVAL: 'bg-amber-50 text-amber-700 border-amber-200',
  PUBLISHED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  PAUSED: 'bg-amber-50 text-amber-700 border-amber-200',
  CLOSED: 'bg-slate-100 text-slate-600 border-slate-300',
}

export function StatusBadge({ status, className }) {
  const normalizedStatus = String(status).toUpperCase()
  const variantClass = STATUS_VARIANTS[normalizedStatus] || 'bg-slate-100 text-slate-700 border-slate-200'

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variantClass,
        className
      )}
    >
      {status}
    </span>
  )
}
