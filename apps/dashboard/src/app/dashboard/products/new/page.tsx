'use client';

import { useRouter } from 'next/navigation';
import { ProductForm } from '@/components/products/ProductForm';

export default function NewProductPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold italic text-primary dark:text-primary/90 tracking-wide">
          Create New Product
        </h1>
        <p className="text-sm text-text-secondary dark:text-text-secondary/80 mt-1 font-light italic tracking-wide">
          Fill in the details below to add a new product to your catalog.
        </p>
      </div>

      <ProductForm
        onSuccess={() => router.push('/dashboard/products')}
        onCancel={() => router.push('/dashboard/products')}
      />
    </div>
  );
}