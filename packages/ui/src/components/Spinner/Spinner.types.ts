export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'default' | 'glass';

export interface SpinnerProps {
  /** Size variant (default: md) */
  size?: SpinnerSize;
  /** Visual variant (default: default) */
  variant?: SpinnerVariant;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label (default: "Loading…") */
  label?: string;
}