"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/mockData";
import { useCartStore } from "@/store/cartStore";
import {
  Star,
  Download,
  Check,
  ShieldAlert,
  ArrowLeft,
  ShoppingCart,
  Zap,
  Globe,
  Tag,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const product = PRODUCTS.find((p) => p.id === id);
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [selectedLicense, setSelectedLicense] = useState("single");

  if (!product) {
    return (
      <div className="page-container py-32 text-center">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <p className="text-xs text-muted-foreground mt-2">The digital item you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent-electric)] hover:underline">
          <ArrowLeft className="size-4" /> Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: selectedLicense === "unlimited" ? product.price * 2.5 : product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.title} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: selectedLicense === "unlimited" ? product.price * 2.5 : product.price,
      image: product.image,
      category: product.category,
    });
    router.push("/cart");
  };

  // Get similar products
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 2);

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3" />
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground truncate max-w-xs">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left column - main contents */}
        <div className="lg:col-span-2 space-y-10">
          <div className="relative rounded-2xl overflow-hidden bg-muted border border-border aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.title}
              className="object-cover size-full"
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              {product.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground">
              <span className="px-3 py-1 rounded-full border border-border bg-card text-foreground uppercase tracking-wider text-[10px]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="size-4 fill-current" />
                <span className="text-foreground font-bold">{product.rating}</span>
                <span>({product.reviewsCount} reviews)</span>
              </div>
              <span className="size-1 rounded-full bg-muted-foreground/30" />
              <span className="inline-flex items-center gap-1">
                <Download className="size-3.5" /> {product.downloads} downloads
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-border pt-8">
            <h2 className="text-lg font-bold text-foreground mb-3">Product Overview</h2>
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.longDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="border-t border-border pt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Core Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="size-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3" />
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta specs */}
          <div className="border-t border-border pt-8 grid grid-cols-3 gap-6 text-center">
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Version</span>
              <span className="font-mono text-sm font-extrabold text-foreground">{product.version}</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Released</span>
              <span className="font-mono text-sm font-extrabold text-foreground">{product.releaseDate}</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">License</span>
              <span className="text-xs font-bold text-foreground truncate block">{product.license}</span>
            </div>
          </div>
        </div>

        {/* Right column - checkout card */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground tabular-nums">
                  ${(selectedLicense === "unlimited" ? product.price * 2.5 : product.price).toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground font-semibold">USD</span>
              </div>
            </div>

            {/* License options */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-bold text-foreground block">Select License</label>
              
              <button
                onClick={() => setSelectedLicense("single")}
                className={`w-full p-3.5 rounded-xl border text-left flex items-start justify-between cursor-pointer transition-all ${
                  selectedLicense === "single"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-foreground/20"
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-foreground block">Single Use License</span>
                  <span className="text-[10px] text-muted-foreground">For 1 personal or commercial project.</span>
                </div>
                {selectedLicense === "single" && <div className="size-3.5 rounded-full bg-primary" />}
              </button>

              <button
                onClick={() => setSelectedLicense("unlimited")}
                className={`w-full p-3.5 rounded-xl border text-left flex items-start justify-between cursor-pointer transition-all ${
                  selectedLicense === "unlimited"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-foreground/20"
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-foreground block">Unlimited Projects License</span>
                  <span className="text-[10px] text-muted-foreground">Use in unlimited personal or client SaaS builds.</span>
                </div>
                {selectedLicense === "unlimited" && <div className="size-3.5 rounded-full bg-primary" />}
              </button>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleBuyNow}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer"
              >
                <Zap className="size-4 fill-current" />
                Buy Now & Download
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full h-11 rounded-xl border border-border bg-card text-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-muted transition-all cursor-pointer"
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </button>
            </div>

            <div className="mt-6 border-t border-border pt-4 text-center flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground font-medium">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>Safe purchase: PayPal and Bank confirmations</span>
            </div>
          </div>

          {/* Creator card */}
          <div className="rounded-2xl border border-border bg-muted/30 p-5 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.creator.avatar}
              alt={product.creator.name}
              className="size-11 rounded-full object-cover border border-border"
            />
            <div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">Author</span>
              <span className="text-xs font-bold text-foreground block">{product.creator.name}</span>
              <span className="text-[10px] text-muted-foreground">{product.creator.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border mt-20 pt-16">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-8">
            You might also like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProducts.map((prod) => (
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
                  <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-border text-[10px] font-bold uppercase tracking-wider text-foreground">
                    {prod.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-foreground/90 text-background px-2.5 py-1 rounded-full text-xs font-bold tabular-nums">
                    ${prod.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 block">{prod.category}</span>
                  <h3 className="text-base font-bold text-foreground mb-1.5 group-hover:text-[var(--accent-electric)] transition-colors truncate">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
