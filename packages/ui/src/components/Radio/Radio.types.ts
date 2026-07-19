import type { ReactNode } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioOrientation = 'horizontal' | 'vertical';

export interface RadioOption {
  /** Value of the radio button */
  value: string;
  /** Label text */
  label: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Controlled value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Options to render */
  options?: RadioOption[];
  /** Orientation (default: vertical) */
  orientation?: RadioOrientation;
  /** Size variant (default: md) */
  size?: RadioSize;
  /** Error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Group label (legend) */
  label?: string;
  /** Name attribute for the group */
  name?: string;
  /** Disable all radios in the group */
  disabled?: boolean;
  /** Children (optional, if you want to render custom radios) */
  children?: ReactNode;
}

export interface RadioProps {
  /** Value of the radio */
  value: string;
  /** Controlled checked state */
  checked?: boolean;
  /** Default checked (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Size variant (default: md) */
  size?: RadioSize;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Input name attribute */
  name?: string;
  /** Input id (auto-generated if not provided) */
  id?: string;
}