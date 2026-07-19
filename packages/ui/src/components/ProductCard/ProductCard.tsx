'use client'
import React from 'react';
import { Card } from '../Card';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardInfo } from './ProductCardInfo';
import type { ProductCardProps } from './ProductCard.types';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const images = product.images?.length ? product.images : ['/placeholder.png'];

  return (
    <Card
      variant="glass"
      className="group overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      <ProductCardImage
        images={images}
        name={product.name}
        discount={product.discount}
        isWishlisted={isWishlisted}
        onToggleWishlist={onToggleWishlist}
        product={product}
      />
      <ProductCardInfo
        name={product.name}
        subCategory={product.subCategory}
        basePrice={product.basePrice}
        discount={product.discount}
        onAddToCart={onAddToCart}
        product={product}
      />
    </Card>
  );
};