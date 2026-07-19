'use client'
import React, { useState } from 'react';
import { Card } from '../Card';
import { Pagination } from '../Pagination';
import { Skeleton } from '../Skeleton';
import { cn } from '../../utils/cn';
import type { DataTableProps } from './DataTable.types';

// ─── Inline SVG Icons ──────────────────────────────────────────

const ChevronUpIcon = ({ active }: { active: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(
      'transition-colors duration-200',
      active ? 'text-secondary' : 'text-text-secondary/30',
    )}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ChevronDownIcon = ({ active }: { active: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(
      'transition-colors duration-200',
      active ? 'text-secondary' : 'text-text-secondary/30',
    )}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const EmptySearchIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-text-secondary/40 dark:text-text-secondary/30"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ─── Component ──────────────────────────────────────────────────

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  loading = false,
  pagination,
  className = '',
  emptyMessage = 'No data available',
  rowClassName,
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortField === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(key);
      setSortOrder('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortField) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortOrder]);

  // ─── Loading State ────────────────────────────────────────────
  if (loading) {
    return (
      <Card variant="solid" className={`overflow-hidden ${className}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-surface-tint/20 border-b border-border">
              <tr>
                {columns.map((col) => (
                  <th key={col.key as string} className="py-3 px-3 text-left">
                    <Skeleton variant="text" className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-border/50">
                  {columns.map((col, j) => (
                    <td key={j} className="py-3 px-3">
                      <Skeleton variant="text" className="h-4 w-full max-w-[120px]" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  // ─── Empty State ──────────────────────────────────────────────
  if (data.length === 0) {
    return (
      <Card variant="solid" className={`p-8 flex flex-col items-center justify-center text-center ${className}`}>
        <EmptySearchIcon />
        <p className="text-text-secondary dark:text-text-secondary/70 text-sm mt-3">{emptyMessage}</p>
      </Card>
    );
  }

  // ─── Render ──────────────────────────────────────────────────
  return (
    <Card variant="solid" className={`overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-surface-tint/20 border-b border-border">
            <tr>
              {columns.map((col) => {
                const isSortable = col.sortable !== false;
                const isSorted = sortField === col.key;
                const align = col.align || 'left';
                const width = col.width ? `min-w-[${col.width}px]` : '';

                return (
                  <th
                    key={col.key as string}
                    className={cn(
                      'py-3.5 px-3 font-medium text-text-secondary dark:text-text-secondary/80',
                      'transition-colors duration-200',
                      isSortable && 'cursor-pointer hover:text-text-primary',
                      align === 'center' && 'text-center',
                      align === 'right' && 'text-right',
                      width,
                    )}
                    onClick={() => isSortable && handleSort(col.key as string)}
                    style={col.width ? { minWidth: col.width } : undefined}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.header}
                      {isSortable && (
                        <span className="inline-flex flex-col text-[10px] leading-none -space-y-0.5">
                          <ChevronUpIcon active={isSorted && sortOrder === 'asc'} />
                          <ChevronDownIcon active={isSorted && sortOrder === 'desc'} />
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const rowClass = cn(
                'border-b border-border/50 transition-colors duration-150',
                onRowClick && 'cursor-pointer hover:bg-surface-tint/30',
                rowClassName?.(item),
              );

              return (
                <tr key={index} className={rowClass} onClick={() => onRowClick?.(item)}>
                  {columns.map((col) => {
                    const align = col.align || 'left';
                    const className = cn(
                      'py-3 px-3 text-text-primary dark:text-text-primary/90',
                      align === 'center' && 'text-center',
                      align === 'right' && 'text-right',
                    );
                    return (
                      <td key={col.key as string} className={className}>
                        {col.render ? col.render(item) : item[col.key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex justify-end p-4 border-t border-border/50">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </Card>
  );
}