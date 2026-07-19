import { apiClient } from './client';
import {
  Coupon,
  CreateCouponRequest,
  UpdateCouponRequest,
  CouponValidationResponse,
} from '../types';

export const couponApi = {
  // Public (authenticated users can view available)
  getAvailableCoupons: () =>
    apiClient.get<{ coupons: Coupon[] }>('/coupons/available'),

  // Admin only
  createCoupon: (data: CreateCouponRequest) =>
    apiClient.post<Coupon>('/coupons', data),

  updateCoupon: (id: string, data: UpdateCouponRequest) =>
    apiClient.patch<Coupon>(`/coupons/${id}`, data),

  getCoupons: (params?: { page?: number; limit?: number; isActive?: boolean }) =>
    apiClient.get<{ coupons: Coupon[]; total: number }>('/coupons', { params }),

  deleteCoupon: (id: string) => apiClient.delete(`/coupons/${id}`),

  validateCoupon: (code: string) =>
    apiClient.post<CouponValidationResponse>('/coupons/validate', { code }),
};