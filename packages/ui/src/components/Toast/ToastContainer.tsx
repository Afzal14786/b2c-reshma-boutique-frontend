'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import { Toast } from './Toast';
import type { ToastContainerProps, ToastPosition } from './Toast.types';

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
  position = 'top-right',
  className = '',
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed z-[100] flex flex-col gap-2 max-h-screen overflow-hidden pointer-events-none',
        positionClasses[position],
        className,
      )}
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <Toast
            toast={toast}
            onRemove={() => removeToast(toast.id)}
            variant={toast.variant}
            duration={toast.duration}
          />
        </div>
      ))}
    </div>
  );
};