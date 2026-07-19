import type { HTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { cardVariants } from './Card.styles';

export type CardVariant = VariantProps<typeof cardVariants>['variant'];
export type CardPadding = VariantProps<typeof cardVariants>['padding'];

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
  /** Cover element (for `cover` variant) */
  cover?: ReactNode;
  /** Aspect ratio for cover (default: 4/3) */
  coverRatio?: number;
}