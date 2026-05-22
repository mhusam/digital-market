"use client";

import { useState } from "react";

interface RepoItem {
  id: string;
  name: string;
  owner: string;
  stars: string;
  forks: string;
  language: "TypeScript" | "Java" | "JavaScript" | "Python" | "Go";
  description: string;
  license: string;
  url: string;
}

const REPOS_DATA: RepoItem[] = [
  {
    id: "r1",
    name: "react",
    owner: "facebook",
    stars: "221k",
    forks: "45.2k",
    language: "JavaScript",
    description: "The library for web and native user interfaces. The core layout primitive powering modern reactive DOM rendering.",
    license: "MIT",
    url: "https://github.com/facebook/react",
  },
  {
    id: "r2",
    name: "spring-boot",
    owner: "spring-projects",
    stars: "71.4k",
    forks: "39.6k",
    language: "Java",
    description: "Stand-alone, production-grade Spring-based applications that you can 'just run'. The default for new JVM services.",
    license: "Apache-2.0",
    url: "https://github.com/spring-projects/spring-boot",
  },
  {
    id: "r3",
    name: "next.js",
    owner: "vercel",
    stars: "118k",
    forks: "26.1k",
    language: "TypeScript",
    description: "The React framework for the web. Partial prerendering, the compiler, and a migration guide that finally fits on one page.",
    license: "MIT",
    url: "https://github.com/vercel/next.js",
  },
  {
    id: "r4",
    name: "fastapi",
    owner: "tiangolo",
    stars: "68.2k",
    forks: "5.8k",
    language: "Python",
    description: "High-performance, easy-to-learn Python web framework with type-driven validation and automatic OpenAPI generation.",
    license: "MIT",
    url: "https://github.com/tiangolo/fastapi",
  },
  {
    id: "r5",
    name: "gin",
    owner: "gin-gonic",
    stars: "74.8k",
    forks: "7.9k",
    language: "Go",
    description: "Fast HTTP web framework written in Go. Martini-like API, significantly better throughput, minimal allocations on the hot path.",
    license: "MIT",
    url: "https://github.com/gin-gonic/gin",
  },
];

const LANGUAGES = ["All", "TypeScript", "Java", "JavaScript", "Python", "Go"] as const;

export default function OpenSourcePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<(typeof LANGUAGES)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const query = searchTerm.trim().toLowerCase();
  const filteredRepos = REPOS_DATA.filter((repo) => {
    const matchesLanguage = selectedLanguage === "All" || repo.language === selectedLanguage;
    const matchesSearch =
      query === "" ||
      repo.name.toLowerCase().includes(query) ||
      repo.owner.toLowerCase().includes(query) ||
      repo.description.toLowerCase().includes(query);
    return matchesLanguage && matchesSearch;
  });

  return (
    <div className="page-container py-12 md:py-16">
      <header className="border-y border-foreground py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Index</span>
          <span className="text-foreground">Open Source · 2026</span>
          <span>Curated weekly</span>
        </div>
        <h1 className="mt-6 text-center text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl">
          Open Source
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
          A short, edited list of repositories worth borrowing from. Read the source, steal the patterns, ship the work.
        </p>
      </header>

      <nav className="my-8 flex flex-col gap-4 border-b border-[var(--hairline)] pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="mr-2 text-muted-foreground">Language</span>
          {LANGUAGES.map((lang) => {
            const active = selectedLanguage === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLanguage(lang)}
                className={
                  active
                    ? "rounded-full bg-foreground px-3 py-1 text-background"
                    : "rounded-full border border-[var(--hairline)] px-3 py-1 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                }
              >
                {lang}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-3 border-b border-[var(--hairline)] pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:w-72">
          <span aria-hidden="true">/</span>
          <input
            type="text"
            placeholder="Search repos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm font-normal normal-case tracking-normal text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </label>
      </nav>

      <main>
        {filteredRepos.length === 0 ? (
          <p className="border-y border-[var(--hairline)] py-16 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            No repositories match this filter.
          </p>
        ) : (
          <ul className="flex flex-col">
            {filteredRepos.map((repo, idx) => (
              <li
                key={repo.id}
                className="border-b border-[var(--hairline)] last:border-b-0"
              >
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-8 md:grid-cols-[80px_1fr_auto] md:gap-x-10"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      No.
                    </span>
                    <span className="mt-1 text-5xl font-extrabold leading-none tracking-tight text-foreground md:text-6xl">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {repo.owner}
                    </div>
                    <h2 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-foreground underline-offset-4 group-hover:underline md:text-3xl">
                      {repo.name}
                    </h2>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
                      {repo.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      <span className="text-foreground">{repo.language}</span>
                      <span>·</span>
                      <span>{repo.license}</span>
                      <span>·</span>
                      <span>{repo.stars} stars</span>
                      <span>·</span>
                      <span>{repo.forks} forks</span>
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1 md:self-center">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground underline-offset-4 group-hover:underline">
                      GitHub
                      <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t border-foreground pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>End of list · {filteredRepos.length} of {REPOS_DATA.length} shown</span>
        <span>Next refresh · Monday 06:00 ET</span>
      </footer>
    </div>
  );
}
