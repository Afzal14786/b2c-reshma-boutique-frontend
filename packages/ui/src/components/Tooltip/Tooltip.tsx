'use client';
import React, { useState, useRef, useEffect, useCallback, isValidElement, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type { TooltipProps, TooltipPlacement } from './Tooltip.types';

// ─── Component ──────────────────────────────────────────────────

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  openDelay = 200,
  closeDelay = 0,
  className = '',
  contentClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Open/close handlers ──────────────────────────────────────

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), openDelay);
  }, [openDelay]);

  const close = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), closeDelay);
  }, [closeDelay]);

  // ─── Position calculation ─────────────────────────────────────

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spacing = 8;
    let top = 0,
      left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - spacing;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + spacing;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - spacing;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + spacing;
        break;
    }

    setPosition({ top, left });
  }, [placement]);

  // ─── Update position on open / scroll / resize ──────────────

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(updatePosition);
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // ─── Render trigger ──────────────────────────────────────────

  const triggerProps = {
    ref: triggerRef,
    onMouseEnter: open,
    onMouseLeave: close,
    onFocus: open,
    onBlur: close,
  };

  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement, triggerProps)
    : <span {...triggerProps}>{children}</span>;

  // ─── Render ───────────────────────────────────────────────────

  return (
    <>
      <span className={className}>{trigger}</span>
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              'z-50 fixed rounded-card glass shadow-glass px-3 py-1.5 text-sm text-text-primary dark:text-text-primary/90',
              'border border-glass-border',
              contentClassName,
            )}
            style={{
              top: position.top,
              left: position.left,
            }}
            role="tooltip"
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                'absolute w-2 h-2 rotate-45 bg-glass border border-glass-border',
                placement === 'top' && 'bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0',
                placement === 'bottom' && 'top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0',
                placement === 'left' && 'right-[-5px] top-1/2 -translate-y-1/2 border-l-0 border-b-0',
                placement === 'right' && 'left-[-5px] top-1/2 -translate-y-1/2 border-r-0 border-t-0',
              )}
            />
          </div>,
          document.body,
        )}
    </>
  );
};