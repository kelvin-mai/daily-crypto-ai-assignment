import { API_URL } from '../lib/utils/env';
import { AuthUser, UserDocument } from '../lib/types/api';

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
  try {
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
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const login = async ({ email, password }: Omit<AuthParams, 'name'>) => {
  try {
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
    console.log('login request', request);
    const response: AuthResponse = await request.json();
    console.log('login response', response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getProfile = async () => {
  try {
    const request = await fetch(`${API_URL}/api/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const response: UserDocument = await request.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};
