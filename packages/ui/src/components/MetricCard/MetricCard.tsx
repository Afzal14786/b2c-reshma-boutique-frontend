'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import { metricCardVariants } from './MetricCard.styles';
import type { MetricCardProps } from './MetricCard.types';

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  trend,
  subtitle,
  variant = 'glass',
  size = 'md',
  className,
  iconColor = 'text-secondary',
}) => {
  const valueColor = trend?.isPositive ? 'text-success' : trend && !trend.isPositive ? 'text-error' : 'text-primary';

  return (
    <div className={cn(metricCardVariants({ variant, size }), className)}>
      {/* Header: label + icon */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-secondary dark:text-text-secondary/80">{label}</p>
        {icon && (
          <div
            className={cn(
              'p-2 rounded-full bg-secondary/10 dark:bg-secondary/20',
              'transition-colors duration-200',
              iconColor,
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value + trend */}
      <div className="flex items-end justify-between mt-1">
        <span
          className={cn(
            'font-bold leading-tight',
            size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl',
            valueColor,
          )}
        >
          {value}
        </span>

        {trend && (
          <span
            className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full',
              trend.isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error',
            )}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && <p className="text-xs text-text-secondary/60 dark:text-text-secondary/50 mt-1">{subtitle}</p>}
    </div>
  );
};