"use client";

import { useRouter } from "next/navigation";
import { adminCreateProduct } from "@digital-market/api-client";
import type { Tag } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm, type ProductFormValues } from "@/components/admin/ProductForm";
import { toast } from "@/components/ui/Toast";
import { slugify } from "@/lib/format";

export default function CreateProductPage() {
  const router = useRouter();

  const onSubmit = async (v: ProductFormValues) => {
    const tags: Tag[] = v.tagList
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ id: `tag-${slugify(name)}`, name, slug: slugify(name) }));

    const res = await adminCreateProduct({
      title: v.title,
      slug: v.slug,
      categoryId: v.categoryId,
      shortDescription: v.shortDescription,
      description: v.description,
      price: v.price,
      salePrice: v.salePrice ?? undefined,
      currency: "USD",
      previewImages: [],
      demoUrl: v.demoUrl || undefined,
      tags,
      technologies: v.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      version: v.version,
      status: v.status,
      licenseType: v.licenseType,
      downloadLimit: v.downloadLimit,
      requirements: v.requirementsText.split("\n").map((s) => s.trim()).filter(Boolean),
      featured: v.featured,
    });

    if (res.success && res.data) {
      toast.success(`Created "${res.data.title}"`);
      router.replace(`/admin/products`);
    } else {
      toast.error(res.message ?? "Could not create product.");
    }
  };

  return (
    <div>
      <PageHeader
        title="New product"
        description="Add a new product to the catalog. You can edit files and versions after saving."
      />
      <ProductForm onSubmit={onSubmit} submitLabel="Create product" />
    </div>
  );
}
