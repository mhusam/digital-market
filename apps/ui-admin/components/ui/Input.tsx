"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leftIcon, rightAdornment, className, id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <label className="block">
      {label && <span className="block text-[13px] font-medium text-ink mb-1.5">{label}</span>}
      <span
        className={cn(
          "flex items-center gap-2 h-10 px-3 bg-card border rounded-lg transition-colors shadow-sm",
          error ? "border-danger ring-1 ring-danger/20" : "border-border focus-within:border-border-strong focus-within:ring-1 focus-within:ring-primary/20",
        )}
      >
        {leftIcon && <span className="text-muted shrink-0">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={cn("flex-1 bg-transparent outline-none text-sm placeholder:text-muted-light", className)}
          {...rest}
        />
        {rightAdornment}
      </span>
      {error ? (
        <span className="block text-[12px] text-danger mt-1">{error}</span>
      ) : hint ? (
        <span className="block text-[12px] text-muted mt-1">{hint}</span>
      ) : null}
    </label>
  );
});
