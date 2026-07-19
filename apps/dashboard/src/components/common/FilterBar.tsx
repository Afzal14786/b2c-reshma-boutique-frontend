'use client';
import React from 'react';
import { Filter, X } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
  placeholder?: string;
}

interface FilterBarProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear?: () => void;
  className?: string;
  showClearAll?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  values,
  onChange,
  onClear,
  className = '',
  showClearAll = true,
}) => {
  const hasActiveFilters = Object.values(values).some((v) => v !== '');

  return (
    <div className={`flex flex-wrap items-center gap-3 p-4 glass rounded-card ${className}`}>
      <Filter size={18} className="text-text-secondary/60 flex-shrink-0" />
      {filters.map((filter) => (
        <div key={filter.key} className="flex items-center gap-2">
          <label className="text-sm text-text-secondary dark:text-text-secondary/80 whitespace-nowrap">
            {filter.label}:
          </label>
          <select
            value={values[filter.key] || ''}
            onChange={(e) => onChange(filter.key, e.target.value)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 glass rounded-btn text-sm text-text-primary dark:text-text-primary/90 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(91,155,213,0.2)] outline-none transition-all duration-200 min-w-[120px]"
          >
            <option value="">{filter.placeholder || 'All'}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
      {showClearAll && hasActiveFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-sm text-text-secondary/70 hover:text-primary transition-colors"
        >
          <X size={14} />
          Clear all
        </button>
      )}
    </div>
  );
};