"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDownloads, getOrders, getTickets } from "@digital-market/api-client";
import type { Download, Order, SupportTicket } from "@digital-market/shared-types";
import { DownloadCloud, LifeBuoy, Package, ReceiptText } from "lucide-react";
import { OrderCard } from "../../components/account/OrderCard";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import { EmptyState } from "../../components/ui/app-empty-state";
import { Skeleton } from "../../components/ui/skeleton";
import { formatDate, getTicketLabel } from "../../lib/account";
import { formatPrice } from "../../lib/cover";

export default function AccountOverviewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const [ordersRes, downloadsRes, ticketsRes] = await Promise.all([
        getOrders(),
        getDownloads(),
        getTickets(),
      ]);

      if (cancelled) return;
      setOrders(ordersRes.data ?? []);
      setDownloads(downloadsRes.data ?? []);
      setTickets(ticketsRes.data ?? []);
      setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-[28px]" />
          ))}
        </div>
        <Skeleton className="h-[320px] rounded-[32px]" />
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, order) => sum + (order.total ?? 0), 0);
  const openTickets = tickets.filter(
    (ticket) => ticket.status !== "resolved" && ticket.status !== "closed",
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Orders"
          value={`${orders.length}`}
          description="Paid, pending, and refunded purchases"
          Icon={Package}
          tone="bg-accent text-primary"
        />
        <MetricCard
          title="Downloads"
          value={`${downloads.length}`}
          description="Files ready to reclaim from your account"
          Icon={DownloadCloud}
          tone="bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
        />
        <MetricCard
          title="Open tickets"
          value={`${openTickets.length}`}
          description="Support threads still awaiting final closure"
          Icon={LifeBuoy}
          tone="bg-amber-500/15 text-amber-600 dark:text-amber-300"
        />
        <MetricCard
          title="Total spent"
          value={formatPrice(totalSpent)}
          description="Lifetime prototype revenue from this account"
          Icon={ReceiptText}
          tone="bg-violet-500/15 text-violet-600 dark:text-violet-300"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <Card className="p-6 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Recent orders
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                Purchase history
              </h2>
            </div>
            <Link href="/account/orders" className="text-sm font-black underline underline-offset-4">
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {orders.length > 0 ? (
              orders.slice(0, 3).map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <EmptyState
                illustration="orders"
                title="No orders yet"
                description="Registering a new account starts with a clean order history."
                ctaHref="/products"
                ctaLabel="Browse products"
              />
            )}
          </div>
        </Card>

        <Card className="p-6 md:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                Support pulse
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                Active conversations
              </h2>
            </div>
            <Link href="/account/support" className="text-sm font-black underline underline-offset-4">
              Open support
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {tickets.length > 0 ? (
              tickets.slice(0, 3).map((ticket) => (
                <Link
                  key={ticket.id}
                  href={`/account/support/${ticket.id}`}
                  className="block rounded-[28px] border border-border bg-muted/30 px-5 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="ink">{getTicketLabel(ticket.status)}</Badge>
                    <span className="text-[11px] font-black uppercase tracking-[0.14em] text-muted-foreground">
                      Updated {formatDate(ticket.updatedAt)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black tracking-[-0.02em]">
                    {ticket.subject}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-foreground/80 line-clamp-2">
                    {ticket.message}
                  </p>
                </Link>
              ))
            ) : (
              <EmptyState
                title="No support tickets"
                description="This account has not opened any support conversations yet."
                ctaHref="/account/support"
                ctaLabel="Open support"
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  Icon,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  Icon: typeof Package;
  tone: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
            {title}
          </p>
          <p className="mt-3 text-3xl font-black tracking-[-0.03em]">{value}</p>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            {description}
          </p>
        </div>
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
          <Icon size={20} strokeWidth={2.6} />
        </div>
      </div>
    </Card>
  );
}
