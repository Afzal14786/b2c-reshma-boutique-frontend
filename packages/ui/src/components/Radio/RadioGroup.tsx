'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { Radio } from './Radio';
import type { RadioGroupProps, RadioOption, RadioSize } from './Radio.types';

// ─── Context ────────────────────────────────────────────────────

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange: (value: string) => void;
  size: RadioSize;
  error: boolean;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroup = () => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error('useRadioGroup must be used within RadioGroup');
  return ctx;
};

// ─── Component ──────────────────────────────────────────────────

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  options = [],
  orientation = 'vertical',
  size = 'md',
  error = false,
  className = '',
  label,
  name,
  disabled = false,
  children,
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (newValue: string) => {
      if (!isControlled) setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );

  const contextValue: RadioGroupContextValue = {
    name,
    value: currentValue,
    onChange: handleChange,
    size,
    error,
    disabled,
  };

  const orientationClasses = orientation === 'horizontal' ? 'flex flex-row flex-wrap gap-4' : 'flex flex-col gap-2';

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={cn('space-y-2', className)}>
        {label && (
          <span className={cn('block text-sm font-medium text-text-secondary', error && 'text-error')}>
            {label}
          </span>
        )}
        <div className={cn(orientationClasses)} role="radiogroup">
          {options.map((option: RadioOption) => (
            <Radio
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={option.disabled || disabled}
              size={size}
              error={error}
              checked={currentValue === option.value}
              onCheckedChange={() => handleChange(option.value)}
              name={name}
            />
          ))}
          {children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  );
};