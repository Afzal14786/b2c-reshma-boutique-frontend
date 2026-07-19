import type { ReactNode } from 'react';

export type DrawerPosition = 'left' | 'right' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg';

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when the drawer should close */
  onClose: () => void;
  /** Content to render inside the drawer */
  children: ReactNode;
  /** Position of the drawer (default: 'right') */
  position?: DrawerPosition;
  /** Size variant (default: 'md') */
  size?: DrawerSize;
  /** Apply glass styling (default: true) */
  glass?: boolean;
  /** Show close button (default: true) */
  showCloseButton?: boolean;
  /** Additional CSS classes for the drawer panel */
  className?: string;
  /** Close on overlay click (default: true) */
  closeOnOverlayClick?: boolean;
  /** Close on ESC key (default: true) */
  closeOnEsc?: boolean;
  /** Accessible label (default: 'Drawer') */
  ariaLabel?: string;
}