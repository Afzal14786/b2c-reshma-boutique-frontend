import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Modal content */
  children: ReactNode;
  /** Title of the modal */
  title?: string;
  /** Description/subtitle */
  description?: string;
  /** Footer content (usually action buttons) */
  footer?: ReactNode;
  /** Size variant */
  size?: ModalSize;
  /** Apply glass styling (default: true) */
  glass?: boolean;
  /** Close modal when overlay is clicked (default: true) */
  closeOnOverlayClick?: boolean;
  /** Close modal when ESC key is pressed (default: true) */
  closeOnEsc?: boolean;
  /** Additional CSS classes for the modal container */
  className?: string;
  /** Show close button (default: true) */
  showCloseButton?: boolean;
}