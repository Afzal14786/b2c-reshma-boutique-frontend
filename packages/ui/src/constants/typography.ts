export const typography = {
  fontSizes: {
    xs: 'var(--font-xs)',
    sm: 'var(--font-sm)',
    base: 'var(--font-base)',
    lg: 'var(--font-lg)',
    xl: 'var(--font-xl)',
    '2xl': 'var(--font-2xl)',
    '3xl': 'var(--font-3xl)',
    '4xl': 'var(--font-4xl)',
    '5xl': 'var(--font-5xl)',
  },
  fontWeights: {
    light: 'var(--font-light)',
    normal: 'var(--font-normal)',
    medium: 'var(--font-medium)',
    semibold: 'var(--font-semibold)',
    bold: 'var(--font-bold)',
  },
  lineHeights: {
    none: 'var(--leading-none)',
    tight: 'var(--leading-tight)',
    snug: 'var(--leading-snug)',
    normal: 'var(--leading-normal)',
    relaxed: 'var(--leading-relaxed)',
    loose: 'var(--leading-loose)',
  },
} as const;