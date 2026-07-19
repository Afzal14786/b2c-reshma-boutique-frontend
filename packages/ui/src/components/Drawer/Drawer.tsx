'use client';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { useScrollLock } from '../../hooks/useScrollLock';
import type { DrawerProps, DrawerPosition, DrawerSize } from './Drawer.types';

// ─── Size mapping ──────────────────────────────────────────────

const sizeMap: Record<DrawerSize, { width: string; height: string }> = {
  sm: { width: 'w-80', height: 'h-72' },
  md: { width: 'w-96', height: 'h-96' },
  lg: { width: 'w-[32rem]', height: 'h-[28rem]' },
};

// ─── Position mapping ──────────────────────────────────────────

const positionClasses: Record<DrawerPosition, { panel: string; animation: string }> = {
  left: {
    panel: 'left-0 top-0 h-full',
    animation: 'translate-x-[-100%] data-[open=true]:translate-x-0',
  },
  right: {
    panel: 'right-0 top-0 h-full',
    animation: 'translate-x-[100%] data-[open=true]:translate-x-0',
  },
  bottom: {
    panel: 'bottom-0 left-0 w-full',
    animation: 'translate-y-[100%] data-[open=true]:translate-y-0',
  },
};

// ─── Component ──────────────────────────────────────────────────

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = 'md',
  glass = true,
  showCloseButton = true,
  className = '',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  ariaLabel = 'Drawer',
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Lock body scroll
  useScrollLock(isOpen);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      panelRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // ─── Sizing ──────────────────────────────────────────────────────

  const sizeConfig = sizeMap[size] || sizeMap.md;
  const positionConfig = positionClasses[position] || positionClasses.right;

  const panelSize = position === 'bottom' ? sizeConfig.height : sizeConfig.width;

  // ─── Classes ────────────────────────────────────────────────────

  const panelClasses = cn(
    'fixed z-50 flex flex-col',
    'transition-transform duration-300 ease-out',
    positionConfig.panel,
    positionConfig.animation,
    panelSize,
    glass
      ? 'glass border-glass-border'
      : 'bg-surface dark:bg-[#1E1E2A] border-border',
    position === 'bottom' ? 'border-t' : 'border-r',
    className,
  );

  const overlayClasses = cn(
    'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
    'transition-opacity duration-300',
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
  );

  // ─── Render ─────────────────────────────────────────────────────

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={overlayClasses}
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={panelClasses}
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
      >
        {/* Header with close button */}
        {showCloseButton && (
          <div className="flex items-center justify-between p-4 border-b border-glass-border">
            <span className="text-lg font-serif font-semibold text-primary">Drawer</span>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-surface-tint/30 transition-colors"
              aria-label="Close drawer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </>,
    document.body,
  );
};