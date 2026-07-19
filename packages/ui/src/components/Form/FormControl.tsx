'use client';
import React from 'react';
import { useFormField } from './FormField';
import type { FormControlProps } from './Form.types';

export const FormControl: React.FC<FormControlProps> = ({ children }) => {
  const { field, fieldState } = useFormField();

  const child = React.Children.only(children) as React.ReactElement;

  const childProps = {
    ...field,
    'aria-invalid': fieldState.invalid,
  };

  return React.cloneElement(child, childProps);
};