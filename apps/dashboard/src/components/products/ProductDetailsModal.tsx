'use client';

import Link from 'next/link';
import { Modal, Button, StatusBadge } from '@repo/ui';
import type { Product } from '@repo/shared';
import { Edit } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

// Small label/value pair used throughout the details grid below.
const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-text-secondary/60 mb-0.5">{label}</p>
    <p className="text-sm text-text-primary dark:text-text-primary/90">{value ?? '—'}</p>
  </div>
);

// Renders the fields that only exist on one specific discriminated itemType.
const TypeSpecificFields = ({ product }: { product: Product }) => {
  switch (product.itemType) {
    case 'BANGLE':
      return (
        <>
          <Field label="Bangle Sizes" value={product.bangleSizes?.join(', ')} />
          <Field label="Pack Size" value={product.packSize} />
        </>
      );
    case 'APPAREL':
      return (
        <>
          <Field label="Sizes" value={product.sizes?.join(', ')} />
          <Field label="Custom Tailoring" value={product.customTailoring ? 'Yes' : 'No'} />
          <Field label="Care Instructions" value={product.careInstructions} />
        </>
      );
    case 'FABRIC':
      return (
        <>
          <Field label="Length (meters)" value={product.lengthMeters} />
          <Field label="Custom Tailoring" value={product.customTailoring ? 'Yes' : 'No'} />
        </>
      );
    case 'INNERWEAR':
      return (
        <>
          <Field label="Cup Sizes" value={product.cupSizes?.join(', ')} />
          <Field label="Returnable" value={product.isReturnable ? 'Yes' : 'No'} />
        </>
      );
    case 'ACCESSORY':
      return <Field label="Size Details" value={product.sizeDetails} />;
    default:
      return null;
  }
};

export const ProductDetailsModal = ({ product, onClose }: ProductDetailsModalProps) => {
  if (!product) return null;

  const effectivePrice =
    product.discount > 0
      ? product.basePrice - (product.basePrice * product.discount) / 100
      : product.basePrice;

  return (
    <Modal
      isOpen={!!product}
      onClose={onClose}
      title={product.name}
      description={`SKU: ${product.sku}`}
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="grayGlass" onClick={onClose}>
            Close
          </Button>
          <Link href={`/dashboard/products/${product._id}`}>
            <Button variant="primary" icon={<Edit size={16} />}>
              Edit Product
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Images */}
        {product.images?.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {product.images.map((url, i) => (
              <img
                key={url}
                src={url}
                alt={`${product.name} ${i + 1}`}
                loading="lazy"
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-btn border border-glass-border flex-shrink-0"
              />
            ))}
          </div>
        )}

        {/* Status + category */}
        <div className="flex items-center gap-3">
          <StatusBadge status={product.isActive ? 'ACTIVE' : 'INACTIVE'} variant="default" />
          <span className="text-sm text-text-secondary">
            {product.mainCategory} &rsaquo; {product.subCategory}
          </span>
        </div>

        {/* Core details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Type" value={product.itemType} />
          <Field label="Material" value={product.material} />
          <Field label="Selling Unit" value={product.sellingUnit} />
          <Field
            label="Price"
            value={
              product.discount > 0 ? (
                <span>
                  <span className="line-through text-text-secondary/50 mr-1.5">
                    ₹{product.basePrice.toFixed(2)}
                  </span>
                  ₹{effectivePrice.toFixed(2)}
                  <span className="text-error ml-1">(-{product.discount}%)</span>
                </span>
              ) : (
                `₹${product.basePrice.toFixed(2)}`
              )
            }
          />
          <Field
            label="Stock"
            value={
              <span className={product.currentStock < 10 ? 'text-error font-medium' : ''}>
                {product.currentStock}
              </span>
            }
          />
          <Field label="Weight" value={`${product.weightGrams} g`} />
          <Field label="Fragile" value={product.isFragile ? 'Yes' : 'No'} />
          <Field label="Colors" value={product.colors?.join(', ')} />
          <Field label="Tags" value={product.tags?.join(', ')} />
          <Field label="HSN Code" value={product.hsnCode} />
          <Field label="Tax Profile" value={product.taxProfile} />
        </div>

        {/* Type-specific fields */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-border/50">
          <TypeSpecificFields product={product} />
        </div>

        {/* Ratings */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-border/50">
          <Field
            label="Rating"
            value={`${product.ratingsMetadata.averageRating.toFixed(1)} / 5 (${product.ratingsMetadata.totalReviews} reviews)`}
          />
          <Field label="Created" value={new Date(product.createdAt).toLocaleDateString()} />
          <Field label="Last Updated" value={new Date(product.updatedAt).toLocaleDateString()} />
        </div>
      </div>
    </Modal>
  );
};