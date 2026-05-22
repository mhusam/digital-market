import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { ProductDetailClient } from "./product-detail-client";
import { fetchProductBySlug, fetchRelatedProducts } from "../../_lib/server-api";
import { SITE_NAME, absoluteUrl } from "../../_lib/site";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
      robots: { index: false, follow: false },
    };
  }

  const description =
    product.description ??
    `Buy ${product.title} on ${SITE_NAME} — digital delivery and clear licensing.`;
  const canonical = absoluteUrl(`/products/${product.slug}`);

  return {
    title: product.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: product.title,
      description,
      url: canonical,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
    },
  };
}

export default async function ProductDetailsPage({ params }: PageParams) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await fetchRelatedProducts(product.offeringType ?? "PRODUCT", product.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description ?? undefined,
    sku: product.id,
    url: absoluteUrl(`/products/${product.slug}`),
    brand: { "@type": "Brand", name: SITE_NAME },
    category: product.offeringType,
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability:
        product.status === "PUBLISHED"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/products/${product.slug}`),
    },
  };

  return (
    <section
      className="shell-container product-shell"
      aria-labelledby="product-title"
    >
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/catalog", label: "Catalog" },
          { label: product.title },
        ]}
      />
      <ProductDetailClient product={product} related={related} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
