"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Check, Download, ShoppingBag } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

function SuccessInner() {
  const params = useSearchParams();
  const order = params.get("order") ?? "ord_unknown";
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-[720px] mx-auto px-5 md:px-8 pt-12 pb-20">
      <div className="bg-white rounded-[36px] p-10 md:p-14 text-center border border-[#1B1B1B]/5 shadow-[0_30px_60px_-25px_rgba(17,24,39,0.25)]">
        <div className="mx-auto w-24 h-24 rounded-full bg-[#14B8A6] text-white flex items-center justify-center">
          <Check size={42} strokeWidth={3.5} />
        </div>
        <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-[-0.04em]">
          Payment <span className="font-hand text-[#0EA5E9]">successful!</span>
        </h1>
        <p className="mt-3 text-[#1B1B1B]/75 font-semibold">
          Thanks for buying from indie creators. We&apos;ve emailed your receipt and download links.
        </p>
        {user && (
          <p className="mt-3 text-sm font-bold text-[#14B8A6]">
            Signed in as {user.displayName}. Your customer account is ready for orders, invoices, and downloads.
          </p>
        )}
        <div className="mt-6 inline-flex flex-wrap items-center gap-2 bg-[#EAF3FF] rounded-full px-4 py-2">
          <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60">
            Order
          </span>
          <span className="font-black">#{order}</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={user ? "/account/downloads" : "/search"}
            className="btn-pill bg-[#1B1B1B] text-[#1E5FAF] h-12 px-6 text-sm"
          >
            <Download size={14} strokeWidth={2.6} />
            {user ? "Open downloads" : "Find another product"}
          </Link>
          <Link
            href={user ? "/account/orders" : "/products"}
            className="btn-pill bg-white text-[#1B1B1B] h-12 px-6 text-sm border-2 border-[#1B1B1B]/10"
          >
            <ShoppingBag size={14} strokeWidth={2.6} />
            {user ? "View orders" : "Continue Shopping"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessInner />
    </Suspense>
  );
}
