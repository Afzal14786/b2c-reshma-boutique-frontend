'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// Sits between AuthProvider and the actual dashboard chrome/pages.
// Nothing inside {children} mounts — and so no page's own data-fetching
// useEffect can fire — until we've confirmed there's a real, valid,
// ADMIN session. Without this, pages fetch their own data immediately on
// mount regardless of auth state, and the only redirect-to-login comes
// later, reactively, as a side effect of one of those calls failing.
export const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return null;
  }

  return <>{children}</>;
}