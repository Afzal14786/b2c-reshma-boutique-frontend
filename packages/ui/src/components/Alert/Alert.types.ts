import type { ReactNode } from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  /** Visual variant (default: info) */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Alert description */
  description?: string;
  /** Optional icon (overrides default) */
  icon?: ReactNode;
  /** Dismissible (shows close button) */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Children (alternative to title/description) */
  children?: ReactNode;
}