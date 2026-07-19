'use client'
import React, { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';
import type { TextareaProps } from './Textarea.types';

// ─── Size mapping ──────────────────────────────────────────────

const sizeMap = {
  sm: { textarea: 'px-3 py-1.5 text-sm', label: 'text-sm', helper: 'text-xs' },
  md: { textarea: 'px-4 py-2.5 text-base', label: 'text-sm', helper: 'text-xs' },
  lg: { textarea: 'px-5 py-3 text-lg', label: 'text-base', helper: 'text-sm' },
};

// ─── Variant classes ───────────────────────────────────────────

const variantClasses = {
  default: `
    bg-surface/60 backdrop-blur-sm
    border border-border
    text-text-primary placeholder:text-text-secondary/50
    hover:border-border/70
    focus:border-secondary focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]
  `,
  glass: `
    glass
    text-text-primary placeholder:text-text-secondary/50
    focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]
  `,
};

// ─── Component ──────────────────────────────────────────────────

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'md',
  autoResize = false,
  showCharCount = true,
  className,
  id,
  maxLength,
  value = '',
  onChange,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasError = !!error;
  const sizeClasses = sizeMap[size] || sizeMap.md;
  const variantClass = variantClasses[variant] || variantClasses.default;

  // ─── Auto-resize ──────────────────────────────────────────────

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoResize]);

  // ─── Handle change with auto-resize ──────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    if (autoResize) {
      e.currentTarget.style.height = 'auto';
      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    }
  };

  // ─── IDs ──────────────────────────────────────────────────────

  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s/g, '-') || 'field'}`;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={textareaId}
          className={cn(
            'block font-medium text-text-secondary mb-1.5',
            sizeClasses.label,
            hasError && 'text-error',
          )}
        >
          {label}
        </label>
      )}

      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          id={textareaId}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            'w-full rounded-input transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-y',
            sizeClasses.textarea,
            variantClass,
            hasError && 'border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]',
            className,
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          {...props}
        />
      </div>

      {/* Character count & error/helper text */}
      <div className="flex items-center justify-between mt-1.5">
        <div>
          {hasError ? (
            <p id={errorId} className="text-sm text-error">
              {error}
            </p>
          ) : (
            helperText && (
              <p id={helperId} className="text-sm text-text-secondary/70">
                {helperText}
              </p>
            )
          )}
        </div>
        {maxLength && showCharCount && (
          <span
            className={cn(
              'text-xs text-text-secondary/50',
              hasError && 'text-error',
            )}
          >
            {String(value).length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};