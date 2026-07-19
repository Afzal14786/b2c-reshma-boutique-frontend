'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import { Card } from '../Card';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { CartEmpty } from './CartEmpty';
import { CartSkeleton } from './CartSkeleton';
import type { CartProps } from './Cart.types';

export const Cart: React.FC<CartProps> = ({
  items,
  subtotal,
  discountAmount,
  totalAfterDiscount,
  appliedCoupon,
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout,
  loading = false,
  error,
  emptyMessage = 'Your cart is empty',
  className = '',
  showCouponInput = true,
  checkoutDisabled = false,
}) => {
  // ─── Loading ──────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={cn('w-full max-w-2xl mx-auto', className)}>
        <Card variant="glass" className="p-4">
          <CartSkeleton />
        </Card>
      </div>
    );
  }

  // ─── Empty ───────────────────────────────────────────────────

  if (!items || items.length === 0) {
    return (
      <div className={cn('w-full max-w-2xl mx-auto', className)}>
        <Card variant="glass" className="p-6">
          <CartEmpty message={emptyMessage} />
        </Card>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────

  return (
    <div className={cn('w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6', className)}>
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-3">
        {items.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <Card variant="glass" className="p-4 sticky top-4">
          <CartSummary
            subtotal={subtotal}
            discountAmount={discountAmount}
            totalAfterDiscount={totalAfterDiscount}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={onApplyCoupon}
            onRemoveCoupon={onRemoveCoupon}
            onCheckout={onCheckout}
            loading={loading}
            showCouponInput={showCouponInput}
            checkoutDisabled={checkoutDisabled}
          />
        </Card>
      </div>
    </div>
  );
};