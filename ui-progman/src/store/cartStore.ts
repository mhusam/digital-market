"use client";

import { create } from "zustand";

export interface LocalCartItem {
  id: string;
  productId: string;
  title: string;
  slug?: string;
  price: number;
  licenseType: string;
  coverColor: string;
  image?: string;
  category?: string;
}

interface CartState {
  items: LocalCartItem[];
  couponCode: string | null;
  discount: number;
  addItem: (product: {
    id: string;
    title: string;
    slug?: string;
    price: number;
    image?: string;
    category?: string;
  }) => boolean;
  addToCart: (product: {
    id: string;
    title: string;
    slug?: string;
    price: number;
    image?: string;
    category?: string;
  }) => boolean;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    {
      id: "ci-1",
      productId: "prod-1",
      title: "NextJS 16 Boilerplate Starter",
      slug: "nextjs-16-boilerplate-starter",
      price: 49.00,
      licenseType: "commercial",
      coverColor: "#ff5b1f",
      image: "/templates/boilerplate.jpg",
      category: "boilerplates",
    }
  ],
  couponCode: null,
  discount: 0,
  addItem: (product) => {
    const exists = get().items.some((i) => i.productId === product.id);
    if (exists) return false;
    set((s) => ({
      items: [
        ...s.items,
        {
          id: `ci-${product.id}-${Date.now()}`,
          productId: product.id,
          title: product.title,
          slug: product.slug || product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          price: product.price,
          licenseType: "commercial",
          coverColor: "#8b5cf6",
          image: product.image,
          category: product.category,
        },
      ],
    }));
    return true;
  },
  addToCart: (product) => get().addItem(product),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [], couponCode: null, discount: 0 }),
  subtotal: () => get().items.reduce((sum, i) => sum + i.price, 0),
  total: () => Math.max(0, get().subtotal() - get().discount),
}));
