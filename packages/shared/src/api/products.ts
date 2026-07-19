import { apiClient } from './client';
import { Product, CreateProductRequest, UpdateProductRequest } from '../types';

export const productsApi = {
  // Public
  getProducts: (params?: {
    page?: number;
    limit?: number;
    itemType?: string;
    mainCategory?: string;
    subCategory?: string;
    sort?: string;
    q?: string;
  }) =>
    apiClient.get<{ products: Product[]; total: number; page: number; limit: number }>('/products', { params }),

  getProductById: (id: string) =>
    apiClient.get<Product>(`/products/${id}`),

  // Admin
  createProduct: (data: CreateProductRequest) =>
    apiClient.post<Product>('/products', data),

  updateProduct: (id: string, data: UpdateProductRequest) =>
    apiClient.patch<Product>(`/products/${id}`, data),

  deleteProduct: (id: string) =>
    apiClient.delete<{ message: string }>(`/products/${id}`),
};