import { api } from './client';

export type BackendRole = 'ADMIN' | 'RESEARCHER' | 'FUNDER' | 'MANAGER' | 'DEPARTMENT_HEAD';

export interface AuthUserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  department?: string;
  institution?: string;
  orcid?: string;
  position?: string;
  profilePicture?: string;
  expertise?: string[];
  publications?: number;
  citations?: number;
  hIndex?: number;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: AuthUserDto;
  mfaRequired?: boolean;
  mfaCode?: string;
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