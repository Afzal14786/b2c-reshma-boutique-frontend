'use client'
import React, { useRef, useEffect, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Callback when search value changes */
  onSearch?: (value: string) => void;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Debounce delay in ms (default: 300) */
  debounce?: number;
  /** Size variant (default: md) */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Visual variant (default: glass) */
  variant?: 'glass' | 'solid' | 'outline';
  /** Label for accessibility (optional) */
  label?: string;
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      onSearch,
      onClear,
      className,
      value,
      debounce = 300,
      inputSize = 'md',
      variant = 'glass',
      label,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      (value as string) || '',
    );
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Sync internal value with external value prop
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value as string);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onSearch?.(newValue);
      }, debounce);
    };

    const handleClear = () => {
      setInternalValue('');
      onClear?.();
      onSearch?.('');
    };

    // ─── Size mapping ──────────────────────────────────────────────

    const sizeClasses = {
      sm: {
        wrapper: 'h-9',
        input: 'py-1.5 text-sm pl-8 pr-8',
        icon: 'w-7 pl-2.5',
        clear: 'pr-2.5',
      },
      md: {
        wrapper: 'h-11',
        input: 'py-2.5 text-base pl-10 pr-10',
        icon: 'w-10 pl-3.5',
        clear: 'pr-3.5',
      },
      lg: {
        wrapper: 'h-13',
        input: 'py-3 text-lg pl-12 pr-12',
        icon: 'w-12 pl-4.5',
        clear: 'pr-4.5',
      },
    };

    const s = sizeClasses[inputSize] || sizeClasses.md;

    // ─── Variant classes ──────────────────────────────────────────

    const variantClasses = {
      glass: `
        bg-glass backdrop-blur-glass
        border border-gray-400 dark:border-glass-border
        shadow-glass
        hover:border-gray-400 dark:hover:border-glass-border
        hover:shadow-glass-hover
        focus-within:border-secondary
        focus-within:shadow-glass-hover
        focus-within:ring-2 focus-within:ring-secondary/30
      `,
      solid: `
        bg-surface
        border border-border
        shadow-soft
        hover:shadow-md
        focus-within:shadow-md
        focus-within:border-secondary
        focus-within:ring-2 focus-within:ring-secondary/30
      `,
      outline: `
        bg-transparent
        border-2 border-border
        shadow-none
        hover:border-border/70
        focus-within:border-secondary
        focus-within:ring-2 focus-within:ring-secondary/30
      `,
    };

    const wrapperClasses = cn(
      'relative flex items-center w-full rounded-full transition-all duration-200',
      s.wrapper,
      variantClasses[variant],
      className,
    );

    const inputClasses = cn(
      'w-full bg-transparent text-text-primary placeholder:text-text-secondary/50 outline-none',
      s.input,
    );

    const iconClasses = cn(
      'absolute left-0 flex items-center justify-center text-text-secondary/50 pointer-events-none',
      s.icon,
    );

    const clearClasses = cn(
      'absolute right-0 flex items-center justify-center text-text-secondary/50 hover:text-text-primary transition-colors',
      s.clear,
    );

    // ─── Render ─────────────────────────────────────────────────────

    return (
      <div className="relative w-full max-w-md">
        {label && (
          <label htmlFor={props.id} className="sr-only">
            {label}
          </label>
        )}
        <div className={wrapperClasses}>
          {/* Search icon */}
          <div className={iconClasses}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Input */}
          <input
            ref={ref}
            type="text"
            className={inputClasses}
            value={internalValue}
            onChange={handleChange}
            {...props}
          />

          {/* Clear button */}
          {internalValue && (
            <button
              type="button"
              onClick={handleClear}
              className={clearClasses}
              aria-label="Clear search"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  },
);

Search.displayName = 'Search';