import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-full font-medium 
   cursor-pointer transition-all duration-200 
   focus:outline-none focus:ring-2 focus:ring-offset-2 
   disabled:opacity-50 disabled:cursor-not-allowed
   border border-transparent
   shadow-sm hover:shadow-md`,
  {
    variants: {
      variant: {
        // Primary action – uses `secondary` color (blue)
        primary: `
          bg-secondary text-text-inverse 
          hover:bg-secondary/80 hover:shadow-lg 
          active:scale-[0.97]
          border-secondary/30
          focus:ring-secondary/50
        `,
        // Secondary action – uses `accent` color (purple/mint)
        secondary: `
          bg-accent text-text-inverse 
          hover:bg-accent/80 hover:shadow-lg 
          active:scale-[0.97]
          border-accent/30
          focus:ring-accent/50
        `,
        // Outline – transparent with border
        outline: `
          bg-transparent text-secondary border-2 border-secondary 
          hover:bg-secondary/10 hover:shadow-md
          active:scale-[0.97]
          focus:ring-secondary/50
        `,
        // Ghost – no background, subtle hover
        ghost: `
          bg-transparent text-text-primary 
          hover:bg-surface-tint/30 
          active:scale-[0.97]
          border-transparent
          focus:ring-secondary/50
        `,
        // Glass – frosted glass (uses the CSS variable)
        glass: `
          glass
          text-text-primary
          hover:bg-glass/30 hover:shadow-lg
          active:scale-[0.97]
        `,
        // Gray Glass – glassy gray for secondary/cancel actions
        grayGlass: `
          bg-[rgba(200,200,200,0.3)] dark:bg-[rgba(100,100,100,0.3)]
          backdrop-blur-sm
          border border-glass-border
          text-text-primary dark:text-text-primary/90
          hover:bg-[rgba(200,200,200,0.5)] dark:hover:bg-[rgba(100,100,100,0.5)]
          hover:shadow-lg
          active:scale-[0.97]
        `,
      },
      size: {
        sm: 'px-4 py-1.5 text-sm min-h-[36px] gap-1.5',
        md: 'px-6 py-2.5 text-base min-h-[44px] gap-2',
        lg: 'px-8 py-3.5 text-lg min-h-[52px] gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);