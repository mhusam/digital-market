"use client";

import { useRouter } from "next/navigation";
import { adminCreateProduct } from "@digital-market/api-client";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm, type ProductFormValues } from "@/components/admin/ProductForm";
import { toast } from "@/components/ui/Toast";

export default function CreateProductPage() {
  const router = useRouter();

  const onSubmit = async (v: ProductFormValues) => {
    const res = await adminCreateProduct({
      title: v.title,
      slug: v.slug || undefined,
      description: v.description || undefined,
      price: v.price,
      currency: v.currency,
    });

    if (res.success && res.data) {
      toast.success(`Created "${res.data.title}"`);
      router.replace("/admin/products");
    } else {
      toast.error(res.message ?? "Could not create product.");
    }
  };

  return (
    <div>
      <PageHeader
        title="New product"
        description="Add a new product to the catalog. You can upload files after saving."
      />
      <ProductForm onSubmit={onSubmit} submitLabel="Create product" />
    </div>
  );
}
