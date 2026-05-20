"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductStatus } from "@digital-market/shared-types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { slugify } from "@/lib/format";

export interface ProductFormValues {
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  status: ProductStatus;
}

interface ProductFormProps {
  initial?: Partial<Product>;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  submitLabel?: string;
}

export function ProductForm({ initial, onSubmit, submitLabel = "Save product" }: ProductFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [slugDirty, setSlugDirty] = useState(Boolean(initial?.slug));

  const [values, setValues] = useState<ProductFormValues>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    currency: initial?.currency ?? "USD",
    status: initial?.status ?? "DRAFT",
  });

  const update = <K extends keyof ProductFormValues>(key: K, val: ProductFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const onTitleChange = (title: string) => {
    setValues((v) => ({ ...v, title, slug: slugDirty ? v.slug : slugify(title) }));
  };

  const handleSubmit = async (e: React.FormEvent, overrideStatus?: ProductStatus) => {
    e.preventDefault();
    if (!values.title || values.price <= 0) {
      toast.error("Title and a price greater than 0 are required.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(overrideStatus ? { ...values, status: overrideStatus } : values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-5">
        <FormCard title="Basic information">
          <div className="space-y-4">
            <Input
              label="Title *"
              value={values.title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="e.g. Auth Microservice API Kit"
              required
            />
            <Input
              label="Slug"
              value={values.slug}
              onChange={(e) => {
                setSlugDirty(true);
                update("slug", slugify(e.target.value));
              }}
              hint="URL-safe identifier. Auto-generated from title."
            />
            <Textarea
              label="Description"
              value={values.description ?? ""}
              onChange={(e) => update("description", e.target.value)}
              rows={6}
              className="min-h-[160px]"
            />
          </div>
        </FormCard>

        <FormCard title="Pricing">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Price *"
              type="number"
              min={0.01}
              step="0.01"
              value={values.price}
              onChange={(e) => update("price", parseFloat(e.target.value || "0"))}
              required
            />
            <Select
              label="Currency"
              value={values.currency}
              onChange={(e) => update("currency", e.target.value)}
              options={[{ value: "USD", label: "USD ($)" }]}
              disabled
            />
          </div>
        </FormCard>
      </div>

      <div className="space-y-5">
        <FormCard title="Publish">
          <div className="space-y-4">
            <Select
              label="Status"
              value={values.status}
              onChange={(e) => update("status", e.target.value as ProductStatus)}
              options={[
                { value: "DRAFT", label: "Draft" },
                { value: "PUBLISHED", label: "Published" },
                { value: "ARCHIVED", label: "Archived" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <Button type="submit" loading={submitting}>{submitLabel}</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => handleSubmit(e, "DRAFT")}
              disabled={submitting}
            >
              Save as draft
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.back()} disabled={submitting}>
              Cancel
            </Button>
          </div>
        </FormCard>
      </div>
    </form>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card overflow-hidden">
      <div className="px-5 py-3 border-b border-border-subtle bg-surface-muted">
        <h2 className="text-[13px] uppercase tracking-wider font-semibold text-muted">{title}</h2>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </section>
  );
}
