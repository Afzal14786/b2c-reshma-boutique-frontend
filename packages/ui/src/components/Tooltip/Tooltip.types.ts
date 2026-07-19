import type { ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Trigger element (must accept ref, onMouseEnter, onMouseLeave, onFocus, onBlur) */
  children: ReactNode;
  /** Tooltip content */
  content: ReactNode;
  /** Placement relative to trigger (default: top) */
  placement?: TooltipPlacement;
  /** Open delay in ms (default: 200) */
  openDelay?: number;
  /** Close delay in ms (default: 0) */
  closeDelay?: number;
  /** Additional CSS classes for the trigger wrapper */
  className?: string;
  /** Additional CSS classes for the tooltip content */
  contentClassName?: string;
}