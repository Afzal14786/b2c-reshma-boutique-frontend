'use client';
import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/products/ProductForm/ProductForm';
import { Button } from '@repo/ui';
import { ArrowLeft } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with back button */}
      <div className="flex items-start gap-4">
        <Button
          variant="grayGlass"
          size="sm"
          onClick={() => router.push('/dashboard/products')}
          aria-label="Go back to products"
          className="mt-1"
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold italic text-primary dark:text-primary/90 tracking-wide">
            Create New Product
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-secondary/80 mt-1 font-light italic tracking-wide">
            Fill in the details below to add a new product to your catalog.
          </p>
        </div>
      </div>

      <ProductForm
        onSuccess={() => router.push('/dashboard/products')}
        onCancel={() => router.push('/dashboard/products')}
      />
    </div>
  );
}