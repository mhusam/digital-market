"use client";

import { Sparkles, Terminal, ShieldAlert, Heart, Layers } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="page-container pt-12 pb-24 sm:pb-32 space-y-16">
      {/* Header */}
      <div className="border-b border-border pb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">About Us</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Engineering the Future.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          PROGMAN is a specialized digital ecosystem that empowers creator teams to build, deploy, and ship applications at lightspeed.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-bold text-foreground">Our Origin Story</h2>
          <p>
            We started with a simple observation: modern developer configurations are unnecessarily tedious. Setting up a boilerplate with auth, database triggers, lints, and clean checkout flows should take seconds, not days.
          </p>
          <p>
            To solve this, we engineered PROGMAN—a monorepo distribution hub that combines clean Next.js 16 frameworks, robust Spring Boot backends, and customizable design systems. Every product is audited for speed, clean typing, and accessibility.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--accent-electric)]/5 to-[var(--accent-violet)]/5 blur-3xl pointer-events-none" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Core Principles</h3>
          <div className="space-y-4 font-mono text-[11px]">
            <div className="flex items-start gap-2.5">
              <span className="text-[var(--accent-electric)] font-bold">01.</span>
              <p>Strict architectural facades preventing circular code dependencies.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[var(--accent-electric)] font-bold">02.</span>
              <p>Vibrant aesthetic styles combined with smooth micro-interactions.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[var(--accent-electric)] font-bold">03.</span>
              <p>100% self-contained database migrations using Postgres & Flyway.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
