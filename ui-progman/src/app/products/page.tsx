"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES, type Product } from "@/lib/mockData";
import { useCartStore } from "@/store/cartStore";
import { Star, Download, Search, SlidersHorizontal, ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("default");
  const addToCart = useCartStore((state) => state.addToCart);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "downloads") {
      result.sort((a, b) => b.downloads - a.downloads);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

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
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-10 mb-10 gap-6">
        <div>
          <span className="eyebrow text-[var(--accent-electric)] mb-3">All Digital Products</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Explore templates & systems.
          </h1>
          <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
            Find the perfect starter kits, component bundles, UI layouts, and asset kits. All digital purchases include lifetime updates.
          </p>
        </div>
        
        {/* Sort & Search Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 rounded-xl border border-border bg-card px-4 pl-11 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all"
            />
            <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-11 rounded-xl border border-border bg-card px-4 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="downloads">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        {/* Sidebar filters */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="flex items-center gap-2 font-bold text-xs text-foreground uppercase tracking-wider pb-3 border-b border-border">
            <SlidersHorizontal className="size-4" />
            <span>Category Filters</span>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full h-11 px-4 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border hover:border-foreground/20 text-foreground"
              }`}
            >
              <span>All Categories</span>
              <span className="font-mono text-[10px] opacity-70">{PRODUCTS.length}</span>
            </button>
            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full h-11 px-4 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between border cursor-pointer ${
                    selectedCategory === cat.slug
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-card border-border hover:border-foreground/20 text-foreground"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="font-mono text-[10px] opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <span className="font-bold text-sm text-foreground block mb-2">No products found</span>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try refining your keyword query, resetting sorting, or selecting a different category from the filter list.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                  setSortBy("default");
                }}
                className="mt-4 h-9 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/95 transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map((prod) => (
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
                  
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-2">
                        <Star className="size-3.5 fill-current" />
                        <span className="font-bold">{prod.rating}</span>
                        <span className="text-muted-foreground font-medium">({prod.reviewsCount} reviews)</span>
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
                        Buy Now
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
