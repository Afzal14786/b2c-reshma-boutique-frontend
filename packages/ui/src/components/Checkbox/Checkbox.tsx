'use client';
import React, { useRef, useEffect, forwardRef, useImperativeHandle, useId } from 'react';
import { cn } from '../../utils/cn';
import type { CheckboxProps, CheckboxSize } from './Checkbox.types';

// ─── Size mapping ──────────────────────────────────────────────

const sizeMap: Record<CheckboxSize, { box: string; label: string; icon: string }> = {
  sm: {
    box: 'w-4 h-4 rounded-sm',
    label: 'text-sm',
    icon: 'w-3 h-3',
  },
  md: {
    box: 'w-5 h-5 rounded',
    label: 'text-base',
    icon: 'w-3.5 h-3.5',
  },
  lg: {
    box: 'w-6 h-6 rounded-md',
    label: 'text-lg',
    icon: 'w-4 h-4',
  },
};

// ─── Check Icon ─────────────────────────────────────────────────

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Indeterminate Icon ────────────────────────────────────────

const IndeterminateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      indeterminate = false,
      label,
      size = 'md',
      error = false,
      disabled = false,
      className = '',
      name,
      value,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const inputRef = useRef<HTMLInputElement>(null);
    const isControlled = controlledChecked !== undefined;

    // ─── Forward ref ──────────────────────────────────────────────

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // ─── Handle indeterminate state ──────────────────────────────

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // ─── Handle change ────────────────────────────────────────────

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const newChecked = e.target.checked;
      if (!isControlled) {
        // Uncontrolled: state is managed by the native input
      }
      onCheckedChange?.(newChecked);
    };

    // ─── Compute classes ──────────────────────────────────────────

    const sizeClasses = sizeMap[size] || sizeMap.md;

    const isChecked = isControlled ? controlledChecked : defaultChecked;

    const boxClasses = cn(
      'relative flex items-center justify-center transition-all duration-200',
      'border-2 border-border',
      'bg-surface/60 backdrop-blur-sm',
      'hover:bg-surface/80',
      'focus-within:ring-2 focus-within:ring-secondary/30 focus-within:ring-offset-2',
      sizeClasses.box,
      (isChecked || indeterminate) && 'bg-secondary border-secondary text-text-inverse',
      error && 'border-error',
      disabled && 'opacity-50 cursor-not-allowed',
    );

    const inputClasses = 'absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed';

    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className={boxClasses}>
          <input
            ref={inputRef}
            type="checkbox"
            id={checkboxId}
            name={name}
            value={value}
            checked={isControlled ? controlledChecked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            onChange={handleChange}
            disabled={disabled}
            className={inputClasses}
            aria-checked={indeterminate ? 'mixed' : isChecked}
            aria-disabled={disabled}
            {...props}
          />
          {indeterminate ? (
            <IndeterminateIcon className={sizeClasses.icon} />
          ) : (
            isChecked && <CheckIcon className={sizeClasses.icon} />
          )}
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              'font-medium text-text-secondary dark:text-text-secondary/80 cursor-pointer select-none',
              sizeClasses.label,
              disabled && 'opacity-50 cursor-not-allowed',
              error && 'text-error',
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';