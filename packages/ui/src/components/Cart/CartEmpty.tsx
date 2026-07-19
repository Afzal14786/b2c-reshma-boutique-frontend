import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';

export interface CartEmptyProps {
  message?: string;
  onContinueShopping?: () => void;
  className?: string;
}

export const CartEmpty: React.FC<CartEmptyProps> = ({
  message = 'Your cart is empty',
  onContinueShopping,
  className = '',
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <svg
        className="w-16 h-16 text-text-secondary/30 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
      <p className="text-text-secondary/70 text-sm">{message}</p>
      {onContinueShopping && (
        <Button variant="glass" size="md" onClick={onContinueShopping} className="mt-4">
          Continue Shopping
        </Button>
      )}
    </div>
  );
};