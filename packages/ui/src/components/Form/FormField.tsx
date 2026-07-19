'use client';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import type { FormFieldProps } from './Form.types';

interface FormFieldContextValue {
  field: {
    value: any;
    onChange: (...args: any[]) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<any>;
  };
  fieldState: {
    error?: { message?: string };
    isTouched: boolean;
    isDirty: boolean;
    invalid: boolean;
  };
  name: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

export const useFormField = () => {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) throw new Error('useFormField must be used within FormField');
  return ctx;
};

export const FormField: React.FC<FormFieldProps> = ({ name, children }) => {
  const { control } = useFormContext();

  // Workaround for React 19 + react-hook-form Controller type issues
  const ControllerComponent = Controller as any;

  return (
    <ControllerComponent
      name={name}
      control={control}
      render={({ field, fieldState }: { field: any; fieldState: any }) => (
        <FormFieldContext.Provider value={{ field, fieldState, name }}>
          {children}
        </FormFieldContext.Provider>
      )}
    />
  );
};