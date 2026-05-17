"use client";

import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface StatCardProps {
  label: string;
  value: string;
  trend?: number;
  icon?: ReactNode;
  accent?: "yellow" | "teal" | "violet" | "coral" | "blue";
  sparkline?: number[];
  delay?: number;
}

const accentClass = {
  yellow: "bg-[#4F46E5]",
  teal: "bg-[#2BC4A8]",
  violet: "bg-[#8B7CF6]",
  coral: "bg-[#FF7A59]",
  blue: "bg-[#6FA8FF]",
};

export function StatCard({ label, value, trend, icon, accent = "yellow", sparkline, delay = 0 }: StatCardProps) {
  const trendUp = (trend ?? 0) >= 0;
  return (
    <div
      style={{ transitionDelay: `${delay * 1000}ms` }}
      className="relative overflow-hidden bg-white border border-[#e8e5df] rounded-xl p-5 hover:border-[#d8d4cc] transition-colors"
    >
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", accentClass[accent])} />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[12px] uppercase tracking-wide text-[#6b6760] font-medium">{label}</div>
          <div className="mt-2 text-[28px] leading-none font-semibold tabular tracking-tight">{value}</div>
        </div>
        {icon && (
          <span className={cn("inline-flex items-center justify-center size-9 rounded-lg text-[#1B1B1B]", accentClass[accent] + "/15")}>
            <span className={cn("text-[#1B1B1B]")}>{icon}</span>
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between">
        {typeof trend === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-[12px] font-medium px-1.5 py-0.5 rounded-md",
              trendUp ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#fee2e2] text-[#b91c1c]",
            )}
          >
            {trendUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {trendUp ? "+" : ""}
            {trend.toFixed(1)}%
          </span>
        )}
        {sparkline && sparkline.length > 1 && <MiniSpark values={sparkline} accent={accent} />}
      </div>
    </div>
  );
}

function MiniSpark({ values, accent }: { values: number[]; accent: keyof typeof accentClass }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 80;
  const h = 24;
  const step = w / (values.length - 1);
  const points = values.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(" ");
  const stroke = accent === "yellow" ? "#1B1B1B" : "#1B1B1B";
  return (
    <svg width={w} height={h} className="opacity-90">
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
