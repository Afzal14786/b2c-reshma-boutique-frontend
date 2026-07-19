import type { ReactNode } from 'react';

export interface RegisterFormProps {
  /** Callback when form is submitted */
  onSubmit?: (data: { name: string; email: string; password: string; confirmPassword: string }) => void;
  /** Callback for Google login button */
  onGoogleLogin?: () => void;
  /** Callback for "Already have an account?" link */
  onLogin?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Form-level error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Apply glass background to the form */
  glass?: boolean;
  /** Logo element (image or SVG) */
  logo?: ReactNode;
}