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

  const segments = pathname.split("/").filter(Boolean); // ["admin", "products", ...]
  const crumbs = segments.slice(1); // drop "admin"

  const handleLogout = async () => {
    await adminLogout();
    logout();
    router.replace("/admin/login");
  };

  const initials =
    adminUser ? `${adminUser.firstName.charAt(0)}${adminUser.lastName.charAt(0)}` : "AD";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[#e8e5df] bg-[#F8F7F4]/90 px-4 backdrop-blur-md sm:px-6 lg:gap-4">
      <nav className="flex items-center gap-1.5 text-[13px] min-w-0" aria-label="Breadcrumb">
        <span className="text-[#6b6760]">Admin</span>
        {crumbs.length > 0 && <ChevronRight className="size-3 text-[#9b9690]" />}
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            <span
              className={
                i === crumbs.length - 1
                  ? "font-semibold text-[#1B1B1B] truncate"
                  : "text-[#6b6760] truncate"
              }
            >
              {prettify(c)}
            </span>
            {i < crumbs.length - 1 && <ChevronRight className="size-3 text-[#9b9690]" />}
          </span>
        ))}
      </nav>

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
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 pl-1.5 pr-2 h-9 bg-white border border-[#e8e5df] rounded-lg hover:bg-[#fafaf7] sm:pr-3"
        >
          <span className="size-6 inline-flex items-center justify-center rounded-md bg-[#1B1B1B] text-[#4F46E5] text-[11px] font-semibold tabular">
            {initials}
          </span>
          <span className="text-[13px] font-medium hidden sm:inline">
            {adminUser?.displayName ?? "Admin"}
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
                className="absolute right-0 top-11 z-50 w-56 bg-white border border-[#e8e5df] rounded-lg shadow-lg overflow-hidden"
              >
                <div className="px-3 py-2.5 border-b border-[#eee9de]">
                  <div className="text-[13px] font-semibold">{adminUser?.displayName}</div>
                  <div className="text-[11.5px] text-[#6b6760] truncate">{adminUser?.email}</div>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] uppercase tracking-wider font-semibold text-[#3730A3] bg-[#eef2ff] px-1.5 py-0.5 rounded">
                    {adminUser?.role.replace("_", " ")}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-[#fafaf7] text-[#ef4444]"
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
