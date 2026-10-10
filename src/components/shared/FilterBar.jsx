import React from 'react'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { RotateCcw } from 'lucide-react'

export function FilterBar({
  filters = {},
  onFilterChange,
  onReset,
  departments = ['CSE', 'ECE', 'EEE', 'Mech', 'Civil', 'IT', 'AI & DS'],
  years = ['2024', '2025', '2026', '2027'],
  statuses = [],
  showDateRange = false,
  className,
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs ${className || ''}`}>
      {/* Department Filter */}
      <div className="w-36">
        <Select
          value={filters.department || ''}
          onChange={(e) => onFilterChange?.('department', e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
      </div>

      {/* Year / Batch */}
      <div className="w-32">
        <Select
          value={filters.year || ''}
          onChange={(e) => onFilterChange?.('year', e.target.value)}
        >
          <option value="">All Batches</option>
          {years.map((y) => (
            <option key={y} value={y}>
              Batch {y}
            </option>
          ))}
        </Select>
      </div>

      {/* Status Filter */}
      {statuses.length > 0 && (
        <div className="w-36">
          <Select
            value={filters.status || ''}
            onChange={(e) => onFilterChange?.('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      )}

      {/* Reset */}
      {onReset && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-slate-500 hover:text-slate-800 ml-auto flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
        </Button>
      )}
    </div>
  )
}
