import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Daily — News | PROGMAN",
  description: "A short, edited brief of what happened in software today.",
};

interface Story {
  kicker: string;
  headline: string;
  dek: string;
  byline: string;
  source: string;
  time: string;
  href: string;
}

interface Brief {
  source: string;
  time: string;
  headline: string;
  href: string;
}

const TODAY = "Friday, May 22, 2026";
const EDITION = "Vol. III · Issue 138";

const LEAD: Story = {
  kicker: "Lead",
  headline: "Next.js 16 ships, and quietly removes the last reasons to keep the Pages Router around.",
  dek: "Partial prerendering becomes the default. The compiler lands. The migration guide is short — for once. Teams that delayed for two years now have no excuse and no shim to hide behind.",
  byline: "Filed by the editors",
  source: "Vercel Blog",
  time: "07:42",
  href: "#",
};

const SECONDARY: Story[] = [
  {
    kicker: "Models",
    headline: "Anthropic publishes a Claude 4.7 evaluation card focused on long-horizon agentic work, not synthetic benchmarks.",
    dek: "The shift in framing is more interesting than the numbers — vendors are quietly admitting the old leaderboards no longer mean anything to the people writing checks.",
    byline: "M. Holloway",
    source: "Anthropic",
    time: "06:10",
    href: "#",
  },
  {
    kicker: "Infrastructure",
    headline: "Cloudflare announces a free tier for Durable Objects, putting pressure on the entire stateful-edge category.",
    dek: "The pricing change reshapes the build-or-buy calculation for collaborative apps. Expect the next wave of side projects to look suspiciously like Figma clones.",
    byline: "R. Asad",
    source: "Cloudflare",
    time: "09:01",
    href: "#",
  },
];

const BRIEFS: { title: string; items: Brief[] }[] = [
  {
    title: "Releases",
    items: [
      { source: "Bun", time: "08:22", headline: "Bun 1.3 lands with workspaces parity and a leaner Node compat layer.", href: "#" },
      { source: "Drizzle", time: "07:58", headline: "Drizzle 0.34 adds first-class branching support for Neon and Turso.", href: "#" },
      { source: "Astro", time: "—", headline: "Astro 5.2 introduces typed content collections at the route boundary.", href: "#" },
      { source: "PostgreSQL", time: "yesterday", headline: "Postgres 17.2 ships a quiet but meaningful planner regression fix.", href: "#" },
    ],
  },
  {
    title: "Industry",
    items: [
      { source: "Reuters", time: "10:15", headline: "EU clarifies that on-device model inference is not, by default, a high-risk system.", href: "#" },
      { source: "The Information", time: "09:30", headline: "GitHub reorganizes Copilot under a single agent-focused product group.", href: "#" },
      { source: "Bloomberg", time: "08:00", headline: "Two more Series B infra startups quietly close, citing edge consolidation.", href: "#" },
    ],
  },
  {
    title: "Worth Reading",
    items: [
      { source: "Increment", time: "essay", headline: "The case against rebuilding your dashboard a fourth time.", href: "#" },
      { source: "fasterthanli.me", time: "essay", headline: "What the Rust async runtime is really doing under your feet.", href: "#" },
      { source: "Apenwarr", time: "essay", headline: "Distributed systems are about humans, not packets — again.", href: "#" },
    ],
  },
];

const TICKER = [
  "Claude 4.7 Opus — long-context refactor benchmark up 4%",
  "Llama 4 70B — surpasses prior closed baselines on HumanEval+",
  "Bun 1.3 — install time down 18% on average monorepo",
  "Vercel — partial prerendering on by default in Next.js 16",
  "Cloudflare — Durable Objects free tier announced",
];

export default function NewsPage() {
  return (
    <div className="page-container py-12 md:py-16">
      <header className="border-y border-foreground py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>{EDITION}</span>
          <span className="text-foreground">{TODAY}</span>
          <span>Curated · 06:00 ET</span>
        </div>
        <h1 className="mt-6 text-center text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl">
          The Daily
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          A short, edited brief of what happened in software today. Read in five minutes, closed in six.
        </p>
      </header>

      <div className="my-6 flex items-center gap-3 overflow-hidden border-b border-[var(--hairline)] pb-3 font-mono text-xs">
        <span className="shrink-0 bg-foreground px-2 py-0.5 uppercase tracking-[0.18em] text-background">
          Now
        </span>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-muted-foreground">
          {TICKER.map((t) => (
            <li key={t} className="whitespace-nowrap">
              <span className="text-[var(--accent-electric)]">·</span> {t}
            </li>
          ))}
        </ul>
      </div>

      <main className="grid gap-12 py-6 lg:grid-cols-3 lg:gap-x-12">
        <article className="lg:col-span-2 lg:border-r lg:border-[var(--hairline)] lg:pr-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent-electric)]">
            {LEAD.kicker}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            <Link href={LEAD.href} className="underline-offset-4 hover:underline">
              {LEAD.headline}
            </Link>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {LEAD.dek}
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-[var(--hairline)] pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="text-foreground">{LEAD.byline}</span>
            <span>·</span>
            <span>{LEAD.source}</span>
            <span>·</span>
            <span>{LEAD.time}</span>
          </div>

          <div className="mt-12 grid gap-10 border-t border-foreground pt-10 md:grid-cols-2">
            {SECONDARY.map((s) => (
              <article key={s.headline}>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {s.kicker}
                </span>
                <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight text-foreground md:text-2xl">
                  <Link href={s.href} className="underline-offset-4 hover:underline">
                    {s.headline}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.dek}
                </p>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.byline} · {s.source} · {s.time}
                </div>
              </article>
            ))}
          </div>
        </article>

        <aside className="flex flex-col gap-10">
          {BRIEFS.map((brief) => (
            <section key={brief.title}>
              <h3 className="border-b border-foreground pb-2 font-mono text-xs uppercase tracking-[0.22em] text-foreground">
                {brief.title}
              </h3>
              <ul className="mt-3 flex flex-col">
                {brief.items.map((item) => (
                  <li key={item.headline} className="border-b border-[var(--hairline)] py-3 last:border-b-0">
                    <Link href={item.href} className="group block">
                      <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span>{item.source}</span>
                        <span>{item.time}</span>
                      </div>
                      <p className="mt-1 text-sm leading-snug text-foreground underline-offset-4 group-hover:underline">
                        {item.headline}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </aside>
      </main>

      <footer className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t border-foreground pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>End of edition</span>
        <span>Next dispatch · Monday 06:00 ET</span>
      </footer>
    </div>
  );
}
