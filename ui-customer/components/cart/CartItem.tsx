"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { ProductCover } from "../products/ProductCover";
import { Badge } from "../ui/Badge";
import { formatPrice } from "../../lib/cover";
import type { LocalCartItem } from "../../store/cartStore";

interface CartItemRowProps {
  item: LocalCartItem;
  onRemove: () => void;
}

export function CartItemRow({ item, onRemove }: CartItemRowProps) {
  return (
    <div className="bg-white rounded-3xl p-4 flex items-center gap-4 border border-[#1B1B1B]/5 shadow-[0_8px_24px_-14px_rgba(17,24,39,0.18)]">
      <div className="w-28 flex-shrink-0">
        <div className="rounded-2xl overflow-hidden h-20">
          <ProductCover seed={item.productId} title={item.title} size="sm" rounded="rounded-2xl" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="font-black text-[16px] tracking-[-0.02em] hover:text-[#0EA5E9] block truncate"
        >
          {item.title}
        </Link>
        <div className="mt-1.5 flex items-center gap-2">
          <Badge tone="warn">{item.licenseType}</Badge>
          <span className="text-[12px] font-bold text-[#1B1B1B]/60">
            License
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className="font-black text-xl tracking-[-0.02em]">
          {formatPrice(item.price)}
        </div>
      </div>
      <button
        onClick={onRemove}
        className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#EFF6FF] hover:bg-[#2563EB] hover:text-white transition-colors flex-shrink-0"
        aria-label={`Remove ${item.title}`}
      >
        <X size={16} strokeWidth={2.6} />
      </button>
    </div>
  );
}
