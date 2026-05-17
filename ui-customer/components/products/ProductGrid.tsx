import type { Product } from "@digital-market/shared-types";
import { ProductCard } from "./ProductCard";
import { ProductGridSkeleton } from "../ui/LoadingSkeleton";
import { EmptyState } from "../ui/EmptyState";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ProductGrid({
  products,
  loading,
  emptyTitle = "No products found",
  emptyDescription = "Try adjusting filters or browse another category.",
}: ProductGridProps) {
  if (loading) return <ProductGridSkeleton count={6} />;
  if (products.length === 0) {
    return (
      <EmptyState
        illustration="search"
        title={emptyTitle}
        description={emptyDescription}
        ctaHref="/products"
        ctaLabel="Browse all products"
      />
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
