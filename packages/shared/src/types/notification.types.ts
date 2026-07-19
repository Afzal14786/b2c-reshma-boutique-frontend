export type NotificationType = 'SYSTEM' | 'ORDER' | 'PROMOTION' | 'SECURITY' | 'RETURN';

export interface Notification {
  id: string;
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
  updatedAt: string;
}