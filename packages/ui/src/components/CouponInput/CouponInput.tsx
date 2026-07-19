'use client';
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Input } from '../Input';
import { Button } from '../Button';
import type { CouponInputProps } from './CouponInput.types';

// ─── Icons ──────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export const CouponInput: React.FC<CouponInputProps> = ({
  value = '',
  onChange,
  onApply,
  loading = false,
  validation = 'idle',
  errorMessage = 'Invalid coupon code',
  successMessage = 'Coupon applied successfully!',
  placeholder = 'Enter coupon code',
  disabled = false,
  className = '',
  glass = true,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleApply = () => {
    if (onApply && internalValue.trim()) {
      onApply(internalValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApply();
    }
  };

  const showSuccess = validation === 'valid';
  const showError = validation === 'invalid';

  const containerClasses = cn(
    'flex items-center gap-2 p-1 rounded-full',
    glass && 'glass',
    className,
  );

  return (
    <div className={containerClasses}>
      <div className="flex-1 min-w-0">
        <Input
          value={internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          variant={glass ? 'glass' : 'default'}
          error={showError}
          className="border-0 bg-transparent shadow-none focus:ring-0 rounded-full px-4"
          helperText={showError ? errorMessage : showSuccess ? successMessage : undefined}
        />
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {showSuccess && (
          <span className="text-success p-1">
            <CheckIcon />
          </span>
        )}
        {showError && (
          <span className="text-error p-1">
            <XIcon />
          </span>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={handleApply}
          disabled={disabled || loading || !internalValue.trim()}
          loading={loading}
          className="rounded-full px-5"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};