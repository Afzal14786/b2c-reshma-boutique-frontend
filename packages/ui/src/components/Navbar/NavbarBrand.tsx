'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import type { NavbarBrandProps } from './Navbar.types';

export const NavbarBrand: React.FC<NavbarBrandProps> = ({
  children,
  href = '/',
  className = '',
}) => {
  return (
    <a href={href} className={cn('flex items-center gap-2 flex-shrink-0', className)}>
      {children}
    </a>
  );
};