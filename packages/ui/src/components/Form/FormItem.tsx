'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import type { FormItemProps } from './Form.types';

export const FormItem: React.FC<FormItemProps> = ({ children, className }) => {
  return <div className={cn('space-y-1.5', className)}>{children}</div>;
};