import type { SelectHTMLAttributes } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'glass';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Error message (applies error styling) */
  error?: string;
  /** Helper text shown below the select (hidden if error is present) */
  helperText?: string;
  /** Select options – can be array of strings or objects with value/label */
  options: (string | SelectOption)[];
  /** Placeholder text (shown as first disabled option) */
  placeholder?: string;
  /** Size variant (default: md) */
  size?: SelectSize;
  /** Visual variant (default: default) */
  variant?: SelectVariant;
  /** Additional CSS classes */
  className?: string;
  /** Name attribute */
  name?: string;
  /** ID (auto-generated if not provided) */
  id?: string;
}