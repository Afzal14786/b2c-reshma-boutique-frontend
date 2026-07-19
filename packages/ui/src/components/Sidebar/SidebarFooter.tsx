'use client'
import React from 'react';
import { cn } from '../../utils/cn';

export interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'p-4 border-t border-glass-border',
        className,
      )}
    >
      {children}
    </div>
  );
};