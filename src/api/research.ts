import { api } from './client';
import type { Research } from '../app/context/AppContext';

export const researchApi = {
  getAll: () => api.get<Research[]>('/research'),
  getById: (id: string) => api.get<Research>(`/research/${id}`),
  getMine: () => api.get<Research[]>('/research/my'),
  create: (data: unknown) => api.post<Research>('/research', data),
  analytics: () => api.get<unknown>('/research/analytics'),
  trends: () => api.get<unknown>('/research/trends'),
  expertiseMap: () => api.get<unknown>('/research/expertise-map'),
};