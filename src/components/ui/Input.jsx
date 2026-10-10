import React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(2, 9)

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-[12.5px] font-medium text-fg">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full h-9 px-3 text-sm bg-surface border border-line-strong rounded-[6px] text-fg transition-colors outline-none',
            'placeholder:text-fg-subtle hover:border-fg-subtle focus:border-accent disabled:bg-surface-2 disabled:text-fg-subtle disabled:cursor-not-allowed',
            error && 'border-danger focus:border-danger',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger font-medium mt-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-fg-muted mt-1">{helperText}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
