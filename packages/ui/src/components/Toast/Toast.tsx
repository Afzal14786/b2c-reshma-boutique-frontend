import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';
import type { ToastItemProps, ToastVariant } from './Toast.types';

// ─── Icons ──────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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

const iconMap: Record<ToastVariant, React.ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

const colorMap: Record<ToastVariant, string> = {
  success: 'border-success text-success',
  error: 'border-error text-error',
  warning: 'border-warning text-warning',
  info: 'border-secondary text-secondary',
};

const bgMap: Record<ToastVariant, string> = {
  success: 'bg-success/10 dark:bg-success/20',
  error: 'bg-error/10 dark:bg-error/20',
  warning: 'bg-warning/10 dark:bg-warning/20',
  info: 'bg-secondary/10 dark:bg-secondary/20',
};

// ─── Component ──────────────────────────────────────────────────

export const Toast: React.FC<ToastItemProps> = ({
  toast,
  onRemove,
  variant = 'info',
  duration = 3000,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onRemove, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onRemove]);

  const Icon = iconMap[variant] || iconMap.info;
  const color = colorMap[variant] || colorMap.info;
  const bg = bgMap[variant] || bgMap.info;

  return (
    <div
      className={cn(
        'relative glass rounded-card shadow-glass p-4 max-w-sm w-full',
        'border-l-4',
        color,
        'animate-slide-in-right',
        'flex items-start gap-3',
      )}
      role="alert"
    >
      <div className={cn('flex-shrink-0 mt-0.5', color)}>{Icon}</div>
      <div className="flex-1 min-w-0">
        {toast.title && <h4 className="text-sm font-semibold text-text-primary dark:text-text-primary/90">{toast.title}</h4>}
        <p className="text-sm text-text-secondary dark:text-text-secondary/80">{toast.message}</p>
      </div>
      <button
        onClick={onRemove}
        className="flex-shrink-0 p-1 -mt-1 -mr-1 rounded-full hover:bg-surface-tint/20 transition-colors"
        aria-label="Dismiss"
      >
        <CloseIcon />
      </button>
    </div>
  );
};