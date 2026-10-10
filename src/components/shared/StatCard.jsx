import React from 'react'
import { cn } from '@/lib/utils'

export function StatCard({ title, label, value, subtitle, icon: Icon, delta, trend, className }) {
  const displayLabel = label || title
  const displayTrend = delta !== undefined ? delta : trend

  return (
    <div className={cn('bg-surface p-5 rounded-[8px] border border-line flex items-start justify-between transition-colors', className)}>
      <div className="space-y-1">
        <p className="text-[12.5px] font-medium text-fg-muted">{displayLabel}</p>
        <p className="text-2xl font-semibold text-fg tracking-tight tabular-nums">{value}</p>
        {subtitle && <p className="text-xs text-fg-muted mt-0.5">{subtitle}</p>}
        {displayTrend !== undefined && (
          <p className={cn('text-xs font-medium flex items-center gap-1 mt-1.5', displayTrend > 0 ? 'text-success' : 'text-danger')}>
            {displayTrend > 0 ? `+${displayTrend}%` : `${displayTrend}%`} vs cycle
          </p>
        )}
      </div>
      {Icon && (
        <div className="p-2.5 bg-surface-2 text-fg-muted rounded-[6px] shrink-0 border border-line">
          <Icon size={18} strokeWidth={1.75} />
        </div>
      )}
    </div>
  )
}
