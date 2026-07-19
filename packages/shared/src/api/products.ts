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
    apiClient.get<{ products: Product[]; total: number; page: number; limit: number }>(
      '/products',
      { params },
    ),

  getProductById: (id: string) => apiClient.get<Product>(`/products/${id}`),
  // admin 
  createProduct: (data: FormData) =>
    apiClient.post<Product>('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  updateProduct: (id: string, data: FormData) =>
    apiClient.patch<Product>(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteProduct: (id: string) =>
    apiClient.delete<{ message: string }>(`/products/${id}`),
};