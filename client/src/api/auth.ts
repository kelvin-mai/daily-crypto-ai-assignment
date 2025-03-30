import { API_URL } from '../lib/utils/env';
import type { AuthUser, UserDocument } from '../lib/types/api';
import { throwIfApiError } from '../lib/utils/api';

export type AuthParams = {
  email: string;
  password: string;
  name: string;
};

type AuthResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

export const register = async ({ email, password, name }: AuthParams) => {
  const request = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
  const response: AuthResponse = await request.json();
  throwIfApiError(request, response);
  return response;
};

export const login = async ({ email, password }: Omit<AuthParams, 'name'>) => {
  const request = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
  const response: AuthResponse = await request.json();
  throwIfApiError(request, response);
  return response;
};

export const getProfile = async () => {
  console.log('getProfile');
  const request = await fetch(`${API_URL}/api/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const response: UserDocument = await request.json();
  throwIfApiError(request, response);
  return response;
};
