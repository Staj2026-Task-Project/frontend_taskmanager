import type { UserRole } from "../types/user.types";

const TOKEN_KEY = "token";

export interface JwtPayload {
  sub?: string;
  username?: string;
  role?: UserRole;
  roles?: UserRole[] | string[];
  authorities?: Array<string | { authority: string }>;
  userId?: number;
  id?: number;
  exp?: number;
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function getCurrentUserPayload(): JwtPayload | null {
  const token = getAuthToken();

  if (!token) {
    return null;
  }

  return decodeJwtPayload(token);
}

export function getCurrentUserRole(): UserRole | null {
  const payload = getCurrentUserPayload();

  if (!payload) {
    return null;
  }

  if (payload.role === "ROLE_ADMIN" || payload.role === "ROLE_USER") {
    return payload.role;
  }

  const roles = payload.roles;

  if (Array.isArray(roles)) {
    const role = roles.find(
      (item) => item === "ROLE_ADMIN" || item === "ROLE_USER"
    );

    if (role === "ROLE_ADMIN" || role === "ROLE_USER") {
      return role;
    }
  }

  const authorities = payload.authorities;

  if (Array.isArray(authorities)) {
    const authority = authorities
      .map((item) => (typeof item === "string" ? item : item.authority))
      .find((item) => item === "ROLE_ADMIN" || item === "ROLE_USER");

    if (authority === "ROLE_ADMIN" || authority === "ROLE_USER") {
      return authority;
    }
  }

  return null;
}

export function getCurrentUserId(): number | null {
  const payload = getCurrentUserPayload();

  if (!payload) {
    return null;
  }

  return payload.userId ?? payload.id ?? null;
}
