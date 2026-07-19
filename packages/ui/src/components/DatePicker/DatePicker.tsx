'use client';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '../../utils/cn';
import { Input } from '../Input';
import { Popover, PopoverTrigger, PopoverContent } from '../Popover';
import { Calendar } from './Calendar';
import type { DatePickerProps } from './DatePicker.types';

export const DatePicker: React.FC<DatePickerProps> = ({
  value = null,
  onChange,
  placeholder = 'Select date',
  format: dateFormat = 'dd/MM/yyyy',
  minDate,
  maxDate,
  className = '',
  glass = true,
  disabled = false,
  label,
  error = false,
  helperText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: Date | [Date, Date] | null) => {
    if (date === null) {
      onChange?.(null);
    } else if (date instanceof Date) {
      onChange?.(date);
    }
    // If date is an array (range), we ignore it for single variant
    setIsOpen(false);
  };

  const formattedValue = value ? format(value, dateFormat) : '';

  return (
    <div className={cn('w-full', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen} placement="bottom">
        <PopoverTrigger asChild>
          <Input
            label={label}
            value={formattedValue}
            placeholder={placeholder}
            readOnly
            disabled={disabled}
            error={error}
            helperText={helperText}
            className="cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto min-w-[unset]">
          <Calendar
            value={value}
            onChange={handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
            variant="single"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};