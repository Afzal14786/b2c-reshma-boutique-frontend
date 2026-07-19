import React from 'react';
import { cn } from '../../utils/cn';

export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('p-4 sm:p-5', className)} {...props}>
    {children}
  </div>
);