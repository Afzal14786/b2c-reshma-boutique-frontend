export interface PaginationProps {
  /** Current active page (1‑based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Number of visible page buttons (default: 5) */
  siblingCount?: number;
}