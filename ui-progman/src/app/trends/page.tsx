"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/mockData";
import { TrendingUp, Flame, Download, Eye, Sparkles, Star } from "lucide-react";

export default function TrendsPage() {
  const [activeTab, setActiveTab] = useState("traffic");

  const trendProducts = [...PRODUCTS]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3);

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Market Intel</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Trending Analytics.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Monitor real-time searches, template download spikes, design asset popularity, and platform performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[var(--accent-electric)]/5 to-transparent blur-xl" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Market Momentum</span>
            <TrendingUp className="size-4.5 text-[var(--accent-electric)]" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">+84.2%</span>
          <p className="text-[10px] text-muted-foreground mt-1">Growth in supabased Next.js 16 templates</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[var(--accent-violet)]/5 to-transparent blur-xl" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Sessions</span>
            <Flame className="size-4.5 text-[var(--accent-violet)]" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">3.8k Active</span>
          <p className="text-[10px] text-muted-foreground mt-1">Developers building stacks concurrently</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/5 to-transparent blur-xl" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Downloads (Total)</span>
            <Download className="size-4.5 text-blue-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">14.2k Copies</span>
          <p className="text-[10px] text-muted-foreground mt-1">Free & paid assets copied to workspaces</p>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* SVG Sparkline chart block */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Traffic Analytics</h3>
              <div className="flex gap-1.5 border border-border rounded-lg bg-muted p-0.5">
                {["7 Days", "30 Days"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveTab(d === "7 Days" ? "traffic" : "thirty")}
                    className={`h-7 px-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      (d === "7 Days" && activeTab === "traffic") || (d === "30 Days" && activeTab === "thirty")
                        ? "bg-card text-foreground border border-border/80 shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated SVG Graph */}
            <div className="relative w-full h-48 border border-border/60 bg-muted/20 rounded-xl overflow-hidden px-2 pt-6">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="var(--border)" strokeWidth="0.1" strokeDasharray="1,1" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="var(--border)" strokeWidth="0.1" strokeDasharray="1,1" />

                {/* Gradient Fill under Path */}
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-electric)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--accent-electric)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 0 30 L 0 25 Q 15 15, 30 18 T 60 5 T 90 12 L 100 8 L 100 30 Z"
                  fill="url(#areaGradient)"
                />

                {/* Plot Path */}
                <path
                  d="M 0 25 Q 15 15, 30 18 T 60 5 T 90 12 L 100 8"
                  fill="none"
                  stroke="var(--accent-electric)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </svg>

              {/* Grid Label overlays */}
              <div className="absolute top-2 left-3 font-mono text-[9px] font-bold text-muted-foreground/60">3.8K SESSIONS</div>
              <div className="absolute bottom-2 left-3 font-mono text-[9px] font-bold text-muted-foreground/60">0 SESSIONS</div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono font-semibold pt-4 border-t border-border mt-6">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>
        </div>

        {/* Trending items list */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Flame className="size-4 text-[var(--accent-electric)]" />
              Hot Starters
            </h3>

            <div className="space-y-4">
              {trendProducts.map((prod, idx) => (
                <div key={prod.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-foreground truncate max-w-[150px]">{prod.title}</span>
                    <span className="text-muted-foreground font-mono tabular-nums">+{prod.downloads} copies</span>
                  </div>
                  {/* Progress bar represent */}
                  <div className="h-1.5 w-full bg-muted border border-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${idx === 0 ? "bg-[var(--accent-electric)]" : idx === 1 ? "bg-[var(--accent-violet)]" : "bg-blue-500"}`}
                      style={{ width: `${(prod.downloads / 2500) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground leading-normal border-t border-border pt-4 mt-6">
            * Popularity metrics reflect downloads, checkout clicks, and code setup triggers logged over the last 48 hours.
          </div>
        </div>
      </div>
    </div>
  );
}
