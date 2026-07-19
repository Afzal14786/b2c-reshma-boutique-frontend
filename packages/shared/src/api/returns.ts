import { apiClient } from './client';
import { Return, InitiateReturnRequest, ArbitrateReturnRequest } from '../types';

export const returnsApi = {
  // Customer
  initiateReturn: (orderId: string, data: InitiateReturnRequest) =>
    apiClient.post<Return>(`/returns/${orderId}/initiate`, data),

  getMyReturns: (params?: { page?: number; limit?: number }) =>
    apiClient.get<{ returns: Return[]; meta: { total: number; page: number; limit: number } }>('/returns/me', { params }),

  // Admin
  getAllReturns: (params?: { page?: number; limit?: number; status?: string }) =>
    apiClient.get<{ returns: Return[]; meta: { total: number; page: number; limit: number } }>('/returns/admin', { params }),

  arbitrateReturn: (returnId: string, data: ArbitrateReturnRequest) =>
    apiClient.patch<Return>(`/returns/admin/${returnId}/arbitrate`, data),

  processRefund: (returnId: string) =>
    apiClient.post<Return>(`/returns/admin/${returnId}/process`),
};