import { apiClient } from './client';
import { Product } from '../types';

export const productsApi = {
  getProducts: (params?: {
    page?: number;
    limit?: number;
    itemType?: string;
    mainCategory?: string;
    subCategory?: string;
    sort?: string;
    q?: string;
  }) =>
    apiClient.get<{
      products: Product[];
      meta: { total: number; page: number; limit: number; totalPages: number };
    }>('/products', { params }),

  getProductById: (id: string) => apiClient.get<{ product: Product }>(`/products/${id}`),

  // admin
  createProduct: (data: FormData) =>
    apiClient.post<{ product: Product }>('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  updateProduct: (id: string, data: FormData) =>
    apiClient.patch<{ product: Product }>(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteProduct: (id: string) => apiClient.delete<null>(`/products/${id}`),
};