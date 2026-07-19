'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import type { FooterSocialProps } from './Footer.types';

export const FooterSocial: React.FC<FooterSocialProps> = ({
  links,
  className = '',
}) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="p-2 rounded-full hover:bg-surface-tint/20 transition-colors text-text-secondary hover:text-primary"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};