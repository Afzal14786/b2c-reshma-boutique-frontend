import React from 'react';
import { cn } from '../../utils/cn';
import { useNavbar } from './Navbar';
import type { NavbarActionsProps } from './Navbar.types';

// ─── Hamburger Icon ─────────────────────────────────────────────

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export const NavbarActions: React.FC<NavbarActionsProps> = ({
  children,
  className = '',
}) => {
  const { toggleMenu, isMenuOpen } = useNavbar();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {children}
      {/* Mobile hamburger */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 rounded-full hover:bg-surface-tint/20 transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
    </div>
  );
};