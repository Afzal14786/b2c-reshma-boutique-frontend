import { apiClient } from './client';
import { DashboardMetrics, DateRangeQuery } from '../types';

export const dashboardApi = {
  getMetrics: (params?: DateRangeQuery) =>
    apiClient.get<DashboardMetrics>('/dashboard/metrics', { params }),
};