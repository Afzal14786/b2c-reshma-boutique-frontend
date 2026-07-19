'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import type { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types';

// ─── Variant colour mapping ────────────────────────────────────

const variantMap: Record<BadgeVariant, string> = {
  default: 'bg-surface-tint text-text-secondary border-border',
  primary: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border-primary/20',
  secondary: 'bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-light border-secondary/20',
  success: 'bg-success/10 text-success dark:bg-success/20 dark:text-success-light border-success/20',
  warning: 'bg-warning/10 text-warning dark:bg-warning/20 dark:text-warning-light border-warning/20',
  error: 'bg-error/10 text-error dark:bg-error/20 dark:text-error-light border-error/20',
  info: 'bg-info/10 text-info dark:bg-info/20 dark:text-info-light border-info/20',
  ghost: 'bg-transparent text-text-secondary dark:text-text-secondary/70 border-transparent',
};

// ─── Size mapping ──────────────────────────────────────────────

const sizeMap: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
};

// ─── Component ──────────────────────────────────────────────────

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  dot = false,
  glass = false,
  className = '',
}) => {
  const variantClasses = variantMap[variant] || variantMap.default;
  const sizeClasses = sizeMap[size] || sizeMap.md;

  const glassClasses = glass
    ? 'backdrop-blur-sm shadow-soft border border-glass-border'
    : 'border';

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-btn transition-colors duration-200',
        sizeClasses,
        variantClasses,
        glassClasses,
        className,
      )}
    >
      {/* Dot indicator */}
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            variant === 'default' ? 'bg-text-secondary/30' : `bg-${variant}`,
          )}
        />
      )}
      {/* Icon */}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {/* Label */}
      {children}
    </span>
  );
};