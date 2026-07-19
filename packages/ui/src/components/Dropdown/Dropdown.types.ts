import type { ReactNode } from 'react';

export type DropdownPlacement = 'bottom' | 'top' | 'left' | 'right';

export interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  placement: DropdownPlacement;
}

export interface DropdownProps {
  children: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Placement of the content relative to trigger (default: bottom) */
  placement?: DropdownPlacement;
  /** Additional CSS classes */
  className?: string;
}

export interface DropdownTriggerProps {
  children: ReactNode;
  asChild?: boolean; // if true, render as the child element (like Radix)
  className?: string;
}

export interface DropdownContentProps {
  children: ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export interface DropdownItemProps {
  children: ReactNode;
  /** Optional icon */
  icon?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Danger variant (red text) */
  danger?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  asChild?: boolean;
}

export interface DropdownSeparatorProps {
  className?: string;
}