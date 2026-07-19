'use client';
import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

export interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  onGoogleLogin?: () => void;
  loading?: boolean;
  error?: string;
  className?: string;
  /** Apply glass background to the form itself (for standalone use) */
  glass?: boolean;
  /** Variant for the input fields */
  variant?: 'default' | 'glass';
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleLogin,
  loading = false,
  error,
  className = '',
  glass = false,
  variant = 'glass',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  const glassClasses = glass
    ? 'glass p-6 sm:p-8 rounded-card'
    : '';

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-sm mx-auto space-y-6 ${glassClasses} ${className}`}
    >
      {error && (
        <div className="p-3 glass border border-error/30 rounded-card text-error text-sm">
          {error}
        </div>
      )}

      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        variant={variant}
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
        variant={variant}
      />

      <Button type="submit" fullWidth disabled={loading} loading={loading}>
        Sign In
      </Button>

      {onGoogleLogin && (
        <>
          <div className="relative flex items-center my-2">
            <div className="flex-grow border-t border-glass-border" />
            <span className="px-3 text-xs text-text-secondary dark:text-text-secondary/70">or</span>
            <div className="flex-grow border-t border-glass-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={onGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.764A7.977 7.977 0 0 1 12 4c1.9 0 3.364.693 4.436 1.636l3.318-3.318C17.747 1.062 15.06 0 12 0 7.348 0 3.28 2.58 1.457 6.262l3.809 3.502z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.15 0 5.88-1.06 7.85-2.82l-3.62-3.08c-1.41 1.02-3.16 1.62-5.06 1.62-3.44 0-6.38-2.36-7.42-5.54L1.46 13.8A8.02 8.02 0 0 0 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M21.89 12.06c0-.72-.08-1.4-.22-2.06H12v4.08h5.4c-.62 1.78-2.02 3.08-3.86 3.66l2.87 2.87c2.26-2.08 3.6-5.16 3.6-8.55z"
              />
              <path
                fill="#4285F4"
                d="M5.266 14.236L1.46 13.8C1.46 15.72 2.1 17.52 3.26 18.98l3.62-3.08c-.72-.2-1.34-.6-1.86-1.08z"
              />
            </svg>
            Continue with Google
          </Button>
        </>
      )}
    </form>
  );
};