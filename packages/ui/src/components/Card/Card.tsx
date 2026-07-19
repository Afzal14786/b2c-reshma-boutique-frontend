import React from 'react';
import { cn } from '../../utils/cn';
import { cardVariants } from './Card.styles';
import type { CardProps } from './Card.types';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant,
      padding,
      hoverable,
      className,
      cover,
      coverRatio = 4 / 3,
      ...props
    },
    ref,
  ) => {
    // If cover variant, render cover + content
    if (variant === 'cover' && cover) {
      return (
        <div
          ref={ref}
          className={cn(cardVariants({ variant, padding, hoverable, className }))}
          {...props}
        >
          <div
            className="relative w-full bg-surface-tint/20 overflow-hidden"
            style={{ aspectRatio: coverRatio }}
          >
            {cover}
          </div>
          <div className={cn(cardVariants({ padding }))}>{children}</div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverable, className }))}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';