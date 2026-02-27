import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/models/auth";

interface AuthState {
  /** Authenticated user — persisted so UI survives page refresh */
  user: User | null;

  // Actions
  setUser: (user: User) => void;
  clearAuth: () => void;

  // Derived
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),

      clearAuth: () => set({ user: null }),

      isAuthenticated: () => get().user !== null,
    }),
    {
      name: "auth-storage",
    },
  ),
);
