"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { Category } from "@digital-market/shared-types";

export interface FilterValues {
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
  onChange: (v: FilterValues) => void;
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
  const [open, setOpen] = useState(false);

  const reset = () =>
    onChange({
      categorySlug: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      tags: [],
      licenseType: undefined,
    });

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden btn-pill bg-[#1B1B1B] text-[#1E5FAF] h-11 px-5 text-sm mb-4"
      >
        <SlidersHorizontal size={14} strokeWidth={2.6} />
        Filters
        <ChevronDown
          size={14}
          strokeWidth={2.6}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <aside
        className={`bg-white rounded-3xl p-6 border border-[#1B1B1B]/8 shadow-[0_8px_28px_-12px_rgba(17,24,39,0.18)] ${
          open ? "block" : "hidden lg:block"
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-lg tracking-[-0.02em]">Filters</h3>
          <button
            onClick={reset}
            className="text-[12px] font-bold text-[#0EA5E9] hover:underline underline-offset-4"
          >
            Reset
          </button>
        </div>

        <Section title="Category">
          <div className="space-y-1.5">
            <RadioRow
              label="All categories"
              checked={!values.categorySlug}
              onChange={() => onChange({ ...values, categorySlug: undefined })}
            />
            {categories.map((c) => (
              <RadioRow
                key={c.id}
                label={`${c.name}`}
                meta={c.productCount}
                checked={values.categorySlug === c.slug}
                onChange={() => onChange({ ...values, categorySlug: c.slug })}
              />
            ))}
          </div>
        </Section>

        <Section title="Price">
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              placeholder="Min $"
              value={values.minPrice}
              onChange={(v) => onChange({ ...values, minPrice: v })}
            />
            <NumberInput
              placeholder="Max $"
              value={values.maxPrice}
              onChange={(v) => onChange({ ...values, maxPrice: v })}
            />
          </div>
        </Section>

        <Section title="License">
          <select
            value={values.licenseType ?? ""}
            onChange={(e) =>
              onChange({
                ...values,
                licenseType: e.target.value || undefined,
              })
            }
            className="w-full h-11 px-4 rounded-2xl bg-[#EFF6FF] text-[#1B1B1B] font-bold text-sm border-2 border-transparent focus:border-[#1B1B1B]"
          >
            {LICENSES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </Section>

        {tagOptions.length > 0 && (
          <Section title="Tags" last>
            <div className="flex flex-wrap gap-1.5">
              {tagOptions.slice(0, 12).map((tag) => {
                const active = values.tags.includes(tag.value);
                return (
                  <button
                    key={tag.value}
                    onClick={() =>
                      onChange({
                        ...values,
                        tags: active
                          ? values.tags.filter((x) => x !== tag.value)
                          : [...values.tags, tag.value],
                      })
                    }
                    className={`px-3 h-8 rounded-full text-[12px] font-bold transition-colors ${
                      active
                        ? "bg-[#1B1B1B] text-[#1E5FAF]"
                        : "bg-[#EFF6FF] text-[#1B1B1B] hover:bg-[#EAF3FF]"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </Section>
        )}
      </aside>
    </>
  );
}

function Section({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "pb-5 mb-5 border-b border-[#1B1B1B]/10"}>
      <h4 className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1B1B1B]/70 mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

function RadioRow({
  label,
  meta,
  checked,
  onChange,
}: {
  label: string;
  meta?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer py-1.5 group">
      <span className="flex items-center gap-2.5">
        <span
          className={`w-4 h-4 rounded-full border-2 inline-flex items-center justify-center transition-colors ${
            checked ? "border-[#1B1B1B] bg-[#1B1B1B]" : "border-[#1B1B1B]/30"
          }`}
        >
          {checked && <span className="w-1.5 h-1.5 rounded-full bg-[#1E5FAF]" />}
        </span>
        <span className="text-sm font-bold">{label}</span>
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
      </span>
      {meta !== undefined && (
        <span className="text-[11px] font-bold text-[#1B1B1B]/50">{meta}</span>
      )}
    </label>
  );
}

function NumberInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: number;
  onChange: (v: number | undefined) => void;
}) {
  return (
    <input
      type="number"
      min={0}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) =>
        onChange(e.target.value === "" ? undefined : Number(e.target.value))
      }
      className="h-11 px-3 rounded-2xl bg-[#EFF6FF] text-[#1B1B1B] font-bold text-sm border-2 border-transparent focus:border-[#1B1B1B] placeholder:text-[#1B1B1B]/40"
    />
  );
}
