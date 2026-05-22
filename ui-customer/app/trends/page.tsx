import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Index — Trends | PROGMAN",
  description: "A weekly ranked index of what's moving in software, AI, and the developer economy.",
};

type Direction = "up" | "down" | "flat" | "new";

interface IndexEntry {
  rank: number;
  prev: number | null;
  name: string;
  category: string;
  source: string;
  note: string;
  direction: Direction;
}

const ISSUE = {
  number: 142,
  week: "Week 21",
  dated: "May 18 — May 24, 2026",
};

const SECTIONS: { id: string; title: string; lede: string; entries: IndexEntry[] }[] = [
  {
    id: "code",
    title: "Code & Frameworks",
    lede: "Movement across repositories, runtimes, and the tooling devs actually open on Monday morning.",
    entries: [
      { rank: 1, prev: 2, name: "Next.js 16", category: "Framework", source: "vercel/next.js", note: "App Router stabilizes; partial prerendering becomes default.", direction: "up" },
      { rank: 2, prev: 1, name: "React Compiler", category: "Library", source: "facebook/react", note: "Auto-memoization lands in v19.1 release candidate.", direction: "down" },
      { rank: 3, prev: null, name: "Bun 1.3", category: "Runtime", source: "oven-sh/bun", note: "Workspaces, hot reload parity, and a leaner Node compat layer.", direction: "new" },
      { rank: 4, prev: 4, name: "Tailwind v4", category: "CSS", source: "tailwindlabs", note: "Oxide engine ships; config moves into CSS first-class.", direction: "flat" },
      { rank: 5, prev: 8, name: "Astro 5", category: "Framework", source: "withastro/astro", note: "Server islands and content layer hit general availability.", direction: "up" },
      { rank: 6, prev: 3, name: "Zustand", category: "State", source: "pmndrs/zustand", note: "Loses ground to URL-first state in the App Router era.", direction: "down" },
      { rank: 7, prev: 9, name: "Drizzle ORM", category: "Database", source: "drizzle-team", note: "Edge runtime adapters reach feature parity with Prisma.", direction: "up" },
      { rank: 8, prev: 7, name: "tRPC", category: "API", source: "trpc/trpc", note: "Steady; ceding share to Server Actions in pure-Next stacks.", direction: "flat" },
    ],
  },
  {
    id: "ai",
    title: "AI & Models",
    lede: "What practitioners are actually shipping — not the leaderboard, the import statements.",
    entries: [
      { rank: 1, prev: 1, name: "Claude 4.7 Opus", category: "Model", source: "Anthropic", note: "Continues to dominate long-context refactor workloads.", direction: "flat" },
      { rank: 2, prev: 4, name: "Llama 4", category: "Open Weights", source: "Meta", note: "70B variant overtakes prior closed-source baselines for code.", direction: "up" },
      { rank: 3, prev: 2, name: "Gemini 2.5 Pro", category: "Model", source: "Google DeepMind", note: "Multimodal latency improves; pricing remains the sticking point.", direction: "down" },
      { rank: 4, prev: null, name: "DeepSeek R2", category: "Reasoning", source: "DeepSeek", note: "Open weights debut; strong showing on competitive-math evals.", direction: "new" },
      { rank: 5, prev: 6, name: "Cursor Composer", category: "Agent", source: "Cursor", note: "Multi-file diff edits become the standard expectation.", direction: "up" },
      { rank: 6, prev: 5, name: "GPT-5", category: "Model", source: "OpenAI", note: "Pricing pressure forces tiered routing across the developer plan.", direction: "down" },
      { rank: 7, prev: 7, name: "Qwen3", category: "Open Weights", source: "Alibaba", note: "Quiet adopter favorite for self-hosted multilingual stacks.", direction: "flat" },
    ],
  },
  {
    id: "infra",
    title: "Infrastructure & Platforms",
    lede: "Where money is moving, where teams are migrating, where bills are starting to hurt.",
    entries: [
      { rank: 1, prev: 1, name: "Cloudflare Workers", category: "Edge", source: "Cloudflare", note: "Durable Objects v2 sets a new bar for stateful edge primitives.", direction: "flat" },
      { rank: 2, prev: 3, name: "Neon", category: "Postgres", source: "Neon", note: "Branching workflow now a default in JAMstack templates.", direction: "up" },
      { rank: 3, prev: 2, name: "Supabase", category: "Backend", source: "Supabase", note: "Strong, but no longer the only serious open-source default.", direction: "down" },
      { rank: 4, prev: null, name: "Modal", category: "Compute", source: "Modal Labs", note: "Captures share of GPU-burst workloads from Replicate and Banana.", direction: "new" },
      { rank: 5, prev: 5, name: "Railway", category: "PaaS", source: "Railway", note: "Steady growth; the chosen middle ground between Vercel and bare K8s.", direction: "flat" },
      { rank: 6, prev: 4, name: "Fly.io", category: "Edge", source: "Fly.io", note: "Loses developer mindshare to Workers and Modal in tandem.", direction: "down" },
    ],
  },
];

