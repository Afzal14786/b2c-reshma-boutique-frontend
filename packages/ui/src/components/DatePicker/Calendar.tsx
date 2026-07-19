import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import type { CalendarProps } from './DatePicker.types';

// ─── Helpers ────────────────────────────────────────────────────

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const isSameDay = (d1: Date, d2: Date): boolean =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

// ─── Icons ──────────────────────────────────────────────────────

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  initialMonth = new Date(),
  variant = 'single',
  className = '',
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(initialMonth);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    if (minDate && selectedDate < minDate) return;
    if (maxDate && selectedDate > maxDate) return;

    if (variant === 'single') {
      onChange?.(selectedDate);
    } else {
      // Range selection (simplified: just set the start date)
      onChange?.(selectedDate as any);
    }
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const yearName = year;
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Build day grid
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className={cn('w-72 p-3 glass rounded-card shadow-glass', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="glass"
          size="sm"
          onClick={handlePrevMonth}
          className="p-1 min-w-[32px]"
        >
          <ChevronLeftIcon />
        </Button>
        <span className="text-sm font-semibold text-primary">
          {monthName} {yearName}
        </span>
        <Button
          variant="glass"
          size="sm"
          onClick={handleNextMonth}
          className="p-1 min-w-[32px]"
        >
          <ChevronRightIcon />
        </Button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-text-secondary mb-2">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) return <div key={index} />;

          const date = new Date(year, month, day);
          const isSelected = value instanceof Date && isSameDay(date, value);
          const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
              className={cn(
                'h-8 w-8 flex items-center justify-center rounded-full text-sm transition-colors duration-150',
                isSelected && 'bg-secondary text-text-inverse',
                !isSelected && !isDisabled && 'hover:bg-surface-tint/30 text-text-primary',
                isDisabled && 'opacity-40 cursor-not-allowed text-text-secondary/60',
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};