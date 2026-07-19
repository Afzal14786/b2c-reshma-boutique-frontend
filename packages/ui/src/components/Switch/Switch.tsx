'use client';
import React, { forwardRef, useId, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import type { SwitchProps, SwitchSize } from './Switch.types';

// ─── Size mapping ──────────────────────────────────────────────

const sizeMap: Record<SwitchSize, { track: string; thumb: string; translate: string }> = {
  sm: {
    track: 'w-9 h-5',
    thumb: 'w-4 h-4',
    translate: 'translate-x-4',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5',
    translate: 'translate-x-5',
  },
  lg: {
    track: 'w-14 h-7',
    thumb: 'w-6 h-6',
    translate: 'translate-x-7',
  },
};

// ─── Component ──────────────────────────────────────────────────

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      size = 'md',
      disabled = false,
      className = '',
      name,
      id,
      label,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = id || generatedId;
    const labelId = `${switchId}-label`;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const isChecked = isControlled ? controlledChecked : internalChecked;

    useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    const handleToggle = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle();
      }
    };

    const handleLabelClick = (e: React.MouseEvent) => {
      e.preventDefault();
      handleToggle();
    };

    const sizeClasses = sizeMap[size] || sizeMap.md;

    const trackClasses = cn(
      'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out',
      'glass',
      'border border-glass-border',
      sizeClasses.track,
      isChecked && 'bg-secondary border-secondary',
      disabled && 'opacity-50 cursor-not-allowed',
    );

    const thumbClasses = cn(
      'inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out',
      sizeClasses.thumb,
      isChecked ? sizeClasses.translate : 'translate-x-0.5',
    );

    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <button
          ref={buttonRef}
          role="switch"
          aria-checked={isChecked}
          aria-disabled={disabled}
          aria-labelledby={label ? labelId : undefined}
          id={switchId}
          name={name}
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2 rounded-full',
            disabled && 'cursor-not-allowed',
          )}
          {...props}
        >
          <span className={trackClasses}>
            <span className={thumbClasses} />
          </span>
        </button>
        {label && (
          <span
            id={labelId}
            onClick={handleLabelClick}
            className={cn(
              'text-sm font-medium text-text-secondary dark:text-text-secondary/80 cursor-pointer select-none',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            {label}
          </span>
        )}
      </div>
    );
  },
);

Switch.displayName = 'Switch';