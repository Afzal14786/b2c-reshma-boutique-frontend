'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '../../utils/cn';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../Form';
import { Input } from '../Input';
import { Button } from '../Button';
import type { RegisterFormProps } from './RegisterForm.types';

// ─── Validation Schema ──────────────────────────────────────────

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

// ─── Component ──────────────────────────────────────────────────

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onGoogleLogin,
  onLogin,
  loading = false,
  error,
  className,
  glass = true,
  logo,
}) => {
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...rest } = data;
    onSubmit?.(rest as RegisterFormValues);
  };

  const glassClasses = glass
    ? 'glass p-6 sm:p-8 rounded-card'
    : 'bg-surface border border-border rounded-card p-6 sm:p-8';

  return (
    <div className={cn('w-full max-w-sm mx-auto', glassClasses, className)}>
      {/* Logo */}
      {logo && <div className="flex justify-center mb-6">{logo}</div>}

      <Form
        schema={registerSchema}
        onSubmit={handleSubmit}
        className="space-y-4"
        id="register-form"
      >
        {/* Error banner */}
        {error && (
          <div className="p-3 glass border border-error/30 rounded-card text-error text-sm">
            {error}
          </div>
        )}

        <FormField name="name">
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" disabled={loading} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="you@example.com" disabled={loading} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="••••••••" disabled={loading} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="confirmPassword">
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="••••••••" disabled={loading} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" fullWidth disabled={loading} loading={loading}>
          Create Account
        </Button>

        {onGoogleLogin && (
          <>
            {/* Separator */}
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

        {/* Login link */}
        {onLogin && (
          <p className="text-center text-sm text-text-secondary dark:text-text-secondary/70">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onLogin}
              className="text-secondary hover:text-secondary/80 transition-colors font-medium"
            >
              Sign in
            </button>
          </p>
        )}
      </Form>
    </div>
  );
};