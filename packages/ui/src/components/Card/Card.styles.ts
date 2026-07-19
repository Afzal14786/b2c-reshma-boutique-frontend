import { cva } from 'class-variance-authority';

export const cardVariants = cva(
  'rounded-card overflow-hidden transition-all duration-300',
  {
    variants: {
      variant: {
        // Solid – clean, basic
        solid: `
          bg-surface
          border border-border
          shadow-soft
        `,
        // Glass – frosted glass
        glass: `
          glass
          shadow-glass
          hover:shadow-glass-hover
        `,
        // Elevated – with hover lift
        elevated: `
          bg-surface
          border border-border
          shadow-md
          hover:shadow-xl hover:-translate-y-1
        `,
        // Outline – transparent with border
        outline: `
          bg-transparent
          border-2 border-border
        `,
        // Product card – glassy with subtle lift
        product: `
          glass
          hover:shadow-glass-hover hover:-translate-y-1
        `,
        // Dashboard card – with left accent
        dashboard: `
          glass
          border-l-4 border-l-secondary
          hover:shadow-glass-hover
        `,
        // Cover – with image cover area
        cover: `
          bg-surface
          border border-border
          shadow-soft
          hover:shadow-xl hover:-translate-y-1
        `,
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hoverable: {
        true: `
          hover:shadow-xl hover:-translate-y-1
        `,
      },
    },
    defaultVariants: {
      variant: 'solid',
      padding: 'md',
      hoverable: false,
    },
  },
);