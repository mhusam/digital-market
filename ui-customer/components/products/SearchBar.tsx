"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import type { Category } from "@digital-market/shared-types";
import { NativeSelect } from "../ui/native-select";

interface SearchBarProps {
  categories: Category[];
  initialQuery?: string;
  initialCategory?: string;
  variant?: "hero" | "compact";
  showCategory?: boolean;
}

export function SearchBar({
  categories,
  initialQuery = "",
  initialCategory = "",
  variant = "hero",
  showCategory = true,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    const suffix = params.toString();
    router.push(suffix ? `/search?${suffix}` : "/search");
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full flex-col gap-2 rounded-lg border border-border bg-card p-2 shadow-sm sm:flex-row sm:items-center ${
        variant === "hero" ? "max-w-2xl" : ""
      }`}
    >
      {showCategory && (
        <NativeSelect
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          variant="search"
          aria-label="Category"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </NativeSelect>
      )}
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products..."
        className="h-11 min-w-0 flex-1 rounded-md border border-border bg-card px-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground/80 focus:border-ring focus:outline-none"
        aria-label="Search products"
      />
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90"
      >
        <Search size={16} />
        Search
      </button>
    </form>
  );
}
