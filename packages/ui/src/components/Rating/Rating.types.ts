export type RatingSize = 'sm' | 'md' | 'lg';
export type RatingColor = 'primary' | 'secondary' | 'accent' | 'warning' | 'default';

export interface RatingProps {
  /** Current rating value (0–5, supports half increments) */
  value?: number;
  /** Default value for uncontrolled usage */
  defaultValue?: number;
  /** Callback when rating changes */
  onChange?: (value: number) => void;
  /** Total number of stars (default: 5) */
  max?: number;
  /** Size variant (default: md) */
  size?: RatingSize;
  /** Color variant (default: warning – gold) */
  color?: RatingColor;
  /** Read‑only mode (default: false) */
  readOnly?: boolean;
  /** Show rating value as text (default: false) */
  showValue?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label (default: "Rating") */
  label?: string;
}