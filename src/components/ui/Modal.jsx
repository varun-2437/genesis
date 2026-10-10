import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  subtitle, 
  children, 
  footer, 
  size = 'md',
  maxWidth
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-[420px]',
    md: 'max-w-[480px]',
    lg: 'max-w-[640px]',
    xl: 'max-w-[800px]',
  }

  const subText = description || subtitle
  const widthClass = maxWidth || sizeClasses[size] || sizeClasses.md

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div
        className={cn(
          'w-full bg-surface rounded-[10px] border border-line shadow-xl overflow-hidden flex flex-col relative',
          widthClass
        )}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="px-5 py-4 border-b border-line flex items-center justify-between bg-surface-2/40">
            <div>
              {title && <h3 className="text-[15px] font-semibold text-fg">{title}</h3>}
              {subText && <p className="text-xs text-fg-muted mt-0.5">{subText}</p>}
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1 rounded text-fg-muted hover:text-fg hover:bg-surface-2 transition-colors"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-5 overflow-y-auto max-h-[75vh] text-sm text-fg">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-5 py-3 bg-surface-2/40 border-t border-line flex items-center justify-end gap-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
