import type { ReactNode } from 'react';
import type { CartItemResponse, AttributeValue } from '@repo/shared';

export interface CartProps {
  /** Cart items */
  items: CartItemResponse[];
  /** Subtotal (sum of all item totals) */
  subtotal: number;
  /** Total discount amount (from coupons) */
  discountAmount: number;
  /** Final total after discount */
  totalAfterDiscount: number;
  /** Applied coupon code (null if none) */
  appliedCoupon?: string | null;
  /** Callback when quantity changes */
  onUpdateQuantity: (productId: string, quantity: number, selectedAttributes?: Record<string, AttributeValue>) => void;
  /** Callback when item is removed */
  onRemoveItem: (productId: string, selectedAttributes?: Record<string, AttributeValue>) => void;
  /** Callback when coupon is applied */
  onApplyCoupon: (code: string) => void;
  /** Callback when coupon is removed */
  onRemoveCoupon: () => void;
  /** Callback when checkout is clicked */
  onCheckout: () => void;
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show coupon input (default: true) */
  showCouponInput?: boolean;
  /** Disable checkout button */
  checkoutDisabled?: boolean;
}