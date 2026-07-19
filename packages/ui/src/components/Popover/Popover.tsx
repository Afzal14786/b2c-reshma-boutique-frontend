'use client';
import React, { createContext, useContext, useState, useRef, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { PopoverContextValue, PopoverProps, PopoverPlacement } from './Popover.types';

const PopoverContext = createContext<PopoverContextValue | null>(null);

export const usePopover = () => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('usePopover must be used within Popover');
  return ctx;
};

export const Popover: React.FC<PopoverProps> = ({
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

  const contextValue = useMemo<PopoverContextValue>(
    () => ({
      isOpen,
      setIsOpen,
      toggle,
      close,
      triggerRef,
      placement,
    }),
    [isOpen, setIsOpen, toggle, close, placement],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      <div className={cn('relative inline-block', className)}>{children}</div>
    </PopoverContext.Provider>
  );
};