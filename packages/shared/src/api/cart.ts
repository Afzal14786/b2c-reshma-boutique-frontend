import { apiClient } from './client';
import {
  CartResponse,
  AddItemRequest,
  UpdateItemRequest,
  MergeCartRequest,
} from '../types';

export const cartApi = {
  getCart: () => apiClient.get<CartResponse>('/cart'),

  addItem: (data: AddItemRequest) =>
    apiClient.post<CartResponse>('/cart/add', data),

  updateItem: (data: UpdateItemRequest) =>
    apiClient.patch<CartResponse>('/cart/update', data),

  removeItem: (productId: string) =>
    apiClient.delete<CartResponse>(`/cart/item/${productId}`),

  clearCart: () => apiClient.delete<{ message: string }>('/cart/clear'),

  mergeCart: (data: MergeCartRequest) =>
    apiClient.post<CartResponse>('/cart/merge', data),
};