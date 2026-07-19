export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Size variant (default: md) */
  size?: SwitchSize;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Input name attribute */
  name?: string;
  /** Input id (auto-generated if not provided) */
  id?: string;
  /** Accessible label (required for accessibility) */
  label?: string;
}