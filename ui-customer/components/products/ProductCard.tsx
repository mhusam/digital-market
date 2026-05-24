"use client";

import Link from "next/link";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import type { Product } from "@digital-market/shared-types";
import { formatCompact, formatPrice } from "../../lib/cover";
import { useCartStore } from "../../store/cartStore";
import { toast } from "../../store/toastStore";
import { Button } from "../ui/button";
import { StarRating } from "../ui/StarRating";
import { ProductCover } from "./ProductCover";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const hasSale =
    typeof product.salePrice === "number" && product.salePrice < product.price;
  const rating = product.rating ?? 0;
  const reviewCount = product.reviewCount ?? 0;
  const salesCount = product.salesCount ?? 0;

  const onAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const added = addItem(product);
    if (added) toast.success("Added to cart", product.title);
    else toast.info("Already in cart", product.title);
  };

  return (
    <article className="surface-edge group relative flex h-full flex-col overflow-hidden rounded-2xl">
      {/* Cover */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden"
      >
        <div className="overflow-hidden">
          <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <ProductCover
              seed={product.id}
              title={product.title}
              size="card"
              rounded="rounded-none"
            />
          </div>
        </div>

        {/* Featured ribbon */}
        {product.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-background backdrop-blur">
            <span className="size-1.5 rounded-full bg-[var(--accent-electric)]" />
            Featured
          </span>
        )}

        {/* Sale tag */}
        {hasSale && (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-[var(--accent-electric)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
            Sale
          </span>
        )}

        {/* Quick view */}
        <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-background/95 text-foreground shadow-lg backdrop-blur">
            <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {/* Category eyebrow */}
        <div className="mb-3 flex min-h-4 items-center justify-between gap-2">
          <Link
            href={`/categories/${product.category?.slug ?? "digital"}`}
            className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-[var(--accent-electric)]"
          >
            {product.category?.name ?? "Digital"}
          </Link>
          <StarRating value={rating} size={12} showValue reviewCount={reviewCount} />
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.75rem] text-[1.0625rem] font-extrabold leading-tight tracking-[-0.02em] text-foreground transition-colors group-hover:text-[var(--accent-electric)]">
            {product.title}
          </h3>
        </Link>

        {/* Short description */}
        <p className="mt-2.5 line-clamp-2 min-h-10 text-[13px] leading-5 text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="mt-4 hairline" />

        {/* Price + actions */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {formatCompact(salesCount)} sold
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-extrabold tracking-[-0.02em] tabular-nums text-foreground">
                {formatPrice(product.salePrice ?? product.price)}
              </span>
              {hasSale && (
                <span className="text-xs font-semibold tabular-nums text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
          <Button
            type="button"
            onClick={onAdd}
            variant="default"
            size="sm"
            aria-label={`Add ${product.title} to cart`}
            className="rounded-full"
          >
            <ShoppingCart size={14} className="mr-1.5" />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
