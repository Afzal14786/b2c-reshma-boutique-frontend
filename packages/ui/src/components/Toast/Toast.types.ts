export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastData {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number; // in ms, default: 3000
  dismissible?: boolean;
  icon?: React.ReactNode;
}

export interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
  duration?: number;
}

export interface ToastContainerProps {
  toasts: ToastData[];
  removeToast: (id: string) => void;
  position?: ToastPosition;
  className?: string;
}

export interface ToastItemProps {
  toast: ToastData;
  onRemove: () => void;
  variant?: ToastVariant;
  duration?: number;
}