import type { ReactNode } from 'react';

export interface SidebarItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** URL path (for Next.js Link) or onClick handler */
  href?: string;
  /** Icon element (ReactNode) */
  icon?: ReactNode;
  /** Whether the item is active */
  isActive?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export interface SidebarProps {
  /** Navigation items */
  items: SidebarItem[];
  /** Brand/logo content */
  brand: ReactNode;
  /** Footer content (e.g., user info + logout) */
  footer?: ReactNode;
  /** Whether sidebar is open on mobile (controlled) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Apply glass styling (default: true) */
  glass?: boolean;
}

export interface SidebarItemProps {
  item: SidebarItem;
  onClick?: (item: SidebarItem) => void;
  className?: string;
}