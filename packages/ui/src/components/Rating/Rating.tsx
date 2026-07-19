import React, { useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { RatingProps, RatingSize, RatingColor } from './Rating.types';

// ─── Star Icon ──────────────────────────────────────────────────

const StarIcon: React.FC<{ filled: boolean; half: boolean; size: RatingSize; color: string }> = ({
  filled,
  half,
  size,
  color,
}) => {
  const sizeMap: Record<RatingSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <svg
      className={cn(
        'transition-colors duration-150 flex-shrink-0',
        sizeMap[size],
        filled ? color : 'text-border/50 dark:text-border/30',
      )}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {half ? (
        <defs>
          <linearGradient id={`halfGrad-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
      ) : null}
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill={filled ? 'currentColor' : half ? `url(#halfGrad)` : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ─── Component ──────────────────────────────────────────────────

export const Rating: React.FC<RatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  max = 5,
  size = 'md',
  color = 'warning',
  readOnly = false,
  showValue = false,
  className = '',
  label = 'Rating',
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const currentValue = isControlled ? controlledValue : internalValue;

  // ─── Color mapping ──────────────────────────────────────────────

  const colorMap: Record<RatingColor, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    warning: 'text-warning',
    default: 'text-text-primary',
  };
  const starColor = colorMap[color] || colorMap.warning;

  // ─── Handlers ──────────────────────────────────────────────────

  const handleStarClick = useCallback(
    (starIndex: number) => {
      if (readOnly) return;
      const newValue = starIndex + 1;
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    },
    [readOnly, isControlled, onChange],
  );

  const handleStarHover = useCallback(
    (starIndex: number) => {
      if (readOnly) return;
      setHoverValue(starIndex + 1);
    },
    [readOnly],
  );

  const handleMouseLeave = useCallback(() => {
    if (readOnly) return;
    setHoverValue(null);
  }, [readOnly]);

  // ─── Compute display value ─────────────────────────────────────

  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  // ─── Render ─────────────────────────────────────────────────────

  return (
    <div
      className={cn('flex items-center gap-2', className)}
      role="group"
      aria-label={label}
    >
      <div
        className="flex items-center gap-0.5"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: max }, (_, i) => {
          const starNumber = i + 1;
          const isFull = displayValue >= starNumber;
          const isHalf = displayValue >= starNumber - 0.5 && displayValue < starNumber;

          return (
            <button
              key={i}
              type="button"
              className={cn(
                'p-0.5 focus:outline-none focus:ring-2 focus:ring-secondary/30 rounded',
                readOnly ? 'cursor-default' : 'cursor-pointer',
              )}
              onClick={() => handleStarClick(i)}
              onMouseEnter={() => handleStarHover(i)}
              disabled={readOnly}
              aria-label={`Rate ${starNumber} stars`}
            >
              <StarIcon
                filled={isFull}
                half={isHalf}
                size={size}
                color={starColor}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-text-secondary dark:text-text-secondary/70 min-w-[2.5rem]">
          {currentValue.toFixed(1)}
        </span>
      )}
    </div>
  );
};