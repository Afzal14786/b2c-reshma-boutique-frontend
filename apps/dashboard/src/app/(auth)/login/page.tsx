'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@repo/ui';
import Image from 'next/image';

export default function LoginPage() {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  const handleSubmit = async (data: { email: string; password: string }) => {
    setError(undefined);
    try {
      await login(data.email, data.password);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-block p-2 glass rounded-card shadow-soft">
            <Image
              src="/logo.svg"
              alt="Reshma Dashboard"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          <h1 className="mt-6 text-2xl font-serif text-primary dark:text-primary/90">
            Welcome Back
          </h1>
          <p className="text-text-secondary dark:text-text-secondary/80 text-sm mt-1">
            Sign in to manage your boutique
          </p>
        </div>

        {/* Login Form – glassy container */}
        <LoginForm
          onSubmit={handleSubmit}
          loading={isLoading}
          error={error}
          glass
          variant="glass"
        />

        <p className="text-center text-xs text-text-secondary dark:text-text-secondary/60 mt-6">
          &copy; {new Date().getFullYear()} Reshma Boutique. All rights reserved.
        </p>
      </div>
    </div>
  );
}