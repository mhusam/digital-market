"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LogIn,
  Menu,
  ShoppingCart,
  UserRound,
  X,
  LayoutGrid,
  Sparkles,
  FileCode,
  Compass,
  BookOpen,
  Trophy,
  Activity,
  Briefcase,
  Tag,
  Layers,
  Podcast,
  Github,
  MessageSquare,
  ArrowUpRight,
  Search,
  Command
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";
import { ThemeToggle } from "../theme-toggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/trends", label: "Trends" },
  { href: "/resources", label: "Resources" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
];

const LAUNCHER_ITEMS = [
  {
    href: "/ai-prompts",
    label: "AI Prompts",
    description: "Engineered prompts for LLMs and image models",
    icon: Sparkles,
    accent: "#a855f7",
    section: "Discover",
    code: "01",
  },
  {
    href: "/cheat-sheets",
    label: "Cheat Sheets",
    description: "Reference guides for developer tools, instantly",
    icon: FileCode,
    accent: "#10b981",
    section: "Learn",
    code: "02",
  },
  {
    href: "/showcase",
    label: "Showcase",
    description: "A gallery of real projects built with PROGMAN",
    icon: Compass,
    accent: "#ec4899",
    section: "Discover",
    code: "03",
  },
  {
    href: "/tech-glossary",
    label: "Glossary",
    description: "Clear, simple explanations for tech terms",
    icon: BookOpen,
    accent: "#06b6d4",
    section: "Learn",
    code: "04",
  },
  {
    href: "/leaderboard",
    label: "Leaderboard",
    description: "Top creators and their development metrics",
    icon: Trophy,
    accent: "#f59e0b",
    section: "Community",
    code: "05",
  },
  {
    href: "/changelog",
    label: "Changelog",
    description: "Updates on Next.js, React, and the stack",
    icon: Activity,
    accent: "#8b5cf6",
    section: "Learn",
    code: "06",
  },
  {
    href: "/jobs",
    label: "Jobs Board",
    description: "Remote opportunities and contract gigs",
    icon: Briefcase,
    accent: "#14b8a6",
    section: "Community",
    code: "07",
  },
  {
    href: "/deals",
    label: "Deals & Offers",
    description: "Curated software, courses, and hosting discounts",
    icon: Tag,
    accent: "#f97316",
    section: "Discover",
    code: "08",
  },
  {
    href: "/tech-stacks",
    label: "Tech Stacks",
    description: "Blueprints and boilerplate templates",
    icon: Layers,
    accent: "#3b82f6",
    section: "Build",
    code: "09",
  },
  {
    href: "/podcasts",
    label: "Podcasts & Media",
    description: "Hand-picked podcast episodes and video guides",
    icon: Podcast,
    accent: "#ef4444",
    section: "Learn",
    code: "10",
  },
  {
    href: "/open-source",
    label: "Open Source",
    description: "Trending repositories in the public spotlight",
    icon: Github,
    accent: "#71717a",
    section: "Build",
    code: "11",
  },
  {
    href: "/community",
    label: "Community",
    description: "Highlights from dev forums and social channels",
    icon: MessageSquare,
    accent: "#6366f1",
    section: "Community",
    code: "12",
  },
];

const LAUNCHER_SECTIONS = ["Discover", "Build", "Learn", "Community"] as const;


function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/products") {
    return pathname === "/products" || pathname.startsWith("/products/");
  }
  if (href === "/blog") {
    return pathname === "/blog" || pathname.startsWith("/blog/");
  }
  if (href === "/trends") {
    return pathname === "/trends" || pathname.startsWith("/trends/");
  }
  if (href === "/resources") {
    return pathname === "/resources" || pathname.startsWith("/resources/");
  }
  if (href === "/news") {
    return pathname === "/news" || pathname.startsWith("/news/");
  }
  if (href === "/events") {
    return pathname === "/events" || pathname.startsWith("/events/");
  }
  if (href === "/account") {
    return pathname === "/account" || pathname.startsWith("/account/");
  }
  return pathname === href;
}

