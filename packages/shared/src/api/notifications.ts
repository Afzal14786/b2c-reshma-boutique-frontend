import { apiClient } from './client';
import { Notification } from '../types';

export const notificationApi = {
  getMyNotifications: () =>
    apiClient.get<{ notifications: Notification[] }>('/notifications'),

  markRead: (notificationId: string) =>
    apiClient.patch<Notification>(`/notifications/${notificationId}/read`),
};