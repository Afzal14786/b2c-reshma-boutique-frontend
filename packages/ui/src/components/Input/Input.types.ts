import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { inputVariants } from './Input.styles';

export type InputVariant = VariantProps<typeof inputVariants>['variant'];
export type InputSize = VariantProps<typeof inputVariants>['size'];

export type InputElement = 'input' | 'textarea' | 'select';

export interface CommonInputProps {
  /** Input label */
  label?: string;
  /** Helper text (shown below input) */
  helperText?: string;
  /** Error message (overrides helperText) */
  errorMessage?: string;
  /** Left icon */
  icon?: ReactNode;
  /** Right icon */
  iconRight?: ReactNode;
  /** Size variant */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Additional CSS classes */
  className?: string;
  /** Input id (auto-generated from label if not provided) */
  id?: string;
}

export type InputAsInput = CommonInputProps & {
  as?: 'input';
} & InputHTMLAttributes<HTMLInputElement>;

export type InputAsTextarea = CommonInputProps & {
  as: 'textarea';
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export type InputAsSelect = CommonInputProps & {
  as: 'select';
} & SelectHTMLAttributes<HTMLSelectElement>;

export type InputProps = InputAsInput | InputAsTextarea | InputAsSelect;