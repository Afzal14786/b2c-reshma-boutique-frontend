'use client';
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  debounce?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value: externalValue,
  onChange,
  onSearch,
  className = '',
  debounce = 300,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);

    // Debounced search
    if (onSearch) {
      clearTimeout((window as any).__searchTimeout);
      (window as any).__searchTimeout = setTimeout(() => {
        onSearch(newValue);
      }, debounce);
    }
  };

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
    onSearch?.('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search size={18} className="text-text-secondary/50" />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-11 pr-11 py-2.5 rounded-full glass text-sm text-text-primary dark:text-text-primary/90 placeholder:text-text-secondary/50 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(91,155,213,0.2)] outline-none transition-all duration-200"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary/50 hover:text-text-primary transition-colors"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};