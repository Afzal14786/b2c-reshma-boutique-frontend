"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { DataTable, StatusBadge, Button, useToast } from "@repo/ui";
import { productsApi, type Product } from "@repo/shared";
import { Edit, Trash2 } from "lucide-react";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { ConfirmationModal } from "../common/ConfirmationModal";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productPendingDelete, setProductPendingDelete] =
    useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { addToast } = useToast();

  // ─── Delete flow ────────────────────────────────────────────
  // Row action just opens the confirmation modal; the actual API
  // call only happens once the admin confirms inside it.
  const handleDeleteRequest = useCallback((product: Product) => {
    setProductPendingDelete(product);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!productPendingDelete) return;
    setDeleting(true);
    try {
      await productsApi.deleteProduct(productPendingDelete._id);
      addToast({
        message: `"${productPendingDelete.name}" was deleted.`,
        variant: "success",
      });
      onProductUpdated();
      setProductPendingDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
      addToast({
        message: "Failed to delete product. Please try again.",
        variant: "error",
      });
    } finally {
      setDeleting(false);
    }
  }, [productPendingDelete, onProductUpdated, addToast]);

  // ─── Columns ──────────────────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Product",
        render: (item: Product) => (
          <div className="flex items-center gap-2">
            {item.images?.[0] ? (
              <img
                src={item.images[0]}
                alt={item.name}
                loading="lazy"
                width={40}
                height={40}
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
      { key: "mainCategory", header: "Category" },
      { key: "itemType", header: "Type" },
      {
        key: "basePrice",
        header: "Price",
        render: (item: Product) => `₹${item.basePrice.toFixed(2)}`,
      },
      {
        key: "currentStock",
        header: "Stock",
        render: (item: Product) => (
          <span
            className={item.currentStock < 10 ? "text-error font-medium" : ""}
          >
            {item.currentStock}
          </span>
        ),
      },
      {
        key: "isActive",
        header: "Status",
        render: (item: Product) => (
          <StatusBadge
            status={item.isActive ? "ACTIVE" : "INACTIVE"}
            variant="default"
          />
        ),
      },
      {
        key: "actions",
        header: "Actions",
        render: (item: Product) => (
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href={`/dashboard/products/${item._id}`}>
              <Button
                variant="glass"
                size="sm"
                aria-label={`Edit ${item.name}`}
              >
                <Edit size={16} />
              </Button>
            </Link>
            <Button
              variant="glass"
              size="sm"
              onClick={() => handleDeleteRequest(item)}
              aria-label={`Delete ${item.name}`}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ),
      },
    ],
    [handleDeleteRequest],
  );

  return (
    <>
      <DataTable
        data={products}
        columns={columns}
        loading={loading}
        className="min-h-[300px]"
        getRowKey={(item) => item._id}
        onRowClick={(item) => setSelectedProduct(item)}
      />
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <ConfirmationModal
        isOpen={!!productPendingDelete}
        onClose={() => setProductPendingDelete(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        variant="danger"
        title="Delete this product?"
        message={
          productPendingDelete
            ? `"${productPendingDelete.name}" will be removed from the public catalog and hidden from this list. This action cannot be undone from the dashboard yet.`
            : undefined
        }
        confirmText="Delete"
      />
    </>
  );
};
