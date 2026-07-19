'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import { inputVariants } from './Input.styles';
import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      icon,
      iconRight,
      size = 'md',
      variant = 'default',
      className,
      id,
      as = 'input',
      ...props
    },
    ref,
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-') || 'input';
    const error = !!errorMessage;
    const baseClassName = inputVariants({ variant, size, error, className });

    // ─── Render helper ──────────────────────────────────────────

    const renderInput = () => {
      if (as === 'textarea') {
        const textareaProps = props as React.ComponentPropsWithoutRef<'textarea'>;
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            className={cn(baseClassName, 'rounded-xl')}
            rows={3}
            {...textareaProps}
          />
        );
      } else if (as === 'select') {
        const selectProps = props as React.ComponentPropsWithoutRef<'select'>;
        return (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={inputId}
            className={baseClassName}
            {...selectProps}
          />
        );
      } else {
        const inputProps = props as React.ComponentPropsWithoutRef<'input'>;
        return (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            className={baseClassName}
            {...inputProps}
          />
        );
      }
    };

    // ─── Render with optional icons ──────────────────────────

    const hasIcon = icon || iconRight;

    if (hasIcon && as !== 'textarea' && as !== 'select') {
      return (
        <div className="w-full space-y-1.5">
          {label && (
            <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary">
              {label}
            </label>
          )}
          <div className="relative">
            {icon && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary/50">
                {icon}
              </div>
            )}
            {renderInput()}
            {iconRight && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-secondary/50">
                {iconRight}
              </div>
            )}
          </div>
          {errorMessage && <p className="text-sm text-error">{errorMessage}</p>}
          {helperText && !errorMessage && <p className="text-sm text-text-secondary">{helperText}</p>}
        </div>
      );
    }

    // ─── Without icons ─────────────────────────────────────────

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        {renderInput()}
        {errorMessage && <p className="text-sm text-error">{errorMessage}</p>}
        {helperText && !errorMessage && <p className="text-sm text-text-secondary">{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';