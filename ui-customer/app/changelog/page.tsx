"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

interface ChangelogItem {
  id: string;
  version: string;
  title: string;
  date: string;
  category: "Next.js" | "React" | "Spring Boot" | "Tailwind" | "Platform";
  description: string;
  changes: string[];
  type: "Major" | "Minor" | "Patch" | "Security";
}

const CHANGELOG_ITEMS: ChangelogItem[] = [
  {
    id: "p1",
    version: "v2.1.0",
    title: "PROGMAN Store Improvements",
    date: "2026-05-20",
    category: "Platform",
    description:
      "Added client-side App Launcher grid to simplify discovery of resource databases and dev utilities.",
    changes: [
      "Added absolute-positioned 9-dots menu with interactive responsive columns.",
      "Created 11 custom AI-curated reference and utility databases.",
      "Upgraded global dark-theme palettes with harmonious HSL properties.",
    ],
    type: "Minor",
  },
  {
    id: "sb34",
    version: "v3.4.2",
    title: "Spring Boot 3.4 Security Patches",
    date: "2026-05-18",
    category: "Spring Boot",
    description:
      "Updated dependency hierarchy to mitigate potential SQL injection issues in nested queries and optimized resource limits.",
    changes: [
      "Upgraded PostgreSQL client driver and Flyway migration execution handlers.",
      "Configured robust PayPal webhook request signature verification protocols.",
      "Restructured OAuth fallback configurations for Google Sign-In routines.",
    ],
    type: "Security",
  },
  {
    id: "tw4",
    version: "v4.0.0-beta",
    title: "Tailwind CSS v4 Engine Migration",
    date: "2026-04-02",
    category: "Tailwind",
    description:
      "Enabled high-performance Lightning CSS compiler, reducing production build times by over 30%.",
    changes: [
      "Migrated global theme variables from configuration files directly to raw CSS properties.",
      "Added support for parent container queries and `:has()` selectors.",
      "Removed unneeded post-processing CSS utility configurations.",
    ],
    type: "Minor",
  },
  {
    id: "n16",
    version: "v16.0.0-canary",
    title: "Next.js 16 Workspace Support",
    date: "2026-03-10",
    category: "Next.js",
    description:
      "Configured compatibility patches for standard Turborepo workspaces using Next.js 16 app directory structures.",
    changes: [
      "Optimized BFF route handler buffering for faster Spring-to-Client response streams.",
      "Standardized theme cookie extraction to prevent light-theme flicker during page transition.",
      "Integrated client-side cobe 3D canvas maps natively in the UI storefront.",
    ],
    type: "Major",
  },
  {
    id: "r19",
    version: "v19.0.0",
    title: "React 19 Core Integration",
    date: "2025-12-05",
    category: "React",
    description:
      "Added support for React Server Actions, native document metadata support, and asset loading optimization.",
    changes: [
      "Compatible with Next-Auth and server component data binding.",
      "Optimized resource loading with preinit and prefetch APIs.",
      "Replaced standard forwardRef syntax with simple ref properties.",
    ],
    type: "Major",
  },
];

const CATEGORIES = [
  "All",
  "Next.js",
  "React",
  "Spring Boot",
  "Tailwind",
  "Platform",
] as const;

type Category = (typeof CATEGORIES)[number];

function typeStyle(type: ChangelogItem["type"]) {
  switch (type) {
    case "Major":
      return {
        bg: "bg-[var(--accent-electric)]",
        text: "text-white",
        dot: "bg-white",
      };
    case "Security":
      return {
        bg: "bg-rose-500",
        text: "text-white",
        dot: "bg-white",
      };
    case "Minor":
      return {
        bg: "bg-foreground",
        text: "text-background",
        dot: "bg-background",
      };
    default:
      return {
        bg: "bg-muted",
        text: "text-foreground",
        dot: "bg-muted-foreground",
      };
  }
}

