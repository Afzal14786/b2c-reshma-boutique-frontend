import type { ReactNode } from 'react';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepStatus = 'active' | 'completed' | 'disabled';

export interface StepItem {
  /** Unique identifier */
  id: string;
  /** Step label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon (overrides number) */
  icon?: ReactNode;
  /** Status (auto‑determined if not provided) */
  status?: StepStatus;
  /** Custom CSS classes for the step */
  className?: string;
}

export interface StepperContextValue {
  orientation: StepperOrientation;
  activeStep: number;
  steps: StepItem[];
  variant: 'default' | 'glass';
  size: 'sm' | 'md' | 'lg';
}

export interface StepperProps {
  /** Array of step items */
  steps: StepItem[];
  /** Active step index (0‑based) */
  activeStep?: number;
  /** Default active step (uncontrolled) */
  defaultActiveStep?: number;
  /** Callback when step changes */
  onStepChange?: (stepIndex: number) => void;
  /** Orientation (default: horizontal) */
  orientation?: StepperOrientation;
  /** Visual variant (default: glass) */
  variant?: 'default' | 'glass';
  /** Size variant (default: md) */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export interface StepperStepProps {
  /** Step index (injected by Stepper) */
  index?: number;
  /** Step item (injected by Stepper) */
  step?: StepItem;
  /** Children (injected by Stepper) */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}