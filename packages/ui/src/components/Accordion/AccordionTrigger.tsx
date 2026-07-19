'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import { useAccordion } from './Accordion';
import { useAccordionItem } from './AccordionItem';
import type { AccordionTriggerProps } from './Accordion.types';

// ─── Chevron Icon ─────────────────────────────────────────────

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(
      'transition-transform duration-200 ease-in-out',
      open ? 'rotate-180' : '',
    )}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className = '',
}) => {
  const { toggleItem } = useAccordion();
  const { value, isOpen } = useAccordionItem();

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={cn(
        'flex w-full items-center justify-between px-4 py-3',
        'text-left text-sm font-medium text-text-primary dark:text-text-primary/90',
        'hover:bg-surface-tint/10 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-secondary/30',
        className,
      )}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <ChevronIcon open={isOpen} />
    </button>
  );
};