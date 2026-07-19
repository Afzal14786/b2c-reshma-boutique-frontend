'use client'
import React from 'react';
import { cn } from '../../utils/cn';

// ─── Icons ──────────────────────────────────────────────────────

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export const CarouselControls: React.FC<{
  onPrev: () => void;
  onNext: () => void;
  goToSlide: (index: number) => void;
  currentIndex: number;
  totalPages: number;
  showArrows?: boolean;
  showDots?: boolean;
  glass?: boolean;
}> = ({
  onPrev,
  onNext,
  goToSlide,
  currentIndex,
  totalPages,
  showArrows = true,
  showDots = true,
  glass = true,
}) => {
  if (totalPages <= 1) return null;

  const buttonClasses = cn(
    'p-2 rounded-full shadow-md transition-all duration-200 hover:scale-105',
    glass ? 'glass border border-glass-border' : 'bg-surface border border-border',
  );

  return (
    <>
      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={onPrev}
            className={cn('absolute left-2 top-1/2 -translate-y-1/2 z-10', buttonClasses)}
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={onNext}
            className={cn('absolute right-2 top-1/2 -translate-y-1/2 z-10', buttonClasses)}
            aria-label="Next slide"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && totalPages > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                i === currentIndex ? 'w-6 bg-secondary' : 'bg-border/50 hover:bg-border/80',
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
};