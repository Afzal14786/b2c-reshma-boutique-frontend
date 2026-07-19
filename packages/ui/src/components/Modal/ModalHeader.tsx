import React from 'react';
import { cn } from '../../utils/cn';

export const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('flex items-start justify-between p-4 sm:p-5 border-b border-border/50', className)} {...props}>
    {children}
  </div>
);