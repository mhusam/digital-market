"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setAuthToken } from "@digital-market/api-client";
import type { Product, User } from "@digital-market/shared-types";

const AUTH_STORAGE_KEY = "progman-customer-auth";
const CART_STORAGE_KEY = "progman-customer-cart";

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  price: number;
  currency: string;
  offeringType: string;
  techTags: string[];
  quantity: number;
};

type CustomerState = {
  ready: boolean;
  token: string | null;
  user: User | null;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  setSession: (payload: { token: string; user: User }) => void;
  clearSession: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CustomerContext = createContext<CustomerState | null>(null);

function parseJSON<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const auth = parseJSON<{ token: string; user: User }>(window.localStorage.getItem(AUTH_STORAGE_KEY));
    const savedCart = parseJSON<CartItem[]>(window.localStorage.getItem(CART_STORAGE_KEY));

    if (auth?.token && auth?.user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(auth.token);
      setUser(auth.user);
      setAuthToken(auth.token);
    }

    if (savedCart && Array.isArray(savedCart)) {
      setCart(savedCart.filter((item) => item.quantity > 0));
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!token || !user) {
      setAuthToken(null);
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }
    setAuthToken(token);
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
  }, [ready, token, user]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [ready, cart]);

  const value = useMemo<CustomerState>(() => {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      ready,
      token,
      user,
      cart,
      cartCount,
      cartSubtotal,
      setSession: ({ token: nextToken, user: nextUser }) => {
        setToken(nextToken);
        setUser(nextUser);
      },
      clearSession: () => {
        setToken(null);
        setUser(null);
      },
      addToCart: (product, quantity = 1) => {
        const safeQty = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
        setCart((current) => {
          const existing = current.find((item) => item.productId === product.id);
          if (!existing) {
            return [
              ...current,
              {
                productId: product.id,
                slug: product.slug,
                title: product.title,
                price: product.price,
                currency: product.currency,
                offeringType: product.offeringType ?? "",
                techTags: product.techTags ?? [],
                quantity: safeQty,
              },
            ];
          }

          return current.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + safeQty }
              : item
          );
        });
      },
      updateCartQuantity: (productId, quantity) => {
        const safeQty = Math.max(0, Math.floor(quantity));
        setCart((current) => {
          if (safeQty === 0) {
            return current.filter((item) => item.productId !== productId);
          }
          return current.map((item) =>
            item.productId === productId ? { ...item, quantity: safeQty } : item
          );
        });
      },
      removeFromCart: (productId) => {
        setCart((current) => current.filter((item) => item.productId !== productId));
      },
      clearCart: () => setCart([]),
    };
  }, [cart, ready, token, user]);

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used inside CustomerProvider");
  }
  return context;
}
