import { LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';
import { setAuthToken, removeAuthToken } from '../utils/token';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.gendev.dev';

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to login');
  }

  const data = await response.json();
  setAuthToken(data.token);
  return data;
}

export async function signupUser(credentials: SignupCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to signup');
  }

  const data = await response.json();
  setAuthToken(data.token);
  return data;
}

export async function logoutUser(): Promise<void> {
  removeAuthToken();
}

export async function getCurrentUser(): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get current user');
  }

  return response.json();
}