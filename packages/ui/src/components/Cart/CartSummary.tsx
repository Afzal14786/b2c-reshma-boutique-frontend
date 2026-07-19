'use client'
import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { Input } from '../Input';
import { Spinner } from '../Spinner';

export interface CartSummaryProps {
  subtotal: number;
  discountAmount: number;
  totalAfterDiscount: number;
  appliedCoupon?: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onCheckout: () => void;
  loading?: boolean;
  showCouponInput?: boolean;
  checkoutDisabled?: boolean;
  className?: string;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  discountAmount,
  totalAfterDiscount,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout,
  loading = false,
  showCouponInput = true,
  checkoutDisabled = false,
  className = '',
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setCouponLoading(true);
      onApplyCoupon(couponCode.trim());
      setCouponLoading(false);
    }
  };

  const formatPrice = (amount: number) => `₹${amount.toFixed(2)}`;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Coupon Input */}
      {showCouponInput && !appliedCoupon && (
        <div className="flex gap-2">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e: any) => setCouponCode(e.target.value)}
            onKeyDown={(e: any) => e.key === 'Enter' && handleApplyCoupon()}
            disabled={loading}
            className="flex-1"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleApplyCoupon}
            disabled={loading || !couponCode.trim()}
            loading={couponLoading}
          >
            Apply
          </Button>
        </div>
      )}

      {/* Applied Coupon */}
      {appliedCoupon && (
        <div className="flex items-center justify-between p-2 glass rounded-card">
          <span className="text-sm font-medium text-success">Coupon applied: {appliedCoupon}</span>
          <Button variant="ghost" size="sm" onClick={onRemoveCoupon} className="text-text-secondary/60 hover:text-error">
            Remove
          </Button>
        </div>
      )}

      {/* Totals */}
      <div className="space-y-2 border-t border-glass-border pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-success">
            <span>Discount</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-bold text-primary">
          <span>Total</span>
          <span>{formatPrice(totalAfterDiscount)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        fullWidth
        onClick={onCheckout}
        disabled={checkoutDisabled || loading || totalAfterDiscount === 0}
        loading={loading}
        className="mt-2"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};