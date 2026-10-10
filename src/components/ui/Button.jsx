import React from 'react'
import { cn } from '@/lib/utils'

export const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
    
    const variants = {
      primary: 'bg-accent text-accent-fg hover:bg-accent-hover rounded-[6px]',
      secondary: 'bg-surface text-fg border border-line-strong hover:bg-surface-2 rounded-[6px]',
      danger: 'bg-danger text-white hover:opacity-90 rounded-[6px]',
      ghost: 'text-fg-muted hover:text-fg hover:bg-surface-2 rounded-[6px]',
      outline: 'bg-transparent text-fg-muted border border-line hover:text-fg hover:bg-surface-2 rounded-[6px]',
    }

    const sizes = {
      sm: 'h-8 px-2.5 text-xs gap-1.5',
      md: 'h-9 px-3.5 text-sm gap-2',
      lg: 'h-10 px-4 text-base gap-2',
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
