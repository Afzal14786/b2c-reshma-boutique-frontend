'use client';
// Re-export the Toast provider and hook from the UI package
// so the dashboard can import them from a single place.
export { ToastProvider, useToast } from '@repo/ui';