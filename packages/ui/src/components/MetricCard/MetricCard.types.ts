import type { ReactNode } from 'react';

export interface MetricCardProps {
  /** The metric label (e.g., "Total Revenue") */
  label: string;
  /** The metric value (e.g., "₹24,500") */
  value: string | number;
  /** Optional icon (e.g., <TrendingUp />) */
  icon?: ReactNode;
  /** Optional trend indicator (percentage change) */
  trend?: {
    value: number;        // percentage change (e.g., 12.5)
    isPositive: boolean;  // true for increase, false for decrease
  };
  /** Optional subtitle (e.g., "vs last month") */
  subtitle?: string;
  /** Card variant (default: 'glass') */
  variant?: 'glass' | 'solid' | 'outline';
  /** Size variant (default: 'md') */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Custom color for the icon background */
  iconColor?: string;
}