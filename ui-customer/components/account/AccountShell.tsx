"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import {
  Download,
  LifeBuoy,
  LogOut,
  Package,
  Settings2,
  UserCircle2,
} from "lucide-react";
import { formatDate } from "../../lib/account";
import { toast } from "../../store/toastStore";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ACCOUNT_LINKS = [
  { href: "/account", label: "Overview", Icon: UserCircle2 },
  { href: "/account/orders", label: "Orders", Icon: Package },
  { href: "/account/downloads", label: "Downloads", Icon: Download },
  { href: "/account/support", label: "Support", Icon: LifeBuoy },
  { href: "/account/profile", label: "Profile", Icon: Settings2 },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/account") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AccountShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!hydrated || isAuthenticated) return;
    router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [hydrated, isAuthenticated, pathname, router]);

  if (!hydrated || !isAuthenticated || !user) {
    return (
      <div className="page-container py-10">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <Skeleton className="h-64" />
          <Skeleton className="h-[520px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-container py-8 md:py-10">
      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-hand text-2xl text-primary">Customer account</p>
            <h1 className="mt-2 text-3xl font-extrabold text-foreground md:text-4xl">
              Welcome, {user.firstName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage orders, downloads, support, and profile details from one
              simple account area.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm font-extrabold text-foreground">{user.displayName}</p>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">
              Joined {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr] lg:items-start">
        <aside className="space-y-4">
          <Card className="p-3">
            <nav className="space-y-1" aria-label="Account navigation">
              {ACCOUNT_LINKS.map(({ href, label, Icon }) => {
                const active = isActivePath(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold ${
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </Card>

          <Card className="space-y-2 p-3">
            <Button
              render={<Link href="/products" />}
              variant="light"
              fullWidth
              className="justify-center"
            >
              Browse products
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                logout();
                toast.info("Signed out", "Your customer session was cleared.");
                router.push("/");
              }}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </Card>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
