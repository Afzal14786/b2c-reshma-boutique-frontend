'use client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { useNavbar } from './Navbar';
import type { NavbarMenuProps } from './Navbar.types';
import { useScrollLock } from '../../hooks/useScrollLock';

export const NavbarMenu: React.FC<NavbarMenuProps> = ({
  children,
  className = '',
}) => {
  const { isMenuOpen, closeMenu } = useNavbar();

  useScrollLock(isMenuOpen);

  // Close on ESC
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, closeMenu]);

  if (!isMenuOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-x-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-y-auto',
        'glass rounded-b-card shadow-glass',
        'lg:hidden',
        'animate-slide-down',
        className,
      )}
    >
      <div className="flex flex-col p-4 space-y-2">{children}</div>
    </div>,
    document.body,
  );
};