'use client';
import React, { createContext, useContext, useState, useRef, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { DropdownContextValue, DropdownProps, DropdownPlacement } from './Dropdown.types';

const DropdownContext = createContext<DropdownContextValue | null>(null);

export const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('useDropdown must be used within Dropdown');
  return ctx;
};

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom',
  className = '',
}) => {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) setInternalOpen(open);
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  const contextValue = useMemo<DropdownContextValue>(
    () => ({
      isOpen,
      setIsOpen,
      toggle,
      close,
      triggerRef,
      contentRef,
      placement,
    }),
    [isOpen, setIsOpen, toggle, close, placement],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={cn('relative inline-block', className)}>{children}</div>
    </DropdownContext.Provider>
  );
};