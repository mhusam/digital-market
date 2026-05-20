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
      {label && <span className="block text-[13px] font-medium text-ink mb-1.5">{label}</span>}
      <textarea
        ref={ref}
        className={cn(
          "w-full px-3 py-2.5 bg-card border rounded-lg text-sm outline-none transition-colors placeholder:text-muted-light resize-y min-h-[88px] shadow-sm",
          error
            ? "border-danger ring-1 ring-danger/20"
            : "border-border focus:border-border-strong focus:ring-1 focus:ring-primary/20",
          className,
        )}
        {...rest}
      />
      {error ? (
        <span className="block text-[12px] text-danger mt-1">{error}</span>
      ) : hint ? (
        <span className="block text-[12px] text-muted mt-1">{hint}</span>
      ) : null}
    </label>
  );
});
