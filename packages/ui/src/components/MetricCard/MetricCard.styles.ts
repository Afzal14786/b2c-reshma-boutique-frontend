import { cva } from 'class-variance-authority';

export const metricCardVariants = cva(
  'transition-all duration-300 flex flex-col',
  {
    variants: {
      variant: {
        glass: 'glass rounded-card',
        solid: 'bg-surface border border-border rounded-card shadow-soft',
        outline: 'bg-transparent border-2 border-border rounded-card',
      },
      size: {
        sm: 'p-4 gap-1',
        md: 'p-5 gap-1.5',
        lg: 'p-6 gap-2',
      },
    },
    defaultVariants: {
      variant: 'glass',
      size: 'md',
    },
  },
);