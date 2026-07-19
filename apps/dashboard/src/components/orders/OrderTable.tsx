'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Eye, Truck, FileText, Download } from 'lucide-react';
import {
  DataTable,
  StatusBadge,
  Button,
  Badge,
  Select,
} from '@repo/ui';
import type { Order } from '@repo/shared';

// ─── Props ──────────────────────────────────────────────────────

interface OrderTableProps {
  orders: Order[];
  loading: boolean;
  onStatusUpdate: (orderId: string, newStatus: Order['orderStatus']) => Promise<void>;
  onDispatch: (orderId: string) => void;
  onInvoice: (orderId: string) => void;
  onExport?: () => void;
  onRowClick?: (order: Order) => void;
}

// ─── Status options ────────────────────────────────────────────

const statusOptions = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'RETURN_REQUESTED', label: 'Return Requested' },
  { value: 'RETURNED', label: 'Returned' },
];

// ─── Component ─────────────────────────────────────────────────

export const OrderTable = ({
  orders,
  loading,
  onStatusUpdate,
  onDispatch,
  onInvoice,
  onExport,
  onRowClick,
}: OrderTableProps) => {
  const [updating, setUpdating] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: Order['orderStatus']) => {
    setUpdating(orderId);
    try {
      await onStatusUpdate(orderId, newStatus);
    } finally {
      setUpdating(null);
    }
  };

  // ─── Columns ──────────────────────────────────────────────────

  const columns = [
    {
      key: 'orderNumber',
      header: 'Order #',
      render: (item: Order) => (
        <span className="font-mono text-sm text-text-primary dark:text-text-primary/90">
          {item.orderNumber}
        </span>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (item: Order) => (
        <div>
          <p className="font-medium text-text-primary dark:text-text-primary/90">
            {item.user?.firstname} {item.user?.lastname}
          </p>
          <p className="text-xs text-text-secondary dark:text-text-secondary/70">
            {item.user?.email}
          </p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (item: Order) => (
        <span className="text-sm text-text-secondary dark:text-text-secondary/80">
          {format(new Date(item.createdAt), 'dd MMM yyyy, HH:mm')}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: Order) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={item.orderStatus} variant="order" />
          {updating === item.id && (
            <span className="inline-block w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      ),
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (item: Order) => (
        <Badge
          variant={
            item.paymentStatus === 'PAID' ? 'success'
            : item.paymentStatus === 'FAILED' || item.paymentStatus === 'REFUNDED' ? 'error'
            : 'warning'
          }
        >
          {item.paymentStatus}
        </Badge>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      render: (item: Order) => (
        <span className="font-semibold text-text-primary dark:text-text-primary/90">
          ₹{item.pricing.totalAmount.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Order) => (
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* View */}
          <Link href={`/dashboard/orders/${item.id}`}>
            <Button variant="glass" size="sm" aria-label="View order">
              <Eye size={16} />
            </Button>
          </Link>

          {/* Status update dropdown (inline) */}
          <Select
            value={item.orderStatus}
            onChange={(e) => handleStatusChange(item.id, e.target.value as Order['orderStatus'])}
            options={statusOptions}
            variant="glass"
            size="sm"
            className="min-w-[120px]"
            disabled={updating === item.id}
          />

          {/* Dispatch */}
          {(item.orderStatus === 'PROCESSING' || item.orderStatus === 'SHIPPED') && (
            <Button
              variant="glass"
              size="sm"
              onClick={() => onDispatch(item.id)}
              aria-label="Dispatch"
            >
              <Truck size={16} />
            </Button>
          )}

          {/* Invoice */}
          <Button
            variant="glass"
            size="sm"
            onClick={() => onInvoice(item.id)}
            aria-label="Download invoice"
          >
            <FileText size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Export button (optional) */}
      {onExport && (
        <div className="flex justify-end mb-3">
          <Button
            variant="glass"
            size="sm"
            onClick={onExport}
            icon={<Download size={16} />}
          >
            Export Sales Report
          </Button>
        </div>
      )}
      <DataTable
        data={orders}
        columns={columns}
        loading={loading}
        onRowClick={onRowClick}
        className="min-h-[300px]"
      />
    </div>
  );
};