export type DatePickerVariant = 'single' | 'range';

export interface CalendarProps {
  /** Selected date (single) or [start, end] (range) */
  value?: Date | [Date, Date] | null;
  /** Callback when value changes */
  onChange?: (value: Date | [Date, Date] | null) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Initial month to display (default: current month) */
  initialMonth?: Date;
  /** Variant (default: 'single') */
  variant?: DatePickerVariant;
  /** Additional CSS classes */
  className?: string;
}

export interface DatePickerProps {
  /** Selected date (single) */
  value?: Date | null;
  /** Callback when date changes */
  onChange?: (date: Date | null) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Date format (default: 'dd/MM/yyyy') */
  format?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Additional CSS classes */
  className?: string;
  /** Apply glass styling (default: true) */
  glass?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Label for the input */
  label?: string;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
}