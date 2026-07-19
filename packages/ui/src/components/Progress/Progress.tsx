'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import type { ProgressProps, ProgressSize } from './Progress.types';

const sizeMap: Record<ProgressSize, { height: string; text: string }> = {
  sm: { height: 'h-1.5', text: 'text-xs' },
  md: { height: 'h-2.5', text: 'text-sm' },
  lg: { height: 'h-4', text: 'text-base' },
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  animated = true,
  className = '',
  label,
  showPercentage = false,
}) => {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = (clampedValue / max) * 100;

  const sizeClasses = sizeMap[size] || sizeMap.md;

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className={cn('font-medium text-text-secondary', sizeClasses.text)}>{label}</span>}
          {showPercentage && <span className={cn('font-medium text-text-secondary/70', sizeClasses.text)}>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-full',
          'glass',
          sizeClasses.height,
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-in-out',
            'bg-secondary',
            animated && 'animate-shimmer',
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};