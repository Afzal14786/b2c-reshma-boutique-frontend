'use client';
import React, { isValidElement, cloneElement } from 'react';
import { cn } from '../../utils/cn';
import { usePopover } from './Popover';
import type { PopoverTriggerProps } from './Popover.types';

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  children,
  asChild = false,
  className = '',
}) => {
  const { toggle, triggerRef, isOpen } = usePopover();

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