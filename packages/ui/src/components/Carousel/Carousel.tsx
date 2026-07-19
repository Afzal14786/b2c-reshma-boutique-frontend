'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { CarouselSlide } from './CarouselSlide';
import { CarouselControls } from './CarouselControls';
import type { CarouselProps, BreakpointMap } from './Carousel.types';

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  slidesPerView = 1,
  autoPlay = 0,
  loop = true,
  showArrows = true,
  showDots = true,
  onSlideChange,
  className = '',
  glass = true,
}) => {
  const totalSlides = slides.length;
  const isSingleSlide = totalSlides <= 1;

  // ─── Responsive slides per view ────────────────────────────────

  const getSlidesPerView = useCallback((): number => {
    if (typeof slidesPerView === 'number') return slidesPerView;
    const breakpoints = slidesPerView as BreakpointMap;
    const sorted = Object.entries(breakpoints).sort((a, b) => Number(a[0]) - Number(b[0]));
    // Find the highest breakpoint that matches
    let result = 1;
    for (const [bp, count] of sorted) {
      if (typeof window !== 'undefined' && window.innerWidth >= Number(bp)) {
        result = Number(count);
      }
    }
    return result;
  }, [slidesPerView]);

  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(() => getSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      setCurrentSlidesPerView(getSlidesPerView());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSlidesPerView]);

  // ─── State ──────────────────────────────────────────────────────

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalPages = Math.ceil(totalSlides / currentSlidesPerView);
  const maxIndex = Math.max(0, totalPages - 1);

  // ─── Handlers ──────────────────────────────────────────────────

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || isDragging) return;
      let target = index;
      if (loop) {
        if (target < 0) target = maxIndex;
        if (target > maxIndex) target = 0;
      } else {
        target = Math.max(0, Math.min(target, maxIndex));
      }
      if (target !== currentIndex) {
        setIsTransitioning(true);
        setCurrentIndex(target);
        onSlideChange?.(target);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    },
    [currentIndex, maxIndex, isTransitioning, isDragging, loop, onSlideChange],
  );

  const nextSlide = useCallback(() => {
    if (!loop && currentIndex >= maxIndex) return;
    goToSlide(currentIndex + 1);
  }, [currentIndex, maxIndex, goToSlide, loop]);

  const prevSlide = useCallback(() => {
    if (!loop && currentIndex <= 0) return;
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide, loop]);

  // ─── Auto‑play ──────────────────────────────────────────────────

  useEffect(() => {
    if (autoPlay > 0 && !isDragging) {
      timerRef.current = setTimeout(nextSlide, autoPlay);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [currentIndex, autoPlay, nextSlide, isDragging]);

  // ─── Drag handlers ──────────────────────────────────────────────

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isSingleSlide) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = dragStartX - clientX;
    if (Math.abs(diff) > 30) {
      if (diff > 0) nextSlide();
      else prevSlide();
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // ─── Render ──────────────────────────────────────────────────────

  if (totalSlides === 0) return null;

  const translateX = -currentIndex * 100;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${translateX}%)` }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {Array.from({ length: totalPages }).map((_, page) => (
          <div
            key={page}
            className="flex-shrink-0 w-full grid"
            style={{
              gridTemplateColumns: `repeat(${currentSlidesPerView}, 1fr)`,
              gap: '1rem',
            }}
          >
            {slides
              .slice(page * currentSlidesPerView, (page + 1) * currentSlidesPerView)
              .map((slide, idx) => (
                <CarouselSlide key={slide.id || idx}>{slide.content}</CarouselSlide>
              ))}
          </div>
        ))}
      </div>

      {(showArrows || showDots) && (
        <CarouselControls
          onPrev={prevSlide}
          onNext={nextSlide}
          goToSlide={goToSlide}
          currentIndex={currentIndex}
          totalPages={totalPages}
          showArrows={showArrows}
          showDots={showDots}
          glass={glass}
        />
      )}
    </div>
  );
};