import type { ReactNode } from "react";

type Tone =
  | "default"
  | "coral"
  | "teal"
  | "violet"
  | "pink"
  | "blue"
  | "yellow"
  | "ink"
  | "success"
  | "warn"
  | "danger";

const toneClasses: Record<Tone, string> = {
  default: "bg-white text-[#1B1B1B]",
  coral: "bg-[#0EA5E9] text-white",
  teal: "bg-[#14B8A6] text-white",
  violet: "bg-[#2563EB] text-white",
  pink: "bg-[#0284C7] text-white",
  blue: "bg-[#38BDF8] text-white",
  yellow: "bg-[#2563EB] text-white border border-[#1E40AF]/20",
  ink: "bg-[#0F172A] text-white",
  success: "bg-[#14B8A6] text-white",
  warn: "bg-[#EFF6FF] text-[#1E3A8A]",
  danger: "bg-[#DC2626] text-white",
};

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-[0.08em] ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
