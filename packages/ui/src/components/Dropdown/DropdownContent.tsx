'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { useDropdown } from './Dropdown';
import type { DropdownContentProps } from './Dropdown.types';

const placementClasses: Record<string, string> = {
  bottom: 'top-full left-0 mt-1',
  top: 'bottom-full left-0 mb-1',
  left: 'top-0 right-full mr-1',
  right: 'top-0 left-full ml-1',
};

const alignClasses: Record<string, string> = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
};

export const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  className = '',
  align = 'center',
  sideOffset = 4,
}) => {
  const { isOpen, close, contentRef, placement } = useDropdown();
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  // ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  const placementClass = placementClasses[placement] || placementClasses.bottom;
  const alignClass = alignClasses[align] || alignClasses.center;

  return createPortal(
    <div
      ref={containerRef}
      className={cn(
        'absolute z-50 min-w-[180px] py-1',
        'glass rounded-card shadow-glass',
        'border border-glass-border',
        placementClass,
        alignClass,
        className,
      )}
      style={{ marginTop: placement === 'bottom' ? sideOffset : 0 }}
    >
      {children}
    </div>,
    document.body,
  );
};