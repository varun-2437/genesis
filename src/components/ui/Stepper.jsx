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
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm',
                  isCompleted && 'bg-indigo-600 text-white',
                  isCurrent && 'bg-white border-2 border-indigo-600 text-indigo-600 ring-4 ring-indigo-50',
                  !isCompleted && !isCurrent && 'bg-slate-100 border border-slate-300 text-slate-500'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>
              <div className="hidden sm:block">
                <p
                  className={cn(
                    'text-xs font-semibold',
                    isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-900' : 'text-slate-500'
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-[11px] text-slate-400">{step.description}</p>
                )}
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-4 transition-colors',
                  idx < currentStep ? 'bg-indigo-600' : 'bg-slate-200'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
