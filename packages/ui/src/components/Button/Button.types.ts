import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from './Button.styles';

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** The button content */
  children: ReactNode;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Optional icon on the left */
  icon?: ReactNode;
  /** Optional icon on the right */
  iconRight?: ReactNode;
  /** If true, the button will be rendered as a child element (for polymorphic usage) */
  asChild?: boolean;
}