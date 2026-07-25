'use client';
import Link from 'next/link';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { DataTable, Badge, Button } from '@repo/ui';
import type { Return } from '@repo/shared'; 

interface ReturnTableProps {
  returns: Return[] | any[];
  loading: boolean;
}

export const ReturnTable = ({ returns, loading }: ReturnTableProps) => {
  // ─── Columns ──────────────────────────────────────────────────

  const columns = [
    {
      key: 'returnNumber',
      header: 'Return Ref',
      render: (item: any) => (
        <span className="font-mono text-sm text-text-primary dark:text-text-primary/90">
          {item.returnNumber || `#${item._id?.slice(-6).toUpperCase()}`}
        </span>
      ),
    },
    {
      key: 'orderId',
      header: 'Order Ref',
      render: (item: any) => (
        <span className="font-mono text-sm text-text-secondary dark:text-text-secondary/80">
          {typeof item.orderId === 'object' 
            ? item.orderId?._id?.slice(-6).toUpperCase() 
            : item.orderId?.slice(-6).toUpperCase()}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (item: any) => (
        <span className="text-sm text-text-secondary dark:text-text-secondary/80">
          {item.createdAt ? format(new Date(item.createdAt), 'dd MMM yyyy, HH:mm') : 'N/A'}
        </span>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      align: 'center' as const,
      render: (item: any) => (
        <span className="text-sm text-text-secondary dark:text-text-secondary/80">
          {item.items?.length || 0}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => (
        <Badge
          variant={
            item.status === 'COMPLETED' ? 'success'
            : (item.status === 'FAILED' || item.status === 'REJECTED') ? 'error'
            : item.status === 'PENDING' ? 'warning'
            : 'default' // APPROVED (Ready for refund)
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (item: any) => (
        <div className="flex items-center justify-end gap-1.5 flex-wrap">
          <Link href={`/dashboard/returns/${item._id || item.id}`}>
            <Button variant="glass" size="sm" aria-label="View return">
              <Eye size={16} />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        data={returns}
        columns={columns}
        loading={loading}
        className="min-h-[300px]"
      />
    </div>
  );
};