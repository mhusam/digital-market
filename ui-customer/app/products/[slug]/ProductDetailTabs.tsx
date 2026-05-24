"use client";

import { useState } from "react";
import type { Product } from "@digital-market/shared-types";
import { StarRating } from "../../../components/ui/StarRating";

const TABS = ["Description", "Requirements", "Changelog", "Reviews"] as const;
type Tab = typeof TABS[number];

interface Props {
  product: Product;
}

export function ProductDetailTabs({ product }: Props) {
  const [active, setActive] = useState<Tab>("Description");
  const tags = product.tags ?? [];
  const requirements = product.requirements ?? [];
  const rating = product.rating ?? 0;
  const reviewCount = product.reviewCount ?? 0;

  return (
    <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-[0_18px_40px_-20px_rgba(17,24,39,0.18)]">
      <div className="flex flex-wrap gap-1.5 border-b border-border -mt-2 -mx-2 pb-3 mb-6 px-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 h-10 rounded-full font-black text-sm transition-colors ${
              active === t
                ? "bg-foreground text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {active === "Description" && (
        <div className="prose-forge">
          <p className="text-[15px] leading-relaxed text-muted-foreground font-medium whitespace-pre-line">
            {product.description ?? "No extended description provided for this product yet."}
          </p>
          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t.id}
                  className="px-3 h-8 inline-flex items-center rounded-full bg-accent text-foreground text-[12px] font-bold"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {active === "Requirements" && (
        <ul className="space-y-3">
          {requirements.length === 0 && (
            <li className="text-muted-foreground font-semibold">
              No special requirements. Just open and ship.
            </li>
          )}
          {requirements.map((r, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-primary-foreground inline-flex items-center justify-center font-black text-[11px] flex-shrink-0 mt-0.5">
                ✓
              </span>
              <span className="text-[15px] font-medium">{r}</span>
            </li>
          ))}
        </ul>
      )}

      {active === "Changelog" && (
        <div className="space-y-5">
          <ChangelogEntry
            version={product.version ?? "1.0.0"}
            date={product.updatedAt}
            notes={[
              "Latest performance improvements",
              "Bug fixes across all components",
              "New utility hooks and helpers",
            ]}
            current
          />
          <ChangelogEntry
            version="1.2.0"
            date="2025-02-10"
            notes={["Added dark mode", "Improved accessibility"]}
          />
          <ChangelogEntry
            version="1.0.0"
            date="2024-11-01"
            notes={["Initial public release"]}
          />
        </div>
      )}

      {active === "Reviews" && (
        <div className="space-y-5">
          <div className="flex items-center gap-6 pb-5 border-b border-border">
            <div>
              <div className="text-5xl font-black tracking-[-0.04em]">
                {rating.toFixed(1)}
              </div>
              <StarRating value={rating} size={16} />
              <p className="text-[12px] font-bold text-muted-foreground mt-1">
                {reviewCount} reviews
              </p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="text-[11px] font-bold w-3">{s}</span>
                  <div className="flex-1 h-2 rounded-full bg-accent overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${s === 5 ? 72 : s === 4 ? 18 : s === 3 ? 7 : s === 2 ? 2 : 1}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {[
            {
              n: "Maya R.",
              r: 5,
              t: "Total game changer",
              b: "Saved me weeks of work. The code quality is great and the docs are clear.",
            },
            {
              n: "Daniel K.",
              r: 4,
              t: "Solid product",
              b: "Loving the design system. A few small things I'd tweak but overall fantastic.",
            },
          ].map((r, i) => (
            <article key={i} className="border-b border-border pb-5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center font-black">
                  {r.n[0]}
                </div>
                <div>
                  <p className="font-black text-[14px]">{r.n}</p>
                  <StarRating value={r.r} size={12} />
                </div>
              </div>
              <h5 className="mt-3 font-black text-[15px]">{r.t}</h5>
              <p className="text-[14px] text-muted-foreground font-medium mt-1">{r.b}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function ChangelogEntry({
  version,
  date,
  notes,
  current,
}: {
  version: string;
  date: string;
  notes: string[];
  current?: boolean;
}) {
  return (
    <div className="border-l-2 border-border pl-5 relative">
      <span
        className={`absolute -left-[7px] top-0 w-3 h-3 rounded-full ${
          current ? "bg-primary" : "bg-foreground/30"
        }`}
      />
      <div className="flex items-center gap-2">
        <span className="font-black text-lg">v{version}</span>
        {current && (
          <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.12em]">
            current
          </span>
        )}
        <span className="text-[12px] font-bold text-muted-foreground">
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <ul className="mt-2 space-y-1 text-[14px] font-medium text-muted-foreground">
        {notes.map((n, i) => (
          <li key={i}>— {n}</li>
        ))}
      </ul>
    </div>
  );
}
