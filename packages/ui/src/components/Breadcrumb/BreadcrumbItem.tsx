import React from 'react';
import { cn } from '../../utils/cn';
import type { BreadcrumbItemProps } from './Breadcrumb.types';

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  href,
  isActive = false,
  className = '',
}) => {
  const itemClasses = cn(
    'text-sm font-medium',
    isActive
      ? 'text-text-primary dark:text-text-primary/90 cursor-default'
      : 'text-text-secondary dark:text-text-secondary/80 hover:text-text-primary transition-colors',
    className,
  );

  if (isActive) {
    return (
      <li className="flex items-center">
        <span className={itemClasses} aria-current="page">
          {children}
        </span>
      </li>
    );
  }

  return (
    <li className="flex items-center">
      <a href={href} className={itemClasses}>
        {children}
      </a>
    </li>
  );
};