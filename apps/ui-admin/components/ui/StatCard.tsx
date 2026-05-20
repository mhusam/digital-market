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
  yellow: "bg-primary",
  teal: "bg-teal",
  violet: "bg-violet",
  coral: "bg-coral",
  blue: "bg-blue",
};

export function StatCard({ label, value, trend, icon, accent = "yellow", sparkline, delay = 0 }: StatCardProps) {
  const trendUp = (trend ?? 0) >= 0;
  return (
    <div
      style={{ transitionDelay: `${delay * 1000}ms` }}
      className="card card-interactive relative overflow-hidden p-5"
    >
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", accentClass[accent])} />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[12px] uppercase tracking-wide text-muted font-medium">{label}</div>
          <div className="mt-2 text-[28px] leading-none font-semibold tabular tracking-tight text-ink">{value}</div>
        </div>
        {icon && (
          <span
            className={cn(
              "inline-flex items-center justify-center size-9 rounded-lg text-ink ring-1 ring-border-subtle",
              accentClass[accent] + "/12",
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between">
        {typeof trend === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-[12px] font-medium px-1.5 py-0.5 rounded-md border",
              trendUp
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200",
            )}
          >
            {trendUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {trendUp ? "+" : ""}
            {trend.toFixed(1)}%
          </span>
        )}
        {sparkline && sparkline.length > 1 && <MiniSpark values={sparkline} />}
      </div>
    </div>
  );
}

function MiniSpark({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 80;
  const h = 24;
  const step = w / (values.length - 1);
  const points = values.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="opacity-90">
      <polyline
        points={points}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
