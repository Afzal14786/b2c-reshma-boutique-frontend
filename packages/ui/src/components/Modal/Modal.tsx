'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { useScrollLock } from '../../hooks/useScrollLock';
import { modalSizeVariants, modalTransition } from './Modal.styles';
import type { ModalProps } from './Modal.types';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  footer,
  size = 'md',
  glass = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useScrollLock(isOpen);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnOverlayClick) {
        onClose();
      }
    },
    [onClose, closeOnOverlayClick],
  );

  if (!isOpen) return null;

  // ─── Container classes ────────────────────────────────────────────

  const containerClasses = cn(
    'w-full rounded-2xl overflow-hidden transition-all duration-300',
    'shadow-2xl',
    glass ? 'glass' : 'bg-surface border border-border shadow-soft',
    modalSizeVariants[size],
    className,
  );

  // ─── Header ───────────────────────────────────────────────────────

  const renderHeader = () => {
    if (!title && !description && !showCloseButton) return null;

    return (
      <div className="flex items-start justify-between p-4 sm:p-5 border-b border-border/50">
        <div className="flex-1 min-w-0">
          {title && (
            <h2 id="modal-title" className="text-xl font-serif font-semibold text-primary">
              {title}
            </h2>
          )}
          {description && (
            <p id="modal-description" className="text-sm text-text-secondary mt-1">
              {description}
            </p>
          )}
        </div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 p-1 rounded-full hover:bg-surface-tint/50 transition-colors"
            aria-label="Close modal"
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
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  };

  // ─── Footer ───────────────────────────────────────────────────────

  const renderFooter = () => {
    if (!footer) return null;
    return (
      <div className="p-4 sm:p-5 border-t border-border/50 bg-surface-tint/20 rounded-b-2xl">
        {footer}
      </div>
    );
  };

  // ─── Render ──────────────────────────────────────────────────────

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      <div
        ref={modalRef}
        className={containerClasses}
        tabIndex={-1}
      >
        {renderHeader()}
        <div className="p-4 sm:p-5">{children}</div>
        {renderFooter()}
      </div>
    </div>,
    document.body,
  );
};