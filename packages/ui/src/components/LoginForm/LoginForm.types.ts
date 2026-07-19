import type { ReactNode } from 'react';

export interface LoginFormProps {
  /** Callback when form is submitted */
  onSubmit?: (data: { email: string; password: string }) => void;
  /** Callback for Google login button */
  onGoogleLogin?: () => void;
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
  /** Forgot password link handler */
  onForgotPassword?: () => void;
  /** Register link handler */
  onRegister?: () => void;
}