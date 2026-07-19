import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../api';
import { Product } from '../types';

export const useProducts = (params?: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await productsApi.getProducts(params);
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, total, refetch: fetchProducts };
};