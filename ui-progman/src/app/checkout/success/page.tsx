"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderRef, setOrderRef] = useState("SO-PENDING");
  const [mockToken, setMockToken] = useState("mock-receipt");

  const orderId = searchParams.get("orderId") || "";
  const paypalToken = searchParams.get("token") || "";

  useEffect(() => {
    // Clear the cart on successful checkout page load
    clearCart();

    // Set order reference and mock token asynchronously to prevent synchronous setState
    // inside the render cycle / effect body warnings.
    let computedRef = "";
    if (orderId) {
      computedRef = `SO-${orderId.substring(0, 8).toUpperCase()}`;
    } else if (paypalToken) {
      computedRef = `SO-PAYPAL-${paypalToken.substring(0, 6).toUpperCase()}`;
    } else {
      computedRef = `SO-MOCK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }

    const timer = setTimeout(() => {
      setOrderRef(computedRef);
      setMockToken(`mock-${Math.random().toString(36).substring(2, 8)}`);
    }, 0);

    return () => clearTimeout(timer);
  }, [clearCart, orderId, paypalToken]);

  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-10 text-center space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 size-48 bg-gradient-to-bl from-[var(--accent-electric)]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto animate-bounce">
        <CheckCircle2 className="size-8" />
      </div>

      <div className="space-y-2">
        <span className="eyebrow text-emerald-500">Transaction Complete</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Payment confirmed.
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Thank you for your purchase! Your payment has been captured, and your digital starter kits are ready.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-4 max-w-sm mx-auto space-y-1">
        <span className="text-[10px] font-mono text-muted-foreground uppercase block">Order Reference</span>
        <span className="font-mono text-xs font-bold text-foreground block">{orderRef}</span>
        <span className="text-[9px] text-muted-foreground flex items-center justify-center gap-1 mt-2">
          <ShieldCheck className="size-3 text-emerald-500" /> Secure digital delivery
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Link
          href={`/orders/confirmation/${mockToken}`}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer"
        >
          View Invoice Receipt
          <ArrowRight className="size-3.5" />
        </Link>
        <Link
          href="/account"
          className="h-11 px-6 rounded-xl border border-border bg-card hover:bg-muted font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer text-foreground transition-colors"
        >
          <ShoppingBag className="size-3.5" />
          My Downloads
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      <Suspense fallback={
        <div className="max-w-xl mx-auto rounded-2xl border border-border bg-card p-12 text-center space-y-4">
          <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Finalizing checkout session...
          </p>
        </div>
      }>
        <CheckoutSuccessContent />
      </Suspense>
    </div>
  );
}
