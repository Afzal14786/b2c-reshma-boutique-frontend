'use client';
import React, { useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { TabsProps, TabItem } from './Tabs.types';

const sizeClasses = {
  sm: {
    tab: 'px-3 py-1.5 text-sm gap-1.5',
    indicator: 'h-0.5',
  },
  md: {
    tab: 'px-4 py-2 text-base gap-2',
    indicator: 'h-0.5',
  },
  lg: {
    tab: 'px-5 py-2.5 text-lg gap-2.5',
    indicator: 'h-1',
  },
};

const variantClasses = {
  underline: (active: boolean) =>
    cn(
      'border-b-2 transition-colors',
      active
        ? 'border-secondary text-primary'
        : 'border-transparent text-text-secondary hover:text-primary hover:border-border',
    ),
  pill: (active: boolean) =>
    cn(
      'rounded-full transition-all',
      active
        ? 'bg-secondary text-text-inverse shadow-soft'
        : 'text-text-secondary hover:text-primary hover:bg-surface-tint/30',
    ),
  boxed: (active: boolean) =>
    cn(
      'rounded-btn border transition-all',
      active
        ? 'bg-surface border-secondary text-primary shadow-soft'
        : 'border-transparent text-text-secondary hover:text-primary hover:border-border',
    ),
  glass: (active: boolean) =>
    cn(
      'rounded-btn transition-all glass',
      active
        ? 'bg-glass/70 text-primary shadow-glass'
        : 'text-text-secondary hover:text-primary hover:bg-glass/30',
    ),
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = 'underline',
  size = 'md',
  className = '',
  orientation = 'horizontal',
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || tabs[0]?.value || '');

  const activeValue = isControlled ? controlledValue : internalValue;

  const handleTabClick = useCallback(
    (tab: TabItem) => {
      if (tab.disabled) return;
      if (!isControlled) setInternalValue(tab.value);
      onChange?.(tab.value);
    },
    [isControlled, onChange],
  );

  const sizeConfig = sizeClasses[size] || sizeClasses.md;
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={cn(
        'flex',
        isVertical ? 'flex-col gap-1' : 'flex-row overflow-x-auto',
        className,
      )}
      role="tablist"
      aria-orientation={orientation}
    >
      {tabs.map((tab) => {
        const isActive = activeValue === tab.value;
        const variantClass = variantClasses[variant](isActive);

        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            disabled={tab.disabled}
            onClick={() => handleTabClick(tab)}
            className={cn(
              'inline-flex items-center justify-center font-medium transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2',
              'whitespace-nowrap',
              sizeConfig.tab,
              variantClass,
              tab.disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};