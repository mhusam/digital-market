"use client";

import { useState } from "react";
import { DEALS } from "@/lib/mockData";
import { Tag, Copy, Check, ExternalLink, Sparkles, Filter } from "lucide-react";
import { toast } from "sonner";

export default function DealsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Hosting", "SaaS", "Design", "Courses"];

  const filteredDeals = selectedCategory === "all"
    ? DEALS
    : DEALS.filter((d) => d.category === selectedCategory);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success(`Discount code "${code}" copied!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Partner Deals</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Exclusive Creator Perks.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Unlock discounted hosting packages, free database tiers, cloud computing credits, and premium SaaS licenses.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`h-9 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
              selectedCategory === cat
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-card border-border hover:border-foreground/20 text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-foreground/20 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Sparkle background shimmer */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-electric)]/5 to-[var(--accent-violet)]/5 blur-2xl group-hover:scale-110 transition-all duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {deal.partner}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--accent-electric)] font-bold uppercase tracking-wider">
                    {deal.discount}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <Tag className="size-4.5 text-[var(--accent-electric)]" />
                  {deal.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  {deal.description}
                </p>
              </div>

              <div className="space-y-4">
                {/* Code Copy Box */}
                <div className="flex items-center gap-2 border border-border rounded-xl bg-muted/50 p-2 pl-4">
                  <div className="flex-1 font-mono text-xs font-bold text-foreground tracking-wider uppercase select-all">
                    {deal.code}
                  </div>
                  <button
                    onClick={() => handleCopyCode(deal.id, deal.code)}
                    className="h-8 px-3 rounded-lg bg-card border border-border hover:bg-muted font-bold text-[10px] uppercase tracking-wider text-foreground flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedId === deal.id ? (
                      <>
                        <Check className="size-3 text-emerald-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3 text-muted-foreground" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Redeem Link */}
                <a
                  href={deal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer"
                >
                  Redeem Offer
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <p className="text-sm text-muted-foreground">No deals available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