function DirectionMark({ direction, delta }: { direction: Direction; delta: number | null }) {
  if (direction === "new") {
    return <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent-electric)]">New</span>;
  }
  if (direction === "flat") {
    return <span className="font-mono text-xs text-muted-foreground">—</span>;
  }
  const isUp = direction === "up";
  return (
    <span className={`inline-flex items-baseline gap-1 font-mono text-xs ${isUp ? "text-[var(--chart-3)]" : "text-[var(--destructive)]"}`}>
      <span aria-hidden>{isUp ? "▲" : "▼"}</span>
      {delta !== null && <span className="tabular-nums">{Math.abs(delta)}</span>}
    </span>
  );
}

export default function TrendsPage() {
  return (
    <div className="page-container py-16 md:py-24">
      <header className="mb-16 border-b border-[var(--hairline)] pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          <span>Issue №{ISSUE.number}</span>
          <span>{ISSUE.week}</span>
          <span>{ISSUE.dated}</span>
        </div>
        <h1 className="mt-8 text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl">
          The Index
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A weekly, opinionated ranking of what is actually moving in software, AI, and the developer economy — not what is being announced.
        </p>
        <nav aria-label="Sections" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em]">
          {SECTIONS.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="text-foreground underline-offset-4 hover:underline">
              <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")} /</span> {s.title}
            </a>
          ))}
        </nav>
      </header>

      <div className="flex flex-col gap-24">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <div className="mb-8 grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl">
                {section.title}
              </h2>
              <p className="max-w-xl self-end text-sm leading-relaxed text-muted-foreground md:text-base">
                {section.lede}
              </p>
            </div>

            <ol className="border-t border-foreground">
              {section.entries.map((entry) => {
                const delta = entry.prev !== null ? entry.prev - entry.rank : null;
                return (
                  <li
                    key={`${section.id}-${entry.rank}`}
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-5 gap-y-1 border-b border-[var(--hairline)] py-5 md:grid-cols-[4rem_1fr_8rem_4rem] md:gap-x-8 md:py-6"
                  >
                    <span className="font-mono text-2xl font-bold tabular-nums text-foreground md:text-3xl">
                      {String(entry.rank).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <Link href="#" className="text-lg font-bold tracking-tight text-foreground underline-offset-4 hover:underline md:text-xl">
                          {entry.name}
                        </Link>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {entry.category}
                        </span>
                      </div>
                      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {entry.note}
                      </p>
                    </div>

                    <span className="col-span-2 text-xs text-muted-foreground md:col-span-1 md:justify-self-end md:text-right">
                      <span className="font-mono uppercase tracking-[0.14em]">{entry.source}</span>
                    </span>

                    <span className="col-span-3 justify-self-start md:col-span-1 md:justify-self-end">
                      <DirectionMark direction={entry.direction} delta={delta} />
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>

      <footer className="mt-24 border-t border-foreground pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        End of Index № {ISSUE.number} · Next issue {ISSUE.week === "Week 21" ? "Week 22" : "soon"}
      </footer>
    </div>
  );
}
