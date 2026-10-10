import React from 'react'
import { cn } from '@/lib/utils'

export const Select = React.forwardRef(
  ({ label, error, helperText, options = [], className, id, children, ...props }, ref) => {
    const selectId = id || props.name || Math.random().toString(36).substring(2, 9)

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-fg">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full px-3 py-2 text-sm bg-surface border rounded-[6px] transition-colors outline-none',
            'text-fg border-line-strong focus:border-accent',
            error
              ? 'border-danger focus:border-danger'
              : 'border-line-strong hover:border-fg-subtle',
            className
          )}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-surface text-fg">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <p className="text-xs text-danger font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-fg-muted">{helperText}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
