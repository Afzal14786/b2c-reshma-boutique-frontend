'use client'
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import type { AlertProps, AlertVariant } from './Alert.types';

// ─── Icons ──────────────────────────────────────────────────────

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Mapping ────────────────────────────────────────────────────

const iconMap: Record<AlertVariant, React.ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

const colorMap: Record<AlertVariant, string> = {
  success: 'border-success text-success',
  error: 'border-error text-error',
  warning: 'border-warning text-warning',
  info: 'border-secondary text-secondary',
};

const bgMap: Record<AlertVariant, string> = {
  success: 'bg-success/10 dark:bg-success/20',
  error: 'bg-error/10 dark:bg-error/20',
  warning: 'bg-warning/10 dark:bg-warning/20',
  info: 'bg-secondary/10 dark:bg-secondary/20',
};

// ─── Component ──────────────────────────────────────────────────

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  dismissible = false,
  onDismiss,
  className = '',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const defaultIcon = iconMap[variant] || iconMap.info;
  const color = colorMap[variant] || colorMap.info;
  const bg = bgMap[variant] || bgMap.info;

  return (
    <div
      className={cn(
        'relative glass rounded-card shadow-glass p-4',
        'border-l-4',
        color,
        bg,
        className,
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn('flex-shrink-0 mt-0.5', color)}>
          {icon || defaultIcon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold text-text-primary dark:text-text-primary/90">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-sm text-text-secondary dark:text-text-secondary/80">
              {description}
            </p>
          )}
          {children && (
            <div className="text-sm text-text-secondary dark:text-text-secondary/80">
              {children}
            </div>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 -mt-1 -mr-1 rounded-full hover:bg-surface-tint/20 transition-colors"
            aria-label="Dismiss"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};