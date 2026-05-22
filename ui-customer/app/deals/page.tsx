"use client";

import { useState } from "react";
import { Tag, Search, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface DealItem {
  id: string;
  partner: string;
  logo: string;
  discount: string;
  code: string;
  description: string;
  category: "SaaS" | "Hosting" | "Courses" | "Design";
  link: string;
}

const DEALS_DATA: DealItem[] = [
  {
    id: "d1",
    partner: "CloudScale Hosting",
    logo: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=80&h=80&q=80",
    discount: "3 MONTHS FREE",
    code: "CLOUDSCALEPROGMAN",
    description: "Get 3 months of premium virtual private server hosting (VPS) with high-speed SSD storage and automatic database backups.",
    category: "Hosting",
    link: "#"
  },
  {
    id: "d2",
    partner: "Tailwind Kit Pro",
    logo: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=80&h=80&q=80",
    discount: "30% OFF FIRST YEAR",
    code: "TW30PROGMAN",
    description: "Access a library of responsive, conversion-optimized landing pages and dashboard design tokens styled with Tailwind CSS.",
    category: "Design",
    link: "#"
  },
  {
    id: "d3",
    partner: "Spring Academy Premium",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=80&h=80&q=80",
    discount: "20% LIFE DISCOUNT",
    code: "SPRINGACADEMY20",
    description: "Deep dive into Spring Modulith, Spring Boot 3.4 micro-monolith, reactive API streams, and database migration architecture courses.",
    category: "Courses",
    link: "#"
  },
  {
    id: "d4",
    partner: "Zenith CRM SaaS",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=80&h=80&q=80",
    discount: "15% RECURRING DISCOUNT",
    code: "ZENITH15",
    description: "Automate your client relations, pipelines, lead tracking campaigns, and sentiment analytics workflows with Zenith SaaS.",
    category: "SaaS",
    link: "#"
  },
  {
    id: "d5",
    partner: "AuthGuard Services",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=80&h=80&q=80",
    discount: "1 MONTH TRIAL + 10% OFF",
    code: "GUARD10",
    description: "Secure authorization gateway modules, multi-factor token audits, and customized OAuth configuration support.",
    category: "SaaS",
    link: "#"
  }
];

const CATEGORIES = ["All", "SaaS", "Hosting", "Courses", "Design"];

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Coupon code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredDeals = DEALS_DATA.filter((deal) => {
    const matchesCategory = selectedCategory === "All" || deal.category === selectedCategory;
    const matchesSearch =
      deal.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Banner Curated by Agent */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-6">
            <Tag className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-sm font-medium tracking-wide">Curated by PROGMAN Deals Agent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
            Tech Deals & Discounts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Exclusive coupon codes, hosting trial credits, SaaS discount tokens, and visual asset deals for builders.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-border">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                    : "bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search partner discounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
            />
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="group rounded-3xl border border-border bg-card/40 backdrop-blur-md p-6 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={deal.logo} alt={deal.partner} className="w-12 h-12 rounded-2xl object-cover border border-border bg-muted" />
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase">
                    {deal.category}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-xs font-bold text-amber-400 block tracking-wide mb-1">
                    {deal.discount}
                  </span>
                  <h3 className="text-xl font-bold group-hover:text-amber-400 transition-colors duration-300">
                    {deal.partner}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed font-light mt-2 mb-6">
                  {deal.description}
                </p>
              </div>

              <div>
                {/* Coupon Code block */}
                <div className="flex items-center justify-between gap-2 p-3 bg-background border border-border rounded-xl mb-4 group/coupon">
                  <span className="text-xs font-mono font-bold tracking-wider text-muted-foreground select-all">
                    {deal.code}
                  </span>
                  <button
                    onClick={() => handleCopyCode(deal.code)}
                    className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-all shrink-0"
                    title="Copy code"
                  >
                    {copiedCode === deal.code ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <a
                  href={deal.link}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-bold transition-all text-xs"
                >
                  Claim Deal
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}

          {filteredDeals.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground font-light">
              No active deals found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
