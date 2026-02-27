/**
 * auth.api.ts
 * -----------
 * Raw HTTP calls for the auth domain.
 * No side-effects, no store interaction — just axios + types.
 */

import api from "@/lib/axios";
import type {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RefreshResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/models/auth";

export const authApi = {
  /**
   * POST /auth/register
   * Returns the created user — NO tokens issued.
   */
  register: (payload: RegisterPayload) =>
    api.post<RegisterResponse>("/auth/register", payload),

  /**
   * POST /auth/login
   * Returns user + accessToken + refreshToken.
   * Server also sets httpOnly cookies automatically.
   */
  login: (payload: LoginPayload) =>
    api.post<LoginResponse>("/auth/login", payload),

  /**
   * POST /auth/logout  [PROTECTED]
   * Clears server-side session and cookies.
   * Access token required (sent via cookie or Authorization header).
   */
  logout: () => api.post<LogoutResponse>("/auth/logout"),

  /**
   * POST /auth/refresh-token
   * Obtains new access + refresh tokens using the current refresh token.
   * The old refresh token is immediately invalidated (token rotation).
   * Body is only needed for cross-origin (cookie mode is automatic).
   */
  refreshToken: (refreshToken?: string) =>
    api.post<RefreshResponse>(
      "/auth/refresh-token",
      refreshToken ? { refreshToken } : {},
    ),
};
