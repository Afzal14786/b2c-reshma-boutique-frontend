'use client'
import React from 'react';
import { cn } from '../../utils/cn';
import { useDropdown } from './Dropdown';
import type { DropdownItemProps } from './Dropdown.types';

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  icon,
  disabled = false,
  danger = false,
  onClick,
  className = '',
}) => {
  const { close } = useDropdown();

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    onClick?.();
    close();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors duration-150',
        'hover:bg-surface-tint/30 dark:hover:bg-surface-tint/20',
        'focus:outline-none focus:bg-surface-tint/30',
        disabled && 'opacity-50 cursor-not-allowed',
        danger ? 'text-error hover:text-error' : 'text-text-primary dark:text-text-primary/90',
        className,
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
    </button>
  );
};