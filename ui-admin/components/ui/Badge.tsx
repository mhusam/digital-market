import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "yellow" | "teal" | "coral" | "violet" | "blue" | "success" | "warning" | "danger" | "dark";

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

const toneStyles: Record<Tone, string> = {
  neutral: "bg-[#f1ede4] text-[#3a3833] border-[#e8e5df]",
  yellow: "bg-[#eef2ff] text-[#3730A3] border-[#4f46e5]/40",
  teal: "bg-[#d2f5ec] text-[#0e5e4f] border-[#2bc4a8]/30",
  coral: "bg-[#ffe2d8] text-[#a83a1a] border-[#ff7a59]/30",
  violet: "bg-[#ebe6ff] text-[#3e2da5] border-[#8b7cf6]/30",
  blue: "bg-[#dbe9ff] text-[#1e4396] border-[#6fa8ff]/30",
  success: "bg-[#dcfce7] text-[#15803d] border-[#22c55e]/30",
  warning: "bg-[#fef3c7] text-[#92580a] border-[#f59e0b]/30",
  danger: "bg-[#fee2e2] text-[#b91c1c] border-[#ef4444]/30",
  dark: "bg-[#1B1B1B] text-white border-black",
};

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-medium leading-tight",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
