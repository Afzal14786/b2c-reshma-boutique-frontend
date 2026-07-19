export interface CouponInputProps {
  /** Current coupon code value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when Apply button is clicked */
  onApply?: (code: string) => void;
  /** Loading state (disables button, shows spinner) */
  loading?: boolean;
  /** Validation state: 'idle' | 'valid' | 'invalid' */
  validation?: 'idle' | 'valid' | 'invalid';
  /** Error message to display (when validation is 'invalid') */
  errorMessage?: string;
  /** Success message to display (when validation is 'valid') */
  successMessage?: string;
  /** Placeholder text (default: 'Enter coupon code') */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Apply glass styling (default: true) */
  glass?: boolean;
}