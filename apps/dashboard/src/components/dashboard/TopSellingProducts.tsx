'use client';
import React from 'react';
import { Card, DataTable } from '@repo/ui';

interface TopSellingProductsProps {
  products: Array<{ productId: string; name: string; totalSold: number; revenueGenerated: number }>;
}

export const TopSellingProducts: React.FC<TopSellingProductsProps> = ({ products }) => {
  const columns = [
    {
      key: 'name',
      header: 'Product',
      render: (item: any) => (
        <span className="font-medium text-text-primary dark:text-text-primary/90">{item.name}</span>
      ),
    },
    {
      key: 'totalSold',
      header: 'Sold',
      render: (item: any) => (
        <span className="text-text-secondary dark:text-text-secondary/80">{item.totalSold}</span>
      ),
    },
    {
      key: 'revenueGenerated',
      header: 'Revenue',
      render: (item: any) => (
        <span className="font-semibold text-secondary dark:text-secondary-light">
          ₹{item.revenueGenerated.toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <Card variant="glass" className="p-4 sm:p-5 rounded-card">
      <h3 className="font-serif text-lg font-medium text-primary dark:text-primary/90 mb-4">
        Top Selling Products
      </h3>
      {products.length === 0 ? (
        <p className="text-text-secondary dark:text-text-secondary/70 text-sm text-center py-6">
          No products sold in this period.
        </p>
      ) : (
        <DataTable
          data={products}
          columns={columns}
          className="max-h-64 overflow-y-auto"
        />
      )}
    </Card>
  );
};