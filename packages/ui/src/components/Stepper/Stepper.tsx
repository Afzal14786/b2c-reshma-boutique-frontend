'use client';
import React, { createContext, useContext, useState, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { StepperStep } from './StepperStep';
import type { StepperContextValue, StepperProps, StepItem } from './Stepper.types';

const StepperContext = createContext<StepperContextValue | null>(null);

export const useStepper = () => {
  const ctx = useContext(StepperContext);
  if (!ctx) throw new Error('useStepper must be used within Stepper');
  return ctx;
};

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep: controlledActiveStep,
  defaultActiveStep = 0,
  onStepChange,
  orientation = 'horizontal',
  variant = 'glass',
  size = 'md',
  className = '',
}) => {
  const isControlled = controlledActiveStep !== undefined;
  const [internalActiveStep, setInternalActiveStep] = useState(defaultActiveStep);
  const activeStep = isControlled ? controlledActiveStep : internalActiveStep;

  const handleStepClick = (index: number) => {
    if (steps[index]?.status === 'disabled') return;
    if (!isControlled) setInternalActiveStep(index);
    onStepChange?.(index);
  };

  const contextValue: StepperContextValue = {
    orientation,
    activeStep,
    steps,
    variant,
    size,
  };

  const orientationClasses = orientation === 'horizontal' ? 'flex flex-row' : 'flex flex-col';

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        className={cn(
          'relative',
          orientationClasses,
          variant === 'glass' && 'glass rounded-card p-6',
          className,
        )}
        role="list"
      >
        {steps.map((step, index) => (
          <StepperStep
            key={step.id}
            index={index}
            step={step}
            onClick={() => handleStepClick(index)}
          />
        ))}
      </div>
    </StepperContext.Provider>
  );
};