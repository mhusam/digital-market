import { notFound } from "next/navigation";
import {
  getCategories,
  getCategoryProducts,
} from "@digital-market/api-client";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { ProductCard } from "../../../components/products/ProductCard";
import { EmptyState } from "../../../components/ui/EmptyState";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_BANNERS: Record<string, { bg: string; text: string; glyph: string }> = {
  "microservices-implementation": { bg: "#0EA5E9", text: "#1B1B1B", glyph: "◆" },
  "saas-solutions": { bg: "#14B8A6", text: "#F8FBFF", glyph: "⚡" },
  "website-templates": { bg: "#2563EB", text: "#F8FBFF", glyph: "▤" },
  "dashboard-templates": { bg: "#0284C7", text: "#F8FBFF", glyph: "◫" },
  "ui-ux-templates": { bg: "#38BDF8", text: "#F8FBFF", glyph: "✦" },
  "figma-kits": { bg: "#EAF3FF", text: "#1B1B1B", glyph: "Aa" },
  "photoshop-assets": { bg: "#FED7AA", text: "#1B1B1B", glyph: "◩" },
  "design-systems": { bg: "#1B1B1B", text: "#1E5FAF", glyph: "</>" },
  "api-packages": { bg: "#E0F2FE", text: "#1B1B1B", glyph: "{ }" },
  "source-code-packages": { bg: "#DCEBEE", text: "#1B1B1B", glyph: "</>" },
  "documentation-guides": { bg: "#ECFEFF", text: "#1B1B1B", glyph: "?" },
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
  const banner = CATEGORY_BANNERS[slug] ?? { bg: "#1E5FAF", text: "#F8FBFF", glyph: "◆" };

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
        className="mt-6 rounded-[32px] p-8 md:p-14 relative overflow-hidden"
        style={{ background: banner.bg, color: banner.text }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(${banner.text} 1.5px, transparent 1.5px)`,
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />
        <div className="relative grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <span
              className="eyebrow"
              style={{ background: banner.text, color: banner.bg }}
            >
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
              style={{ color: banner.text, opacity: 0.18 }}
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
