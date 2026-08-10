'use client';
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@repo/ui';

export const DarkModeToggle: React.FC = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun size={20} className="text-text-secondary hover:text-text-primary transition-colors" />
      ) : (
        <Moon size={20} className="text-text-secondary hover:text-text-primary transition-colors" />
      )}
    </button>
  );
};