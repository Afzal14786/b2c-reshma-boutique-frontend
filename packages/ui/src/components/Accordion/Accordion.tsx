'use client';
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { AccordionContextValue, AccordionProps } from './Accordion.types';

const AccordionContext = createContext<AccordionContextValue | null>(null);

export const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('useAccordion must be used within Accordion');
  return ctx;
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  type = 'single',
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  collapsible = false,
  className = '',
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;

  const toggleItem = useCallback(
    (itemValue: string) => {
      let newValue: string[];
      if (type === 'single') {
        if (currentValue.includes(itemValue)) {
          if (collapsible) newValue = [];
          else newValue = currentValue;
        } else {
          newValue = [itemValue];
        }
      } else {
        if (currentValue.includes(itemValue)) {
          newValue = currentValue.filter((v) => v !== itemValue);
        } else {
          newValue = [...currentValue, itemValue];
        }
      }
      if (!isControlled) setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [type, currentValue, collapsible, isControlled, onValueChange],
  );

  const isItemOpen = useCallback(
    (itemValue: string) => currentValue.includes(itemValue),
    [currentValue],
  );

  const contextValue = useMemo<AccordionContextValue>(
    () => ({ type, value: currentValue, toggleItem, isItemOpen }),
    [type, currentValue, toggleItem, isItemOpen],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn('space-y-1', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};