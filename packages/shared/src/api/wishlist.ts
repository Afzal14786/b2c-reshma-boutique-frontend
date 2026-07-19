import { apiClient } from './client';
import { Wishlist, AddWishlistItemRequest, MoveToCartRequest } from '../types';

export const wishlistApi = {
  getWishlist: () =>
    apiClient.get<{ wishlist: Wishlist }>('/wishlists'),

  addItem: (data: AddWishlistItemRequest) =>
    apiClient.post<{ wishlist: Wishlist }>('/wishlists/add', data),

  moveToCart: (productId: string, data: MoveToCartRequest) =>
    apiClient.post<{ wishlist: Wishlist }>(`/wishlists/move-to-cart/${productId}`, data),

  removeItem: (productId: string) =>
    apiClient.delete<{ wishlist: Wishlist }>(`/wishlists/item/${productId}`),

  clearWishlist: () =>
    apiClient.delete<{ message: string }>('/wishlists/clear'),
};