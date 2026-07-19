import { cva } from 'class-variance-authority';

export const modalSizeVariants = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] max-h-[95vh]',
};

export const modalTransition = {
  enter: 'transition-all duration-300 ease-out transform scale-95 opacity-0',
  enterActive: 'scale-100 opacity-100',
  exit: 'transition-all duration-200 ease-in transform scale-100 opacity-100',
  exitActive: 'scale-95 opacity-0',
};