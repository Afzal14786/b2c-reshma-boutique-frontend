"use client";
import { useEffect, useState } from "react";
import { productsApi, type Product } from "@repo/shared";
import { Button, Search, Pagination, Input } from "@repo/ui";
import { ProductTable } from "./ProductTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ itemType: "", mainCategory: "" });
  const pageSize = 10;

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, filters]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-serif font-semibold italic text-primary dark:text-primary/90">
            Products
          </h1>
          <p className="text-text-secondary dark:text-text-secondary/80 text-sm">
            Manage your product catalog
          </p>
        </div>
        <Link href="/dashboard/products/new">
          <Link href="/dashboard/products/new">
            <button
              className="
    inline-flex items-center justify-center gap-2
    px-6 py-2.5
    rounded-full
    bg-secondary text-text-inverse
    shadow-lg hover:shadow-xl
    transition-all duration-200
    hover:bg-secondary/80
    active:scale-[0.97]
    cursor-pointer
    font-medium text-base
    border border-secondary/30
    min-h-[44px]
  "
            >
              <Plus size={18} />
              Add Product
            </button>
          </Link>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 p-4 bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)] backdrop-blur-sm border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] rounded-card shadow-soft">
        <Search
          placeholder="Search products..."
          value={search}
          onSearch={setSearch}
          className="flex-1 min-w-[180px] max-w-sm shadow-lg hover:shadow-xl rounded-full"
        />
        <div className="flex items-center gap-3 flex-nowrap ml-auto">
          <Input
            label=""
            as="select"
            value={filters.itemType}
            onChange={(e) =>
              setFilters((f) => ({ ...f, itemType: e.target.value }))
            }
            className="w-auto min-w-[130px] flex-shrink-0"
          >
            <option value="">All Types</option>
            <option value="BANGLE">Bangle</option>
            <option value="APPAREL">Apparel</option>
            <option value="FABRIC">Fabric</option>
            <option value="INNERWEAR">Innerwear</option>
            <option value="ACCESSORY">Accessory</option>
          </Input>
          <Input
            label=""
            as="select"
            value={filters.mainCategory}
            onChange={(e) =>
              setFilters((f) => ({ ...f, mainCategory: e.target.value }))
            }
            className="w-auto min-w-[130px] flex-shrink-0"
          >
            <option value="">All Categories</option>
            <option value="Sarees">Sarees</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
            <option value="Innerwear">Innerwear</option>
            <option value="Bangles">Bangles</option>
          </Input>
          {(filters.itemType || filters.mainCategory) && (
            <button
              onClick={() => setFilters({ itemType: "", mainCategory: "" })}
              className="text-sm text-text-secondary dark:text-text-secondary/70 hover:text-primary underline transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <ProductTable
        products={products}
        loading={loading}
        onProductUpdated={fetchProducts}
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
};
