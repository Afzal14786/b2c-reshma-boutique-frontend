import { apiClient } from './client';
import {
  Order,
  CheckoutRequest,
  PaymentVerificationRequest,
  DispatchOrderRequest,
  UpdateOrderStatusRequest,
} from '../types';

export const ordersApi = {
  checkout: (data: CheckoutRequest) =>
    apiClient.post<{ order: Order }>('/orders/checkout', data),

  verifyPayment: (data: PaymentVerificationRequest) =>
    apiClient.post<{ order: Order }>('/orders/verify-payment', data),

  getMyOrders: () =>
    apiClient.get<{ orders: Order[] }>('/orders/my-order'),

  getInvoice: (orderId: string) =>
    apiClient.get<{ url: string }>(`/orders/${orderId}/invoice`), // might return URL or blob

  // Admin only
  getAllOrders: () =>
    apiClient.get<{ orders: Order[] }>('/orders/admin'),

  updateOrderStatus: (orderId: string, data: UpdateOrderStatusRequest) =>
    apiClient.patch<{ order: Order }>(`/orders/admin/${orderId}/status`, data),

  dispatchOrder: (orderId: string, data: DispatchOrderRequest) =>
    apiClient.post<{ order: Order }>(`/orders/admin/${orderId}/dispatch`, data),
};