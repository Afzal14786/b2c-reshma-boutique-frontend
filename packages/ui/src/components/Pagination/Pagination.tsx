import React, { useMemo } from 'react';
import { Button } from '../Button';
import { cn } from '../../utils/cn';
import type { PaginationProps } from './Pagination.types';

// ─── Icons ────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}) => {
  // ─── Page range logic ────────────────────────────────────────

  const pageRange = useMemo(() => {
    const range: (number | 'ellipsis')[] = [];

    // Always show first page
    range.push(1);

    // Calculate start and end of sibling pages
    const start = Math.max(2, currentPage - siblingCount);
    const end = Math.min(totalPages - 1, currentPage + siblingCount);

    if (start > 2) range.push('ellipsis');
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) range.push(i);
    }
    if (end < totalPages - 1) range.push('ellipsis');

    if (totalPages > 1) range.push(totalPages);

    return range;
  }, [currentPage, totalPages, siblingCount]);

  // ─── Helpers ──────────────────────────────────────────────────

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirst) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!isLast) onPageChange(currentPage + 1);
  };

  // ─── Render ────────────────────────────────────────────────────

  return (
    <nav
      className={cn('flex items-center gap-1.5 sm:gap-2 flex-wrap', className)}
      role="navigation"
      aria-label="Pagination"
    >
      {/* Previous */}
      <Button
        variant="glass"
        size="sm"
        disabled={isFirst}
        onClick={handlePrevious}
        className="min-w-[36px] sm:min-w-[80px] justify-center"
        aria-label="Previous page"
      >
        <span className="sm:hidden"><ChevronLeftIcon /></span>
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Page numbers */}
      {pageRange.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span key={`ellipsis-${index}`} className="px-1 text-sm text-text-secondary/60 select-none">
              …
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <Button
            key={page}
            variant={isActive ? 'primary' : 'glass'}
            size="sm"
            onClick={() => onPageChange(page)}
            className="min-w-[36px] justify-center"
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </Button>
        );
      })}

      {/* Next */}
      <Button
        variant="glass"
        size="sm"
        disabled={isLast}
        onClick={handleNext}
        className="min-w-[36px] sm:min-w-[80px] justify-center"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden"><ChevronRightIcon /></span>
      </Button>
    </nav>
  );
};