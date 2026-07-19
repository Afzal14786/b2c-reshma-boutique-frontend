'use client';
import Link from 'next/link';
import { DataTable, StatusBadge, Button } from '@repo/ui';
import { productsApi, type Product } from '@repo/shared';
import { Edit, Trash2, Package } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onProductUpdated: () => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  onProductUpdated,
}) => {
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productsApi.deleteProduct(id);
      onProductUpdated();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

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
            <p className="font-medium text-text-primary dark:text-text-primary/90">{item.name}</p>
            <p className="text-xs text-text-secondary dark:text-text-secondary/70">{item.sku}</p>
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

  if (!loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)] backdrop-blur-sm border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] rounded-card shadow-soft">
        <Package size={48} className="text-text-secondary/40 dark:text-text-secondary/30 mb-4" />
        <h3 className="text-lg font-serif font-medium text-primary dark:text-primary/90">No products found</h3>
        <p className="text-sm text-text-secondary dark:text-text-secondary/70 mt-1">
          Try adjusting your search or filters, or add a new product.
        </p>
      </div>
    );
  }

  return (
    <DataTable
      data={products}
      columns={columns}
      loading={loading}
      className="min-h-[300px]"
    />
  );
};