function Logo() {
  return (
    <span className="group inline-flex items-center gap-2.5 font-extrabold text-foreground">
      <Image
        src="/logo-2.svg"
        alt="PROGMAN logo"
        width={24}
        height={24}
        className="size-6 transition-transform duration-300 group-hover:rotate-[6deg]"
      />
      <span className="font-brand text-[1.08rem] tracking-[0.03em]">
        PROGMAN
      </span>
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const cartCount = useCartStore((state) => state.items.length);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!launcherOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLauncherOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [launcherOpen]);

  useEffect(() => {
    if (launcherOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [launcherOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          launcherOpen
            ? "bg-transparent border-transparent"
            : "border-b border-border/70 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        }`}
      >
        <div className="page-container">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" aria-label="PROGMAN home" onClick={() => { setOpen(false); setLauncherOpen(false); }}>
              <Logo />
            </Link>

            {!launcherOpen && (
              <nav
                className="hidden items-center gap-0.5 rounded-full border border-border/70 bg-card/60 p-1 backdrop-blur md:flex"
                aria-label="Main"
              >
                {NAV_LINKS.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex h-8 items-center gap-2 rounded-full px-3.5 text-[13px] font-semibold tracking-tight transition-all duration-200 ${
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-foreground/5 dark:hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            )}

            <div className="flex items-center gap-1.5">
              {!launcherOpen && (
                <>
                  <div className="hidden md:block">
                    <ThemeToggle />
                  </div>

                  <Link
                    href="/cart"
                    className="relative inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground backdrop-blur transition-colors hover:border-foreground/40 hover:bg-card"
                    aria-label="Cart"
                  >
                    <ShoppingCart size={15} />
                    {cartCount > 0 && (
                      <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent-electric)] px-1 text-[10px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  {user ? (
                    <Link
                      href="/account"
                      className="inline-flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-[1.05]"
                      aria-label="Profile"
                    >
                      <UserRound size={15} />
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-[13px] font-bold text-background transition-transform hover:scale-[1.02]"
                      aria-label="Login / Register"
                    >
                      <LogIn size={14} />
                      <span className="hidden sm:inline">Sign in</span>
                    </Link>
                  )}
                </>
              )}

              {/* App Launcher — editorial chip */}
              <button
                type="button"
                onClick={() => setLauncherOpen((prev) => !prev)}
                className={`relative z-50 ml-1 inline-flex h-10 items-center gap-2 rounded-full border px-3.5 text-[13px] font-bold transition-all ${
                  launcherOpen
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card/60 text-foreground backdrop-blur hover:border-foreground/40"
                }`}
                aria-label="App Launcher"
                aria-expanded={launcherOpen}
              >
                {launcherOpen ? (
                  <>
                    <X size={14} />
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <LayoutGrid size={14} />
                    <span className="hidden sm:inline">Universe</span>
                  </>
                )}
              </button>

              {!launcherOpen && (
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground md:hidden"
                  aria-label="Toggle navigation"
                  aria-expanded={open}
                  onClick={() => { setOpen((value) => !value); setLauncherOpen(false); }}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {open && !launcherOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="page-container flex flex-col gap-1 py-3" aria-label="Mobile">
              {NAV_LINKS.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex h-11 items-center justify-between rounded-md px-3 text-sm font-bold ${
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
              <div className="mt-2 flex justify-end">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ─── Universe — full-screen command center ─── */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-background/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          launcherOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!launcherOpen}
      >
        {/* Mesh backdrop */}
        <div className="mesh-bg" aria-hidden="true" />
        {/* Fine grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            color: "var(--foreground)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 85%)",
          }}
        />

        <div className="page-container relative flex min-h-screen flex-col pt-24 pb-12">
          {/* Editorial header */}
          <header className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-6">
            <div>
              <span className="eyebrow">
                <Command size={11} /> The Universe
              </span>
              <h2 className="mt-3 text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-foreground">
                Everything PROGMAN, <br className="hidden sm:inline" />
                <span className="text-[var(--accent-electric)]">
                  one tap away.
                </span>
              </h2>
            </div>
            <div className="hidden text-right md:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {LAUNCHER_ITEMS.length} shortcuts ·{" "}
                {LAUNCHER_SECTIONS.length} sections
              </p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                Press{" "}
                <kbd className="rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-bold">
                  ESC
                </kbd>{" "}
                to close
              </p>
            </div>
          </header>

          {/* Quick search row */}
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3.5 backdrop-blur">
            <Search size={16} className="shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Jump to a shortcut, a tool, a place..."
              className="flex-1 bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none"
              aria-label="Search shortcuts"
            />
            <span className="hidden items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground sm:inline-flex">
              <kbd className="rounded-md border border-border bg-background px-1.5 py-0.5">
                ⌘
              </kbd>
              <kbd className="rounded-md border border-border bg-background px-1.5 py-0.5">
                K
              </kbd>
            </span>
          </div>

          {/* Section chips */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]">
            <span className="text-muted-foreground">Filter:</span>
            <span className="rounded-full border border-foreground bg-foreground px-3 py-1 text-background">
              All
            </span>
            {LAUNCHER_SECTIONS.map((section) => (
              <span
                key={section}
                className="rounded-full border border-border bg-card/60 px-3 py-1 text-muted-foreground"
              >
                {section}
              </span>
            ))}
          </div>

          {/* Bento grid */}
          <div className="grid flex-grow grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {LAUNCHER_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              const isFeatured = idx === 0 || idx === 5;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setLauncherOpen(false)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 ${
                    isFeatured ? "sm:col-span-2 sm:row-span-1" : ""
                  }`}
                  style={
                    {
                      ["--item-accent" as string]: item.accent,
                    } as React.CSSProperties
                  }
                >
                  {/* Hover glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(420px 280px at 30% 0%, color-mix(in oklab, var(--item-accent) 22%, transparent), transparent 65%)`,
                    }}
                  />
                  {/* Accent left rail */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-4 left-0 w-[3px] origin-top scale-y-0 rounded-r-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    style={{ background: "var(--item-accent)" }}
                  />

                  <div className="relative flex items-start justify-between">
                    <div
                      className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/80 transition-all duration-300 group-hover:scale-[1.08]"
                      style={{
                        color: "var(--item-accent)",
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        {item.code}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]"
                        style={{
                          color: "var(--item-accent)",
                          background: `color-mix(in oklab, ${item.accent} 14%, transparent)`,
                        }}
                      >
                        {item.section}
                      </span>
                    </div>
                  </div>

                  <div className="relative mt-6">
                    <h3
                      className={`font-extrabold leading-tight tracking-[-0.02em] text-foreground transition-colors duration-200 ${
                        isFeatured ? "text-xl" : "text-base"
                      }`}
                    >
                      {item.label}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="relative mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
                      Open
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: "var(--item-accent)" }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <footer className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span className="inline-flex items-center gap-2">
              <span className="pulse-dot inline-block size-1.5 rounded-full bg-[var(--accent-electric)]" />
              Live — updated weekly
            </span>
            <span>
              PROGMAN Universe · v{new Date().getFullYear()}.
              {new Date().getMonth() + 1}
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
