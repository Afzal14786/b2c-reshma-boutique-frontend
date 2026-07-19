'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import { Price } from '../Price';
import { QuantitySelector } from '../QuantitySelector';
import { Button } from '../Button';
import { Card } from '../Card';
import type { CartItemResponse, AttributeValue } from '@repo/shared';

export interface CartItemProps {
  item: CartItemResponse;
  onUpdateQuantity: (productId: string, quantity: number, selectedAttributes?: Record<string, AttributeValue>) => void;
  onRemove: (productId: string, selectedAttributes?: Record<string, AttributeValue>) => void;
  className?: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  className = '',
}) => {
  const { product, quantity, selectedAttributes, itemTotal, error } = item;

  if (!product) {
    return (
      <div className={cn('flex items-center gap-3 p-3 text-text-secondary/70', className)}>
        <span className="text-sm">Product no longer available</span>
        <Button variant="ghost" size="sm" onClick={() => onRemove('', selectedAttributes)}>
          Remove
        </Button>
      </div>
    );
  }

  const imageUrl = product.images?.[0]?.url || '/placeholder.png';

  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(product._id, newQuantity, selectedAttributes);
  };

  const handleRemove = () => {
    onRemove(product._id, selectedAttributes);
  };

  const isOutOfStock = !product.inStock || product.stockQuantity === 0;

  return (
    <Card variant="glass" className={cn('p-3 sm:p-4', className)}>
      <div className="flex gap-3 sm:gap-4">
        {/* Image */}
        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-btn overflow-hidden bg-surface-tint/20">
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-1">
            <h4 className="text-sm font-medium text-text-primary truncate">{product.name}</h4>
            <Price amount={itemTotal} size="sm" className="text-sm font-semibold" />
          </div>

          {/* Attributes */}
          {selectedAttributes && Object.keys(selectedAttributes).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {Object.entries(selectedAttributes).map(([key, value]) => (
                <span
                  key={key}
                  className="text-xs px-1.5 py-0.5 bg-surface-tint/30 rounded-full text-text-secondary"
                >
                  {key}: {String(value)}
                </span>
              ))}
            </div>
          )}

          {/* Error message */}
          {error && <p className="text-xs text-error mt-1">{error}</p>}

          {/* Quantity & Remove */}
          <div className="flex items-center gap-2 mt-2">
            <QuantitySelector
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={isOutOfStock ? 0 : product.stockQuantity}
              disabled={isOutOfStock}
              size="sm"
            />
            {isOutOfStock && (
              <span className="text-xs text-error font-medium">Out of stock</span>
            )}
            <Button variant="ghost" size="sm" onClick={handleRemove} className="text-text-secondary/60 hover:text-error">
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};