import { useState, useEffect, useCallback } from 'react';
import { wishlistApi } from '../api';
import { Wishlist, AddWishlistItemRequest, MoveToCartRequest } from '../types';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await wishlistApi.getWishlist();
      setWishlist(res.data.wishlist);
    } catch {
      setWishlist(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addItem = useCallback(async (data: AddWishlistItemRequest) => {
    const res = await wishlistApi.addItem(data);
    setWishlist(res.data.wishlist);
    return res.data.wishlist;
  }, []);

  const removeItem = useCallback(async (productId: string) => {
    const res = await wishlistApi.removeItem(productId);
    setWishlist(res.data.wishlist);
    return res.data.wishlist;
  }, []);

  const moveToCart = useCallback(async (productId: string, data: MoveToCartRequest) => {
    const res = await wishlistApi.moveToCart(productId, data);
    setWishlist(res.data.wishlist);
    return res.data.wishlist;
  }, []);

  const clearWishlist = useCallback(async () => {
    await wishlistApi.clearWishlist();
    setWishlist(null);
  }, []);

  return {
    wishlist,
    loading,
    refetch: fetchWishlist,
    addItem,
    removeItem,
    moveToCart,
    clearWishlist,
  };
};