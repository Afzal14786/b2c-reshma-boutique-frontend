import React from 'react';
import { cn } from '../../utils/cn';

export interface SidebarHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center p-4 border-b border-glass-border h-20',
        className,
      )}
    >
      {children}
    </div>
  );
};