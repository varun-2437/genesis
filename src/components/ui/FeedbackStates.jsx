import React from 'react'
import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-200/80', className)}
      {...props}
    />
  )
}

export function EmptyState({
  icon: Icon,
  title = 'No records found',
  description = 'There is no data to display right now.',
  action,
  className,
}) {
  return (
    <div className={cn('p-12 text-center flex flex-col items-center justify-center space-y-3', className)}>
      {Icon && (
        <div className="p-3 bg-slate-100 rounded-2xl text-slate-400">
          <Icon className="w-8 h-8 stroke-[1.5]" />
        </div>
      )}
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-400 max-w-sm">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
