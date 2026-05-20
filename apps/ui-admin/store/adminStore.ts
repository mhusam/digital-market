"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setAuthToken } from "@digital-market/api-client";
import type { User } from "@digital-market/shared-types";

const ADMIN_SESSION_GLOBAL_KEY = "__forge_admin_session__";

const setGlobalAdminSession = (user: User | null): void => {
  (globalThis as Record<string, unknown>)[ADMIN_SESSION_GLOBAL_KEY] = user;
};

interface AdminState {
  adminUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  sidebarOpen: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      adminUser: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      sidebarOpen: true,
      login: (user, token) => {
        setGlobalAdminSession(user);
        setAuthToken(token);
        set({ adminUser: user, token, isAuthenticated: true });
      },
      logout: () => {
        setGlobalAdminSession(null);
        setAuthToken(null);
        set({ adminUser: null, token: null, isAuthenticated: false });
      },
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebar: (open) => set({ sidebarOpen: open }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "forge-admin-session",
      partialize: (s) => ({ adminUser: s.adminUser, token: s.token, isAuthenticated: s.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        setGlobalAdminSession(state?.adminUser ?? null);
        if (state?.token) setAuthToken(state.token);
        state?.setHasHydrated(true);
      },
    },
  ),
);
