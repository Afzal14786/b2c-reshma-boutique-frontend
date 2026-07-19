'use client';

import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps {
  /** Image URL */
  src?: string | null;
  /** Name for initials fallback */
  name?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
  /** Use glass effect for fallback avatar (default: true) */
  glass?: boolean;
  /** Optional custom fallback icon/component */
  fallback?: React.ReactNode;
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

const borderClasses = 'border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]';

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
  glass = true,
  fallback,
}) => {
  const [imgError, setImgError] = useState(false);

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  const sizeClass = sizeMap[size] || sizeMap.md;

  // ─── Image with fallback on error ─────────────────────────────

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        onError={() => setImgError(true)}
        className={cn(
          'rounded-full object-cover',
          borderClasses,
          sizeClass,
          className,
        )}
      />
    );
  }

  // ─── Fallback (initials or custom) ───────────────────────────

  const fallbackClasses = cn(
    'rounded-full flex items-center justify-center font-medium',
    borderClasses,
    sizeClass,
    glass
      ? 'bg-[rgba(246,246,246,0.6)] dark:bg-[rgba(30,30,30,0.5)] backdrop-blur-[10px] saturate-[140%] dark:backdrop-blur-[20px] text-text-primary'
      : 'bg-secondary/20 text-secondary',
    className,
  );

  return <div className={fallbackClasses}>{fallback || initials || '?'}</div>;
};