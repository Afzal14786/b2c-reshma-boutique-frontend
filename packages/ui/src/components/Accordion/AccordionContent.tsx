'use client';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { useAccordionItem } from './AccordionItem';
import type { AccordionContentProps } from './Accordion.types';

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className = '',
}) => {
  const { isOpen } = useAccordionItem();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      ref={contentRef}
      className={cn('overflow-hidden transition-[height] duration-300 ease-in-out', className)}
      style={{ height }}
    >
      <div className="px-4 pb-4 text-sm text-text-secondary dark:text-text-secondary/80">
        {children}
      </div>
    </div>
  );
};