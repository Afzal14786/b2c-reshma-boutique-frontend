import type { ReactNode } from 'react';

export interface NavbarContextValue {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export interface NavbarProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}

export interface NavbarBrandProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export interface NavbarLinksProps {
  children: ReactNode;
  className?: string;
}

export interface NavbarActionsProps {
  children: ReactNode;
  className?: string;
}

export interface NavbarMenuProps {
  children: ReactNode;
  className?: string;
}