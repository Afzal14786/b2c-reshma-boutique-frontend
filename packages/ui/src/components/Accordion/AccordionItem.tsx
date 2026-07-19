'use client'
'use client';
import React, { createContext, useContext } from 'react';
import { cn } from '../../utils/cn';
import { useAccordion } from './Accordion';
import type { AccordionItemContextValue, AccordionItemProps } from './Accordion.types';

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export const useAccordionItem = () => {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error('useAccordionItem must be used within AccordionItem');
  return ctx;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  children,
  className = '',
}) => {
  const { isItemOpen } = useAccordion();
  const isOpen = isItemOpen(value);

  const contextValue: AccordionItemContextValue = { value, isOpen };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div className={cn('glass rounded-card overflow-hidden', className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};