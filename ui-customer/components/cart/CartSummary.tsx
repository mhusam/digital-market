"use client";

import Link from "next/link";
import { formatPrice } from "../../lib/cover";

interface CartSummaryProps {
  subtotal: number;
  discount: number;
  couponCode?: string | null;
  total: number;
  ctaHref?: string;
  ctaLabel?: string;
  onCheckout?: () => void;
  loading?: boolean;
  showCheckout?: boolean;
}

export function CartSummary({
  subtotal,
  discount,
  couponCode,
  total,
  ctaHref = "/checkout",
  ctaLabel = "Continue to checkout",
  onCheckout,
  loading,
  showCheckout = true,
}: CartSummaryProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm lg:sticky lg:top-20">
      <h2 className="text-lg font-extrabold text-foreground">Order summary</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <Row label="Subtotal" value={formatPrice(subtotal)} />
        {discount > 0 && (
          <Row
            label={`Discount${couponCode ? ` (${couponCode})` : ""}`}
            value={`-${formatPrice(discount)}`}
            tone="success"
          />
        )}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <dt className="font-extrabold text-foreground">Total</dt>
          <dd className="text-2xl font-extrabold text-foreground">
            {formatPrice(total)}
          </dd>
        </div>
      </dl>

      {showCheckout &&
        (onCheckout ? (
          <button
            type="button"
            onClick={onCheckout}
            disabled={loading}
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Processing" : ctaLabel}
          </button>
        ) : (
          <Link
            href={ctaHref}
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            {ctaLabel}
          </Link>
        ))}
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Secure mock checkout. Downloads unlock immediately after payment.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success";
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`font-extrabold ${tone === "success" ? "text-emerald-600 dark:text-emerald-300" : "text-foreground"}`}>
        {value}
      </dd>
    </div>
  );
}
