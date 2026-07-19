import type { Product } from '@repo/shared';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export interface ProductCardImageProps {
  images: string[];
  name: string;
  discount?: number;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  product: Product;
}

export interface ProductCardInfoProps {
  name: string;
  subCategory: string;
  basePrice: number;
  discount?: number;
  onAddToCart?: (product: Product) => void;
  product: Product;
}