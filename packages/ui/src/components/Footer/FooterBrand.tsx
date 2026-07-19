'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import type { FooterBrandProps } from './Footer.types';

export const FooterBrand: React.FC<FooterBrandProps> = ({
  logo,
  title = 'Reshma Boutique',
  tagline = 'Heritage craftsmanship, modern elegance.',
  contact,
  className = '',
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {logo || <span className="text-xl font-serif font-semibold text-primary">{title}</span>}
      {tagline && <p className="text-sm text-text-secondary/80">{tagline}</p>}
      {contact && (
        <div className="space-y-1 text-sm text-text-secondary/70">
          {contact.email && <p>Email: <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">{contact.email}</a></p>}
          {contact.phone && <p>Phone: <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">{contact.phone}</a></p>}
          {contact.address && <p>{contact.address}</p>}
        </div>
      )}
    </div>
  );
};