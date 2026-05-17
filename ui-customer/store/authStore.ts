"use client";

import { hydrateCustomerSession } from "@digital-market/api-client/customer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@digital-market/shared-types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hydrated: false,
      login: (user) => {
        hydrateCustomerSession(user);
        set({ user, isAuthenticated: true, hydrated: true });
      },
      logout: () => {
        hydrateCustomerSession(null);
        set({ user: null, isAuthenticated: false, hydrated: true });
      },
      updateUser: (patch) => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, ...patch };
        hydrateCustomerSession(updated);
        set({ user: updated });
      },
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "forge-auth",
      onRehydrateStorage: () => (state) => {
        hydrateCustomerSession(state?.user ?? null);
        state?.setHydrated(true);
      },
    },
  ),
);
