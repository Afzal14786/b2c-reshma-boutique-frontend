'use client';

import { useEffect, useState } from 'react';
import { ordersApi, type Order } from '@repo/shared';
import { PageHeader, SearchBar, FilterBar } from '@/components/common';
import { OrderTable, DispatchForm } from '@/components/orders';
import { Pagination } from '@repo/ui';
import { useToast } from '@repo/ui';

// ─── Filter configuration ───────────────────────────────────────

const filterConfigs = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: '', label: 'All Statuses' },
      { value: 'PENDING', label: 'Pending' },
      { value: 'PROCESSING', label: 'Processing' },
      { value: 'SHIPPED', label: 'Shipped' },
      { value: 'DELIVERED', label: 'Delivered' },
      { value: 'CANCELLED', label: 'Cancelled' },
      { value: 'RETURN_REQUESTED', label: 'Return Requested' },
      { value: 'RETURNED', label: 'Returned' },
    ],
  },
];

// ─── Component ──────────────────────────────────────────────────

export default function OrdersPage() {
  const { addToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({ status: '' });
  const pageSize = 10;

  // ─── Dispatch modal state ──────────────────────────────────────

  const [dispatchOrderId, setDispatchOrderId] = useState<string | null>(null);

  // ─── Fetch orders ─────────────────────────────────────────────

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await ordersApi.getAllOrders({
        page,
        limit: pageSize,
        q: search || undefined,
        status: filters.status || undefined,
      });
      setOrders(res.data.orders);
      setTotal(res.data.total);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      addToast({
        title: 'Error',
        message: 'Failed to load orders. Please try again.',
        variant: 'error',
        duration: 5000,
      });
      setOrders([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, search, filters]);

  // ─── Handlers ──────────────────────────────────────────────────

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ status: '' });
    setPage(1);
    setSearch('');
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: Order['orderStatus']) => {
    await ordersApi.updateOrderStatus(orderId, { orderStatus: newStatus });
    await fetchOrders();
    addToast({
      title: 'Status Updated',
      message: `Order status changed to ${newStatus}.`,
      variant: 'success',
    });
  };

  const handleDispatch = (orderId: string) => {
    setDispatchOrderId(orderId);
  };

  const handleInvoice = async (orderId: string) => {
    try {
      const res = await ordersApi.getInvoice(orderId);
      if (res.data.url) {
        window.open(res.data.url, '_blank');
      } else {
        addToast({
          title: 'Invoice',
          message: 'Invoice URL not available.',
          variant: 'warning',
        });
      }
    } catch (error) {
      addToast({
        title: 'Error',
        message: 'Failed to generate invoice.',
        variant: 'error',
      });
    }
  };

  // ─── Render ──────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      <PageHeader
        title="Orders"
        subtitle="Manage and track customer orders"
      />

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <SearchBar
          placeholder="Search by order number or customer..."
          value={search}
          onSearch={handleSearch}
          className="w-full sm:w-auto sm:ml-auto"
        />
        <FilterBar
          filters={filterConfigs.map((f) => ({
            ...f,
            value: filters[f.key] || '',
          }))}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearFilters}
          className="w-full sm:w-auto sm:ml-auto"
        />
      </div>

      <OrderTable
        orders={orders}
        loading={loading}
        onStatusUpdate={handleStatusUpdate}
        onDispatch={handleDispatch}
        onInvoice={handleInvoice}
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

      {/* Dispatch Modal */}
      {dispatchOrderId && (
        <DispatchForm
          isOpen={!!dispatchOrderId}
          onClose={() => setDispatchOrderId(null)}
          orderId={dispatchOrderId}
          onSuccess={() => {
            setDispatchOrderId(null);
            fetchOrders();
          }}
        />
      )}
    </div>
  );
}