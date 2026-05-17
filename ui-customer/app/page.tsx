import {
  getCategories,
  getProducts,
} from "@digital-market/api-client";
import Link from "next/link";
import { SearchBar } from "../components/products/SearchBar";
import { ProductCard } from "../components/products/ProductCard";
import {
  Zap,
  ShieldCheck,
  RefreshCcw,
  Package,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const CATEGORY_ACCENTS: Record<string, string> = {
  "microservices-implementation": "#0EA5E9",
  "saas-solutions": "#14B8A6",
  "website-templates": "#2563EB",
  "dashboard-templates": "#0284C7",
  "ui-ux-templates": "#38BDF8",
  "figma-kits": "#EAF3FF",
  "photoshop-assets": "#FED7AA",
  "design-systems": "#1B1B1B",
};

const CATEGORY_GLYPHS: Record<string, string> = {
  "microservices-implementation": "◆",
  "saas-solutions": "⚡",
  "website-templates": "▤",
  "dashboard-templates": "◫",
  "ui-ux-templates": "✦",
  "figma-kits": "Aa",
  "photoshop-assets": "◩",
  "design-systems": "</>",
};

export default async function HomePage() {
  const [categoriesRes, productsRes, featuredRes] = await Promise.all([
    getCategories(),
    getProducts({ sortBy: "popular", limit: 6 }),
    getProducts({ sortBy: "rating", limit: 3 }),
  ]);

  const categories = categoriesRes.data ?? [];
  const trending = productsRes.data ?? [];
  const featured = featuredRes.data ?? [];

  return (
    <>
      {/* HERO */}
      <section className="relative pt-12 md:pt-20 pb-12 md:pb-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 reveal">
              <span className="eyebrow">
                <Sparkles size={12} strokeWidth={2.8} />
                Premium digital marketplace
              </span>
              <h1 className="mt-5 text-[clamp(2.6rem,7.2vw,5.6rem)] font-black tracking-[-0.045em] leading-[0.92]">
                The marketplace
                <br />
                for{" "}
                <span className="scribble">premium</span>
                <br />
                digital products.
              </h1>
              <p className="mt-6 text-[17px] md:text-lg text-[#1B1B1B]/80 font-semibold max-w-xl leading-relaxed">
                Hand-picked microservices, SaaS starters, dashboards, and design kits from indie builders. Buy once, own forever, ship faster.
              </p>
              <div className="mt-8 reveal reveal-delay-1">
                <SearchBar categories={categories} />
              </div>
              <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 reveal reveal-delay-2">
                <TrustBadge icon={<Package size={16} />} label="15k+ Products" />
                <TrustBadge icon={<Zap size={16} />} label="Instant Download" />
                <TrustBadge icon={<RefreshCcw size={16} />} label="Lifetime Updates" />
                <TrustBadge icon={<ShieldCheck size={16} />} label="Secure Payment" />
              </ul>
            </div>

            <div className="lg:col-span-5 reveal reveal-delay-2">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between gap-6 mb-10 reveal">
            <div>
              <span className="eyebrow">Browse</span>
                <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-[-0.04em]">
                  Pick your <span className="font-hand text-[#0EA5E9]">stack</span>
                </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-1 font-black hover:underline underline-offset-4"
            >
              View all <ArrowUpRight size={16} strokeWidth={2.8} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {categories.slice(0, 8).map((c, i) => (
              <Link
                key={c.id}
                href={`/categories/${c.slug}`}
                className={`reveal reveal-delay-${(i % 4) + 1} card-lift bg-white rounded-3xl p-5 border border-[#1B1B1B]/5 shadow-[0_8px_24px_-14px_rgba(17,24,39,0.18)] block`}
              >
                <div
                  className="w-14 h-14 rounded-2xl inline-flex items-center justify-center text-2xl font-black"
                  style={{
                    background: CATEGORY_ACCENTS[c.slug] ?? "#EAF3FF",
                    color: ["figma-kits", "photoshop-assets", "microservices-implementation"].includes(c.slug) ? "#1B1B1B" : "#F8FBFF",
                  }}
                  aria-hidden
                >
                  {CATEGORY_GLYPHS[c.slug] ?? "◆"}
                </div>
                <h3 className="mt-4 font-black text-[17px] tracking-[-0.02em]">
                  {c.name}
                </h3>
                <p className="text-[12px] font-bold text-[#1B1B1B]/55 uppercase tracking-[0.12em] mt-1">
                  {c.productCount} mock products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between gap-6 mb-10 reveal">
            <div>
              <span className="eyebrow">Trending</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-[-0.04em]">
                What developers are buying
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-1 font-black hover:underline underline-offset-4"
            >
              See all <ArrowUpRight size={16} strokeWidth={2.8} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((p) => (
              <div key={p.id} className="reveal">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORS PICKS / FEATURED */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="bg-[#1B1B1B] text-[#F8FBFF] rounded-[36px] p-8 md:p-14 reveal">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <span className="eyebrow light">Editor&apos;s picks</span>
                <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-[-0.04em] text-[#1E5FAF]">
                  Curated this <span className="font-hand text-[#0EA5E9]">week</span>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Stat n="15K+" label="Digital products" tone="#1E5FAF" />
            <Stat n="48K+" label="Total downloads" tone="#FDBA74" />
            <Stat n="1.8K+" label="Active creators" tone="#99F6E4" />
            <Stat n="$2M+" label="Paid to creators" tone="#93C5FD" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 md:py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div className="relative bg-[#1B1B1B] rounded-[36px] overflow-hidden p-10 md:p-16 reveal">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(#1E5FAF 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
              aria-hidden
            />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="eyebrow light">For creators</span>
                <h2 className="mt-3 text-4xl md:text-5xl text-[#1E5FAF] font-black tracking-[-0.04em]">
                  Start selling your <br />
                  <span className="font-hand text-white">digital goods</span> today.
                </h2>
                <p className="mt-4 text-white/75 font-semibold max-w-md">
                  Explore launch-ready products with realistic mock checkout, rich product stories, and category-driven discovery flows.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link
                  href="/products"
                  className="btn-pill bg-[#1E5FAF] text-[#1B1B1B] h-14 px-7"
                >
                  Browse best sellers →
                </Link>
                <Link
                  href="/categories/saas-solutions"
                  className="btn-pill bg-transparent text-white h-14 px-7 border-2 border-white/30 hover:bg-white hover:text-[#1B1B1B]"
                >
                  Explore SaaS kits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/75 border border-[#1B1B1B]/8">
      <span className="text-[#1B1B1B]">{icon}</span>
      <span className="text-[13px] font-black tracking-[-0.01em]">{label}</span>
    </li>
  );
}

function Stat({ n, label, tone }: { n: string; label: string; tone: string }) {
  return (
    <div className="reveal bg-[#1B1B1B] rounded-3xl p-6 md:p-7 relative overflow-hidden">
      <span
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-30 blur-2xl"
        style={{ background: tone }}
        aria-hidden
      />
      <div
        className="font-black text-4xl md:text-5xl tracking-[-0.04em]"
        style={{ color: tone }}
      >
        {n}
      </div>
      <div className="text-white/70 font-bold text-sm mt-1">{label}</div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-[480px] md:h-[540px]">
      {/* main card */}
      <div className="absolute top-4 right-0 w-[78%] h-[78%] bg-white rounded-[28px] p-6 shadow-[0_30px_60px_-30px_rgba(17,24,39,0.4)] border border-[#1B1B1B]/5">
        <div className="h-32 rounded-2xl bg-[#0EA5E9] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(#1B1B1B 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <span className="absolute bottom-3 left-4 font-black text-3xl text-[#1B1B1B] tracking-[-0.04em]">
            NEXUS
          </span>
        </div>
        <div className="mt-4">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            Premium Theme
          </p>
          <h3 className="font-black text-xl tracking-[-0.02em] mt-1">
            Nexus — SaaS Starter
          </h3>
          <div className="flex items-center justify-between mt-3">
            <span className="font-black text-2xl">$49</span>
            <span className="btn-pill bg-[#1B1B1B] text-[#1E5FAF] h-9 px-4 text-[12px]">
              Add to cart
            </span>
          </div>
        </div>
      </div>

      {/* small floating card */}
      <div className="absolute bottom-4 left-0 w-[58%] bg-white rounded-3xl p-5 shadow-[0_24px_40px_-20px_rgba(17,24,39,0.35)] border border-[#1B1B1B]/5 animate-float-y">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#14B8A6] flex items-center justify-center text-white font-black text-xl">
            ⚡
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#1B1B1B]/60">
              New plugin
            </p>
            <p className="font-black text-[15px] tracking-[-0.02em]">
              Pulse Analytics
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[12px] font-bold text-[#1B1B1B]/70">
          <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse-ring inline-block" />
          1,284 active installs
        </div>
      </div>

      {/* sticker */}
      <div className="absolute top-0 left-6 bg-[#EAF3FF] rounded-2xl px-4 py-2 -rotate-6 border-2 border-[#1B1B1B] shadow-[4px_4px_0_0_#1B1B1B]">
        <span className="font-hand text-2xl text-[#1B1B1B]">indie made</span>
      </div>

      {/* spinning badge */}
      <div className="absolute bottom-10 right-2 w-24 h-24 rounded-full bg-[#1B1B1B] text-[#1E5FAF] flex items-center justify-center animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path
              id="circle"
              d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            />
          </defs>
          <text fontSize="11.5" fontWeight="900" fill="#1E5FAF" letterSpacing="2">
            <textPath href="#circle">
              ★ FORGE • PREMIUM • DIGITAL • GOODS •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