function formatReleaseDate(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ChangelogPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categoryCounts = useMemo(() => {
    const counts = new Map<Category, number>();
    counts.set("All", CHANGELOG_ITEMS.length);
    for (const item of CHANGELOG_ITEMS) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    const needle = searchTerm.toLowerCase().trim();
    return CHANGELOG_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!needle) return true;
      return (
        item.title.toLowerCase().includes(needle) ||
        item.version.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle) ||
        item.changes.some((c) => c.toLowerCase().includes(needle))
      );
    });
  }, [selectedCategory, searchTerm]);

  const latestRelease = CHANGELOG_ITEMS[0];
  const feedLabel =
    selectedCategory === "All" ? "All releases" : `${selectedCategory} releases`;

  return (
    <section className="page-container py-16 md:py-24" aria-label="Changelog">
      {/* ─── HEADER ─── */}
      <header className="mb-12 md:mb-16">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">Changelog</span>
          <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground md:inline">
            {CHANGELOG_ITEMS.length} releases · Last shipped{" "}
            {formatReleaseDate(latestRelease.date)}
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground">
          What we&apos;ve been{" "}
          <span className="italic font-serif text-[var(--accent-electric)]">
            shipping
          </span>{" "}
          lately.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
          A running log of platform releases, dependency upgrades, and
          framework migrations — written by{" "}
          <span className="text-foreground">the people who shipped them</span>.
        </p>

        <div className="mt-10 hairline" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Now showing —{" "}
            <span className="text-foreground">{feedLabel}</span>
          </p>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <nav
              className="flex flex-wrap items-center gap-1.5"
              aria-label="Filter by category"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`inline-flex h-8 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                    selectedCategory === cat
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                  <span
                    className={`tabular-nums text-[10px] font-bold ${
                      selectedCategory === cat
                        ? "text-background/70"
                        : "text-muted-foreground/70"
                    }`}
                  >
                    {categoryCounts.get(cat) ?? 0}
                  </span>
                </button>
              ))}
            </nav>

            <div className="relative md:w-64">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search releases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full rounded-full border border-border bg-card/60 pl-9 pr-3 text-[13px] font-medium text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none"
                aria-label="Search releases"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ─── LATEST FEATURED ─── */}
      {selectedCategory === "All" && !searchTerm && latestRelease && (
        <div className="mb-16 md:mb-20">
          <FeaturedRelease item={latestRelease} />
        </div>
      )}

      {/* ─── LIST ─── */}
      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/40 py-16 px-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground">
            No releases match your search.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Try a different filter — or clear the search field.
          </p>
        </div>
      ) : (
        <section aria-labelledby="changelog-list-title">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2
              id="changelog-list-title"
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground"
            >
              ⎯ Release log
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              {String(filteredItems.length).padStart(2, "0")} entries
            </span>
          </div>

          <div className="border-t border-border">
            {filteredItems.map((item, idx) => (
              <ReleaseRow key={item.id} item={item} index={idx + 1} />
            ))}
          </div>
        </section>
      )}

      {/* ─── FOOTER LINK ─── */}
      <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 md:flex-row md:items-center">
        <div>
          <p className="font-hand text-2xl text-[var(--accent-electric)]">
            Curious what&apos;s next?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Subscribe to the journal — release notes land there first.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/60 px-5 text-[13px] font-bold text-foreground transition-colors hover:border-foreground/40"
          >
            Read the journal
            <ArrowUpRight size={14} />
          </Link>
          <Link
            href="/products"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[13px] font-bold text-background transition-transform hover:scale-[1.02]"
          >
            Enter the marketplace
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedRelease({ item }: { item: ChangelogItem }) {
  const tone = typeStyle(item.type);
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:border-foreground/30 md:p-12">
      <span className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
        Latest release
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full bg-[var(--accent-electric)] opacity-[0.06] blur-3xl transition-opacity duration-700 group-hover:opacity-[0.14]"
      />

      <div className="relative max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${tone.bg} ${tone.text}`}
          >
            <span className={`size-1.5 rounded-full ${tone.dot}`} />
            {item.type}
          </span>
          <span className="inline-flex items-center rounded-full border border-border bg-card/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {item.category}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <time dateTime={item.date}>{formatReleaseDate(item.date)}</time>
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-2xl font-extrabold tabular-nums tracking-[-0.02em] text-foreground md:text-3xl">
            {item.version}
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-tight tracking-[-0.03em] text-foreground">
            {item.title}
          </h2>
        </div>

        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
          {item.description}
        </p>

        <ul className="mt-8 space-y-3 border-t border-border pt-6">
          {item.changes.map((change, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-6 text-muted-foreground md:text-[15px]"
            >
              <span className="mt-2 inline-block size-1 shrink-0 rounded-full bg-[var(--accent-electric)]" />
              <span>{change}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ReleaseRow({ item, index }: { item: ChangelogItem; index: number }) {
  const tone = typeStyle(item.type);
  return (
    <article className="group relative grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-border py-8 md:grid-cols-[6rem_1fr_auto] md:gap-8 md:py-10">
      {/* Index + version */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
        <span className="font-mono text-[13px] font-extrabold tabular-nums tracking-[-0.01em] text-foreground">
          {item.version}
        </span>
      </div>

      {/* Body */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${tone.bg} ${tone.text}`}
          >
            <span className={`size-1 rounded-full ${tone.dot}`} />
            {item.type}
          </span>
          <span className="text-[var(--accent-electric)]">{item.category}</span>
          <span className="size-1 rounded-full bg-muted-foreground/40" />
          <time
            dateTime={item.date}
            className="text-muted-foreground"
          >
            {formatReleaseDate(item.date)}
          </time>
        </div>

        <h3 className="mt-3 text-xl font-extrabold leading-tight tracking-[-0.02em] text-foreground md:text-2xl">
          {item.title}
        </h3>

        <p className="mt-2.5 max-w-2xl text-sm leading-6 text-muted-foreground md:text-[15px]">
          {item.description}
        </p>

        <ul className="mt-5 space-y-2">
          {item.changes.map((change, i) => (
            <li
              key={i}
              className="flex gap-3 text-[13px] leading-5 text-muted-foreground"
            >
              <span className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-muted-foreground/50" />
              <span>{change}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow */}
      <ArrowUpRight
        size={20}
        className="mt-1 hidden self-start text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-electric)] md:block"
      />
    </article>
  );
}
