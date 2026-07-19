import type { ReactNode } from 'react';

export interface BreadcrumbContextValue {
  separator: ReactNode;
  glass: boolean;
}

export interface BreadcrumbProps {
  children: ReactNode;
  /** Custom separator (default: '/') */
  separator?: ReactNode;
  /** Apply glass styling (default: false) */
  glass?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export interface BreadcrumbItemProps {
  children: ReactNode;
  /** Link URL (if not provided, renders as text) */
  href?: string;
  /** Mark as active/current page (default: false) */
  isActive?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export interface BreadcrumbSeparatorProps {
  /** Override the default separator */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}