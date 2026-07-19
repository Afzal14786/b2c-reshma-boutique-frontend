import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: `
          bg-surface/60 backdrop-blur-sm
          border border-border
          text-text-primary placeholder:text-text-secondary/50
          hover:border-border/70
          focus:border-secondary focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]
        `,
        glass: `
          glass
          text-text-primary placeholder:text-text-secondary/50
          focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]
        `,
        filled: `
          bg-surface-tint/30
          border border-transparent
          text-text-primary placeholder:text-text-secondary/50
          hover:bg-surface-tint/40
          focus:bg-surface/80 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]
        `,
        outline: `
          bg-transparent
          border-2 border-border
          text-text-primary placeholder:text-text-secondary/50
          hover:border-border/70
          focus:border-secondary focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]
        `,
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded-full',
        md: 'px-4 py-2.5 text-base rounded-full',
        lg: 'px-5 py-3 text-lg rounded-full',
      },
      error: {
        true: 'border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(239,68,68,0.2)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      error: false,
    },
  },
);