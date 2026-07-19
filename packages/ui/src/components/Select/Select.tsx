'use client'
import React, { useId } from 'react';
import { cn } from '../../utils/cn';
import type { SelectProps, SelectOption, SelectSize } from './Select.types';

// ─── Size mapping ──────────────────────────────────────────────

const sizeMap: Record<SelectSize, { select: string; label: string; helper: string }> = {
  sm: { select: 'px-3 py-1.5 text-sm', label: 'text-sm', helper: 'text-xs' },
  md: { select: 'px-4 py-2.5 text-base', label: 'text-sm', helper: 'text-xs' },
  lg: { select: 'px-5 py-3 text-lg', label: 'text-base', helper: 'text-sm' },
};

// ─── Variant classes ───────────────────────────────────────────

const variantClasses = {
  default: `
    bg-surface/60 backdrop-blur-sm
    border border-border
    text-text-primary
    hover:border-border/70
    focus:border-secondary focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]
  `,
  glass: `
    glass
    text-text-primary
    focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]
  `,
};

// ─── Component ──────────────────────────────────────────────────

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  placeholder,
  size = 'md',
  variant = 'default',
  className,
  name,
  id,
  value,
  onChange,
  onBlur,
  disabled = false,
  ...props
}) => {
  const generatedId = useId();
  const selectId = id || `select-${label?.toLowerCase().replace(/\s/g, '-') || generatedId}`;
  const hasError = !!error;
  const sizeClasses = sizeMap[size] || sizeMap.md;
  const variantClass = variantClasses[variant] || variantClasses.default;

  // ─── Normalise options ────────────────────────────────────────

  const normalisedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt,
  );

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            'block font-medium text-text-secondary mb-1.5',
            sizeClasses.label,
            hasError && 'text-error',
          )}
        >
          {label}
        </label>
      )}

      {/* Select wrapper */}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            'w-full rounded-input transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
            'appearance-none pr-10',
            sizeClasses.select,
            variantClass,
            hasError && 'border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]',
            className,
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          {/* Placeholder */}
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {/* Options */}
          {normalisedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary/50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Error / Helper text */}
      <div className="mt-1.5">
        {hasError ? (
          <p id={`${selectId}-error`} className={cn('text-error', sizeClasses.helper)}>
            {error}
          </p>
        ) : (
          helperText && (
            <p id={`${selectId}-helper`} className={cn('text-text-secondary/70', sizeClasses.helper)}>
              {helperText}
            </p>
          )
        )}
      </div>
    </div>
  );
};