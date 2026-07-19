'use client';

import { Search as SearchInput } from '@repo/ui';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

export const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  className = '',
}: SearchBarProps) => {
  return (
    <SearchInput
      placeholder={placeholder}
      value={value}
      onSearch={onSearch}
      onClear={() => onChange?.('')}
      className={className}
      inputSize="md"
      variant="glass"
    />
  );
};