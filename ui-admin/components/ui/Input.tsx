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
      {label && (
        <span className="block text-[13px] font-medium text-[#1B1B1B] mb-1.5">
          {label}
        </span>
      )}
      <span
        className={cn(
          "flex items-center gap-2 h-10 px-3 bg-white border rounded-lg transition-colors",
          error ? "border-[#ef4444]" : "border-[#e8e5df] focus-within:border-[#1B1B1B]",
        )}
      >
        {leftIcon && <span className="text-[#6b6760] shrink-0">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex-1 bg-transparent outline-none text-sm placeholder:text-[#9b9690]",
            className,
          )}
          {...rest}
        />
        {rightAdornment}
      </span>
      {error ? (
        <span className="block text-[12px] text-[#ef4444] mt-1">{error}</span>
      ) : hint ? (
        <span className="block text-[12px] text-[#6b6760] mt-1">{hint}</span>
      ) : null}
    </label>
  );
});
