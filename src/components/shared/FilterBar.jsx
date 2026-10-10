import React from 'react'
import { Filter, X } from 'lucide-react'

export function FilterBar({ filters = [], values = {}, onChange, onReset }) {
  const activeCount = Object.values(values).filter((v) => v !== '' && v !== undefined && v !== 'ALL').length

  const handleSelectChange = (key, val) => {
    onChange({
      ...values,
      [key]: val,
    })
  }

  return (
    <div className="bg-surface p-3 rounded-[8px] border border-line flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-fg-muted uppercase tracking-wider pr-2 border-r border-line">
        <Filter size={14} strokeWidth={1.75} className="text-accent" />
        <span>Filters</span>
        {activeCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-accent text-accent-fg text-[10px] flex items-center justify-center font-bold">
            {activeCount}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 flex-1">
        {filters.map((filter) => (
          <div key={filter.key} className="flex items-center gap-1.5">
            <label className="text-xs font-medium text-fg-muted shrink-0">{filter.label}:</label>
            <select
              value={values[filter.key] ?? 'ALL'}
              onChange={(e) => handleSelectChange(filter.key, e.target.value)}
              className="text-xs bg-surface-2 border border-line-strong rounded px-2.5 py-1 text-fg font-medium focus:border-accent hover:border-fg-subtle transition-colors cursor-pointer outline-none"
            >
              <option value="ALL">All {filter.label}s</option>
              {filter.options.map((opt) => {
                const isObj = typeof opt === 'object'
                const value = isObj ? opt.value : opt
                const label = isObj ? opt.label : opt
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              })}
            </select>
          </div>
        ))}
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-danger hover:opacity-80 font-medium flex items-center gap-1 px-2 py-1 rounded transition-colors"
        >
          <X size={14} strokeWidth={1.75} /> Clear All
        </button>
      )}
    </div>
  )
}
