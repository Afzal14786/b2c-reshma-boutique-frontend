import { useState, useEffect, useCallback } from 'react';
import { cartApi } from '../api';
import { CartResponse } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      const res = await cartApi.getCart();
      setCart(res.data);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = useCallback(async (data: any) => {
    const res = await cartApi.addItem(data);
    setCart(res.data);
    return res.data;
  }, []);

  const updateItem = useCallback(async (data: any) => {
    const res = await cartApi.updateItem(data);
    setCart(res.data);
    return res.data;
  }, []);

  const removeItem = useCallback(async (productId: string) => {
    const res = await cartApi.removeItem(productId);
    setCart(res.data);
    return res.data;
  }, []);

  const clearCart = useCallback(async () => {
    await cartApi.clearCart();
    setCart(null);
  }, []);

  const mergeCart = useCallback(async (items: any[]) => {
    const res = await cartApi.mergeCart({ items });
    setCart(res.data);
    return res.data;
  }, []);

  return {
    cart,
    loading,
    refetch: fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    mergeCart,
  };
};