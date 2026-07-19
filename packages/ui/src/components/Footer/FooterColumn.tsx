'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import type { FooterColumnProps } from './Footer.types';

export const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  links,
  className = '',
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="text-sm font-semibold text-text-primary dark:text-text-primary/90 uppercase tracking-wider">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="text-sm text-text-secondary/80 hover:text-secondary transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};