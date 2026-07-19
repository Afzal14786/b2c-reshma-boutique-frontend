'use client';

import Link from 'next/link';
import { DataTable, StatusBadge, Button } from '@repo/ui';
import { productsApi, type Product } from '@repo/shared';
import { Edit, Trash2 } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onProductUpdated: () => void;
}

export const ProductTable = ({
  products,
  loading,
  onProductUpdated,
}: ProductTableProps) => {
  // ─── Delete handler ────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productsApi.deleteProduct(id);
      onProductUpdated();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  // ─── Columns ──────────────────────────────────────────────────

  const columns = [
    {
      key: 'name',
      header: 'Product',
      render: (item: Product) => (
        <div className="flex items-center gap-2">
          {item.images?.[0] ? (
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-10 h-10 object-cover rounded-btn border border-glass-border"
            />
          ) : (
            <div className="w-10 h-10 bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)] rounded-btn flex items-center justify-center text-text-secondary/40 text-xs">
              No img
            </div>
          )}
          <div>
            <p className="font-medium text-text-primary dark:text-text-primary/90">
              {item.name}
            </p>
            <p className="text-xs text-text-secondary dark:text-text-secondary/70">
              {item.sku}
            </p>
          </div>
        </div>
      ),
    },
    { key: 'mainCategory', header: 'Category' },
    { key: 'itemType', header: 'Type' },
    {
      key: 'basePrice',
      header: 'Price',
      render: (item: Product) => `₹${item.basePrice.toFixed(2)}`,
    },
    {
      key: 'currentStock',
      header: 'Stock',
      render: (item: Product) => (
        <span className={item.currentStock < 10 ? 'text-error font-medium' : ''}>
          {item.currentStock}
        </span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (item: Product) => (
        <StatusBadge
          status={item.isActive ? 'ACTIVE' : 'INACTIVE'}
          variant="default"
        />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Product) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/products/${item.id}`}>
            <Button variant="glass" size="sm" aria-label={`Edit ${item.name}`}>
              <Edit size={16} />
            </Button>
          </Link>
          <Button
            variant="glass"
            size="sm"
            onClick={() => handleDelete(item.id)}
            aria-label={`Delete ${item.name}`}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      loading={loading}
      className="min-h-[300px]"
    />
  );
};