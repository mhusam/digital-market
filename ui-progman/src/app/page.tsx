"use client";

import Link from "next/link";
import { useState } from "react";
import { RetroGrid } from "@/components/ui/retro-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { Marquee } from "@/components/ui/marquee";
import { PRODUCTS, CATEGORIES, NEWS_HIGHLIGHTS, Product } from "@/lib/mockData";
import { useCartStore } from "@/store/cartStore";
import {
  ArrowRight,
  Search,
  Sparkles,
  Layers,
  Palette,
  ArrowUpRight,
  Download,
  Star,
  CheckCircle2,
  Cpu,
  Flame,
  ArrowRightLeft
} from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [searchVal, setSearchVal] = useState("");
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="relative w-full flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full -mt-16 pt-28 pb-20 md:pt-36 md:pb-28 border-b border-border flex items-center justify-center bg-[color-mix(in_srgb,var(--surface-sunken)_30%,transparent)]">
        <RetroGrid className="opacity-30 dark:opacity-20" />
        
        <div className="page-container flex flex-col items-center text-center relative z-10">
          <span className="eyebrow fade-up text-[var(--accent-electric)] mb-4">
            Next Generation Marketplace
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.08] mb-6 text-foreground font-sans">
            Build software, <span className="font-hand text-[var(--accent-electric)] text-5xl sm:text-7xl md:text-8xl rotate-[-2deg] inline-block px-1">faster</span> than ever.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed font-sans">
            Curated Next.js 16 templates, Tailwind CSS v4 boilerplates, UI component systems, and AI engineering assets optimized for production.
          </p>

          {/* Search bar */}
          <div className="w-full max-w-lg relative mb-12 focus-within:scale-[1.01] transition-transform duration-200">
            <input
              type="text"
              placeholder="Search boilerplates, prompts, components..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full h-14 rounded-full border border-border bg-card/80 backdrop-blur-md px-6 pl-14 pr-24 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all shadow-[0_12px_30px_-15px_color-mix(in_oklab,var(--foreground)_12%,transparent)]"
            />
            <Search className="absolute left-5 top-4.5 size-5 text-muted-foreground" />
            <Link
              href={`/search?q=${encodeURIComponent(searchVal)}`}
              className="absolute right-2 top-2 h-10 px-5 rounded-full bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-1 hover:bg-primary/95 transition-all"
            >
              Explore
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Featured tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl text-xs font-semibold text-muted-foreground">
            <span>Popular:</span>
            {["Next.js 16", "Tailwind v4", "Spring Boot", "SaaS Starter", "Figma Design"].map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-full border border-border bg-card hover:bg-muted transition-colors text-foreground"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker / Marquee Section */}
      <section className="w-full border-b border-border bg-card/60 backdrop-blur-sm py-3">
        <Marquee reverse={false} duration={30} pauseOnHover className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex gap-8">
          {NEWS_HIGHLIGHTS.map((item) => (
            <Link key={item.id} href={item.url} className="inline-flex items-center gap-2 hover:text-[var(--accent-electric)] transition-colors mx-4 whitespace-nowrap">
              <span className="inline-block size-2 rounded-full bg-[var(--accent-electric)] pulse-dot" />
              <span>{item.title}</span>
              <span className="text-[10px] text-muted-foreground/60">({item.date})</span>
            </Link>
          ))}
        </Marquee>
      </section>

      {/* Key Statistics (KPIs) */}
      <section className="py-12 border-b border-border bg-[color-mix(in_srgb,var(--surface-sunken)_15%,transparent)]">
        <div className="page-container grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Total Downloads", val: "14,240+" },
            { label: "Active Products", val: "45 Templates" },
            { label: "Average Rating", val: "4.92 / 5.0" },
            { label: "Active Developers", val: "3,800+ Devs" },
          ].map((kpi, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight tabular-nums">
                {kpi.val}
              </span>
              <span className="text-xs font-medium text-muted-foreground mt-1.5 uppercase tracking-wider">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Design Pillars */}
      <section className="py-20 border-b border-border">
        <div className="page-container">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="eyebrow text-[var(--accent-violet)] mb-3">Why PROGMAN?</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Built by developers, for creators.
            </h2>
            <p className="text-muted-foreground max-w-xl mt-4 leading-relaxed text-sm">
              We focus on premium details: modular architecture, clean components, fully self-contained routing, and incredible styling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Next.js 16 Ready",
                desc: "Every React item is compiled with React 19 and Next 16 routing standards, including server action triggers and edge caches.",
                icon: Cpu,
                color: "var(--accent-violet)",
              },
              {
                title: "High Performance",
                desc: "Guaranteed to score 98+ on Google Lighthouse. Deferring scripts, preloading assets, and optimizing layouts for instant LCP.",
                icon: Flame,
                color: "var(--accent-electric)",
              },
              {
                title: "Strict Modularity",
                desc: "Separated domain architectures. BFF proxy handlers protect internal credentials, keeping customer layouts completely decoupled.",
                icon: ArrowRightLeft,
                color: "var(--accent-cyan)",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-foreground/20"
              >
                <BorderBeam duration={10 + i * 2} delay={i * 2} colorFrom={pillar.color} />
                <div className="size-10 rounded-full flex items-center justify-center bg-muted mb-4" style={{ color: pillar.color }}>
                  <pillar.icon className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Marketplace Hub */}
      <section className="py-20 border-b border-border bg-[color-mix(in_srgb,var(--surface-sunken)_10%,transparent)]">
        <div className="page-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="eyebrow text-[var(--accent-electric)] mb-2">Universe Menu</span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                Explore the Developer Ecosystem
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-electric)] hover:underline">
              Browse all items <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Large Categories Bento Card */}
            <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 size-72 bg-gradient-to-bl from-[var(--accent-electric)]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Browse categories</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-4">Modular Starter Frameworks</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card hover:border-[var(--accent-electric)] transition-all group/item"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-muted flex items-center justify-center group-hover/item:text-[var(--accent-electric)] transition-colors">
                          {cat.slug === "boilerplates" ? <Layers className="size-4" /> : cat.slug === "ui-components" ? <Sparkles className="size-4" /> : <Palette className="size-4" />}
                        </div>
                        <span className="text-xs font-bold text-foreground">{cat.name}</span>
                      </div>
                      <ArrowUpRight className="size-3.5 text-muted-foreground group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                <span>Updated weekly</span>
                <span className="font-mono">PLAN.md fully configured</span>
              </div>
            </div>

            {/* Box 2: Small Tools Bento Card */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-[var(--accent-violet)] transition-colors group relative">
              <div className="absolute top-0 right-0 size-48 bg-gradient-to-bl from-[var(--accent-violet)]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Interactive Helpers</span>
                <h3 className="text-lg font-bold text-foreground mb-1.5">Developer Cheat Sheets</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Syntaxes, shortcuts, and boilerplate references ready to copy directly into terminal interfaces.
                </p>
              </div>
              <Link
                href="/cheat-sheets"
                className="mt-6 inline-flex items-center justify-between h-11 px-4 rounded-xl border border-border bg-muted hover:bg-foreground hover:text-background transition-colors text-xs font-semibold"
              >
                Launch Cheat Sheets
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Box 3: Small Prompts Bento Card */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-[var(--accent-cyan)] transition-colors group relative">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">AI Prompts Hub</span>
                <h3 className="text-lg font-bold text-foreground mb-1.5">Prompt Engineering</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Stunning prompt category dashboard containing curated LLM instruction sets.
                </p>
              </div>
              <Link
                href="/ai-prompts"
                className="mt-6 inline-flex items-center justify-between h-11 px-4 rounded-xl border border-border bg-muted hover:bg-foreground hover:text-background transition-colors text-xs font-semibold"
              >
                Access AI Prompts
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Box 4: Large Featured Shelf Bento Card */}
            <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between relative overflow-hidden">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Showcase & Podium</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-1">Developer Leaderboards</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Check out the community ranking, top product builders, and trending code contributions.
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <Link
                  href="/leaderboard"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-electric)] hover:underline"
                >
                  View Leaderboard <ArrowRight className="size-3.5" />
                </Link>
                <span className="size-1 rounded-full bg-muted-foreground/30" />
                <Link
                  href="/showcase"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:underline"
                >
                  Browse Showcase Gallery <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Digital Products Shelf */}
      <section className="py-20">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="eyebrow text-[var(--accent-electric)] mb-2">Featured Products</span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
                Boilerplates & Components
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 bg-muted px-4 py-2 rounded-full border border-border hover:bg-foreground hover:text-background transition-all text-xs font-bold"
            >
              See all digital items
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((prod) => (
              <Link
                key={prod.id}
                href={`/products/${prod.id}`}
                className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklab,var(--foreground)_15%,transparent)]"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted border-b border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="object-cover size-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-border text-[10px] font-bold uppercase tracking-wider text-foreground">
                    {prod.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-foreground/90 text-background px-2.5 py-1 rounded-full text-xs font-bold tabular-nums">
                    ${prod.price.toFixed(2)}
                  </div>
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-2">
                      <Star className="size-3.5 fill-current" />
                      <span className="font-bold">{prod.rating}</span>
                      <span className="text-muted-foreground font-medium">({prod.reviewsCount} reviews)</span>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-[var(--accent-electric)] transition-colors line-clamp-1">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                  <div className="border-t border-border pt-4 mt-2 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-medium text-muted-foreground inline-flex items-center gap-1">
                      <Download className="size-3" /> {prod.downloads} downloads
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(prod, e)}
                      className="h-8 px-3 rounded-xl bg-primary text-primary-foreground font-semibold text-[11px] hover:bg-primary/95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee and Support Pillars */}
      <section className="py-16 border-t border-border bg-[color-mix(in_srgb,var(--surface-sunken)_10%,transparent)]">
        <div className="page-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Instant Delivery", desc: "Access code downloads immediately after purchase." },
            { title: "Safe checkout", desc: "100% secure payment processing with PayPal & Bank Ref." },
            { title: "Unlimited Updates", desc: "Get free version patches and code updates forever." },
            { title: "Helpful Discord", desc: "Direct channel support with actual template creators." },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <CheckCircle2 className="size-5 text-[var(--accent-electric)] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
