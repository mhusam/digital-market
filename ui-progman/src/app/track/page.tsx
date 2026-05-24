"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, ShieldAlert, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

const TOKEN_PATTERN = /^[A-Za-z0-9-]{8,}$/;

export default function TrackOrderPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = token.trim();
    if (!TOKEN_PATTERN.test(trimmed)) {
      toast.error("Confirmation tokens must be at least 8 alphanumeric characters.");
      return;
    }

    setSearching(true);
    toast.info("Searching for guest order token...");
    
    // Simulate lookup and redirect
    setTimeout(() => {
      setSearching(false);
      router.push(`/orders/confirmation/${encodeURIComponent(trimmed)}`);
    }, 1000);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="eyebrow text-[var(--accent-electric)]">Order Tracking</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Find guest order.
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Enter the transaction confirmation token received in your email invoice to track delivery and access downloads.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 size-32 bg-gradient-to-bl from-[var(--accent-electric)]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                Confirmation Token
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. 8f3c-9e21-7a44"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full h-11 rounded-xl border border-border bg-muted/30 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
                />
                <Search className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
              </div>
            </div>

            <button
              type="submit"
              disabled={searching}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer"
            >
              {searching ? (
                <div className="size-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Locate Receipt</span>
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2 text-[11px] font-semibold text-muted-foreground">
            <div className="flex gap-2 text-foreground">
              <BadgeCheck className="size-4 text-emerald-500 shrink-0" />
              <span>Registered Accounts</span>
            </div>
            <p className="leading-relaxed">
              If you purchased while logged in, all invoice history, receipts, and ZIP packages are pinned inside your{" "}
              <Link href="/account" className="text-foreground underline">
                Account Center
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
