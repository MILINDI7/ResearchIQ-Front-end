import { api } from './client';
import type { Notification } from '../app/context/AppContext';

export const notificationsApi = {
  getAll: () => api.get<Notification[]>('/notifications'),
  unreadCount: () => api.get<{ count: number }>('/notifications/unread-count'),
};