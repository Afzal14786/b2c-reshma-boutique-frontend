export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps {
  /** Current progress value (0‑100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Size variant (default: md) */
  size?: ProgressSize;
  /** Animate the bar (default: true) */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Label text (optional) */
  label?: string;
  /** Show percentage text (default: false) */
  showPercentage?: boolean;
}