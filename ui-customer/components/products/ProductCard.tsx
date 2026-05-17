"use client";

import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@digital-market/shared-types";
import { ProductCover } from "./ProductCover";
import { StarRating } from "../ui/StarRating";
import { Badge } from "../ui/Badge";
import { useCartStore } from "../../store/cartStore";
import { toast } from "../../store/toastStore";
import { formatPrice, formatCompact } from "../../lib/cover";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = addItem(product);
    if (ok) toast.success("Added to cart", product.title);
    else toast.info("Already in cart", product.title);
  };

  const hasSale =
    typeof product.salePrice === "number" && product.salePrice < product.price;

  return (
    <article className="card-lift group bg-white rounded-3xl overflow-hidden border border-[#1B1B1B]/5 shadow-[0_8px_28px_-12px_rgba(17,24,39,0.18)] flex flex-col">
      <Link href={`/products/${product.slug}`} className="block relative">
        <ProductCover seed={product.id} title={product.title} rounded="rounded-none" />
        {product.featured && (
          <span className="absolute top-3 left-3">
            <Badge tone="ink">★ Featured</Badge>
          </span>
        )}
        {hasSale && (
          <span className="absolute top-3 right-3">
            <Badge tone="coral">
              -
              {Math.round(
                ((product.price - (product.salePrice as number)) / product.price) *
                  100,
              )}
              %
            </Badge>
          </span>
        )}
        <div className="absolute inset-0 bg-[#1B1B1B]/0 group-hover:bg-[#1B1B1B]/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="btn-pill bg-white text-[#1B1B1B] h-10 px-5 text-[13px]">
            <Eye size={14} strokeWidth={2.6} />
            View Details
          </span>
        </div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Link
            href={`/categories/${product.category?.slug ?? "themes"}`}
            className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60 hover:text-[#1B1B1B]"
          >
            {product.category?.name ?? "Digital"}
          </Link>
          <StarRating value={product.rating} showValue reviewCount={product.reviewCount} />
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-[18px] font-black tracking-[-0.02em] leading-tight mb-1 group-hover:text-[#0EA5E9] transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-[13.5px] text-[#1B1B1B]/70 font-medium line-clamp-2 mb-4">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-[-0.03em]">
                {formatPrice(product.salePrice ?? product.price)}
              </span>
              {hasSale && (
                <span className="text-sm font-semibold text-[#1B1B1B]/45 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#1B1B1B]/55 uppercase tracking-[0.1em]">
              {formatCompact(product.salesCount)} sold
            </span>
          </div>
          <button
            onClick={onAdd}
            className="btn-pill bg-[#1B1B1B] text-[#1E5FAF] h-10 px-4 text-[13px] hover:bg-[#000]"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag size={14} strokeWidth={2.6} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
