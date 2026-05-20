"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, error, className, ...rest },
  ref,
) {
  return (
    <label className="block">
      {label && (
        <span className="block text-[13px] font-medium text-[#1B1B1B] mb-1.5">
          {label}
        </span>
      )}
      <span
        className={cn(
          "group relative flex h-11 items-center rounded-xl border bg-white shadow-[0_10px_28px_-24px_rgba(17,24,39,0.55)] transition-all hover:border-[#d8d1c7] hover:bg-[#fffefa] focus-within:ring-4",
          error
            ? "border-[#ef4444] focus-within:ring-[#ef4444]/15"
            : "border-[#e8e5df] focus-within:border-[#4F46E5] focus-within:ring-[#4F46E5]/15",
        )}
      >
        <select
          ref={ref}
          className={cn(
            "h-full w-full appearance-none rounded-[inherit] bg-transparent pl-3.5 pr-12 text-sm font-medium text-[#1B1B1B] outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-55",
            className,
          )}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-lg bg-[#F8F7F4] text-[#4F46E5] shadow-[inset_0_0_0_1px_rgba(79,70,229,0.08)] transition-transform duration-200 group-focus-within:rotate-180"
          aria-hidden
        >
          <ChevronDown className="size-4" strokeWidth={2.7} />
        </span>
      </span>
      {error && <span className="block text-[12px] text-[#ef4444] mt-1">{error}</span>}
    </label>
  );
});
