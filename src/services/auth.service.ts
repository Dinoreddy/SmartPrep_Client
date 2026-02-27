/**
 * auth.service.ts
 * ---------------
 * Business logic layer for auth.
 * Calls authApi and updates the Zustand store with the user object.
 *
 * Token strategy: httpOnly cookies only.
 * The server sets accessToken + refreshToken cookies on login/refresh.
 * The browser sends them automatically on every request (withCredentials: true).
 * The frontend never reads, stores, or manually attaches tokens.
 */

import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import type { LoginPayload, RegisterPayload, User } from "@/models/auth";

export const authService = {
  /**
   * Register a new user.
   * The server now sets httpOnly cookies on registration (same as login).
   * We store the user in the auth store so the session is immediately active.
   */
  async register(payload: RegisterPayload): Promise<User> {
    console.log("[auth.service] register → payload:", payload);
    const response = await authApi.register(payload);
    console.log("[auth.service] register ← response:", response.data);
    const { user } = response.data.data;
    useAuthStore.getState().setUser(user);
    return user;
  },

  /**
   * Log in — server sets httpOnly cookies automatically.
   * We only persist the user object so the UI knows who's logged in.
   */
  async login(payload: LoginPayload): Promise<User> {
    console.log("[auth.service] login → payload:", payload);
    const response = await authApi.login(payload);
    console.log("[auth.service] login ← response:", response.data);
    const { user } = response.data.data;
    useAuthStore.getState().setUser(user);
    return user;
  },

  /**
   * Log out — server clears the cookies.
   * We clear the user from the store.
   */
  async logout(): Promise<void> {
    console.log("[auth.service] logout → calling API");
    try {
      const response = await authApi.logout();
      console.log("[auth.service] logout ← response:", response.data);
    } finally {
      // Always clear client state, even if the server call fails
      useAuthStore.getState().clearAuth();
      console.log("[auth.service] logout ← store cleared");
    }
  },
};
