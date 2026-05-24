"use client";

import { CHANGELOG_RELEASES } from "@/lib/mockData";
import { Activity, Calendar, GitCommit } from "lucide-react";

export default function ChangelogPage() {
  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-16">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Product Updates</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          System Changelog.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Chronological logs, upgrades, performance tweaks, and framework updates.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-border ml-4 md:ml-32 space-y-12 max-w-3xl">
        {CHANGELOG_RELEASES.map((rel) => (
          <div key={rel.id} className="relative pl-8 md:pl-12">
            {/* Timeline Dot Icon */}
            <div className="absolute -left-3 top-1 size-6 rounded-full bg-card border border-border flex items-center justify-center text-foreground shadow-sm">
              <GitCommit className="size-3.5" />
            </div>

            {/* Left side Metadata for larger screens */}
            <div className="md:absolute md:right-[calc(100%+32px)] md:top-1.5 md:text-right w-28 whitespace-nowrap hidden md:block">
              <span className="font-mono text-xs font-bold text-foreground block mb-0.5">
                {rel.version}
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold inline-flex items-center gap-1">
                <Calendar className="size-3" />
                {rel.date}
              </span>
            </div>

            {/* Content card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 md:hidden">
                <span className="font-mono text-xs font-bold text-foreground">
                  {rel.version}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold">
                  {rel.date}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-foreground">{rel.title}</h3>
                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${
                  rel.type === "major"
                    ? "border-[var(--accent-electric)] bg-[var(--accent-electric)]/5 text-[var(--accent-electric)]"
                    : rel.type === "minor"
                      ? "border-[var(--accent-violet)] bg-[var(--accent-violet)]/5 text-[var(--accent-violet)]"
                      : "border-border bg-muted text-muted-foreground"
                }`}>
                  {rel.type}
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {rel.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
