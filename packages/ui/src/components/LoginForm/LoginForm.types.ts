import type { ReactNode } from 'react';

export interface LoginFormProps {
  /** Callback when form is submitted */
  onSubmit?: (data: { email: string; password: string }) => void;
  /** Callback for Google login button */
  onGoogleLogin?: () => void;
  /** Callback when "Forgot password?" is clicked */
  onForgotPassword?: () => void;
  /** Callback when "Create account" is clicked (optional) */
  onRegister?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Form-level error message */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Apply glass background to the form */
  glass?: boolean;
  /** Logo element (image or SVG) – unused now, but kept for flexibility */
  logo?: ReactNode;
}