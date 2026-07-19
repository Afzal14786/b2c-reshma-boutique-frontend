'use client'
import React from 'react';
import { cn } from '../../utils/cn';

export const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('p-4 sm:p-5 border-t border-border/50 bg-surface-tint/20 rounded-b-2xl', className)} {...props}>
    {children}
  </div>
);