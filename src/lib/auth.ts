
// Authentication token management

const ACCESS_TOKEN_KEY = 'superadmin_access_token';
const REFRESH_TOKEN_KEY = 'superadmin_refresh_token';
const USER_DATA_KEY = 'superadmin_user';

export interface User {
  email: string;
  name: string;
  userId: number;
}

export function setAuthTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
}

export function setUser(user: User): void {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
