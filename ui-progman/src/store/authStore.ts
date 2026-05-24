"use client";

import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "ADMIN" | "CUSTOMER";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "customer-1",
    name: "John Builder",
    email: "customer@local.sellonline",
    role: "CUSTOMER",
  },
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
