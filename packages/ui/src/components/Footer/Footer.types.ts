import type { ReactNode } from 'react';

export interface FooterLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterSocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface FooterColumnProps {
  title: string;
  links: FooterLinkItem[];
  className?: string;
}

export interface FooterBrandProps {
  logo?: ReactNode;
  title?: string;
  tagline?: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  className?: string;
}

export interface FooterSocialProps {
  links: FooterSocialLink[];
  className?: string;
}

export interface FooterProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}