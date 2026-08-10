import { cva } from 'class-variance-authority';

export const modalSizeVariants = {
  sm: 'max-w-sm max-h-[90vh]',
  md: 'max-w-md max-h-[90vh]',
  lg: 'max-w-2xl max-h-[90vh]',
  xl: 'max-w-4xl max-h-[90vh]',
  full: 'max-w-[95vw] max-h-[95vh]',
};

export const modalTransition = {
  enter: 'transition-all duration-300 ease-out transform scale-95 opacity-0',
  enterActive: 'scale-100 opacity-100',
  exit: 'transition-all duration-200 ease-in transform scale-100 opacity-100',
  exitActive: 'scale-95 opacity-0',
};