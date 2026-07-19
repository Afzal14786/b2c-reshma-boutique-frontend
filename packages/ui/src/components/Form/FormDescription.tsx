'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import type { FormDescriptionProps } from './Form.types';

export const FormDescription: React.FC<FormDescriptionProps> = ({ children, className }) => {
  return <p className={cn('text-sm text-text-secondary dark:text-text-secondary/70', className)}>{children}</p>;
};