import type { ReactNode, ReactElement } from 'react';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  placement: PopoverPlacement;
}

export interface PopoverProps {
  children: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Placement of the content relative to trigger (default: bottom) */
  placement?: PopoverPlacement;
  /** Additional CSS classes for the wrapper */
  className?: string;
}

export interface PopoverTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export interface PopoverContentProps {
  children: ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}