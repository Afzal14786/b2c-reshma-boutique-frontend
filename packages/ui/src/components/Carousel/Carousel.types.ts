import type { ReactNode } from 'react';

export interface Slide {
  content: ReactNode;
  id?: string | number;
}

export interface BreakpointMap {
  [key: string]: number;
}

export interface CarouselProps {
  slides: Slide[];
  slidesPerView?: number | BreakpointMap;
  autoPlay?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  onSlideChange?: (index: number) => void;
  className?: string;
  glass?: boolean;
}