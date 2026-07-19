"use client";
import React from "react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-[rgba(246,246,246,0.6)] dark:bg-[rgba(30,30,30,0.55)] backdrop-blur-[20px] saturate-[140%] dark:backdrop-blur-[30px] dark:saturate-[150%] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-card shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <label className="text-sm font-medium text-text-secondary dark:text-text-secondary/80">
        From:
      </label>
      <input
        type="date"
        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)] backdrop-blur-sm border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-btn text-sm text-text-primary dark:text-text-primary/90 focus:border-secondary dark:focus:border-secondary-light focus:shadow-[0_0_0_3px_rgba(91,155,213,0.2)] outline-none transition-all duration-200"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
      />
      <label className="text-sm font-medium text-text-secondary dark:text-text-secondary/80">
        To:
      </label>
      <input
        type="date"
        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)] backdrop-blur-sm border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-btn text-sm text-text-primary dark:text-text-primary/90 focus:border-secondary dark:focus:border-secondary-light focus:shadow-[0_0_0_3px_rgba(91,155,213,0.2)] outline-none transition-all duration-200"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
      />
    </div>
  );
};
