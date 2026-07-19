'use client';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { useDropdown } from './Dropdown';
import type { DropdownContentProps } from './Dropdown.types';

export const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  className = '',
  align = 'center',
  sideOffset = 4,
}) => {
  const { isOpen, close, triggerRef, placement } = useDropdown();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // ─── Calculate position ──────────────────────────────────────

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentWidth = containerRef.current?.offsetWidth || 200;
    const contentHeight = containerRef.current?.offsetHeight || 100;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'bottom':
        top = triggerRect.bottom + sideOffset;
        left = triggerRect.left + triggerRect.width / 2 - contentWidth / 2;
        break;
      case 'top':
        top = triggerRect.top - contentHeight - sideOffset;
        left = triggerRect.left + triggerRect.width / 2 - contentWidth / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - contentHeight / 2;
        left = triggerRect.left - contentWidth - sideOffset;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - contentHeight / 2;
        left = triggerRect.right + sideOffset;
        break;
      default:
        top = triggerRect.bottom + sideOffset;
        left = triggerRect.left + triggerRect.width / 2 - contentWidth / 2;
    }

    // ─── Align adjustments ────────────────────────────────────

    if (align === 'start') {
      left = triggerRect.left;
    } else if (align === 'end') {
      left = triggerRect.right - contentWidth;
    }

    // ─── Prevent overflow ─────────────────────────────────────

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 10) left = 10;
    if (left + contentWidth > viewportWidth - 10) {
      left = viewportWidth - contentWidth - 10;
    }
    if (top < 10) top = 10;
    if (top + contentHeight > viewportHeight - 10) {
      top = viewportHeight - contentHeight - 10;
    }

    setPosition({ top, left });
  };

  // ─── Update position on open, scroll, resize ──────────────

  useEffect(() => {
    if (isOpen) {
      // Wait for content to render before measuring
      requestAnimationFrame(updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, placement, align, sideOffset]);

  // ─── Click outside ──────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close, triggerRef]);

  // ─── ESC key ────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={containerRef}
      className={cn(
        'fixed z-50 min-w-[180px] py-1',
        'glass rounded-card shadow-glass',
        'border border-glass-border',
        className,
      )}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};