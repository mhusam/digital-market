"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminGetCategories } from "@digital-market/api-client";
import type { Category, LicenseType, Product, ProductStatus } from "@digital-market/shared-types";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import { slugify } from "@/lib/format";

export interface ProductFormValues {
  title: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice: number | null;
  currency: "USD";
  licenseType: LicenseType;
  demoUrl: string;
  tagList: string;
  technologies: string;
  requirementsText: string;
  version: string;
  status: ProductStatus;
  downloadLimit: number;
  featured: boolean;
  previewImages: Product["previewImages"];
  tags: Product["tags"];
}

interface ProductFormProps {
  initial?: Partial<Product>;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  submitLabel?: string;
}

export function ProductForm({ initial, onSubmit, submitLabel = "Save product" }: ProductFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [slugDirty, setSlugDirty] = useState(Boolean(initial?.slug));

  const [values, setValues] = useState<ProductFormValues>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    categoryId: initial?.categoryId ?? "",
    shortDescription: initial?.shortDescription ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    salePrice: initial?.salePrice ?? null,
    currency: "USD",
    licenseType: initial?.licenseType ?? "commercial",
    demoUrl: initial?.demoUrl ?? "",
    tagList: (initial?.tags ?? []).map((t) => t.name).join(", "),
    technologies: (initial?.technologies ?? []).join(", "),
    requirementsText: (initial?.requirements ?? []).join("\n"),
    version: initial?.version ?? "1.0.0",
    status: initial?.status ?? "draft",
    downloadLimit: initial?.downloadLimit ?? 5,
    featured: initial?.featured ?? false,
    previewImages: initial?.previewImages ?? [],
    tags: initial?.tags ?? [],
  });

  useEffect(() => {
    void adminGetCategories().then((res) => res.data && setCategories(res.data));
  }, []);

  const update = <K extends keyof ProductFormValues>(key: K, val: ProductFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const onTitleChange = (title: string) => {
    setValues((v) => ({ ...v, title, slug: slugDirty ? v.slug : slugify(title) }));
  };

  const handleSubmit = async (e: React.FormEvent, overrideStatus?: ProductStatus) => {
    e.preventDefault();
    if (!values.title || !values.categoryId || !values.shortDescription || values.price <= 0) {
      toast.error("Please fill in all required fields.");
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
              label="Slug *"
              value={values.slug}
              onChange={(e) => {
                setSlugDirty(true);
                update("slug", slugify(e.target.value));
              }}
              hint="URL-safe identifier. Auto-generated from title."
              required
            />
            <Textarea
              label="Short description *"
              value={values.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
              hint="One sentence summary shown in cards and search."
              maxLength={200}
              required
            />
            <Textarea
              label="Full description"
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              rows={6}
              className="min-h-[160px]"
            />
          </div>
        </FormCard>

        <FormCard title="Pricing">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Price (USD) *"
              type="number"
              min={0}
              step="0.01"
              value={values.price}
              onChange={(e) => update("price", parseFloat(e.target.value || "0"))}
              required
            />
            <Input
              label="Sale price"
              type="number"
              min={0}
              step="0.01"
              value={values.salePrice ?? ""}
              onChange={(e) => update("salePrice", e.target.value ? parseFloat(e.target.value) : null)}
              hint="Optional"
            />
            <Select
              label="Currency"
              value={values.currency}
              onChange={() => {}}
              options={[{ value: "USD", label: "USD ($)" }]}
              disabled
            />
          </div>
        </FormCard>

        <FormCard title="Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Demo URL"
              value={values.demoUrl}
              onChange={(e) => update("demoUrl", e.target.value)}
              placeholder="https://demo.example.com"
            />
            <Input
              label="Version"
              value={values.version}
              onChange={(e) => update("version", e.target.value)}
              placeholder="1.0.0"
            />
            <Input
              label="Tags"
              value={values.tagList}
              onChange={(e) => update("tagList", e.target.value)}
              hint="Comma-separated"
              placeholder="api, microservice, nodejs"
            />
            <Input
              label="Technologies"
              value={values.technologies}
              onChange={(e) => update("technologies", e.target.value)}
              hint="Comma-separated"
              placeholder="Node.js, TypeScript, PostgreSQL"
            />
          </div>
          <Textarea
            label="Requirements"
            value={values.requirementsText}
            onChange={(e) => update("requirementsText", e.target.value)}
            hint="One requirement per line"
            placeholder={"Node.js >= 18\nPostgreSQL >= 14"}
          />
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
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
                { value: "archived", label: "Archived" },
              ]}
            />
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={values.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="accent-[#4F46E5] size-4"
              />
              <span className="text-[13px]">Feature this product on the homepage</span>
            </label>
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <Button type="submit" loading={submitting}>{submitLabel}</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={submitting}
            >
              Save as draft
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.back()} disabled={submitting}>
              Cancel
            </Button>
          </div>
        </FormCard>

        <FormCard title="Organization">
          <Select
            label="Category *"
            value={values.categoryId}
            onChange={(e) => update("categoryId", e.target.value)}
            options={[{ value: "", label: "Select a category…" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
            required
          />
          <Select
            label="License type"
            value={values.licenseType}
            onChange={(e) => update("licenseType", e.target.value as LicenseType)}
            options={[
              { value: "personal", label: "Personal" },
              { value: "commercial", label: "Commercial" },
              { value: "extended", label: "Extended" },
              { value: "developer", label: "Developer" },
            ]}
          />
          <Input
            label="Download limit"
            type="number"
            min={1}
            value={values.downloadLimit}
            onChange={(e) => update("downloadLimit", parseInt(e.target.value || "5"))}
            hint="Max downloads per purchase"
          />
        </FormCard>
      </div>
    </form>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-[#e8e5df] rounded-xl">
      <div className="px-5 py-3 border-b border-[#eee9de]">
        <h2 className="text-[13px] uppercase tracking-wider font-semibold text-[#6b6760]">{title}</h2>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </section>
  );
}
