import type { ReactNode } from 'react';
import type { FieldValues, UseFormProps } from 'react-hook-form';
import type { ZodSchema } from 'zod';

export interface FormProps<T extends FieldValues> {
  /** Zod schema for validation */
  schema?: ZodSchema<T>;
  /** Default form values */
  defaultValues?: UseFormProps<T>['defaultValues'];
  /** Submit handler */
  onSubmit: (data: T) => void;
  /** Form content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** ID for the form */
  id?: string;
  /** Apply glass styling to the form container */
  glass?: boolean;
}

export interface FormFieldProps {
  name: string;
  children: ReactNode;
}

export interface FormItemProps {
  children: ReactNode;
  className?: string;
}

export interface FormLabelProps {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

export interface FormControlProps {
  children: ReactNode;
}

export interface FormMessageProps {
  children?: ReactNode;
  className?: string;
}

export interface FormDescriptionProps {
  children: ReactNode;
  className?: string;
}