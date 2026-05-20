import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "yellow" | "teal" | "coral" | "violet" | "blue" | "success" | "warning" | "danger" | "dark";

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

const toneStyles: Record<Tone, string> = {
  neutral: "bg-surface-muted text-ink border-border",
  yellow: "bg-indigo-50 text-primary-dark border-indigo-300",
  teal: "bg-teal/15 text-[#0e5e4f] border-teal/40",
  coral: "bg-coral/15 text-[#a83a1a] border-coral/40",
  violet: "bg-violet/15 text-[#3e2da5] border-violet/40",
  blue: "bg-blue/15 text-[#1e4396] border-blue/40",
  success: "bg-emerald-50 text-emerald-800 border-emerald-300",
  warning: "bg-amber-50 text-amber-800 border-amber-300",
  danger: "bg-red-50 text-red-800 border-red-300",
  dark: "bg-ink text-white border-ink",
};

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold leading-tight shadow-sm",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
