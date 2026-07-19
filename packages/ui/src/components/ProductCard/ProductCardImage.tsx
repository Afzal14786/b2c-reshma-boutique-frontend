'use client'
import React, { useState } from 'react';
import type { ProductCardImageProps } from './ProductCard.types';

export const ProductCardImage: React.FC<ProductCardImageProps> = ({
  images,
  name,
  discount,
  isWishlisted,
  onToggleWishlist,
  product,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const totalImages = images.length;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative aspect-square overflow-hidden bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={images[currentIndex] || '/placeholder.png'}
        alt={`${name} - image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Navigation arrows */}
      {totalImages > 1 && isHovering && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[rgba(246,246,246,0.7)] dark:bg-[rgba(30,30,30,0.7)] backdrop-blur-sm border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] shadow-sm hover:bg-white dark:hover:bg-[rgba(50,50,50,0.8)] transition-all duration-200 z-10"
            aria-label="Previous image"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary dark:text-text-primary/90">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[rgba(246,246,246,0.7)] dark:bg-[rgba(30,30,30,0.7)] backdrop-blur-sm border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] shadow-sm hover:bg-white dark:hover:bg-[rgba(50,50,50,0.8)] transition-all duration-200 z-10"
            aria-label="Next image"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary dark:text-text-primary/90">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {totalImages > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToImage(index, e)}
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-200
                ${index === currentIndex ? 'bg-secondary w-3' : 'bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(0,0,0,0.5)] dark:hover:bg-[rgba(255,255,255,0.5)]'}
              `}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Wishlist button */}
      {onToggleWishlist && (
        <button
          onClick={() => onToggleWishlist(product)}
          className="absolute top-3 right-3 p-2 rounded-full bg-[rgba(246,246,246,0.6)] dark:bg-[rgba(30,30,30,0.6)] backdrop-blur-sm border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] hover:bg-white dark:hover:bg-[rgba(50,50,50,0.8)] transition-all duration-200 hover:scale-105 z-10"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isWishlisted ? '0' : '2'}
            className={`transition-colors duration-200 ${isWishlisted ? 'text-coral' : 'text-text-secondary/70 hover:text-coral'}`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      )}

      {/* Discount badge */}
      {discount && discount > 0 && (
        <span className="absolute top-3 left-3 bg-error text-text-inverse text-xs font-semibold px-2.5 py-1 rounded-btn shadow-soft z-10">
          {discount}% OFF
        </span>
      )}
    </div>
  );
};