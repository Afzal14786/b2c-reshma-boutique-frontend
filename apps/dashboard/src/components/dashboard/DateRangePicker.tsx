'use client';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 glass rounded-card border border-glass-border shadow-glass">
      <label className="text-sm font-medium text-text-secondary dark:text-text-secondary/80">
        From:
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        className="px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-btn text-sm text-text-primary dark:text-text-primary/90 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(91,155,213,0.2)] outline-none transition-all duration-200"
      />
      <label className="text-sm font-medium text-text-secondary dark:text-text-secondary/80">
        To:
      </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        className="px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-btn text-sm text-text-primary dark:text-text-primary/90 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(91,155,213,0.2)] outline-none transition-all duration-200"
      />
    </div>
  );
};
