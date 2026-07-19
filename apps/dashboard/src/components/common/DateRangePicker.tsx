'use client';
import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 p-4 sm:p-5 glass rounded-card ${className}`}>
      <Calendar size={18} className="text-text-secondary/60 flex-shrink-0" />
      <div className="flex items-center gap-2 flex-wrap">
        <label className="text-sm font-medium text-text-secondary dark:text-text-secondary/80">From:</label>
        <input
          type="date"
          className="px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-btn text-sm text-text-primary dark:text-text-primary/90 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(91,155,213,0.2)] outline-none transition-all duration-200"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <label className="text-sm font-medium text-text-secondary dark:text-text-secondary/80">To:</label>
        <input
          type="date"
          className="px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-btn text-sm text-text-primary dark:text-text-primary/90 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(91,155,213,0.2)] outline-none transition-all duration-200"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </div>
    </div>
  );
};