import React, { isValidElement } from 'react';
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
  asChild = false,
}) => {
  const { close } = useDropdown();

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    onClick?.();
    close();
  };

  const baseClasses = cn(
    'flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors duration-150',
    'hover:bg-surface-tint/30 dark:hover:bg-surface-tint/20',
    'focus:outline-none focus:bg-surface-tint/30',
    disabled && 'opacity-50 cursor-not-allowed',
    danger ? 'text-error hover:text-error' : 'text-text-primary dark:text-text-primary/90',
    className,
  );

  if (asChild && isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn((children as React.ReactElement).props.className, baseClasses),
      onClick: (e: React.MouseEvent) => {
        if (disabled) return;
        (children as React.ReactElement).props.onClick?.(e);
        handleClick(e);
      },
    });
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={baseClasses}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
    </button>
  );
};