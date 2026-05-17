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
  ctaLabel = "Continue to Checkout",
  onCheckout,
  loading,
  showCheckout = true,
}: CartSummaryProps) {
  return (
    <div className="bg-[#1B1B1B] text-[#F8FBFF] rounded-3xl p-6 md:p-7 sticky top-24">
      <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[#1E5FAF] mb-4">
        Order Summary
      </h3>
      <dl className="space-y-3 text-[15px] font-semibold">
        <Row label="Subtotal" value={formatPrice(subtotal)} />
        {discount > 0 && (
          <Row
            label={`Discount${couponCode ? ` (${couponCode})` : ""}`}
            value={`-${formatPrice(discount)}`}
            tone="coral"
          />
        )}
        <div className="border-t border-white/15 pt-3 mt-3 flex items-baseline justify-between">
          <dt className="font-black text-base">Total</dt>
          <dd className="font-black text-3xl tracking-[-0.03em] text-[#1E5FAF]">
            {formatPrice(total)}
          </dd>
        </div>
      </dl>
      {showCheckout &&
        (onCheckout ? (
          <button
            onClick={onCheckout}
            disabled={loading}
            className="btn-pill bg-[#1E5FAF] text-[#1B1B1B] hover:bg-[#164B89] w-full h-12 text-sm mt-6 disabled:opacity-60"
          >
            {loading ? "Processing…" : ctaLabel}
          </button>
        ) : (
          <Link
            href={ctaHref}
            className="btn-pill bg-[#1E5FAF] text-[#1B1B1B] hover:bg-[#164B89] w-full h-12 text-sm mt-6"
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        ))}
      <p className="text-[12px] text-white/55 mt-4 font-semibold leading-relaxed">
        Secure checkout. Instant delivery. Lifetime updates included with every
        purchase.
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
  tone?: "coral";
}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-white/75">{label}</dt>
      <dd
        className={`font-black ${
          tone === "coral" ? "text-[#0EA5E9]" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
