import React from 'react'
import { cn } from '@/lib/utils'

export function Tabs({ tabs, activeTab, onChange, className }) {
  return (
    <div className={cn('border-b border-line flex gap-2 overflow-x-auto', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap',
              isActive
                ? 'border-accent text-accent font-semibold'
                : 'border-transparent text-fg-muted hover:text-fg hover:border-line'
            )}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
            {tab.badge != null && (
              <span
                className={cn(
                  'px-2 py-0.5 rounded text-xs font-semibold tabular',
                  isActive ? 'bg-accent-soft text-accent' : 'bg-surface-2 text-fg-muted'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
