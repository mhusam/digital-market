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
      {label && <span className="block text-[13px] font-medium text-ink mb-1.5">{label}</span>}
      <span
        className={cn(
          "relative flex items-center h-10 bg-card border rounded-lg transition-colors shadow-sm",
          error ? "border-danger ring-1 ring-danger/20" : "border-border focus-within:border-border-strong focus-within:ring-1 focus-within:ring-primary/20",
        )}
      >
        <select
          ref={ref}
          className={cn("appearance-none w-full h-full pl-3 pr-9 bg-transparent outline-none text-sm", className)}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 size-4 text-muted pointer-events-none" />
      </span>
      {error && <span className="block text-[12px] text-danger mt-1">{error}</span>}
    </label>
  );
});
