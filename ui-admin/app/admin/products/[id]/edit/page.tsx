"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Files, GitBranch } from "lucide-react";
import { adminGetProduct, adminUpdateProduct } from "@digital-market/api-client";
import type { Product, Tag } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm, type ProductFormValues } from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { toast } from "@/components/ui/Toast";
import { slugify } from "@/lib/format";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    void adminGetProduct(id).then((res) => {
      if (res.data) setProduct(res.data);
      else setNotFound(true);
    });
  }, [id]);

  const onSubmit = async (v: ProductFormValues) => {
    const tags: Tag[] = v.tagList
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ id: `tag-${slugify(name)}`, name, slug: slugify(name) }));

    const res = await adminUpdateProduct(id, {
      title: v.title,
      slug: v.slug,
      categoryId: v.categoryId,
      shortDescription: v.shortDescription,
      description: v.description,
      price: v.price,
      salePrice: v.salePrice ?? undefined,
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

    if (res.success) {
      toast.success("Product updated");
      router.replace("/admin/products");
    } else {
      toast.error(res.message ?? "Update failed");
    }
  };

  if (notFound) {
    return (
      <div className="bg-white border border-[#e8e5df] rounded-xl p-10 text-center">
        <h2 className="text-[18px] font-semibold">Product not found</h2>
        <p className="text-[13.5px] text-[#6b6760] mt-1">It may have been deleted.</p>
        <Link href="/admin/products" className="inline-block mt-4">
          <Button variant="secondary">Back to products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={product?.title ?? "Edit product"}
        description={product?.shortDescription}
        actions={
          product && (
            <>
              <Link href={`/admin/products/${id}/files`}>
                <Button variant="secondary" leftIcon={<Files className="size-4" />}>Files</Button>
              </Link>
              <Link href={`/admin/products/${id}/versions`}>
                <Button variant="secondary" leftIcon={<GitBranch className="size-4" />}>Versions</Button>
              </Link>
            </>
          )
        }
      />
      {product ? (
        <ProductForm initial={product} onSubmit={onSubmit} submitLabel="Save changes" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Skeleton className="lg:col-span-2 h-[520px]" />
          <Skeleton className="h-[520px]" />
        </div>
      )}
    </div>
  );
}
