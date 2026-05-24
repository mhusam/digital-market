import { notFound } from "next/navigation";
import {
  getCategories,
  getCategoryProducts,
} from "@digital-market/api-client";
import { Breadcrumb } from "../../../components/ui/route-breadcrumb";
import { ProductCard } from "../../../components/products/ProductCard";
import { EmptyState } from "../../../components/ui/app-empty-state";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_BANNERS: Record<
  string,
  {
    glyph: string;
    wrapperClassName: string;
    badgeClassName: string;
  }
> = {
  "microservices-implementation": {
    glyph: "◆",
    wrapperClassName:
      "bg-gradient-to-br from-cyan-500 to-sky-600 text-white dark:from-cyan-400 dark:to-sky-500 dark:text-slate-950",
    badgeClassName: "bg-white/90 text-sky-700",
  },
  "saas-solutions": {
    glyph: "⚡",
    wrapperClassName:
      "bg-gradient-to-br from-emerald-500 to-teal-600 text-white dark:from-emerald-400 dark:to-teal-500 dark:text-slate-950",
    badgeClassName: "bg-white/90 text-emerald-700",
  },
  "website-templates": {
    glyph: "▤",
    wrapperClassName:
      "bg-gradient-to-br from-blue-500 to-indigo-600 text-white dark:from-blue-400 dark:to-indigo-500 dark:text-slate-950",
    badgeClassName: "bg-white/90 text-blue-700",
  },
  "dashboard-templates": {
    glyph: "◫",
    wrapperClassName:
      "bg-gradient-to-br from-violet-500 to-indigo-600 text-white dark:from-violet-400 dark:to-indigo-500 dark:text-slate-950",
    badgeClassName: "bg-white/90 text-violet-700",
  },
  "ui-ux-templates": {
    glyph: "✦",
    wrapperClassName:
      "bg-gradient-to-br from-fuchsia-500 to-rose-600 text-white dark:from-fuchsia-400 dark:to-rose-500 dark:text-slate-950",
    badgeClassName: "bg-white/90 text-fuchsia-700",
  },
  "figma-kits": {
    glyph: "Aa",
    wrapperClassName:
      "bg-gradient-to-br from-amber-100 to-orange-200 text-slate-900 dark:from-amber-900/60 dark:to-orange-900/60 dark:text-amber-100",
    badgeClassName: "bg-white/90 text-orange-700",
  },
  "photoshop-assets": {
    glyph: "◩",
    wrapperClassName:
      "bg-gradient-to-br from-orange-300 to-amber-400 text-slate-900 dark:from-orange-800 dark:to-amber-700 dark:text-amber-100",
    badgeClassName: "bg-white/90 text-orange-700",
  },
  "design-systems": {
    glyph: "</>",
    wrapperClassName:
      "bg-gradient-to-br from-slate-900 to-slate-700 text-blue-200 dark:from-slate-700 dark:to-slate-500 dark:text-blue-100",
    badgeClassName: "bg-blue-200/90 text-slate-900",
  },
  "api-packages": {
    glyph: "{ }",
    wrapperClassName:
      "bg-gradient-to-br from-sky-100 to-blue-200 text-slate-900 dark:from-blue-900/60 dark:to-sky-900/60 dark:text-blue-100",
    badgeClassName: "bg-white/90 text-blue-700",
  },
  "source-code-packages": {
    glyph: "</>",
    wrapperClassName:
      "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-900 dark:from-slate-800 dark:to-slate-700 dark:text-slate-100",
    badgeClassName: "bg-white/90 text-slate-700",
  },
  "documentation-guides": {
    glyph: "?",
    wrapperClassName:
      "bg-gradient-to-br from-cyan-100 to-teal-200 text-slate-900 dark:from-cyan-900/60 dark:to-teal-900/60 dark:text-cyan-100",
    badgeClassName: "bg-white/90 text-teal-700",
  },
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [catsRes, productsRes] = await Promise.all([
    getCategories(),
    getCategoryProducts(slug, { limit: 24, sortBy: "popular" }),
  ]);

  const category = catsRes.data?.find((c) => c.slug === slug);
  if (!category) return notFound();

  const products = productsRes.data ?? [];
  const banner = CATEGORY_BANNERS[slug] ?? {
    glyph: "◆",
    wrapperClassName:
      "bg-gradient-to-br from-primary to-blue-700 text-primary-foreground dark:from-blue-500 dark:to-indigo-500",
    badgeClassName: "bg-white/90 text-blue-700",
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/products" },
          { label: category.name },
        ]}
      />

      {/* Hero */}
      <section
        className={`relative mt-6 overflow-hidden rounded-[32px] p-8 md:p-14 ${banner.wrapperClassName}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(currentColor_1.4px,transparent_1.4px)] bg-[size:22px_22px] opacity-20" aria-hidden />
        <div className="relative grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <span className={`eyebrow border-transparent ${banner.badgeClassName}`}>
              Category
            </span>
            <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-[-0.05em] leading-[0.9]">
              {category.name}
            </h1>
            <p className="mt-4 font-semibold max-w-lg text-[15px] md:text-base opacity-85">
              {category.description ??
                `Explore ${category.productCount} curated ${category.name.toLowerCase()} from indie creators around the world.`}
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <span
              className="font-black text-[160px] md:text-[220px] leading-none -mr-4"
              style={{ opacity: 0.18 }}
              aria-hidden
            >
              {banner.glyph}
            </span>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mt-12">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-[-0.04em]">
            {products.length} curated products
          </h2>
        </div>
        {products.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            description="We're still curating products for this category."
            ctaHref="/products"
            ctaLabel="Browse all"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
