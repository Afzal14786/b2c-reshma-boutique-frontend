'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { productsApi, type Product } from '@repo/shared';
import { Button, Pagination } from '@repo/ui';
import { ProductTable } from './ProductTable';
import { SearchBar, FilterBar } from '@/components/common';
import { Plus } from 'lucide-react';
import { useToast } from "@repo/ui";

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
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({
    itemType: '',
    mainCategory: '',
  });
  const pageSize = 10;
  const { addToast } = useToast();
  // ─── Fetch products ──────────────────────────────────────────

  const fetchProducts = useCallback(async () => {
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
      setTotal(res.data.meta.total);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      addToast({ message: 'Failed to load products. Please try again.', variant: 'error' });
      setProducts([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, filters, addToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ─── Handlers ─────────────────────────────────────────────────

  // filter's are not working means they are not working as exected 
  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({ itemType: '', mainCategory: '' });
    setPage(1);
    setSearch('');
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

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
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <SearchBar
          placeholder="Search products..."
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
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};