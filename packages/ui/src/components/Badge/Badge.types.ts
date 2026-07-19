import type { ReactNode } from 'react';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  /** Badge content */
  children: ReactNode;
  /** Visual variant (default: default) */
  variant?: BadgeVariant;
  /** Size variant (default: md) */
  size?: BadgeSize;
  /** Optional icon before label */
  icon?: ReactNode;
  /** Show a coloured dot before label (default: false) */
  dot?: boolean;
  /** Apply glassy styling (default: false) */
  glass?: boolean;
  /** Additional CSS classes */
  className?: string;
}