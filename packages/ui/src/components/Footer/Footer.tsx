'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import type { FooterProps } from './Footer.types';

export const Footer: React.FC<FooterProps> = ({
  children,
  className = '',
  glass = true,
}) => {
  const glassClasses = glass
    ? 'glass'
    : 'bg-surface dark:bg-[#1E1E2A] border-t border-border';

  return (
    <footer className={cn(glassClasses, 'mt-8', className)}>
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {children}
        </div>
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-glass-border text-center text-sm text-text-secondary/70">
          &copy; {new Date().getFullYear()} Reshma Boutique. All rights reserved.
        </div>
      </div>
    </footer>
  );
};