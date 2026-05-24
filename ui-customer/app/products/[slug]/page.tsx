import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@digital-market/api-client";
import { Breadcrumb } from "../../../components/ui/route-breadcrumb";
import { ProductCover } from "../../../components/products/ProductCover";
import { StarRating } from "../../../components/ui/StarRating";
import { Badge } from "../../../components/ui/badge";
import { ProductCard } from "../../../components/products/ProductCard";
import { ProductDetailActions } from "./ProductDetailActions";
import { ProductDetailTabs } from "./ProductDetailTabs";
import { formatPrice, formatCompact } from "../../../lib/cover";
import { Eye, Download, ShieldCheck, Code2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await getProduct(slug);
  const product = res.data;
  if (!product) return notFound();

  const relatedRes = await getProducts({ sortBy: "popular", limit: 3 });
  const related = (relatedRes.data ?? []).filter((p) => p.id !== product.id).slice(0, 3);

  const hasSale =
    typeof product.salePrice === "number" && product.salePrice < product.price;
  const rating = product.rating ?? 0;
  const reviewCount = product.reviewCount ?? 0;
  const salesCount = product.salesCount ?? 0;
  const technologies = product.technologies ?? [];

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.title },
        ]}
      />

      <div className="mt-6 grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="bg-card rounded-3xl p-4 md:p-6 border border-border shadow-[0_20px_50px_-20px_rgba(17,24,39,0.25)]">
            <ProductCover seed={product.id} title={product.title} size="lg" />
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden cursor-pointer border-2 ${
                    i === 0 ? "border-foreground" : "border-transparent opacity-75"
                  }`}
                >
                  <ProductCover seed={`${product.id}-${i}`} title={product.title} size="sm" rounded="rounded-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <ProductDetailTabs product={product} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 space-y-5">
            <div className="bg-card rounded-3xl p-6 md:p-7 border border-border shadow-[0_18px_40px_-20px_rgba(17,24,39,0.25)]">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <Badge tone="warn">{product.category?.name ?? "Digital"}</Badge>
                {product.featured && <Badge tone="ink">★ Featured</Badge>}
                {hasSale && (
                  <Badge tone="coral">
                    -
                    {Math.round(
                      ((product.price - (product.salePrice as number)) /
                        product.price) *
                        100,
                    )}
                    %
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-[-0.04em] leading-tight">
                {product.title}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <StarRating value={rating} showValue reviewCount={reviewCount} />
                <span className="text-[13px] font-bold text-muted-foreground">
                  • {formatCompact(salesCount)} sold
                </span>
              </div>
              <p className="mt-4 text-[15px] text-muted-foreground font-medium leading-relaxed">
                {product.shortDescription ?? "A premium digital product crafted for modern teams."}
              </p>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-5xl font-black tracking-[-0.04em]">
                  {formatPrice(product.salePrice ?? product.price)}
                </span>
                {hasSale && (
                  <span className="text-lg font-semibold text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              <ProductDetailActions product={product} />

              <div className="mt-5 pt-5 border-t border-border grid grid-cols-3 gap-3 text-center">
                <Stat icon={<Download size={16} />} label="Instant" sub="delivery" />
                <Stat icon={<ShieldCheck size={16} />} label="Lifetime" sub="updates" />
                <Stat icon={<Code2 size={16} />} label="Full" sub="source code" />
              </div>
            </div>

            {product.demoUrl && (
              <Link
                href={product.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-pill bg-card text-foreground w-full h-12 text-sm border-2 border-border"
              >
                <Eye size={15} strokeWidth={2.6} />
                Live demo
              </Link>
            )}

            <div className="bg-foreground text-primary-foreground rounded-3xl p-6">
              <h4 className="font-black text-base text-primary mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 h-8 inline-flex items-center rounded-full bg-card/10 text-primary-foreground text-[12px] font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="eyebrow">You may also like</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-[-0.04em]">
                Related products
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="w-9 h-9 rounded-full bg-accent inline-flex items-center justify-center">
        {icon}
      </span>
      <span className="font-black text-[13px] tracking-[-0.02em] mt-1">{label}</span>
      <span className="text-[11px] font-bold text-muted-foreground">{sub}</span>
    </div>
  );
}
