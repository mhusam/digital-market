import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Blocks,
  Download,
  Flame,
  Layers,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";
import { getCategories, getProducts } from "@digital-market/api-client";
import { ProductCard } from "../components/products/ProductCard";
import { SearchBar } from "../components/products/SearchBar";
import { buttonVariants } from "../components/ui/button";
import styles from "./home.module.css";

const KPI_ITEMS = [
  { value: "12.5k", label: "Builders shipping" },
  { value: "8.2k", label: "Products delivered" },
  { value: "98%", label: "Positive reviews" },
  { value: "24/7", label: "Support window" },
];

const TRUST_ITEMS = [
  { icon: Download, label: "Instant download", hint: "No waiting room" },
  { icon: ShieldCheck, label: "Secure checkout", hint: "Encrypted end-to-end" },
  { icon: Star, label: "Top-rated", hint: "Curated picks only" },
];

const TICKER_PHRASES = [
  "New drops weekly",
  "Lifetime updates",
  "MIT-friendly licenses",
  "Refund within 14 days",
  "Built by real shipping teams",
  "From idea to launch in days",
];

const PILLARS = [
  {
    num: "01",
    title: "Curated, not crowded",
    body: "Every product is hand-picked. No template farms, no AI-spam — just things worth shipping.",
  },
  {
    num: "02",
    title: "Designed to be remixed",
    body: "Clean code, sensible defaults, and licensing that doesn’t get in the way of your craft.",
  },
  {
    num: "03",
    title: "Made by makers",
    body: "Authors are working operators — designers, founders, engineers. You’re buying their playbook.",
  },
];

