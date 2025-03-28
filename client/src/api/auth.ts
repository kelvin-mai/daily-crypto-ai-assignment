import { API_URL } from '../lib/env';
import { AuthUser, UserDocument } from '../types/api';

type AuthResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

export const register = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
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
    localStorage.setItem('token', response.token);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
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
    const response: AuthResponse = await request.json();
    localStorage.setItem('token', response.token);
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
