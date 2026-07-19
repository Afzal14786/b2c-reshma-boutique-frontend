/** @type {import('tailwindcss').Config} */
export default {
  // Enable dark mode via class on <html>
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // ── Cool Mist Palette ──
        navy: {
          DEFAULT: '#0F1A2C',
          light: '#1A2A44',
          dark: '#0A0F1A',
        },
        sky: {
          DEFAULT: '#5B9BD5',
          light: '#7BB5E0',
          dark: '#4A8AC0',
        },
        mint: {
          DEFAULT: '#6DD5C4',
          soft: '#A8E6D8',
          dark: '#4ECDB5',
        },
        lavender: {
          DEFAULT: '#C4B8D8',
          soft: '#E0D8EC',
          dark: '#B0A0C8',
        },
        // ── New Modern Palette (direct values) ──
        indigo: {
          DEFAULT: '#1E2A3A',
          light: '#2A3F5A',
          dark: '#141E2A',
        },
        coral: {
          DEFAULT: '#FF6B6B',
          light: '#FF8A8A',
          dark: '#E55555',
        },
        mint: {
          DEFAULT: '#4ECDC4',
          soft: '#A8E6CF',
          dark: '#3AB0A8',
        },
        rose: {
          DEFAULT: '#F4A7A7',
          soft: '#F8D0D0',
        },
        // ── Glass & UI Colors ──
        glass: 'rgba(255, 255, 255, 0.15)',
        'glass-border': 'rgba(255, 255, 255, 0.25)',
        'glass-dark': 'rgba(0, 0, 0, 0.15)',
        'glass-border-dark': 'rgba(0, 0, 0, 0.25)',

        // ── Semantic aliases (keep old names for compatibility) ──
        primary: 'var(--color-primary, #1E2A3A)',
        'primary-light': 'var(--color-primary-light, #2A3F5A)',
        secondary: 'var(--color-secondary, #FF6B6B)',
        'secondary-light': 'var(--color-secondary-light, #FF8A8A)',
        accent: 'var(--color-accent, #4ECDC4)',
        'accent-soft': 'var(--color-accent-soft, #A8E6CF)',
        'soft-feminine': 'var(--color-soft-feminine, #F4A7A7)',
        bg: 'var(--color-bg, #F8F6FA)',
        surface: 'var(--color-surface, #FFFFFF)',
        'surface-tint': 'var(--color-surface-tint, #F0EDF5)',
        'text-primary': 'var(--color-text-primary, #1E2A3A)',
        'text-secondary': 'var(--color-text-secondary, #6B7280)',
        'text-inverse': 'var(--color-text-inverse, #FFFFFF)',
        border: 'var(--color-border, #E5E0EB)',
        'border-focus': 'var(--color-border-focus, #FF6B6B)',
        success: 'var(--color-success, #4ECDC4)',
        warning: 'var(--color-warning, #F39C12)',
        error: 'var(--color-error, #FF6B6B)',
      },

      borderRadius: {
        card: 'var(--radius-card, 16px 16px 8px 16px)',
        btn: 'var(--radius-btn, 8px 24px 24px 24px)',
        input: 'var(--radius-input, 8px 12px 12px 12px)',
      },

      boxShadow: {
        soft: 'var(--shadow-soft, 0 8px 30px rgba(30, 42, 58, 0.08))',
        hover: 'var(--shadow-hover, 0 15px 40px rgba(255, 107, 107, 0.15))',
        glass: '0 8px 32px rgba(30, 42, 58, 0.10)',
        'glass-hover': '0 12px 48px rgba(30, 42, 58, 0.18)',
      },

      borderWidth: {
        alpona: '2px',
      },

      backdropBlur: {
        glass: '12px',
      },
    },
  },

  plugins: [],
};