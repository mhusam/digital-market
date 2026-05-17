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
          "relative flex items-center h-10 bg-white border rounded-lg transition-colors",
          error ? "border-[#ef4444]" : "border-[#e8e5df] focus-within:border-[#1B1B1B]",
        )}
      >
        <select
          ref={ref}
          className={cn(
            "appearance-none w-full h-full pl-3 pr-9 bg-transparent outline-none text-sm",
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
        <ChevronDown className="absolute right-3 size-4 text-[#6b6760] pointer-events-none" />
      </span>
      {error && <span className="block text-[12px] text-[#ef4444] mt-1">{error}</span>}
    </label>
  );
});
