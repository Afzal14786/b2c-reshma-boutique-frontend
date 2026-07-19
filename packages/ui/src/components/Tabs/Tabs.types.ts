import type { ReactNode } from 'react';

export interface TabItem {
  /** Unique identifier for the tab */
  value: string;
  /** Label text */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Disable the tab */
  disabled?: boolean;
}

export type TabsVariant = 'underline' | 'pill' | 'boxed' | 'glass';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** Controlled active value */
  value?: string;
  /** Default active value (uncontrolled) */
  defaultValue?: string;
  /** Callback when tab changes */
  onChange?: (value: string) => void;
  /** Visual variant (default: underline) */
  variant?: TabsVariant;
  /** Size variant (default: md) */
  size?: TabsSize;
  /** Additional CSS classes */
  className?: string;
  /** Orientation (default: horizontal) – we can add vertical support later */
  orientation?: 'horizontal' | 'vertical';
}