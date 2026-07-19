import type { ReactNode } from 'react';

export type AccordionType = 'single' | 'multiple';

export interface AccordionContextValue {
  type: AccordionType;
  value: string[];
  toggleItem: (itemValue: string) => void;
  isItemOpen: (itemValue: string) => boolean;
}

export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

export interface AccordionProps {
  children: ReactNode;
  type?: AccordionType;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  collapsible?: boolean;
  className?: string;
}

export interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

export interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}