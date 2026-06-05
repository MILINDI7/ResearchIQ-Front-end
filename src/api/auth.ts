import { api } from './client';
import type { User } from '../app/context/AppContext';

export type BackendRole = 'ADMIN' | 'RESEARCHER' | 'FUNDER' | 'MANAGER' | 'DEPARTMENT_HEAD';

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: BackendRole;
}

export const authApi = {
  login: (email: string, password: string, mfaCode?: string) =>
    api.post<AuthResponse>('/auth/login', {
      email,
      password,
      ...(mfaCode ? { mfaCode } : {}),
    }),

  signup: (data: SignupData) =>
    api.post<AuthResponse>('/auth/signup', data),
};