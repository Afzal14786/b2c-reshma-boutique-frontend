'use client';
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer } from './ToastContainer';
import type { ToastData, ToastContextValue, ToastProviderProps, ToastPosition } from './Toast.types';

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

let idCounter = 0;

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts = 5,
  duration = 3000,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback(
    (toast: Omit<ToastData, 'id'>) => {
      const id = String(++idCounter);
      const newToast: ToastData = {
        ...toast,
        id,
        duration: toast.duration ?? duration,
      };
      setToasts((prev) => {
        const updated = [newToast, ...prev];
        return updated.slice(0, maxToasts);
      });
    },
    [duration, maxToasts],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue = useMemo<ToastContextValue>(
    () => ({ toasts, addToast, removeToast, clearToasts }),
    [toasts, addToast, removeToast, clearToasts],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <ToastContainer
            toasts={toasts}
            removeToast={removeToast}
            position={position}
          />,
          document.body,
        )}
    </ToastContext.Provider>
  );
};