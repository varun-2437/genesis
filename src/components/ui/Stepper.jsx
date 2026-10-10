import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export function Stepper({ steps, currentStep, onStepClick, className }) {
  return (
    <div className={cn('flex items-center justify-between w-full', className)}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep
        const isCurrent = idx === currentStep
        const isClickable = Boolean(onStepClick && (isCompleted || isCurrent))

        return (
          <React.Fragment key={step.id || idx}>
            <div
              className={cn(
                'flex items-center gap-3',
                isClickable && 'cursor-pointer group'
              )}
              onClick={() => isClickable && onStepClick?.(idx)}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs',
                  isCompleted && 'bg-accent text-accent-fg',
                  isCurrent && 'bg-surface border-2 border-accent text-accent ring-4 ring-accent-soft',
                  !isCompleted && !isCurrent && 'bg-surface-2 border border-line text-fg-muted'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>
              <div className="hidden sm:block">
                <p
                  className={cn(
                    'text-xs font-semibold',
                    isCurrent ? 'text-accent' : isCompleted ? 'text-fg' : 'text-fg-muted'
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-[11px] text-fg-muted">{step.description}</p>
                )}
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-4 transition-colors',
                  idx < currentStep ? 'bg-accent' : 'bg-line'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
