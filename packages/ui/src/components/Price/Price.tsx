'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import type { PriceProps } from './Price.types';

export const Price: React.FC<PriceProps> = ({
  amount,
  discount = 0,
  currency = '₹',
  size = 'md',
  className,
  showBadge = false,
  badgeText,
  variant = 'default',
}) => {
  const discountedPrice = discount > 0 ? amount * (1 - discount / 100) : amount;
  const formatted = (val: number) => `${currency}${val.toFixed(2)}`;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const priceSize = sizeClasses[size] || sizeClasses.md;

  // ─── Badge ──────────────────────────────────────────────────────

  const getBadgeText = () => {
    if (badgeText) return badgeText;
    if (discount > 0) return `Save ${discount}%`;
    return '';
  };

  const shouldShowBadge = showBadge && discount > 0 && getBadgeText();

  // ─── Variant styles ────────────────────────────────────────────

  const isSale = variant === 'sale' || discount > 0;
  const isStrikethrough = variant === 'strikethrough' || (discount > 0 && variant === 'default');

  // ─── Render ────────────────────────────────────────────────────

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      {isSale ? (
        <>
          {isStrikethrough && (
            <span
              className={cn(
                'text-text-secondary/60 dark:text-text-secondary/50 line-through',
                priceSize,
              )}
            >
              {formatted(amount)}
            </span>
          )}
          <span
            className={cn(
              'font-bold text-primary dark:text-primary/90',
              priceSize,
            )}
          >
            {formatted(discountedPrice)}
          </span>
          {shouldShowBadge && (
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full bg-success/10 text-success dark:bg-success/20"
            >
              {getBadgeText()}
            </span>
          )}
        </>
      ) : (
        <span
          className={cn(
            'font-bold text-primary dark:text-primary/90',
            priceSize,
          )}
        >
          {formatted(amount)}
        </span>
      )}
    </div>
  );
};