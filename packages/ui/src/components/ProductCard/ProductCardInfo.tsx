'use client'
import React from 'react';
import { Price } from '../Price';
import { Button } from '../Button';
import type { ProductCardInfoProps } from './ProductCard.types';

export const ProductCardInfo: React.FC<ProductCardInfoProps> = ({
  name,
  subCategory,
  basePrice,
  discount,
  onAddToCart,
  product,
}) => {
  return (
    <div className="p-4 space-y-2">
      <h3 className="font-medium text-text-primary dark:text-text-primary/90 truncate text-sm sm:text-base">
        {name}
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary dark:text-text-secondary/70 truncate">
        {subCategory}
      </p>
      <div className="flex items-center justify-between mt-1">
        <Price amount={basePrice} discount={discount} size="sm" />
        {onAddToCart && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAddToCart(product)}
            className="text-xs px-3 py-1.5"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};