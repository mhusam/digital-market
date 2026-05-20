"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
];

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32">
        <path d="M16 3.5 28.5 25a2.3 2.3 0 0 1-2 3.5h-21a2.3 2.3 0 0 1-2-3.5L16 3.5Z" />
        <path d="M12.7 19.6 9.9 16l2.8-3.6" />
        <path d="m19.3 12.4 2.8 3.6-2.8 3.6" />
        <path d="m17.3 10.8-2.6 10.4" />
      </svg>
    </span>
  );
}

function getActiveHref(pathname: string) {
  if (pathname === "/") {
    return "/";
  }

  return "/catalog";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";
  const activeHref = getActiveHref(pathname);

  return (
    <main
      className={`landing-shell ${isHome ? "intro-screen" : "page-screen"}`}
      aria-label="DevMarket customer marketplace"
    >
      <div className="ambient-grid" aria-hidden="true" />
      <div className="soft-orb soft-orb-one" aria-hidden="true" />
      <div className="soft-orb soft-orb-two" aria-hidden="true" />

      <header className="topbar" aria-label="Primary navigation">
        <Link href="/" className="brand" aria-label="DevMarket home">
          <LogoMark />
          <span>DevMarket</span>
        </Link>

        <nav className="topnav" aria-label="Marketplace links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="utility-actions" aria-label="Account actions">
          <Link href="/login" className="utility-link utility-text">
            Login
          </Link>
        </div>
      </header>

      <div key={pathname} className="route-content-slot">
        {children}
      </div>
    </main>
  );
}
