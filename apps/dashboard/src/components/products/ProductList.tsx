'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productsApi, type Product } from '@repo/shared';
import { Button, Pagination } from '@repo/ui';
import { ProductTable } from './ProductTable';
import { SearchBar, FilterBar } from '@/components/common';
import { Plus } from 'lucide-react';

// ─── Filter configuration ───────────────────────────────────────

const filterConfigs = [
  {
    key: 'itemType',
    label: 'Type',
    options: [
      { value: '', label: 'All Types' },
      { value: 'BANGLE', label: 'Bangle' },
      { value: 'APPAREL', label: 'Apparel' },
      { value: 'FABRIC', label: 'Fabric' },
      { value: 'INNERWEAR', label: 'Innerwear' },
      { value: 'ACCESSORY', label: 'Accessory' },
    ],
  },
  {
    key: 'mainCategory',
    label: 'Category',
    options: [
      { value: '', label: 'All Categories' },
      { value: 'Sarees', label: 'Sarees' },
      { value: 'Apparel', label: 'Apparel' },
      { value: 'Accessories', label: 'Accessories' },
      { value: 'Innerwear', label: 'Innerwear' },
      { value: 'Bangles', label: 'Bangles' },
    ],
  },
];

// ─── Component ──────────────────────────────────────────────────

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({
    itemType: '',
    mainCategory: '',
  });
  const pageSize = 10;

  // ─── Fetch products ──────────────────────────────────────────

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productsApi.getProducts({
        page,
        limit: pageSize,
        q: search || undefined,
        itemType: filters.itemType || undefined,
        mainCategory: filters.mainCategory || undefined,
      });
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, filters]);

  // ─── Handlers ─────────────────────────────────────────────────

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({ itemType: '', mainCategory: '' });
    setPage(1);
    setSearch('');
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // ─── Render ──────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold italic text-primary dark:text-primary/90">
            Products
          </h1>
          <p className="text-text-secondary dark:text-text-secondary/80 text-sm">
            Manage your product catalog
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Button
            variant="primary"
            size="md"
            icon={<Plus size={18} />}
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          placeholder="Search products..."
          value={search}
          onSearch={handleSearch}
          className="flex-1"
        />
        <FilterBar
          filters={filterConfigs.map((f) => ({
            ...f,
            value: filters[f.key] || '',
          }))}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearFilters}
          className="flex-1"
        />
      </div>

      {/* Table */}
      <ProductTable
        products={products}
        loading={loading}
        onProductUpdated={fetchProducts}
      />

      {/* Pagination */}
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
};