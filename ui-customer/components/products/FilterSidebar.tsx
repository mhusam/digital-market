"use client";

import { Search, Tag, X } from "lucide-react";
import type { Category } from "@digital-market/shared-types";
import { NativeSelect } from "../ui/native-select";

export interface FilterValues {
  query?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  tags: string[];
  licenseType?: string;
}

export interface TagOption {
  value: string;
  label: string;
}

interface FilterSidebarProps {
  categories: Category[];
  values: FilterValues;
  onChange: (value: FilterValues) => void;
  tagOptions?: TagOption[];
}

const LICENSES = [
  { value: "", label: "All licenses" },
  { value: "personal", label: "Personal" },
  { value: "commercial", label: "Commercial" },
  { value: "extended", label: "Extended" },
  { value: "developer", label: "Developer" },
];

export function FilterSidebar({
  categories,
  values,
  onChange,
  tagOptions = [],
}: FilterSidebarProps) {
  const reset = () =>
    onChange({
      query: undefined,
      categorySlug: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      tags: [],
      licenseType: undefined,
    });

  const hasAnyFilter = Boolean(
    values.query ||
      values.categorySlug ||
      values.licenseType ||
      values.minPrice !== undefined ||
      values.maxPrice !== undefined ||
      values.tags.length > 0,
  );

  return (
    <aside className="rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-[minmax(280px,1.35fr)_minmax(170px,0.9fr)_minmax(220px,1fr)_minmax(170px,0.9fr)_auto] lg:items-end">
        <div className="order-1 col-span-2 space-y-1.5 lg:order-none lg:col-span-1">
          <label className="text-xs font-bold text-muted-foreground">Search</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
            <input
              type="text"
              placeholder="Search products"
              value={values.query ?? ""}
              onChange={(event) =>
                onChange({
                  ...values,
                  query: event.target.value || undefined,
                })
              }
              className="h-10 w-full rounded-md border border-input bg-background pl-11 pr-3 text-sm font-semibold text-foreground shadow-inner shadow-primary/5 outline-none transition-colors placeholder:font-medium placeholder:text-muted-foreground focus:border-primary focus:bg-card focus:ring-3 focus:ring-primary/15"
              aria-label="Search products"
            />
          </div>
        </div>

        <div className="order-2 space-y-1.5 lg:order-none">
          <label className="text-xs font-bold text-muted-foreground">Category</label>
          <NativeSelect
            value={values.categorySlug ?? ""}
            onChange={(event) =>
              onChange({
                ...values,
                categorySlug: event.target.value || undefined,
              })
            }
            variant="soft"
            className="h-10 rounded-md bg-background text-sm font-semibold"
            aria-label="Category"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </NativeSelect>
        </div>

        <div className="order-4 col-span-2 space-y-1.5 lg:order-none lg:col-span-1">
          <label className="text-xs font-bold text-muted-foreground">Price</label>
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              placeholder="Min"
              value={values.minPrice}
              onChange={(value) => onChange({ ...values, minPrice: value })}
            />
            <NumberInput
              placeholder="Max"
              value={values.maxPrice}
              onChange={(value) => onChange({ ...values, maxPrice: value })}
            />
          </div>
        </div>

        <div className="order-3 space-y-1.5 lg:order-none">
          <label className="text-xs font-bold text-muted-foreground">License</label>
          <NativeSelect
            value={values.licenseType ?? ""}
            onChange={(event) =>
              onChange({
                ...values,
                licenseType: event.target.value || undefined,
              })
            }
            variant="soft"
            className="h-10 rounded-md bg-background text-sm font-semibold"
            aria-label="License"
          >
            {LICENSES.map((license) => (
              <option key={license.value} value={license.value}>
                {license.label}
              </option>
            ))}
          </NativeSelect>
        </div>

        <button
          type="button"
          onClick={reset}
          disabled={!hasAnyFilter}
          className="order-5 col-span-2 inline-flex h-10 items-center justify-center gap-1 self-end rounded-md border border-border bg-background px-3 text-xs font-bold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground lg:order-none lg:col-span-1"
          aria-label="Clear all filters"
        >
          <X size={14} />
          Clear
        </button>
      </div>

      {tagOptions.length > 0 && (
        <div className="mt-2 flex items-center gap-2 border-t border-border pt-2">
          <div className="flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
            <Tag size={14} />
            Tags
          </div>
          <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-1">
            {tagOptions.slice(0, 12).map((tag) => {
              const active = values.tags.includes(tag.value);
              return (
                <button
                  type="button"
                  key={tag.value}
                  onClick={() =>
                    onChange({
                      ...values,
                      tags: active
                        ? values.tags.filter((value) => value !== tag.value)
                        : [...values.tags, tag.value],
                    })
                  }
                  className={`h-7 shrink-0 rounded-md border px-2 text-xs font-bold transition-colors ${
                    active
                      ? "border-primary bg-accent text-primary"
                      : "border-border bg-card text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

function NumberInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: number;
  onChange: (value: number | undefined) => void;
}) {
  return (
    <input
      type="number"
      min={0}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(event) =>
        onChange(
          event.target.value === ""
            ? undefined
            : Math.max(0, Number(event.target.value)),
        )
      }
      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-semibold text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/15"
    />
  );
}
