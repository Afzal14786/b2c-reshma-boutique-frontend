'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import { useFormField } from './FormField';
import type { FormLabelProps } from './Form.types';

export const FormLabel: React.FC<FormLabelProps> = ({ children, className, htmlFor }) => {
  const { name } = useFormField();
  const id = htmlFor || name;

  return (
    <label
      htmlFor={id}
      className={cn(
        'block text-sm font-medium text-text-secondary dark:text-text-secondary/80',
        className,
      )}
    >
      {children}
    </label>
  );
};