export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Indeterminate state (visual only) */
  indeterminate?: boolean;
  /** Label text */
  label?: string;
  /** Size variant (default: md) */
  size?: CheckboxSize;
  /** Error state (shows red border) */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Input name attribute */
  name?: string;
  /** Input value attribute */
  value?: string;
  /** Input id (auto-generated if not provided) */
  id?: string;
}