"use client";

import { useState } from "react";
import { Trophy, ArrowUpRight, Star, TrendingUp, DollarSign, Award, Search } from "lucide-react";

interface Creator {
  rank: number;
  name: string;
  avatar: string;
  sales: number;
  rating: number;
  growth: number;
  topProduct: string;
  specialty: string;
}

const CREATORS: Creator[] = [
  {
    rank: 1,
    name: "Alex 'ByteBuilder' Mercer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    sales: 1240,
    rating: 4.9,
    growth: 24.5,
    topProduct: "Spring Modulith SaaS Boilerplate",
    specialty: "Backend Architecture",
  },
  {
    rank: 2,
    name: "Sofia Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    sales: 980,
    rating: 4.85,
    growth: 18.2,
    topProduct: "Neomorphic UI Components Kit",
    specialty: "Frontend Design Systems",
  },
  {
    rank: 3,
    name: "Hiroshi Tanaka",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    sales: 850,
    rating: 4.92,
    growth: 32.1,
    topProduct: "S3 Secure Asset Manager Mod",
    specialty: "Cloud Infrastructure",
  },
  {
    rank: 4,
    name: "Emma Watson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    sales: 720,
    rating: 4.75,
    growth: 12.8,
    topProduct: "PayPal Webhook Processor Plugin",
    specialty: "Payment Integrations",
  },
  {
    rank: 5,
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    sales: 640,
    rating: 4.8,
    growth: 15.4,
    topProduct: "Auth.js OAuth Starter Template",
    specialty: "Web Security",
  },
  {
    rank: 6,
    name: "Clara Oswald",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    sales: 590,
    rating: 4.68,
    growth: 9.7,
    topProduct: "Responsive Tailwind Templates",
    specialty: "Web Layouts",
  },
];

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<"sales" | "growth" | "rating">("sales");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedCreators = [...CREATORS]
    .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "sales") return b.sales - a.sales;
      if (sortBy === "growth") return b.growth - a.growth;
      return b.rating - a.rating;
    });

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Award className="w-8 h-8 text-yellow-500 fill-yellow-500" />;
      case 2:
        return <Award className="w-7 h-7 text-slate-300 fill-slate-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600 fill-amber-600" />;
      default:
        return <span className="font-mono font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Banner Curated by Agent */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-6">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm font-medium tracking-wide">Curated by PROGMAN Analytics Agent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
            Creator Leaderboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Platform performance ranking celebrating top-selling digital solution developers, architects, and designers.
          </p>
        </div>

        {/* Top 3 Creators Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-end">
          
          {/* Rank 2 */}
          {CREATORS[1] && (
            <div className="order-2 md:order-1 rounded-3xl border border-border bg-card/40 backdrop-blur-md p-6 text-center hover:border-slate-300/30 transition-all flex flex-col items-center relative md:h-[22rem] justify-center">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-background border border-border p-1.5 rounded-full">
                {getRankBadge(2)}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CREATORS[1].avatar} alt={CREATORS[1].name} className="w-20 h-20 rounded-full object-cover border-2 border-slate-300/50 mb-4" />
              <h3 className="text-lg font-bold">{CREATORS[1].name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{CREATORS[1].specialty}</p>
              
              <div className="grid grid-cols-3 gap-4 w-full border-t border-border/40 pt-4 mt-2">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Sales</span>
                  <span className="text-sm font-extrabold text-foreground">{CREATORS[1].sales}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Rating</span>
                  <span className="text-sm font-extrabold text-foreground flex items-center justify-center gap-0.5"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{CREATORS[1].rating}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Growth</span>
                  <span className="text-sm font-extrabold text-emerald-500">+{CREATORS[1].growth}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Rank 1 */}
          {CREATORS[0] && (
            <div className="order-1 md:order-2 rounded-3xl border border-border bg-gradient-to-b from-yellow-500/10 via-card/40 to-card/40 backdrop-blur-md p-8 text-center hover:border-yellow-500/30 transition-all flex flex-col items-center relative md:h-[25rem] justify-center scale-105 border-yellow-500/20 shadow-xl shadow-yellow-500/5">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background border border-yellow-500/20 p-2 rounded-full shadow-lg">
                {getRankBadge(1)}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CREATORS[0].avatar} alt={CREATORS[0].name} className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500/50 mb-4" />
              <h3 className="text-xl font-bold">{CREATORS[0].name}</h3>
              <p className="text-xs text-yellow-500 font-bold mb-3">{CREATORS[0].specialty}</p>
              
              <div className="grid grid-cols-3 gap-4 w-full border-t border-border/45 pt-4 mt-2">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Sales</span>
                  <span className="text-base font-extrabold text-foreground">{CREATORS[0].sales}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Rating</span>
                  <span className="text-base font-extrabold text-foreground flex items-center justify-center gap-0.5"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{CREATORS[0].rating}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Growth</span>
                  <span className="text-base font-extrabold text-emerald-500">+{CREATORS[0].growth}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {CREATORS[2] && (
            <div className="order-3 md:order-3 rounded-3xl border border-border bg-card/40 backdrop-blur-md p-6 text-center hover:border-amber-600/30 transition-all flex flex-col items-center relative md:h-[20rem] justify-center">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-background border border-border p-1.5 rounded-full">
                {getRankBadge(3)}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CREATORS[2].avatar} alt={CREATORS[2].name} className="w-18 h-18 rounded-full object-cover border-2 border-amber-600/50 mb-4" />
              <h3 className="text-lg font-bold">{CREATORS[2].name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{CREATORS[2].specialty}</p>
              
              <div className="grid grid-cols-3 gap-4 w-full border-t border-border/40 pt-4 mt-2">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Sales</span>
                  <span className="text-sm font-extrabold text-foreground">{CREATORS[2].sales}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Rating</span>
                  <span className="text-sm font-extrabold text-foreground flex items-center justify-center gap-0.5"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{CREATORS[2].rating}</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Growth</span>
                  <span className="text-sm font-extrabold text-emerald-500">+{CREATORS[2].growth}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter bar and Table listing */}
        <div className="rounded-3xl border border-border bg-card/20 backdrop-blur-sm p-6 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-6 border-b border-border/60">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search creator names or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-sm"
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              {(["sales", "rating", "growth"] as const).map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSortBy(metric)}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                    sortBy === metric
                      ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/20"
                      : "bg-background border border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="pb-4 pl-4">Rank</th>
                  <th className="pb-4">Creator</th>
                  <th className="pb-4">Specialty</th>
                  <th className="pb-4">Sales</th>
                  <th className="pb-4">Rating</th>
                  <th className="pb-4">Growth (MOM)</th>
                  <th className="pb-4 pr-4">Top Product</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {sortedCreators.map((creator) => (
                  <tr key={creator.name} className="hover:bg-muted/30 transition-colors">
                    <td className="py-4 pl-4">{getRankBadge(creator.rank)}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full object-cover border border-border" />
                        <span className="font-bold text-sm">{creator.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-xs font-medium text-muted-foreground">{creator.specialty}</td>
                    <td className="py-4 text-sm font-extrabold flex items-center gap-0.5"><DollarSign className="w-3.5 h-3.5 text-muted-foreground" />{creator.sales}</td>
                    <td className="py-4 text-sm font-bold"><span className="flex items-center gap-0.5 text-yellow-500"><Star className="w-3.5 h-3.5 fill-yellow-500" /> {creator.rating}</span></td>
                    <td className="py-4 text-sm font-bold text-emerald-500">+{creator.growth}%</td>
                    <td className="py-4 text-xs text-muted-foreground pr-4 font-mono">{creator.topProduct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
