'use client';
import React, { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { cn } from '../../utils/cn';
import type { RadioProps, RadioSize } from './Radio.types';

// ─── Size mapping ──────────────────────────────────────────────

const sizeMap: Record<RadioSize, { outer: string; inner: string; label: string }> = {
  sm: {
    outer: 'w-4 h-4',
    inner: 'w-1.5 h-1.5',
    label: 'text-sm',
  },
  md: {
    outer: 'w-5 h-5',
    inner: 'w-2 h-2',
    label: 'text-base',
  },
  lg: {
    outer: 'w-6 h-6',
    inner: 'w-2.5 h-2.5',
    label: 'text-lg',
  },
};

// ─── Component ──────────────────────────────────────────────────

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      size = 'md',
      error = false,
      disabled = false,
      className = '',
      name,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const radioId = id || generatedId;
    const inputRef = useRef<HTMLInputElement>(null);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : defaultChecked;

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const newChecked = e.target.checked;
      if (!isControlled) {
        // Uncontrolled: let the native input manage state
      }
      onCheckedChange?.(newChecked);
    };

    const sizeClasses = sizeMap[size] || sizeMap.md;

    const outerClasses = cn(
      'relative flex items-center justify-center rounded-full transition-all duration-200',
      'border-2',
      'bg-surface/60 backdrop-blur-sm',
      'hover:bg-surface/80',
      'focus-within:ring-2 focus-within:ring-secondary/30 focus-within:ring-offset-2',
      sizeClasses.outer,
      isChecked
        ? 'border-secondary bg-secondary'
        : 'border-border',
      error && 'border-error',
      disabled && 'opacity-50 cursor-not-allowed',
    );

    const innerClasses = cn(
      'rounded-full bg-text-inverse transition-transform duration-200',
      sizeClasses.inner,
      isChecked ? 'scale-100' : 'scale-0',
    );

    const inputClasses = 'absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed';

    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className={outerClasses}>
          <input
            ref={inputRef}
            type="radio"
            id={radioId}
            name={name}
            value={value}
            checked={isControlled ? controlledChecked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            onChange={handleChange}
            disabled={disabled}
            className={inputClasses}
            aria-checked={isChecked}
            aria-disabled={disabled}
            {...props}
          />
          <div className={innerClasses} />
        </div>
        {label && (
          <label
            htmlFor={radioId}
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

Radio.displayName = 'Radio';