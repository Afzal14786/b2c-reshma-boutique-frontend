import React from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner';
import { buttonVariants } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      fullWidth,
      className,
      loading = false,
      disabled,
      icon,
      iconRight,
      asChild,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? 'span' : 'button';

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Spinner size="sm" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {icon && <span className="inline-flex shrink-0 leading-none">{icon}</span>}
            <span className="inline-flex leading-none">{children}</span>
            {iconRight && <span className="inline-flex shrink-0 leading-none">{iconRight}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';