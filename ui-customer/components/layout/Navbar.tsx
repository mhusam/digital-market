"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CircleUserRound,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/categories/saas-solutions", label: "Categories" },
  { href: "/search", label: "Search" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.items.length);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F9F6EE]/95 nav-blur border-b border-[#1B1B1B]/20 shadow-[0_18px_40px_-32px_rgba(27,27,27,0.28)]"
          : "bg-[#F9F6EE] border-b border-[#1B1B1B]/10"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className="inline-flex items-center justify-center w-9 h-9 bg-[#1E40AF] text-white rounded-xl font-black text-lg transition-transform group-hover:rotate-[8deg]"
            aria-hidden
          >
            ◆
          </span>
          <span className="text-[#1B1B1B] font-black text-2xl tracking-[-0.04em]">
            Forge
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-[#1B1B1B] font-bold text-[15px] rounded-full hover:bg-[#1E40AF] hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href={user ? "/account" : "/login"}
            className="relative w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-[#1B1B1B] transition-colors"
            aria-label={user ? "Account" : "Login or register"}
            title={user ? "Account" : "Login or register"}
          >
            <CircleUserRound size={18} strokeWidth={2.4} />
          </Link>
          <Link
            href="/cart"
            className="relative w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-[#1B1B1B] transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={18} strokeWidth={2.4} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-[#0EA5E9] text-white text-[11px] font-black rounded-full inline-flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="px-4 h-10 rounded-full bg-white/70 text-[#1B1B1B] inline-flex items-center gap-2 text-sm font-bold">
              <Sparkles size={15} strokeWidth={2.4} />
              {user.firstName}&apos;s account is ready
            </div>
          ) : null}
          <Link
            href="/products"
            className="btn-pill bg-[#2563EB] text-white px-5 h-10 text-sm hover:bg-[#1E40AF]"
          >
            Browse Products
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1E40AF] text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#1B1B1B]/20 bg-[#F9F6EE]/96 nav-blur">
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-2xl bg-white/60 text-[#1B1B1B] font-bold"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2">
              <Link
                href={user ? "/account" : "/login"}
                onClick={() => setMenuOpen(false)}
                className="w-11 btn-pill bg-white text-[#1B1B1B] h-11 px-0"
                aria-label={user ? "Open account" : "Login or register"}
              >
                <CircleUserRound size={16} strokeWidth={2.4} />
              </Link>
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex-1 btn-pill bg-white text-[#1B1B1B] h-11"
              >
                Cart ({itemCount})
              </Link>
              <Link
                href="/search"
                onClick={() => setMenuOpen(false)}
                className="w-11 btn-pill bg-white text-[#1B1B1B] h-11 px-0"
                aria-label="Search products"
              >
                <Search size={16} strokeWidth={2.4} />
              </Link>
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="flex-1 btn-pill bg-[#2563EB] text-white h-11"
              >
                Browse
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
