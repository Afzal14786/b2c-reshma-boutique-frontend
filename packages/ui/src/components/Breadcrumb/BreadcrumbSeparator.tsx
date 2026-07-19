'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import { useBreadcrumb } from './Breadcrumb';
import type { BreadcrumbSeparatorProps } from './Breadcrumb.types';

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  className = '',
}) => {
  const { separator } = useBreadcrumb();

  return (
    <li className={cn('flex items-center text-text-secondary/60 select-none', className)}>
      {children ?? separator}
    </li>
  );
};