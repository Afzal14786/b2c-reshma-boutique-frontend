'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { NavbarContextValue, NavbarProps } from './Navbar.types';

const NavbarContext = createContext<NavbarContextValue | null>(null);

export const useNavbar = () => {
  const ctx = useContext(NavbarContext);
  if (!ctx) throw new Error('useNavbar must be used within Navbar');
  return ctx;
};

export const Navbar: React.FC<NavbarProps> = ({
  children,
  className = '',
  glass = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setMenuOpen = useCallback((open: boolean) => setIsMenuOpen(open), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const contextValue: NavbarContextValue = {
    isMenuOpen,
    setMenuOpen,
    toggleMenu,
    closeMenu,
  };

  const glassClasses = glass
    ? 'glass'
    : 'bg-surface dark:bg-[#1E1E2A] border-b border-border';

  return (
    <NavbarContext.Provider value={contextValue}>
      <nav className={cn(glassClasses, 'sticky top-0 z-40 w-full', className)}>
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          {children}
        </div>
      </nav>
    </NavbarContext.Provider>
  );
};