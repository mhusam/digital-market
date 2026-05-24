"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { PRODUCTS, BLOG_POSTS, GLOSSARY_TERMS, CHEAT_SHEETS, COMMUNITY_THREADS } from "@/lib/mockData";
import { Search, Sparkles, BookOpen, Layers, MessageSquare, Terminal, HelpCircle } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  id: string;
  type: "product" | "blog" | "glossary" | "cheatsheet" | "thread";
  title: string;
  description: string;
  url: string;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedTab, setSelectedTab] = useState("all");
  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    // Collect all indexable content
    const allItems: SearchResult[] = [
      ...PRODUCTS.map((p) => ({
        id: p.id,
        type: "product" as const,
        title: p.title,
        description: p.description,
        url: `/products/${p.id}`,
      })),
      ...BLOG_POSTS.map((b) => ({
        id: b.id,
        type: "blog" as const,
        title: b.title,
        description: b.excerpt,
        url: `/blog`,
      })),
      ...GLOSSARY_TERMS.map((g) => ({
        id: g.id,
        type: "glossary" as const,
        title: g.term,
        description: g.definition,
        url: `/tech-glossary`,
      })),
      ...CHEAT_SHEETS.map((c) => ({
        id: c.id,
        type: "cheatsheet" as const,
        title: c.title,
        description: c.description,
        url: `/cheat-sheets`,
      })),
      ...COMMUNITY_THREADS.map((t) => ({
        id: t.id,
        type: "thread" as const,
        title: t.title,
        description: `Discussion by ${t.author}`,
        url: `/community`,
      })),
    ];

    return allItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filteredResults = selectedTab === "all"
    ? results
    : results.filter((r) => r.type === selectedTab);

  const getResultIcon = (type: string) => {
    switch (type) {
      case "product":
        return <Layers className="size-4.5 text-[var(--accent-electric)]" />;
      case "blog":
        return <BookOpen className="size-4.5 text-[var(--accent-violet)]" />;
      case "cheatsheet":
        return <Terminal className="size-4.5 text-blue-500" />;
      case "thread":
        return <MessageSquare className="size-4.5 text-emerald-500" />;
      default:
        return <HelpCircle className="size-4.5 text-muted-foreground" />;
    }
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header & Main Search */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Global Search</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-8">
          Search Results.
        </h1>

        <div className="w-full max-w-xl relative">
          <input
            type="text"
            placeholder="Search everything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 rounded-xl border border-border bg-card px-6 pl-12 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
          />
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[
          { id: "all", label: "All Items" },
          { id: "product", label: "Products" },
          { id: "blog", label: "Blog" },
          { id: "cheatsheet", label: "Cheat Sheets" },
          { id: "glossary", label: "Glossary" },
          { id: "thread", label: "Discussions" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`h-9 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
              selectedTab === tab.id
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-card border-border hover:border-foreground/20 text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="space-y-4 max-w-3xl">
        {filteredResults.length > 0 ? (
          filteredResults.map((res) => (
            <Link
              key={`${res.type}-${res.id}`}
              href={res.url}
              className="rounded-2xl border border-border bg-card p-5 hover:border-foreground/15 transition-all duration-200 flex items-start gap-4 block cursor-pointer group"
            >
              <div className="p-2.5 rounded-xl border border-border bg-muted shrink-0 group-hover:scale-105 transition-transform">
                {getResultIcon(res.type)}
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{res.type}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-foreground truncate group-hover:text-[var(--accent-electric)] transition-colors">
                  {res.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {res.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <p className="text-sm text-muted-foreground">
              {query.trim() ? "No matched items found. Try typing different terms." : "Enter a search query to search across the platform."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="page-container py-32 text-center">
        <div className="size-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Loading search results...
        </p>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
