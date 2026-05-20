"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronRight, LogOut, Search, Command } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { adminLogout } from "@digital-market/api-client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function prettify(seg: string) {
  if (!seg) return "";
  return seg.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { adminUser, logout } = useAdminStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.slice(1);

  const handleLogout = async () => {
    await adminLogout();
    logout();
    router.replace("/admin/login");
  };

  const nameParts = adminUser?.name?.trim().split(/\s+/) ?? [];
  const initials = nameParts.length >= 2
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
    : (adminUser?.name?.slice(0, 2).toUpperCase() ?? "AD");

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-content-bg/95 px-4 backdrop-blur-md sm:px-6 lg:gap-4 shadow-sm">
      <nav className="flex items-center gap-1.5 text-[13px] min-w-0" aria-label="Breadcrumb">
        <span className="text-muted">Admin</span>
        {crumbs.length > 0 && <ChevronRight className="size-3 text-muted-light" />}
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            <span
              className={
                i === crumbs.length - 1 ? "font-semibold text-ink truncate" : "text-muted truncate"
              }
            >
              {prettify(c)}
            </span>
            {i < crumbs.length - 1 && <ChevronRight className="size-3 text-muted-light" />}
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="hidden lg:flex items-center gap-2 px-3 h-9 bg-card border border-border rounded-lg text-[13px] text-muted w-[280px] shadow-sm">
        <Search className="size-4" />
        <span>Search…</span>
        <span className="ml-auto inline-flex items-center gap-0.5 text-[11px] text-muted-light tabular">
          <Command className="size-3" />K
        </span>
      </div>

      <button
        className="relative size-9 inline-flex items-center justify-center bg-card border border-border rounded-lg hover:bg-surface-hover hover:border-border-strong shadow-sm"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        <span className="absolute top-1.5 right-1.5 size-1.5 bg-danger rounded-full ring-2 ring-card" />
      </button>

      <div className="relative">
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 pl-1.5 pr-2 h-9 bg-card border border-border rounded-lg hover:bg-surface-hover hover:border-border-strong sm:pr-3 shadow-sm"
        >
          <span className="size-6 inline-flex items-center justify-center rounded-md bg-ink text-primary text-[11px] font-semibold tabular">
            {initials}
          </span>
          <span className="text-[13px] font-medium hidden sm:inline text-ink">
            {adminUser?.name ?? "Admin"}
          </span>
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
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 z-50 w-56 card shadow-lg overflow-hidden !rounded-lg"
              >
                <div className="px-3 py-2.5 border-b border-border-subtle bg-surface-muted">
                  <div className="text-[13px] font-semibold text-ink">{adminUser?.name}</div>
                  <div className="text-[11.5px] text-muted truncate">{adminUser?.email}</div>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] uppercase tracking-wider font-semibold text-primary-dark bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                    {adminUser?.role.replace("_", " ")}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-surface-hover text-danger"
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
