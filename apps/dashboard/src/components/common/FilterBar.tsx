'use client';

import { Select } from '@repo/ui';
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
  value?: string;
}

interface FilterBarProps {
  filters: FilterConfig[];
  onFilterChange: (key: string, value: string) => void;
  onClearAll?: () => void;
  className?: string;
  showClearAll?: boolean;
}

export const FilterBar = ({
  filters,
  onFilterChange,
  onClearAll,
  className = '',
  showClearAll = true,
}: FilterBarProps) => {
  const hasActiveFilters = filters.some((f) => f.value && f.value !== '');

  return (
    <div className={`flex items-center gap-3 px-4 py-2 glass rounded-card ${className}`}>
      <Filter size={18} className="text-text-secondary/60 flex-shrink-0" />
      {filters.map((filter) => (
        <div key={filter.key} className="flex items-baseline gap-2">
          <label className="text-sm text-text-secondary whitespace-nowrap">
            {filter.label}:
          </label>
          <Select
            value={filter.value || ''}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            options={filter.options}
            placeholder={filter.placeholder || 'All'}
            variant="glass"
            size="sm"
            className="min-w-[120px]"
          />
        </div>
      ))}
      {showClearAll && hasActiveFilters && onClearAll && (
        <button
          onClick={onClearAll}
          className="flex items-center gap-1 text-sm text-text-secondary/70 hover:text-primary transition-colors"
        >
          <X size={14} />
          Clear all
        </button>
      )}
    </div>
  );
};