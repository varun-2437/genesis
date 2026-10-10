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
    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider pr-2 border-r border-slate-200">
        <Filter className="w-3.5 h-3.5 text-indigo-600" />
        <span>Filters</span>
        {activeCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
            {activeCount}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 flex-1">
        {filters.map((filter) => (
          <div key={filter.key} className="flex items-center gap-1.5">
            <label className="text-xs font-medium text-slate-600 shrink-0">{filter.label}:</label>
            <select
              value={values[filter.key] ?? 'ALL'}
              onChange={(e) => handleSelectChange(filter.key, e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:bg-slate-100 transition-colors cursor-pointer"
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
          onClick={onReset}
          className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-rose-50 transition-colors"
        >
          <X className="w-3.5 h-3.5" /> Clear All
        </button>
      )}
    </div>
  )
}
