export interface PriceProps {
  /** The original/regular price */
  amount: number;
  /** Optional discount percentage (0-100) */
  discount?: number;
  /** Currency symbol (default: ₹) */
  currency?: string;
  /** Size variant (default: md) */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Show a "Sale" or "Save X%" badge (default: false) */
  showBadge?: boolean;
  /** Custom badge text (overrides auto-generated) */
  badgeText?: string;
  /** Variant style (default: default) */
  variant?: 'default' | 'sale' | 'strikethrough';
}