'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import { useNavbar } from './Navbar';
import type { NavbarLinksProps } from './Navbar.types';

export const NavbarLinks: React.FC<NavbarLinksProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={cn('hidden lg:flex items-center gap-6', className)}>
      {children}
    </div>
  );
};