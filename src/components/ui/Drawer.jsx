import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export function Drawer({ isOpen, onClose, title, description, children, footer, size = 'md' }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div
        className={cn(
          'w-full bg-surface h-full shadow-2xl flex flex-col transform transition-transform border-l border-line text-fg',
          sizeClasses[size] || sizeClasses.md
        )}
      >
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <div>
            {title && <h3 className="text-base font-semibold text-fg">{title}</h3>}
            {description && <p className="text-xs text-fg-muted mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-fg-muted hover:text-fg hover:bg-surface-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">{children}</div>

        {footer && (
          <div className="px-6 py-4 bg-surface-2 border-t border-line flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
