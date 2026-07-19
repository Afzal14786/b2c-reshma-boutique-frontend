'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productsApi, type Product } from '@repo/shared';
import { ProductForm } from '@/components/products/ProductForm';
import { Spinner } from '@repo/ui';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productsApi.getProductById(id);
        setProduct(res.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        router.push('/dashboard/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" variant="glass" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold italic text-primary dark:text-primary/90 tracking-wide">
          Edit Product
        </h1>
        <p className="text-sm text-text-secondary dark:text-text-secondary/80 mt-1 font-light italic tracking-wide">
          Update the details of <span className="font-medium text-primary">{product.name}</span>.
        </p>
      </div>

      <ProductForm
        initialData={product}
        onSuccess={() => router.push('/dashboard/products')}
        onCancel={() => router.push('/dashboard/products')}
      />
    </div>
  );
}