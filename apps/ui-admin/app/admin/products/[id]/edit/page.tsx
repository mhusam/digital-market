"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Files } from "lucide-react";
import { adminGetProduct, adminUpdateProduct } from "@digital-market/api-client";
import type { Product } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm, type ProductFormValues } from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { toast } from "@/components/ui/Toast";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    void adminGetProduct(id).then((res) => {
      if (res.data) setProduct(res.data);
      else setNotFound(true);
    });
  }, [id]);

  const onSubmit = async (v: ProductFormValues) => {
    const res = await adminUpdateProduct(id, {
      title: v.title,
      description: v.description || undefined,
      price: v.price,
      currency: v.currency,
    });

    if (res.success) {
      toast.success("Product updated");
    } else {
      toast.error(res.message ?? "Update failed");
    }
  };

  if (notFound) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-sm p-10 text-center">
        <h2 className="text-[18px] font-semibold">Product not found</h2>
        <p className="text-[13.5px] text-muted mt-1">It may have been deleted.</p>
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
        description={product ? `${product.currency} ${product.price} · ${product.status}` : undefined}
        actions={
          product && (
            <Link href={`/admin/products/${id}/files`}>
              <Button variant="secondary" leftIcon={<Files className="size-4" />}>Files</Button>
            </Link>
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
