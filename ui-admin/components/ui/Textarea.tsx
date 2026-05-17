"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, className, ...rest },
  ref,
) {
  return (
    <label className="block">
      {label && (
        <span className="block text-[13px] font-medium text-[#1B1B1B] mb-1.5">
          {label}
        </span>
      )}
      <textarea
        ref={ref}
        className={cn(
          "w-full px-3 py-2.5 bg-white border rounded-lg text-sm outline-none transition-colors placeholder:text-[#9b9690] resize-y min-h-[88px]",
          error ? "border-[#ef4444]" : "border-[#e8e5df] focus:border-[#1B1B1B]",
          className,
        )}
        {...rest}
      />
      {error ? (
        <span className="block text-[12px] text-[#ef4444] mt-1">{error}</span>
      ) : hint ? (
        <span className="block text-[12px] text-[#6b6760] mt-1">{hint}</span>
      ) : null}
    </label>
  );
});
