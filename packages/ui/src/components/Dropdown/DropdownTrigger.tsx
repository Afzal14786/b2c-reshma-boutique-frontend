'use client';
import React, { cloneElement, isValidElement } from 'react';
import { cn } from '../../utils/cn';
import { useDropdown } from './Dropdown';
import type { DropdownTriggerProps } from './Dropdown.types';

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  asChild = false,
  className = '',
}) => {
  const { toggle, triggerRef, isOpen } = useDropdown();

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e);
        toggle();
      },
      'aria-expanded': isOpen,
      'aria-haspopup': true,
      className: cn(children.props.className, className),
    });
  }

  return (
    <button
      ref={triggerRef as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={toggle}
      aria-expanded={isOpen}
      aria-haspopup={true}
      className={cn(
        'inline-flex items-center justify-center',
        className,
      )}
    >
      {children}
    </button>
  );
};