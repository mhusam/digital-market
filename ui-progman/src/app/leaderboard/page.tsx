"use client";

import { LEADERBOARD } from "@/lib/mockData";
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Award, Star } from "lucide-react";

export default function LeaderboardPage() {
  const topThree = LEADERBOARD.slice(0, 3);
  const remaining = LEADERBOARD.slice(3);

  // Reorder top three for visual podium: [2nd, 1st, 3rd]
  const podium = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-16 text-center md:text-left">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Community Rankings</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Creator Leaderboard.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed mx-auto md:mx-0">
          Rankings based on product creations, GitHub contributions, downloads, and developer support metrics.
        </p>
      </div>

      {/* Visual Podium */}
      <div className="flex flex-col sm:flex-row items-end justify-center gap-6 mb-16 max-w-3xl mx-auto px-4">
        {podium.map((entry, idx) => {
          // Determine position properties
          const isFirst = entry.rank === 1;
          const isSecond = entry.rank === 2;
          const isThird = entry.rank === 3;

          const heightClass = isFirst
            ? "h-48 sm:h-56 bg-primary/5 border-primary/20"
            : isSecond
              ? "h-36 sm:h-44 bg-muted/40"
              : "h-28 sm:h-36 bg-muted/20";

          return (
            <div
              key={entry.rank}
              className={`w-full sm:w-1/3 flex flex-col items-center justify-end rounded-2xl border border-border p-6 relative overflow-hidden transition-all duration-300 hover:border-foreground/10 ${heightClass} order-${entry.rank}`}
            >
              {isFirst && (
                <Crown className="size-6 text-amber-500 absolute top-4 animate-bounce" />
              )}
              
              <div className="absolute top-10 flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className={`size-12 rounded-full object-cover border-2 ${
                    isFirst ? "border-amber-500" : isSecond ? "border-slate-400" : "border-amber-700"
                  }`}
                />
                <span className="text-xs font-bold text-foreground mt-2 block">{entry.name}</span>
                <span className="text-[10px] text-muted-foreground">{entry.role}</span>
              </div>

              <div className="text-center w-full mt-12 relative z-10">
                <span className="font-mono text-xs font-bold text-muted-foreground block mb-0.5">
                  {entry.points.toLocaleString()} pts
                </span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                  {entry.projects} projects
                </span>
              </div>
              
              {/* Giant Rank Number background */}
              <span className="absolute bottom-[-16px] right-2 font-mono text-7xl sm:text-8xl font-black text-foreground/[0.03] select-none pointer-events-none">
                {entry.rank}
              </span>
            </div>
          );
        })}
      </div>

      {/* Ranks Table */}
      <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-4 bg-muted/30 border-b border-border flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="w-8 text-center">Rank</span>
            <span>Developer</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="w-16 text-right">Projects</span>
            <span className="w-20 text-right">Points</span>
          </div>
        </div>

        <div className="divide-y divide-border">
          {remaining.map((entry) => (
            <div key={entry.rank} className="p-4 flex items-center justify-between hover:bg-muted/10 transition-colors">
              <div className="flex items-center gap-6">
                <span className="w-8 text-center font-mono text-xs font-bold text-muted-foreground tabular-nums">
                  #{entry.rank}
                </span>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.avatar}
                    alt={entry.name}
                    className="size-8 rounded-full object-cover border border-border"
                  />
                  <div>
                    <span className="text-xs font-bold text-foreground block">{entry.name}</span>
                    <span className="text-[10px] text-muted-foreground">{entry.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 font-mono text-xs font-bold">
                <span className="w-16 text-right text-muted-foreground tabular-nums">{entry.projects}</span>
                <span className="w-20 text-right text-foreground tabular-nums">{entry.points.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
