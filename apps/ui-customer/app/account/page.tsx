"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { storeGetCustomerOrders } from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { PageChrome } from "../_components/page-chrome";
import { useRequireCustomer } from "../_lib/use-auth-guard";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export default function AccountPage() {
  const { allowed, ready, user } = useRequireCustomer();
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!allowed) return;
    void storeGetCustomerOrders(1, 1).then((response) => {
      setLatestOrder(response.data?.[0] ?? null);
    });
  }, [allowed]);

  if (!ready || !allowed) {
    return <PageChrome ariaLabelledBy="account-loading">Loading account...</PageChrome>;
  }

  return (
    <PageChrome
      activeHref="/account"
      ariaLabelledBy="account-title"
      className="route-screen account-screen"
      footer="Customer account centralizes orders, downloads, and profile updates."
    >
      <section className="account-layout" aria-label="Customer account overview">
        <div className="account-hero">
          <p className="page-eyebrow"><span>Account</span> Dashboard</p>
          <h1 id="account-title" className="page-title compact-title">Welcome back, {user?.name}.</h1>
          <p className="page-copy">Track purchase history, access downloads, and manage your profile information.</p>
          <div className="page-actions">
            <Button asChild>
              <Link href="/account/orders">My Orders <span aria-hidden>→</span></Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/account/downloads">Downloads</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/account/profile">Profile</Link>
            </Button>
          </div>
        </div>

        <div className="account-grid">
          <article className="account-card profile-card">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{user?.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <span className="flex items-center gap-2 text-xs text-white/60">
              Role <Badge variant="secondary">{user?.role}</Badge>
            </span>
          </article>
          <article className="account-card">
            <p>Latest order</p>
            <h2>{latestOrder?.paymentReference || latestOrder?.id.slice(0, 8) || "No orders"}</h2>
            <span>{latestOrder ? latestOrder.status : "Start with your first purchase."}</span>
          </article>
          <article className="account-card">
            <p>Total due on latest</p>
            <h2>{latestOrder ? `${latestOrder.currency} ${latestOrder.totalAmount}` : "-"}</h2>
            <span>{latestOrder ? new Date(latestOrder.createdAt).toLocaleDateString() : "Catalog always available."}</span>
          </article>
        </div>
      </section>
    </PageChrome>
  );
}
