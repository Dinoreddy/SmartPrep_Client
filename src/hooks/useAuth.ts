/**
 * useAuth.ts
 * ----------
 * React Query hooks for auth operations.
 * Components import these hooks — they never touch authService or authApi directly.
 *
 * Exports:
 *   useLogin()     → useMutation for login
 *   useRegister()  → useMutation for register
 *   useLogout()    → useMutation for logout
 *   useCurrentUser() → reads the user from Zustand (no network call needed)
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { routes } from "@/routes/paths";
import type { LoginPayload, RegisterPayload } from "@/models/auth";

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const authKeys = {
  user: ["auth", "user"] as const,
};

// ─── useLogin ─────────────────────────────────────────────────────────────────

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (user) => {
      // Seed the React Query cache so any useCurrentUser consumer is up to date
      queryClient.setQueryData(authKeys.user, user);
      navigate(routes.dashboard);
    },
  });
}

// ─── useRegister ──────────────────────────────────────────────────────────────
// NOTE: No onSuccess navigation here — the caller decides what happens next.
// In onboarding, Step1 advances to Step2. In other contexts, caller can navigate.

export function useRegister(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.user, user);
      options?.onSuccess?.();
    },
  });
}

// ─── useLogout ────────────────────────────────────────────────────────────────

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear(); // wipe all cached data
      navigate(routes.login);
    },
    onError: () => {
      // Logout clears locally even on server error (handled in service)
      queryClient.clear();
      navigate(routes.login);
    },
  });
}

// ─── useCurrentUser ───────────────────────────────────────────────────────────
// Reads user from Zustand — no network call required.
// Use this anywhere you need the logged-in user object.

export function useCurrentUser() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());

  return { user, isAuthenticated };
}
