import Link from "next/link";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  illustration?: "search" | "cart" | "orders" | "downloads" | "default";
}

const illoMap = {
  search: "Search",
  cart: "Cart",
  orders: "Orders",
  downloads: "Files",
  default: "Empty",
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
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-14 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-lg bg-accent text-sm font-extrabold text-primary">
        {icon ?? <span aria-hidden>{illoMap[illustration]}</span>}
      </div>
      <h2 className="text-2xl font-extrabold text-foreground">{title}</h2>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      )}
      {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