export default async function HomePage() {
  const [categoriesRes, trendingRes] = await Promise.all([
    getCategories(),
    getProducts({ sortBy: "popular", limit: 6 }),
  ]);

  const categories = categoriesRes.data ?? [];
  const trending = trendingRes.data ?? [];

  return (
    <>
      {/* ─── HERO — centered editorial ─── */}
      <section className="relative overflow-hidden border-b border-border grain-bg">
        <div className="mesh-bg" aria-hidden="true" />

        {/* Decorative grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            color: "var(--foreground)",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 40%, black 40%, transparent 80%)",
          }}
        />

        <div className="page-container relative py-20 md:py-28">
          {/* Floating side meta — left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-24 hidden text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground/60 [writing-mode:vertical-rl] lg:block"
          >
            Vol. 04 — Marketplace
          </div>
          {/* Floating side meta — right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-24 hidden text-[10px] font-bold uppercase tracking-[0.32em] text-muted-foreground/60 [writing-mode:vertical-rl] lg:block"
          >
            Est. {new Date().getFullYear()} · Digital only
          </div>

          <div className="mx-auto max-w-4xl text-center fade-up">
            {/* Live status pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur">
              <span className="pulse-dot inline-block size-1.5 rounded-full bg-[var(--accent-electric)]" />
              New drops this week
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">Live</span>
            </div>

            {/* Handwritten tagline */}
            <p className="font-hand text-3xl text-[var(--accent-electric)] md:text-4xl">
              Digital made simple.
            </p>

            {/* Brand wordmark — shimmer */}
            <p className={styles.heroBrand}>PROGMAN</p>

            {/* Headline */}
            <h1 className="mt-4 text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground">
              The developer universe—free &amp; premium—for{" "}
              <span className="brush-underline">creators</span> &amp;{" "}
              <span className="italic font-serif text-[var(--accent-electric)]">
                builders
              </span>
              .
            </h1>

            {/* Sub-headline */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Track trending news, explore open-source highlights, and download free resources or premium tools to help you ship faster and grow smarter.
            </p>

            {/* Search bar */}
            <div className="mt-9 flex justify-center">
              <SearchBar categories={categories} showCategory={false} />
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/products"
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                Browse products
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/showcase"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                See it in the wild
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mx-auto mt-12 grid max-w-2xl gap-3 sm:grid-cols-3">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center justify-center gap-2.5 rounded-xl border border-border bg-card/60 px-4 py-3 backdrop-blur transition-colors hover:border-[var(--accent-electric)]/40"
                >
                  <item.icon
                    size={15}
                    className="shrink-0 text-[var(--accent-electric)]"
                  />
                  <span className="text-[13px] font-bold text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div className={`${styles.tickerStrip} marquee-pause`}>
          <div className="marquee py-3">
            {[...TICKER_PHRASES, ...TICKER_PHRASES, ...TICKER_PHRASES].map(
              (phrase, i) => (
                <span className={styles.tickerItem} key={`${phrase}-${i}`}>
                  <span className={styles.tickerDot} />
                  {phrase}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ─── KPI strip ─── */}
      <section className="border-b border-border bg-background">
        <div className="page-container grid grid-cols-2 md:grid-cols-4">
          {KPI_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`group relative py-8 px-4 md:py-10 ${
                i > 0 ? "md:border-l border-border" : ""
              } ${i % 2 === 1 ? "border-l border-border md:border-l" : ""} ${
                i >= 2 ? "border-t border-border md:border-t-0" : ""
              }`}
            >
              <p className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-[-0.04em] tabular-nums text-foreground">
                {item.value}
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {item.label}
              </p>
              <div className="absolute right-4 top-6 size-1.5 rounded-full bg-[var(--accent-electric)] opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── PILLARS / WHY ─── */}
      <section className="page-container py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow">The thesis</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">
              We sell{" "}
              <span className="text-[var(--accent-electric)]">substance</span>,
              not stock.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              Most marketplaces optimize for catalog size. We optimize for
              what you ship next week.
            </p>
          </div>
          <div className="md:col-span-8 grid gap-4 sm:grid-cols-3">
            {PILLARS.map((p) => (
              <article
                key={p.num}
                className="surface-edge group relative flex flex-col rounded-2xl p-6"
              >
                <span className="num-tag mb-6 text-[var(--accent-electric)]">
                  {p.num}
                </span>
                <h3 className="text-lg font-extrabold leading-tight tracking-[-0.02em] text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {p.body}
                </p>
                <ArrowDownRight
                  size={18}
                  className="mt-auto pt-4 text-muted-foreground transition-colors group-hover:text-[var(--accent-electric)]"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES — bento ─── */}
      <section className="border-y border-border bg-[var(--surface-sunken)]">
        <div className="page-container py-20 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow">
                <Blocks size={12} /> Categories
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">
                Browse by craft
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-foreground"
            >
              All categories
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="grid auto-rows-[minmax(160px,_auto)] grid-cols-2 gap-4 md:grid-cols-4">
            {categories.slice(0, 6).map((category, idx) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className={`group surface-edge relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 ${
                  idx === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-[var(--surface-sunken)] text-foreground transition-all group-hover:border-[var(--accent-electric)] group-hover:text-[var(--accent-electric)]">
                    <Layers size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3
                    className={`font-extrabold leading-tight tracking-[-0.02em] text-foreground ${
                      idx === 0 ? "text-2xl md:text-3xl" : "text-base"
                    }`}
                  >
                    {category.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold tabular-nums">
                      {category.productCount} products
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-electric)]"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRENDING ─── */}
      <section className="page-container py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">
              <Flame size={12} /> Trending now
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl">
              What the builders <br className="hidden md:inline" />
              <span className="text-[var(--accent-electric)]">
                are shipping with
              </span>
            </h2>
          </div>
          <Link
            href="/products"
            className="group hidden items-center gap-1.5 text-sm font-bold text-foreground sm:inline-flex"
          >
            All products
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className={buttonVariants({ variant: "outline" })}
          >
            Browse all products
          </Link>
        </div>
      </section>

      {/* ─── FINAL CTA — editorial slab ─── */}
      <section className="border-t border-border bg-card text-foreground">
        <div className="page-container relative overflow-hidden py-20 md:py-28">
          <div className="pointer-events-none absolute -right-20 -top-20 size-[420px] rounded-full bg-[var(--accent-electric)] opacity-[0.12] dark:opacity-25 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 size-[360px] rounded-full bg-[var(--accent-violet)] opacity-[0.10] dark:opacity-20 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="eyebrow text-muted-foreground">
                <Zap size={12} /> Ready when you are
              </span>
              <h2 className="mt-4 text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[0.96] tracking-[-0.035em]">
                Find free resources or premium kits. <br />
                Start shipping.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                Browse our curated catalog of free templates and premium assets, grab what fits, and have it in your
                editor in under a minute.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3 md:items-end">
              <Link
                href="/products"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent-electric)] px-7 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
              >
                Enter the marketplace
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-7 text-sm font-bold text-foreground transition-colors hover:bg-muted"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
