import { api } from './client';
import type { CollaborationRequest } from '../app/context/AppContext';

export const requestsApi = {
  discover: () => api.get<unknown[]>('/collaboration/discover'),
  collaborators: () => api.get<unknown[]>('/collaboration/collaborators'),

  sendCollaboration: (data: unknown) =>
    api.post<CollaborationRequest>('/collaboration/requests', data),

  incomingCollaboration: () =>
    api.get<CollaborationRequest[]>('/collaboration/requests/incoming'),

  sentCollaboration: () =>
    api.get<CollaborationRequest[]>('/collaboration/requests/sent'),

  fundingProjects: () => api.get<unknown[]>('/funding/projects'),
  fundingInterests: () => api.get<unknown[]>('/funding/interests'),
  sendFundingInterest: (data: unknown) => api.post<unknown>('/funding/interests', data),
  opportunities: () => api.get<unknown[]>('/funding/opportunities'),
};