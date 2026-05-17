"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, FolderTree, Star, FolderOpen,
  ShoppingBag, Users, TicketPercent, Download,
  PenSquare, FileText, LifeBuoy,
  BarChart3, Settings, Shield, KeyRound, ScrollText,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface NavItem {
  href: string;
  label: string;
  Icon: typeof LayoutDashboard;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const groups: NavGroup[] = [
  {
    label: "Overview",
    items: [{ href: "/admin/dashboard", label: "Dashboard", Icon: LayoutDashboard }],
  },
  {
    label: "Catalog",
    items: [
      { href: "/admin/products", label: "Products", Icon: Package },
      { href: "/admin/categories", label: "Categories", Icon: FolderTree },
      { href: "/admin/reviews", label: "Reviews", Icon: Star },
      { href: "/admin/files", label: "File Library", Icon: FolderOpen },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/admin/orders", label: "Orders", Icon: ShoppingBag },
      { href: "/admin/customers", label: "Customers", Icon: Users },
      { href: "/admin/coupons", label: "Coupons", Icon: TicketPercent },
      { href: "/admin/download-logs", label: "Download Logs", Icon: Download },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/blog", label: "Blog", Icon: PenSquare },
      { href: "/admin/pages", label: "Pages", Icon: FileText },
      { href: "/admin/support", label: "Support Tickets", Icon: LifeBuoy },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/reports", label: "Reports", Icon: BarChart3 },
      { href: "/admin/settings", label: "Settings", Icon: Settings },
      { href: "/admin/users", label: "Admin Users", Icon: Shield },
      { href: "/admin/roles", label: "Roles", Icon: KeyRound },
      { href: "/admin/audit-logs", label: "Audit Logs", Icon: ScrollText },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const flatItems = groups.flatMap((group) => group.items);

  return (
    <aside className="z-40 flex w-full flex-col bg-[#1B1B1B] text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-[240px]">
      <div className="px-5 h-16 flex items-center gap-2.5 border-b border-white/5">
        <span className="size-8 inline-flex items-center justify-center bg-[#4F46E5] rounded-lg text-white">
          <Flame className="size-[18px]" strokeWidth={2.4} />
        </span>
        <div className="flex flex-col leading-none">
          <span className="font-semibold tracking-tight text-[15px]">Forge</span>
          <span className="text-[10.5px] uppercase tracking-[0.16em] text-white/40 mt-0.5">Admin</span>
        </div>
      </div>

      <nav className="lg:hidden overflow-x-auto border-b border-white/5 px-3 py-2" aria-label="Admin sections">
        <div className="flex min-w-max gap-1.5">
          {flatItems.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-md px-3 text-[12.5px] transition-colors",
                  active
                    ? "bg-white/[0.08] text-[#4F46E5]"
                    : "text-white/75 hover:bg-white/[0.06] hover:text-white",
                )}
              >
                <Icon className="size-[15px] shrink-0" />
                <span className="font-medium tracking-tight">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="sidebar-scroll hidden flex-1 overflow-y-auto py-3 px-2 space-y-5 lg:block">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="px-3 mb-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold text-white/35">
              {group.label}
            </div>
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "relative flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors",
                        active
                          ? "text-[#4F46E5] bg-white/[0.04]"
                          : "text-white/75 hover:text-white hover:bg-white/[0.04]",
                      )}
                    >
                      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#4F46E5] rounded-r" />}
                      <Icon className="size-[16px] shrink-0" />
                      <span className="font-medium tracking-tight">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="hidden px-3 py-3 border-t border-white/5 lg:block">
        <div className="bg-white/[0.04] border border-white/5 rounded-lg px-3 py-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10.5px] uppercase tracking-wider text-white/40 font-semibold">Storage</span>
            <span className="text-[11px] text-[#4F46E5] tabular font-medium">62%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: "62%" }} />
          </div>
          <p className="text-[11px] text-white/45 mt-1.5">14.8 GB of 24 GB used</p>
        </div>
      </div>
    </aside>
  );
}
