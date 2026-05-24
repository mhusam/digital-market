"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIES, PRODUCTS, Product } from "@/lib/mockData";
import { useCartStore } from "@/store/cartStore";
import { Star, Download, ArrowLeft, ArrowUpRight, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const category = CATEGORIES.find((c) => c.slug === slug);
  const categoryProducts = PRODUCTS.filter((p) => p.category === slug);
  const addToCart = useCartStore((state) => state.addToCart);

  if (!category) {
    return (
      <div className="page-container py-32 text-center">
        <h1 className="text-2xl font-bold text-foreground">Category not found</h1>
        <p className="text-xs text-muted-foreground mt-2">The product category you requested does not exist.</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent-electric)] hover:underline">
          <ArrowLeft className="size-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Category Header */}
      <div className="border-b border-border pb-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="size-3.5" /> Back to all items
          </Link>
          <span className="eyebrow text-[var(--accent-violet)] mb-3">Ecosystem Category</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            {category.name}
          </h1>
          <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
            {category.description}
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-4xl sm:text-5xl font-black text-muted-foreground/30 block leading-none">
            0{category.id.slice(-1) || "1"}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {categoryProducts.length} Available items
          </span>
        </div>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <span className="font-bold text-sm text-foreground block mb-2 font-sans">No products in this category</span>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
            We are working on uploading starter boilerplate templates and components for this category. Check back soon.
          </p>
          <Link
            href="/products"
            className="mt-5 inline-flex h-9 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-xs items-center hover:bg-primary/95 transition-colors"
          >
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((prod) => (
            <Link
              key={prod.id}
              href={`/products/${prod.id}`}
              className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklab,var(--foreground)_15%,transparent)]"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted border-b border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="object-cover size-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-foreground/90 text-background px-2.5 py-1 rounded-full text-xs font-bold tabular-nums">
                  ${prod.price.toFixed(2)}
                </div>
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-2">
                    <Star className="size-3.5 fill-current" />
                    <span className="font-bold">{prod.rating}</span>
                    <span className="text-muted-foreground font-medium">({prod.reviewsCount})</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-[var(--accent-electric)] transition-colors line-clamp-1">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
                <div className="border-t border-border pt-4 mt-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-medium text-muted-foreground inline-flex items-center gap-1">
                    <Download className="size-3" /> {prod.downloads} downloads
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(prod, e)}
                    className="h-8 px-3 rounded-xl bg-primary text-primary-foreground font-semibold text-[11px] hover:bg-primary/95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
