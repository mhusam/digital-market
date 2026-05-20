"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, ChevronRight, LogOut, Search, Command } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { adminLogout } from "@digital-market/api-client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

function prettify(seg: string) {
  if (!seg) return "";
  return seg.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { adminUser, logout } = useAdminStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const motionTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.26, ease: [0.16, 1, 0.3, 1] as const };

  const segments = pathname.split("/").filter(Boolean); // ["admin", "products", ...]
  const crumbs = segments.slice(1); // drop "admin"
  const crumbLabels = ["Admin", ...crumbs.map(prettify)];

  const handleLogout = async () => {
    await adminLogout();
    logout();
    router.replace("/admin/login");
  };

  const initials =
    adminUser ? `${adminUser.firstName.charAt(0)}${adminUser.lastName.charAt(0)}` : "AD";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[#e8e5df] bg-[#F8F7F4]/90 px-4 backdrop-blur-md sm:px-6 lg:gap-4">
      <motion.nav
        className="relative flex min-w-0 max-w-[56vw] items-center overflow-hidden rounded-full border border-[#e8e5df] bg-white/72 p-1 text-[12.5px] shadow-[0_14px_34px_-26px_rgba(17,24,39,0.55)] ring-1 ring-white/80 backdrop-blur-xl md:max-w-none"
        aria-label="Breadcrumb"
        initial={reduceMotion ? false : { opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTransition}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-75"
          style={{
            background:
              "linear-gradient(135deg, rgba(79,70,229,0.08), rgba(255,255,255,0.74) 42%, rgba(14,165,233,0.08))",
            backgroundSize: "180% 180%",
          }}
          animate={
            reduceMotion
              ? undefined
              : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 8, repeat: Infinity, ease: "linear" }
          }
        />

        <ol className="relative z-10 flex min-w-0 items-center gap-1">
          {crumbLabels.map((label, i) => {
            const isFirst = i === 0;
            const isLast = i === crumbLabels.length - 1;
            const crumb = (
              <span
                className={`relative inline-flex h-8 min-w-0 items-center gap-1.5 overflow-hidden rounded-full px-2.5 font-semibold transition-colors ${
                  isLast
                    ? "bg-[#1B1B1B] text-[#A5B4FC] shadow-[0_12px_24px_-18px_rgba(17,24,39,0.9)]"
                    : "text-[#6b6760] hover:bg-[#F8F7F4] hover:text-[#1B1B1B]"
                }`}
                aria-current={isLast ? "page" : undefined}
              >
                {isFirst && <Command className="size-3.5 shrink-0" strokeWidth={2.4} />}
                {isLast && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 -left-8 w-16 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)]"
                    animate={reduceMotion ? undefined : { x: [0, 120, 0] }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                    }
                  />
                )}
                <span className="relative max-w-[26vw] truncate sm:max-w-[180px]">
                  {label}
                </span>
              </span>
            );

            return (
              <motion.li
                key={`${label}-${i}`}
                className="flex min-w-0 items-center gap-1"
                initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { ...motionTransition, delay: i * 0.035 }
                }
              >
                {isFirst && !isLast ? (
                  <Link href="/admin" className="min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                    {crumb}
                  </Link>
                ) : (
                  crumb
                )}
                {!isLast && (
                  <span
                    className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-[#e8e5df] bg-white/82 text-[#9b9690]"
                    aria-hidden
                  >
                    <ChevronRight className="size-3" strokeWidth={2.6} />
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </motion.nav>

      <div className="flex-1" />

      <div className="hidden lg:flex items-center gap-2 px-3 h-9 bg-white border border-[#e8e5df] rounded-lg text-[13px] text-[#6b6760] w-[280px]">
        <Search className="size-4" />
        <span>Search…</span>
        <span className="ml-auto inline-flex items-center gap-0.5 text-[11px] text-[#9b9690] tabular">
          <Command className="size-3" />K
        </span>
      </div>

      <button
        className="relative size-9 inline-flex items-center justify-center bg-white border border-[#e8e5df] rounded-lg hover:bg-[#fafaf7]"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        <span className="absolute top-1.5 right-1.5 size-1.5 bg-[#ef4444] rounded-full ring-2 ring-white" />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className={`group flex h-9 items-center gap-2 rounded-lg border bg-white pl-1.5 pr-2 transition-all hover:border-[#d8d1c7] hover:bg-[#fafaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F7F4] sm:pr-2.5 ${
            menuOpen
              ? "border-[#4F46E5]/35 shadow-[0_12px_28px_-22px_rgba(17,24,39,0.9)]"
              : "border-[#e8e5df]"
          }`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <span className="size-6 inline-flex items-center justify-center rounded-md bg-[#1B1B1B] text-[#4F46E5] text-[11px] font-semibold tabular">
            {initials}
          </span>
          <span className="text-[13px] font-medium hidden sm:inline">
            {adminUser?.displayName ?? "Admin"}
          </span>
          <ChevronDown
            className={`size-3.5 text-[#6b6760] transition-transform duration-200 group-hover:text-[#1B1B1B] ${
              menuOpen ? "rotate-180 text-[#4F46E5]" : ""
            }`}
            strokeWidth={2.7}
            aria-hidden
          />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <>
              <button
                aria-label="Close menu"
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.16 }}
                className="absolute right-0 top-12 z-50 w-64 origin-top-right overflow-visible rounded-2xl border border-[#e8e5df] bg-white p-1 shadow-[0_22px_54px_-28px_rgba(17,24,39,0.55)]"
                role="menu"
              >
                <span
                  className="absolute -top-1.5 right-4 size-3 rotate-45 border-l border-t border-[#e8e5df] bg-white"
                  aria-hidden
                />
                <div className="rounded-xl border border-[#eee9de] bg-[#F8F7F4]/70 px-3 py-3">
                  <div className="text-[13px] font-semibold text-[#1B1B1B]">{adminUser?.displayName ?? "Admin"}</div>
                  <div className="mt-0.5 truncate text-[11.5px] text-[#6b6760]">{adminUser?.email ?? "admin@digital.market"}</div>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#eef2ff] px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-[#3730A3]">
                    {adminUser?.role?.replace("_", " ") ?? "admin"}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-[#ef4444] transition-colors hover:bg-[#fff1f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4444]/35"
                  role="menuitem"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
