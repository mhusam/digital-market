"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";
import { Toaster } from "@/components/ui/Toast";
import { useAdminStore } from "@/store/adminStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hasHydrated = useAdminStore((s) => s.hasHydrated);
  const setHasHydrated = useAdminStore((s) => s.setHasHydrated);
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    // Fallback for environments where persisted storage is unavailable.
    if (!hasHydrated) setHasHydrated(true);
  }, [hasHydrated, setHasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    // Guard: redirect to login if not authenticated
    if (!isLogin && !isAuthenticated) {
      router.replace("/admin/login");
    }
    if (isLogin && isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [hasHydrated, isLogin, isAuthenticated, router]);

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 rounded-full border-2 border-ink border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isLogin) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 rounded-full border-2 border-ink border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-[240px]">
        <Topbar />
        <main className="bg-grid px-4 py-5 sm:px-6 lg:px-8 lg:py-7 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
