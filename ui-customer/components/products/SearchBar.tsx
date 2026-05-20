"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import type { Category } from "@digital-market/shared-types";
import { NativeSelect } from "../ui/NativeSelect";

interface SearchBarProps {
  categories: Category[];
  initialQuery?: string;
  initialCategory?: string;
  variant?: "hero" | "compact";
}

export function SearchBar({
  categories,
  initialQuery = "",
  initialCategory = "",
  variant = "hero",
}: SearchBarProps) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState(initialCategory);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("category", cat);
    router.push(`/search?${params.toString()}`);
  };

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={onSubmit}
      className={`bg-white rounded-[28px] sm:rounded-full p-2 sm:p-1.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-1 shadow-[0_18px_42px_-18px_rgba(17,24,39,0.35)] border border-[#1B1B1B]/8 ${
        isHero ? "max-w-2xl w-full" : "w-full"
      }`}
    >
      <NativeSelect
        value={cat}
        onChange={(e) => setCat(e.target.value)}
        variant="search"
        aria-label="Category"
      >
        <option value="">All</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.name}
          </option>
        ))}
      </NativeSelect>
      <span className="hidden sm:block w-px h-6 bg-[#1B1B1B]/15" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search themes, plugins, kits…"
        className="w-full min-w-0 flex-1 bg-[#F8FBFF] sm:bg-transparent h-12 px-4 sm:px-3 rounded-full text-[#1B1B1B] placeholder:text-[#1B1B1B]/45 font-semibold text-[15px]"
        aria-label="Search products"
      />
      <button
        type="submit"
        className="btn-pill bg-[#1B1B1B] text-[#1E5FAF] h-11 px-5 text-sm w-full sm:w-auto"
      >
        <Search size={15} strokeWidth={2.6} />
        Search
      </button>
    </form>
  );
}
