'use client'
import React from 'react';
import { cn } from '../../utils/cn';

export interface StatusBadgeProps {
  /** Status text (e.g., "PENDING", "APPROVED") */
  status: string;
  /** Variant category (order, payment, return, ticket, default) */
  variant?: 'order' | 'payment' | 'return' | 'ticket' | 'default';
  /** Additional CSS classes */
  className?: string;
  /** Size variant – sm or md (default: md) */
  size?: 'sm' | 'md';
  /** Use glass effect (default: true) */
  glass?: boolean;
  /** Show a coloured dot indicator (default: true) */
  showDot?: boolean;
  /** Icon to display (optional) */
  icon?: React.ReactNode;
}

/**
 * Status badge – glassy, modern, with MacOS aesthetic.
 * Maps statuses to the platform's color palette.
 */
const statusColorMap: Record<
  string,
  Record<string, { bg: string; text: string; border: string; dot: string }>
> = {
  order: {
    PENDING: {
      bg: 'bg-warning/10 dark:bg-warning/20',
      text: 'text-warning',
      border: 'border-warning/20',
      dot: 'bg-warning',
    },
    PROCESSING: {
      bg: 'bg-secondary/10 dark:bg-secondary/20',
      text: 'text-secondary',
      border: 'border-secondary/20',
      dot: 'bg-secondary',
    },
    SHIPPED: {
      bg: 'bg-accent/10 dark:bg-accent/20',
      text: 'text-accent',
      border: 'border-accent/20',
      dot: 'bg-accent',
    },
    DELIVERED: {
      bg: 'bg-success/10 dark:bg-success/20',
      text: 'text-success',
      border: 'border-success/20',
      dot: 'bg-success',
    },
    CANCELLED: {
      bg: 'bg-error/10 dark:bg-error/20',
      text: 'text-error',
      border: 'border-error/20',
      dot: 'bg-error',
    },
    RETURN_REQUESTED: {
      bg: 'bg-soft-feminine/10 dark:bg-soft-feminine/20',
      text: 'text-soft-feminine',
      border: 'border-soft-feminine/20',
      dot: 'bg-soft-feminine',
    },
    RETURNED: {
      bg: 'bg-error/10 dark:bg-error/20',
      text: 'text-error',
      border: 'border-error/20',
      dot: 'bg-error',
    },
  },
  payment: {
    PENDING: {
      bg: 'bg-warning/10 dark:bg-warning/20',
      text: 'text-warning',
      border: 'border-warning/20',
      dot: 'bg-warning',
    },
    PAID: {
      bg: 'bg-success/10 dark:bg-success/20',
      text: 'text-success',
      border: 'border-success/20',
      dot: 'bg-success',
    },
    FAILED: {
      bg: 'bg-error/10 dark:bg-error/20',
      text: 'text-error',
      border: 'border-error/20',
      dot: 'bg-error',
    },
    REFUNDED: {
      bg: 'bg-secondary/10 dark:bg-secondary/20',
      text: 'text-secondary',
      border: 'border-secondary/20',
      dot: 'bg-secondary',
    },
  },
  return: {
    PENDING_APPROVAL: {
      bg: 'bg-warning/10 dark:bg-warning/20',
      text: 'text-warning',
      border: 'border-warning/20',
      dot: 'bg-warning',
    },
    APPROVED: {
      bg: 'bg-success/10 dark:bg-success/20',
      text: 'text-success',
      border: 'border-success/20',
      dot: 'bg-success',
    },
    REJECTED: {
      bg: 'bg-error/10 dark:bg-error/20',
      text: 'text-error',
      border: 'border-error/20',
      dot: 'bg-error',
    },
    REFUNDED: {
      bg: 'bg-secondary/10 dark:bg-secondary/20',
      text: 'text-secondary',
      border: 'border-secondary/20',
      dot: 'bg-secondary',
    },
  },
  ticket: {
    OPEN: {
      bg: 'bg-secondary/10 dark:bg-secondary/20',
      text: 'text-secondary',
      border: 'border-secondary/20',
      dot: 'bg-secondary',
    },
    IN_PROGRESS: {
      bg: 'bg-accent/10 dark:bg-accent/20',
      text: 'text-accent',
      border: 'border-accent/20',
      dot: 'bg-accent',
    },
    WAITING_ON_CUSTOMER: {
      bg: 'bg-warning/10 dark:bg-warning/20',
      text: 'text-warning',
      border: 'border-warning/20',
      dot: 'bg-warning',
    },
    RESOLVED: {
      bg: 'bg-success/10 dark:bg-success/20',
      text: 'text-success',
      border: 'border-success/20',
      dot: 'bg-success',
    },
    CLOSED: {
      bg: 'bg-text-secondary/10 dark:bg-text-secondary/20',
      text: 'text-text-secondary',
      border: 'border-text-secondary/20',
      dot: 'bg-text-secondary',
    },
  },
};

const fallbackColor = {
  bg: 'bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)]',
  text: 'text-text-secondary dark:text-text-secondary/80',
  border: 'border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]',
  dot: 'bg-text-secondary/50',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = 'default',
  className = '',
  size = 'md',
  glass = true,
  showDot = true,
  icon,
}) => {
  const colors = variant === 'default' ? {} : statusColorMap[variant] || {};
  const color = colors[status] || fallbackColor;

  // ─── Size classes ──────────────────────────────────────────────

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  };

  // ─── Glass styling ─────────────────────────────────────────────

  const glassClasses = glass
    ? cn(
        'backdrop-blur-sm shadow-soft',
        color.bg || 'bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)]',
        'border',
        color.border || 'border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]',
      )
    : cn(color.bg || 'bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)]');

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-btn transition-all duration-200',
        sizeClasses[size],
        color.text || 'text-text-secondary dark:text-text-secondary/80',
        glassClasses,
        className,
      )}
    >
      {/* Icon */}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}

      {/* Dot indicator */}
      {showDot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            color.dot || 'bg-text-secondary/50',
          )}
        />
      )}

      {/* Status text */}
      {status.replace(/_/g, ' ')}
    </span>
  );
};