import React from 'react'
import { cn } from '@/lib/utils'

export function StatCard({ title, value, subtitle, icon: Icon, trend, className }) {
  return (
    <div className={cn('bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between', className)}>
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        {trend && (
          <p className={cn('text-xs font-medium flex items-center gap-1 mt-2', trend > 0 ? 'text-emerald-600' : 'text-rose-600')}>
            {trend > 0 ? `+${trend}%` : `${trend}%`} vs previous cycle
          </p>
        )}
      </div>
      {Icon && (
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  )
}
