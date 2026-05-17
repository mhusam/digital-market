"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, LicenseType } from "@digital-market/shared-types";

export interface LocalCartItem {
  id: string;
  productId: string;
  title: string;
  slug: string;
  price: number;
  licenseType: LicenseType;
  coverColor: string;
}

interface CartState {
  items: LocalCartItem[];
  couponCode: string | null;
  discount: number;
  addItem: (product: Product, licenseType?: LicenseType) => boolean;
  removeItem: (id: string) => void;
  applyDiscount: (code: string, amount: number) => void;
  clearDiscount: () => void;
  clearCart: () => void;
  subtotal: () => number;
  total: () => number;
}

const COVER_COLORS = [
  "#0EA5E9",
  "#14B8A6",
  "#2563EB",
  "#0284C7",
  "#38BDF8",
  "#93C5FD",
];

const colorFor = (id: string): string => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return COVER_COLORS[Math.abs(h) % COVER_COLORS.length];
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,
      addItem: (product, licenseType = "commercial") => {
        const exists = get().items.some((i) => i.productId === product.id);
        if (exists) return false;
        const price = product.salePrice ?? product.price;
        set((s) => ({
          items: [
            ...s.items,
            {
              id: `ci-${product.id}-${Date.now()}`,
              productId: product.id,
              title: product.title,
              slug: product.slug,
              price,
              licenseType,
              coverColor: colorFor(product.id),
            },
          ],
        }));
        return true;
      },
      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      applyDiscount: (code, amount) =>
        set({ couponCode: code, discount: amount }),
      clearDiscount: () => set({ couponCode: null, discount: 0 }),
      clearCart: () => set({ items: [], couponCode: null, discount: 0 }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price, 0),
      total: () => Math.max(0, get().subtotal() - get().discount),
    }),
    { name: "forge-cart" },
  ),
);
