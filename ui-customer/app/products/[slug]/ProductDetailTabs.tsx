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

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#1B1B1B]/5 shadow-[0_18px_40px_-20px_rgba(17,24,39,0.18)]">
      <div className="flex flex-wrap gap-1.5 border-b border-[#1B1B1B]/10 -mt-2 -mx-2 pb-3 mb-6 px-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 h-10 rounded-full font-black text-sm transition-colors ${
              active === t
                ? "bg-[#1B1B1B] text-[#1E5FAF]"
                : "text-[#1B1B1B]/70 hover:bg-[#EFF6FF] hover:text-[#1B1B1B]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {active === "Description" && (
        <div className="prose-forge">
          <p className="text-[15px] leading-relaxed text-[#1B1B1B]/85 font-medium whitespace-pre-line">
            {product.description}
          </p>
          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {product.tags.map((t) => (
                <span
                  key={t.id}
                  className="px-3 h-8 inline-flex items-center rounded-full bg-[#EFF6FF] text-[#1B1B1B] text-[12px] font-bold"
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
          {product.requirements.length === 0 && (
            <li className="text-[#1B1B1B]/70 font-semibold">
              No special requirements. Just open and ship.
            </li>
          )}
          {product.requirements.map((r, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#14B8A6] text-white inline-flex items-center justify-center font-black text-[11px] flex-shrink-0 mt-0.5">
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
            version={product.version}
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
          <div className="flex items-center gap-6 pb-5 border-b border-[#1B1B1B]/10">
            <div>
              <div className="text-5xl font-black tracking-[-0.04em]">
                {product.rating.toFixed(1)}
              </div>
              <StarRating value={product.rating} size={16} />
              <p className="text-[12px] font-bold text-[#1B1B1B]/60 mt-1">
                {product.reviewCount} reviews
              </p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="text-[11px] font-bold w-3">{s}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#EFF6FF] overflow-hidden">
                    <div
                      className="h-full bg-[#1E5FAF]"
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
            <article key={i} className="border-b border-[#1B1B1B]/10 pb-5 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white inline-flex items-center justify-center font-black">
                  {r.n[0]}
                </div>
                <div>
                  <p className="font-black text-[14px]">{r.n}</p>
                  <StarRating value={r.r} size={12} />
                </div>
              </div>
              <h5 className="mt-3 font-black text-[15px]">{r.t}</h5>
              <p className="text-[14px] text-[#1B1B1B]/75 font-medium mt-1">{r.b}</p>
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
    <div className="border-l-2 border-[#1B1B1B]/15 pl-5 relative">
      <span
        className={`absolute -left-[7px] top-0 w-3 h-3 rounded-full ${
          current ? "bg-[#0EA5E9]" : "bg-[#1B1B1B]/30"
        }`}
      />
      <div className="flex items-center gap-2">
        <span className="font-black text-lg">v{version}</span>
        {current && (
          <span className="px-2 py-0.5 rounded-full bg-[#0EA5E9] text-white text-[10px] font-black uppercase tracking-[0.12em]">
            current
          </span>
        )}
        <span className="text-[12px] font-bold text-[#1B1B1B]/55">
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <ul className="mt-2 space-y-1 text-[14px] font-medium text-[#1B1B1B]/80">
        {notes.map((n, i) => (
          <li key={i}>— {n}</li>
        ))}
      </ul>
    </div>
  );
}
