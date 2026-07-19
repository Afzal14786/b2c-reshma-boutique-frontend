import { apiClient } from './client';
import {
  Order,
  CheckoutRequest,
  PaymentVerificationRequest,
  DispatchOrderRequest,
  UpdateOrderStatusRequest,
} from '../types';

// Add this type for query params if not already defined
export interface GetAllOrdersParams {
  page?: number;
  limit?: number;
  q?: string;          // search query
  status?: string;     // order status
}

export const ordersApi = {
  checkout: (data: CheckoutRequest) =>
    apiClient.post<{ order: Order }>('/orders/checkout', data),

  verifyPayment: (data: PaymentVerificationRequest) =>
    apiClient.post<{ order: Order }>('/orders/verify-payment', data),

  getMyOrders: () =>
    apiClient.get<{ orders: Order[] }>('/orders/my-order'),

  getInvoice: (orderId: string) =>
    apiClient.get<{ url: string }>(`/orders/${orderId}/invoice`),

  getOrderById: (orderId: string) =>
    apiClient.get<{ order: Order }>(`/orders/${orderId}`), // fixed return type and still in process implementing in backend

  // Admin only – now accepts pagination/filtering params
  getAllOrders: (params?: GetAllOrdersParams) =>
    apiClient.get<{ orders: Order[]; total: number }>('/orders/admin', { params }),

  updateOrderStatus: (orderId: string, data: UpdateOrderStatusRequest) =>
    apiClient.patch<{ order: Order }>(`/orders/admin/${orderId}/status`, data),

  dispatchOrder: (orderId: string, data: DispatchOrderRequest) =>
    apiClient.post<{ order: Order }>(`/orders/admin/${orderId}/dispatch`, data),
};