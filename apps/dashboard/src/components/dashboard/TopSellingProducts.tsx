'use client';

import { Card, DataTable } from '@repo/ui';
import { Package } from 'lucide-react';

interface TopSellingProduct {
  productId: string;
  name: string;
  totalSold: number;
  revenueGenerated: number;
}

interface TopSellingProductsProps {
  products: TopSellingProduct[];
}

export const TopSellingProducts = ({ products }: TopSellingProductsProps) => {
  // ─── Columns for DataTable ──────────────────────────────────────

  const columns = [
    {
      key: 'name',
      header: 'Product',
      render: (item: TopSellingProduct) => (
        <span className="font-medium text-text-primary dark:text-text-primary/90">
          {item.name}
        </span>
      ),
    },
    {
      key: 'totalSold',
      header: 'Sold',
      align: 'center' as const,
      render: (item: TopSellingProduct) => (
        <span className="text-text-secondary dark:text-text-secondary/80">
          {item.totalSold}
        </span>
      ),
    },
    {
      key: 'revenueGenerated',
      header: 'Revenue',
      align: 'right' as const,
      render: (item: TopSellingProduct) => (
        <span className="font-semibold text-secondary dark:text-secondary-light">
          ₹{item.revenueGenerated.toFixed(2)}
        </span>
      ),
    },
  ];

  // ─── Empty state ─────────────────────────────────────────────────

  if (products.length === 0) {
    return (
      <Card variant="glass" className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
        <Package className="h-12 w-12 text-text-secondary/30 dark:text-text-secondary/20 mb-3" strokeWidth={1.5} />
        <p className="text-text-secondary/70 dark:text-text-secondary/60 text-sm">
          No products sold in this period.
        </p>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="p-4">
      <h3 className="font-serif text-lg font-medium text-primary dark:text-primary/90 mb-4">
        Top Selling Products
      </h3>
      <DataTable
        data={products}
        columns={columns}
        className="max-h-64 overflow-y-auto"
      />
    </Card>
  );
};