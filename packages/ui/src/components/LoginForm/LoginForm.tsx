'use client';
import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

// Inline SVG icons for eye / eye-off
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  onGoogleLogin?: () => void;
  onForgotPassword?: () => void;
  loading?: boolean;
  error?: string;
  className?: string;
  glass?: boolean;
  variant?: 'default' | 'glass';
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onGoogleLogin,
  onForgotPassword,
  loading = false,
  error,
  className = '',
  glass = false,
  variant = 'glass',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

      {/* Email field – using the shared Input component with glass variant */}
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        variant={variant}
        autoComplete="email"
        placeholder="Enter your email"
      />

      {/* Password field – custom wrapper to attach eye toggle */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-secondary dark:text-text-secondary/80">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            autoComplete="current-password"
            className={`
              w-full px-4 py-2.5 rounded-full
              glass
              text-text-primary dark:text-text-primary/90
              placeholder:text-text-secondary/40
              focus:border-secondary focus:shadow-[0_0_0_3px_rgba(91,155,213,0.2)]
              outline-none transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/60 hover:text-text-secondary transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      {/* Forgot password link */}
      {onForgotPassword && (
        <div className="flex justify-end -mt-2">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-secondary/70 hover:text-secondary transition-colors font-medium"
          >
            Forgot password?
          </button>
        </div>
      )}

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