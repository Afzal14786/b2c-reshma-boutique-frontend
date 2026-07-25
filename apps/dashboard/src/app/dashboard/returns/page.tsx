'use client';
import { useEffect, useState } from 'react';
import { returnsApi, type Return } from '@repo/shared'; 
import { PageHeader, FilterBar } from '@/components/common';
import { Pagination, useToast } from '@repo/ui';
import { ReturnTable } from '@/components/returns'; 

// ─── Filter configuration ────────────────
const filterConfigs = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: '', label: 'All Returns' },
      { value: 'PENDING', label: 'Pending' },
      { value: 'APPROVED', label: 'Approved' },
      { value: 'COMPLETED', label: 'Completed' },
      { value: 'REJECTED', label: 'Rejected' },
      { value: 'FAILED', label: 'Failed' },
    ],
  },
];

export default function ReturnsPage() {
  const { addToast } = useToast();

  const [returns, setReturns] = useState<Return[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({ status: 'PENDING' }); // Default pending par rakha hai
  const pageSize = 10;

  // ─── Fetch Data ─────────────────────────────────────────────
  const fetchReturns = async () => {
    setLoading(true);
    try {
      const res = await returnsApi.getAllReturns({
        page,
        limit: pageSize,
        status: filters.status || undefined,
      });
      setReturns(res.data.returns || []);
      setTotal(res.data.meta.total || 0); 
    } catch (error) {
      console.error('Failed to fetch returns:', error);
      addToast({
        title: 'Error',
        message: 'Failed to load return requests.',
        variant: 'error',
      });
      setReturns([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, [page, filters]);

  // ─── Handlers ──────────────────────────────────────────────────
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ status: '' });
    setPage(1);
  };

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      <PageHeader
        title="Returns"
        subtitle="Review, approve, and process customer return requests"
      />

      <div className="flex flex-col sm:flex-row items-center gap-3 justify-end">
        <FilterBar
          filters={filterConfigs.map((f) => ({
            ...f,
            value: filters[f.key] || '',
          }))}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearFilters}
          className="w-full sm:w-auto"
        />
      </div>

      <ReturnTable
        returns={returns}
        loading={loading}
      />

      {total > pageSize && (
        <div className="flex justify-end pt-2">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / pageSize)}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}