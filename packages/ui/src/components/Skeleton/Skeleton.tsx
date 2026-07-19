'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import type { SkeletonProps, SkeletonVariant } from './Skeleton.types';

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  shimmer = true,
  rounded = '',
}) => {
  // ─── Default rounded by variant ──────────────────────────────────

  const getDefaultRounded = (v: SkeletonProps['variant']): string => {
    switch (v) {
      case 'circle':
      case 'avatar':
        return 'rounded-full';
      case 'card':
      case 'image':
        return 'rounded-card';
      case 'button':
        return 'rounded-btn';
      default:
        return 'rounded';
    }
  };

  // ─── Variant default sizes ──────────────────────────────────────

  const variantSizeClasses: Record<SkeletonVariant, string> = {
    text: 'h-4 w-full',
    rect: '',
    circle: '',
    card: 'h-64 w-full',
    avatar: 'h-12 w-12',
    button: 'h-10 w-24',
    image: 'h-48 w-full',
  };

  // ─── Base glassy background ─────────────────────────────────────

  const baseClass = cn(
    'relative overflow-hidden',
    'bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)]',
    rounded || getDefaultRounded(variant),
  );

  // ─── Width/height style ─────────────────────────────────────────

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  // ─── Final class ─────────────────────────────────────────────────

  const variantClass = variantSizeClasses[variant] || '';
  const mergedClassName = cn(baseClass, variantClass, className);

  return (
    <div className={mergedClassName} style={style} aria-hidden="true">
      {/* Shimmer overlay */}
      {shimmer && (
        <div
          className={cn(
            'absolute inset-0 -translate-x-full',
            'animate-shimmer',
            'bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] dark:via-[rgba(255,255,255,0.05)] to-transparent',
          )}
        />
      )}
    </div>
  );
};