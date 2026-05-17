import type { ReactNode } from "react";
import Link from "next/link";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  illustration?: "search" | "cart" | "orders" | "downloads" | "default";
}

const illoMap = {
  search: "🔍",
  cart: "🛒",
  orders: "📦",
  downloads: "⬇",
  default: "✦",
};

export function EmptyState({
  icon,
  title,
  description,
  ctaHref,
  ctaLabel,
  illustration = "default",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-[#EAF3FF] border-2 border-[#1B1B1B]/15 flex items-center justify-center text-5xl shadow-[6px_6px_0_0_#1B1B1B]">
          {icon ?? <span aria-hidden>{illoMap[illustration]}</span>}
        </div>
        <span className="absolute -top-3 -right-3 font-hand text-2xl text-[#0EA5E9] -rotate-6">
          oh!
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl font-black tracking-[-0.03em] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[#1B1B1B]/75 max-w-md font-semibold">{description}</p>
      )}
      {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          className="btn-pill bg-[#1B1B1B] text-[#1E5FAF] h-12 px-6 text-sm mt-6"
        >
          {ctaLabel}
          <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
