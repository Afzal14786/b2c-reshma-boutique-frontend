import React from 'react';
import { cn } from '../../utils/cn';
import type { SpinnerProps, SpinnerSize } from './Spinner.types';

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  label = 'Loading…',
}) => {
  const baseClasses = cn(
    'inline-block animate-spin rounded-full border-solid',
    sizeMap[size],
    className,
  );

  const variantClasses = {
    default: cn(
      'border-secondary/20 dark:border-secondary/20',
      'border-t-secondary dark:border-t-secondary-light',
    ),
    glass: cn(
      'border-glass-border',
      'border-t-secondary dark:border-t-secondary-light',
      'shadow-glass',
    ),
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant])} role="status">
      <span className="sr-only">{label}</span>
    </div>
  );
};