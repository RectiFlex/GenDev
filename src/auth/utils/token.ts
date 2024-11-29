import { jwtDecode } from 'jwt-decode';

export function setAuthToken(token: string): void {
  localStorage.setItem('token', token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('token');
}

export function removeAuthToken(): void {
  localStorage.removeItem('token');
}

export function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode(token);
    if (!decoded || typeof decoded.exp === 'undefined') {
      return false;
    }
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}