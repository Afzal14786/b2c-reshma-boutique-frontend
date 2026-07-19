'use client';
import React from 'react';
import { useForm, FormProvider, FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../utils/cn';
import type { FormProps } from './Form.types';

export function Form<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className = '',
  id,
  glass = false,
}: FormProps<T>) {
  // Cast resolver to any to bypass strict type checking
  const resolver = schema ? zodResolver(schema as any) : undefined;

  const methods = useForm<T>({
    resolver: resolver as any,
    defaultValues,
  });

  const glassClasses = glass
    ? 'glass p-6 sm:p-8'
    : '';

  // Cast onSubmit to SubmitHandler
  const handleSubmit = methods.handleSubmit(onSubmit as SubmitHandler<T>);

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={handleSubmit}
        className={cn('space-y-4', glassClasses, className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}