import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Error message (applies error styling) */
  error?: string;
  /** Helper text shown below the textarea (hidden if error is present) */
  helperText?: string;
  /** Visual variant (default: default) */
  variant?: 'default' | 'glass';
  /** Size variant (default: md) */
  size?: 'sm' | 'md' | 'lg';
  /** Auto-resize height based on content (default: false) */
  autoResize?: boolean;
  /** Show character count when maxLength is provided (default: true) */
  showCharCount?: boolean;
  /** Additional CSS classes */
  className?: string;
}