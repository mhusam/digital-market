"use client";

import { useState } from "react";

interface TechStackItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  technologies: { category: string; names: string[] }[];
  useCase: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  proTip: string;
}

const STACKS_DATA: TechStackItem[] = [
  {
    id: "indie-hacker",
    name: "Indie Hacker Stack",
    badge: "Fast shipping",
    description:
      "For single developers chasing rapid prototype velocity, minimal ops, and serverless scaling that bills like a coffee.",
    technologies: [
      { category: "Frontend", names: ["Next.js (App Router)", "Tailwind CSS", "Lucide Icons"] },
      { category: "Backend", names: ["Next.js Route Handlers", "Auth.js"] },
      { category: "Database", names: ["Supabase (PostgreSQL)", "Prisma ORM"] },
      { category: "Payments", names: ["Stripe Checkout + Webhook"] },
    ],
    useCase: "MVPs, micro-SaaS, newsletters, portfolios, weekend side projects.",
    difficulty: "Beginner",
    proTip:
      "Deploy the Next.js app to Vercel and front Postgres with a pooler — the connection-per-invocation model bites the moment traffic spikes.",
  },
  {
    id: "ai-startup",
    name: "AI Startup Boilerplate",
    badge: "Cognitive focus",
    description:
      "For AI-first products with streaming inference, embedding queries, and a queue holding the long jobs out of the request path.",
    technologies: [
      { category: "Frontend", names: ["Next.js 16 (React 19)", "Framer Motion", "SWR"] },
      { category: "Backend", names: ["FastAPI (Python)", "Celery", "Redis"] },
      { category: "AI & DB", names: ["OpenAI / Claude SDK", "Pinecone", "PostgreSQL"] },
    ],
    useCase: "AI writing tools, intelligent canvases, chat assistants, internal analysis tooling.",
    difficulty: "Intermediate",
    proTip:
      "Keep the streaming endpoints on FastAPI — its async runtime handles long-lived SSE and WebSocket connections more cleanly than server actions.",
  },
  {
    id: "enterprise-monolith",
    name: "Robust Monolith Architecture",
    badge: "Heavy enterprise",
    description:
      "For scaling businesses that need transactional safety, strict domain boundaries, and an audit trail that survives the next compliance review.",
    technologies: [
      { category: "Frontend", names: ["Next.js BFF client", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", names: ["Spring Boot 3.4 (Java 21)", "Spring Security", "Spring Modulith"] },
      { category: "Database", names: ["PostgreSQL + Flyway", "Hibernate JPA"] },
      { category: "Payments", names: ["PayPal API SDK"] },
    ],
    useCase: "E-commerce, fintech, booking engines, secure customer accounts.",
    difficulty: "Advanced",
    proTip:
      "Expose Spring strictly via the Next.js BFF proxy. Keep tokens in HttpOnly cookies and never let the browser see a raw backend URL.",
  },
];

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"] as const;

export default function TechStacksPage() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<(typeof DIFFICULTIES)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const query = searchTerm.trim().toLowerCase();
  const filteredStacks = STACKS_DATA.filter((stack) => {
    const matchesDifficulty =
      selectedDifficulty === "All" || stack.difficulty === selectedDifficulty;
    const matchesSearch =
      query === "" ||
      stack.name.toLowerCase().includes(query) ||
      stack.description.toLowerCase().includes(query) ||
      stack.technologies.some((tech) =>
        tech.names.some((n) => n.toLowerCase().includes(query)),
      );
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="page-container py-12 md:py-16">
      <header className="border-y border-foreground py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Reference</span>
          <span className="text-foreground">Architectures · 2026</span>
          <span>Curated weekly</span>
        </div>
        <h1 className="mt-6 text-center text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl">
          Tech Stacks
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          A short, edited set of reference architectures matched to project scope. Pick one, skip the bikeshedding, get to the work.
        </p>
      </header>

      <nav className="my-8 flex flex-col gap-4 border-b border-[var(--hairline)] pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="mr-2 text-muted-foreground">Level</span>
          {DIFFICULTIES.map((diff) => {
            const active = selectedDifficulty === diff;
            return (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={
                  active
                    ? "rounded-full bg-foreground px-3 py-1 text-background"
                    : "rounded-full border border-[var(--hairline)] px-3 py-1 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                }
              >
                {diff}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-3 border-b border-[var(--hairline)] pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:w-72">
          <span aria-hidden="true">/</span>
          <input
            type="text"
            placeholder="Search stacks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm font-normal normal-case tracking-normal text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </label>
      </nav>

      <main>
        {filteredStacks.length === 0 ? (
          <p className="border-y border-[var(--hairline)] py-16 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            No stacks match this filter.
          </p>
        ) : (
          <ul className="flex flex-col">
            {filteredStacks.map((stack, idx) => (
              <li
                key={stack.id}
                className="border-b border-[var(--hairline)] last:border-b-0"
              >
                <article className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-6 py-10 md:grid-cols-[80px_1fr] md:gap-x-10">
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      No.
                    </span>
                    <span className="mt-1 text-5xl font-extrabold leading-none tracking-tight text-foreground md:text-6xl">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
                      {stack.difficulty}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {stack.badge}
                    </div>
                    <h2 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-foreground md:text-3xl">
                      {stack.name}
                    </h2>
                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
                      {stack.description}
                    </p>

                    <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-4 border-t border-[var(--hairline)] pt-6 sm:grid-cols-2 lg:grid-cols-4">
                      {stack.technologies.map((tech) => (
                        <div key={tech.category}>
                          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                            {tech.category}
                          </dt>
                          <dd className="mt-2">
                            <ul className="flex flex-col gap-1 text-sm leading-snug text-foreground">
                              {tech.names.map((name) => (
                                <li key={name}>{name}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 grid gap-6 border-t border-[var(--hairline)] pt-6 md:grid-cols-2">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          Use case
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-foreground">
                          {stack.useCase}
                        </p>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent-electric)]">
                          Pro tip
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-foreground">
                          {stack.proTip}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t border-foreground pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>
          End of list · {filteredStacks.length} of {STACKS_DATA.length} shown
        </span>
        <span>Next refresh · Monday 06:00 ET</span>
      </footer>
    </div>
  );
}
