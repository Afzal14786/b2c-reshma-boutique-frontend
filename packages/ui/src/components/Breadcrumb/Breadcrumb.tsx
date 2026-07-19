'use client';
import React, { createContext, useContext, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { BreadcrumbContextValue, BreadcrumbProps } from './Breadcrumb.types';

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export const useBreadcrumb = () => {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error('useBreadcrumb must be used within Breadcrumb');
  return ctx;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  children,
  separator = '/',
  glass = false,
  className = '',
}) => {
  const contextValue = useMemo<BreadcrumbContextValue>(
    () => ({ separator, glass }),
    [separator, glass],
  );

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <nav
        aria-label="Breadcrumb"
        className={cn(
          glass && 'glass rounded-card px-3 py-2',
          className,
        )}
      >
        <ol className="flex items-center gap-1 flex-wrap">{children}</ol>
      </nav>
    </BreadcrumbContext.Provider>
  );
};