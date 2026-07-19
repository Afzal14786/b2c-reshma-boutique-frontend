import React from 'react';
import { Button } from '../Button';
import { cn } from '../../utils/cn';

export interface QuantitySelectorProps {
  /** Current quantity value */
  value: number;
  /** Callback when quantity changes */
  onChange: (value: number) => void;
  /** Minimum allowed value (default: 1) */
  min?: number;
  /** Maximum allowed value (default: 99) */
  max?: number;
  /** Disable the entire component (default: false) */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Size variant (default: md) */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant (default: glass) */
  variant?: 'glass' | 'solid' | 'outline';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  className = '',
  size = 'md',
  variant = 'glass',
}) => {
  const increment = () => {
    if (value < max) onChange(value + 1);
  };
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  // Size mapping
  const sizeClasses = {
    sm: {
      button: 'min-w-[32px] h-8 text-sm',
      display: 'min-w-[32px] px-1.5 py-1 text-sm',
      gap: 'gap-1.5',
    },
    md: {
      button: 'min-w-[36px] h-10 text-base',
      display: 'min-w-[40px] px-2 py-1.5 text-base',
      gap: 'gap-2',
    },
    lg: {
      button: 'min-w-[44px] h-12 text-lg',
      display: 'min-w-[48px] px-3 py-2 text-lg',
      gap: 'gap-2.5',
    },
  };

  const sizeConfig = sizeClasses[size] || sizeClasses.md;

  // Display variant
  const displayClasses = cn(
    'text-center font-medium text-text-primary dark:text-text-primary/90 transition-colors',
    variant === 'glass' && 'glass',
    variant === 'solid' && 'bg-surface border border-border shadow-soft',
    variant === 'outline' && 'bg-transparent border-2 border-border',
    sizeConfig.display,
  );

  return (
    <div className={cn('flex items-center', sizeConfig.gap, className)}>
      {/* Decrement button */}
      <Button
        variant="glass"
        size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={cn('justify-center font-mono', sizeConfig.button)}
      >
        −
      </Button>

      {/* Quantity display */}
      <div className={displayClasses}>
        {value}
      </div>

      {/* Increment button */}
      <Button
        variant="glass"
        size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
        onClick={increment}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={cn('justify-center font-mono', sizeConfig.button)}
      >
        +
      </Button>
    </div>
  );
};