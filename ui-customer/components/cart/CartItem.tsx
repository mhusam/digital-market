"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { formatPrice } from "../../lib/cover";
import type { LocalCartItem } from "../../store/cartStore";
import { ProductCover } from "../products/ProductCover";
import { Badge } from "../ui/badge";

interface CartItemRowProps {
  item: LocalCartItem;
  onRemove: () => void;
}

export function CartItemRow({ item, onRemove }: CartItemRowProps) {
  return (
    <div className="grid gap-4 rounded-lg border border-border bg-card p-4 shadow-sm sm:grid-cols-[96px_1fr_auto_auto] sm:items-center">
      <ProductCover
        seed={item.productId}
        title={item.title}
        size="sm"
        rounded="rounded-md"
      />
      <div className="min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="block truncate font-extrabold text-foreground hover:text-primary"
        >
          {item.title}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <Badge tone="blue">{item.licenseType}</Badge>
          <span className="text-sm text-muted-foreground">License</span>
        </div>
      </div>
      <span className="font-extrabold text-foreground">{formatPrice(item.price)}</span>
      <button
        type="button"
        onClick={onRemove}
        className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-muted/40 hover:text-red-700"
        aria-label={`Remove ${item.title}`}
      >
        <X size={16} />
      </button>
    </div>
  );
}
