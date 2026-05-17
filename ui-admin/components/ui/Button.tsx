"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] shadow-[0_1px_0_rgba(0,0,0,0.04)]",
  secondary:
    "bg-white text-[#1B1B1B] border border-[#e8e5df] hover:bg-[#fafaf7] hover:border-[#d8d4cc]",
  danger:
    "bg-[#ef4444] text-white hover:bg-[#dc2626] active:bg-[#b91c1c]",
  ghost:
    "bg-transparent text-[#1B1B1B] hover:bg-black/5 active:bg-black/10",
  dark:
    "bg-[#1B1B1B] text-white hover:bg-[#2a2a2a] active:bg-black",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-5 text-[15px] gap-2 rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, leftIcon, rightIcon, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
});
