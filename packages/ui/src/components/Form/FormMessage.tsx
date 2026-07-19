'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import { useFormField } from './FormField';
import type { FormMessageProps } from './Form.types';

export const FormMessage: React.FC<FormMessageProps> = ({ children, className }) => {
  const { fieldState } = useFormField();
  const message = children || fieldState.error?.message;

  if (!message) return null;

  return (
    <p className={cn('text-sm text-error', className)}>
      {message}
    </p>
  );
};