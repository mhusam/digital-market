"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import {
  BadgeCheck,
  Download,
  LifeBuoy,
  LogOut,
  Package,
  Settings2,
  UserCircle2,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { Button, LinkButton } from "../ui/Button";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/LoadingSkeleton";
import { toast } from "../../store/toastStore";
import { formatDate } from "../../lib/account";

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
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-20">
        <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
          <Skeleton className="h-80 rounded-[32px]" />
          <Skeleton className="h-[540px] rounded-[32px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-20">
      <section className="rounded-[36px] border border-[#1B1B1B]/8 bg-white/80 shadow-[0_24px_60px_-24px_rgba(17,24,39,0.2)] px-6 py-8 md:px-8 md:py-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Customer Account</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-[-0.04em]">
              {user.firstName}, your digital products stay
              <span className="font-hand text-[#0EA5E9] text-3xl md:text-4xl ml-2">
                organized here
              </span>
            </h1>
            <p className="mt-4 text-[#1B1B1B]/72 font-semibold max-w-2xl">
              Track orders, reclaim downloads, update billing details, and keep
              support requests moving without leaving the storefront.
            </p>
          </div>
          <Card className="p-5 md:p-6 min-w-[280px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
                  Account health
                </p>
                <p className="mt-2 text-xl font-black tracking-[-0.03em]">
                  {user.displayName}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#1B1B1B]/65">
                  {user.email}
                </p>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3FF]">
                <BadgeCheck size={22} strokeWidth={2.6} />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#1B1B1B] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#1E5FAF]">
                {user.emailVerified ? "Email verified" : "Verify email"}
              </span>
              <span className="rounded-full bg-[#EAF3FF] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#1B1B1B]">
                Joined {formatDate(user.createdAt)}
              </span>
            </div>
          </Card>
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px,1fr] lg:items-start">
        <aside className="space-y-4">
          <Card className="p-4">
            <nav className="space-y-1.5" aria-label="Account navigation">
              {ACCOUNT_LINKS.map(({ href, label, Icon }) => {
                const active = isActivePath(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition-colors ${
                      active
                        ? "bg-[#1B1B1B] text-[#1E5FAF]"
                        : "bg-transparent text-[#1B1B1B]/74 hover:bg-[#F8FBFF] hover:text-[#1B1B1B]"
                    }`}
                  >
                    <Icon size={16} strokeWidth={2.6} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </Card>

          <Card className="p-5">
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
              Quick actions
            </p>
            <div className="mt-4 space-y-2">
              <LinkButton
                href="/products"
                variant="light"
                size="md"
                fullWidth
                className="justify-between border border-[#1B1B1B]/8"
              >
                Browse new products
                <span aria-hidden>→</span>
              </LinkButton>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  logout();
                  toast.info("Signed out", "Your mock account session has been cleared.");
                  router.push("/");
                }}
              >
                <LogOut size={15} strokeWidth={2.6} />
                Logout
              </Button>
            </div>
          </Card>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
