import type { Product } from "@digital-market/shared-types";
import { EmptyState } from "../ui/app-empty-state";
import { ProductGridSkeleton } from "../ui/product-skeletons";
import { ProductCard } from "./ProductCard";

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
  if (loading) return <ProductGridSkeleton count={12} />;
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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
