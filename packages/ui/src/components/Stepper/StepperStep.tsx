'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import { useStepper } from './Stepper';
import type { StepStatus } from './Stepper.types';

// ─── Icons ──────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Step Indicator ────────────────────────────────────────────

const StepIndicator: React.FC<{
  index: number;
  status: StepStatus;
  icon?: React.ReactNode;
  size: 'sm' | 'md' | 'lg';
}> = ({ index, status, icon, size }) => {
  const sizeMap = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const baseClasses = cn(
    'flex items-center justify-center rounded-full border-2 transition-all duration-200',
    'flex-shrink-0',
    sizeMap[size],
  );

  if (status === 'completed') {
    return (
      <div className={cn(baseClasses, 'bg-secondary border-secondary text-text-inverse')}>
        {icon || <CheckIcon />}
      </div>
    );
  }

  if (status === 'active') {
    return (
      <div className={cn(baseClasses, 'border-secondary text-secondary bg-secondary/10')}>
        {icon || index + 1}
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, 'border-border text-text-secondary/60 bg-surface/30')}>
      {icon || index + 1}
    </div>
  );
};

// ─── Component ──────────────────────────────────────────────────

export const StepperStep: React.FC<{
  index: number;
  step: {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    status?: StepStatus;
    className?: string;
  };
  onClick: () => void;
}> = ({ index, step, onClick }) => {
  const { orientation, activeStep, steps, variant, size } = useStepper();
  const isLast = index === steps.length - 1;

  const getStatus = (): StepStatus => {
    if (step.status) return step.status;
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'active';
    return 'disabled';
  };

  const status = getStatus();
  const isClickable = status !== 'disabled';

  const sizeMap = {
    sm: { label: 'text-sm', desc: 'text-xs' },
    md: { label: 'text-base', desc: 'text-sm' },
    lg: { label: 'text-lg', desc: 'text-base' },
  };

  const sizeClasses = sizeMap[size] || sizeMap.md;

  // ─── Layout ────────────────────────────────────────────────────

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isHorizontal ? 'flex-1' : 'w-full',
        step.className,
      )}
      role="listitem"
    >
      {/* Left side: indicator + connector line */}
      <div className="flex flex-col items-center">
        <button
          onClick={onClick}
          disabled={!isClickable}
          className={cn(
            'focus:outline-none focus:ring-2 focus:ring-secondary/30 rounded-full',
            !isClickable && 'cursor-default',
          )}
        >
          <StepIndicator index={index} status={status} icon={step.icon} size={size} />
        </button>
        {!isLast && (
          <div
            className={cn(
              'w-0.5 bg-border/50 flex-1',
              isHorizontal ? 'h-0.5 w-full' : 'h-8 w-0.5',
              status === 'completed' && 'bg-secondary',
            )}
          />
        )}
      </div>

      {/* Right side: label + description */}
      <div className="flex-1 min-w-0 pb-4">
        <div
          className={cn(
            'font-medium transition-colors',
            sizeClasses.label,
            status === 'active'
              ? 'text-secondary'
              : status === 'completed'
              ? 'text-primary'
              : 'text-text-secondary/60',
          )}
        >
          {step.label}
        </div>
        {step.description && (
          <div
            className={cn(
              'text-text-secondary/70 mt-0.5',
              sizeClasses.desc,
              status === 'disabled' && 'opacity-50',
            )}
          >
            {step.description}
          </div>
        )}
      </div>
    </div>
  );
};