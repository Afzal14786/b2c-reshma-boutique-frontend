'use client'
import React from 'react';
import { cn } from '../../utils/cn';

export const DropdownSeparator: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <hr className={cn('my-1 border-t border-glass-border', className)} />;
};