import { api } from './client';
import type { User, PendingResearcher } from '../app/context/AppContext';

export const usersApi = {
  me: () => api.get<User>('/users/me'),
  getById: (id: string) => api.get<User>(`/users/${id}`),

  getAll: () => api.get<User[]>('/admin/users'),
  getPending: () => api.get<PendingResearcher[]>('/admin/pending-users'),
  createStaff: (data: unknown) => api.post<User>('/admin/staff', data),
  deleteUser: (id: string) => api.delete<void>(`/admin/users/${id}`),
};