import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "dark" | "light" | "outline" | "coral" | "yellow";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  dark: "bg-[#1E40AF] text-white hover:bg-[#1E3A8A]",
  light: "bg-white text-[#1B1B1B] hover:bg-[#F8FBFF]",
  outline:
    "bg-transparent text-[#1B1B1B] border-2 border-[#1B1B1B]/20 hover:bg-[#1E40AF] hover:text-white hover:border-[#1E40AF]",
  coral: "bg-[#0D9488] text-white hover:bg-[#0F766E]",
  yellow: "bg-[#2563EB] text-white hover:bg-[#1E40AF]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-[15px]",
};

function buildClass(
  variant: Variant,
  size: Size,
  fullWidth: boolean,
  extra?: string,
): string {
  return [
    "btn-pill",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

interface ButtonProps extends BaseProps, Omit<ComponentProps<"button">, "children" | "className"> {}

export function Button({
  variant = "dark",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={buildClass(variant, size, fullWidth, className)} {...rest}>
      {children}
    </button>
  );
}

interface LinkButtonProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
}

export function LinkButton({
  variant = "dark",
  size = "md",
  fullWidth = false,
  className,
  href,
  children,
  target,
  rel,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={buildClass(variant, size, fullWidth, className)}
    >
      {children}
    </Link>
  );
}
