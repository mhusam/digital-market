"use client";

import { useState } from "react";
import { OS_REPOS } from "@/lib/mockData";
import { Github, Star, GitFork, ExternalLink, Code, Heart, Search } from "lucide-react";
import { toast } from "sonner";

export default function OpenSourcePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [starredRepos, setStarredRepos] = useState<string[]>([]);

  const handleStar = (id: string, name: string) => {
    if (starredRepos.includes(id)) {
      setStarredRepos(starredRepos.filter((r) => r !== id));
      toast.success(`Unstarred ${name}`);
    } else {
      setStarredRepos([...starredRepos, id]);
      toast.success(`Starred ${name} on GitHub!`);
    }
  };

  const filteredRepos = OS_REPOS.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Open Source Hub</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Community Repositories.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Explore and contribute to our official libraries, plugins, integrations, and command-line tools.
        </p>
      </div>

      {/* Controls */}
      <div className="relative mb-10 max-w-md">
        <input
          type="text"
          placeholder="Search repositories or languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 rounded-xl border border-border bg-card px-4 pl-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
        />
        <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => {
            const isStarred = starredRepos.includes(repo.id);
            return (
              <div
                key={repo.id}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-foreground/15 transition-all duration-300 relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                      {repo.language}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">MIT License</span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2 group-hover:text-[var(--accent-electric)] transition-colors">
                    <Github className="size-5 shrink-0" />
                    {repo.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 mt-6">
                  {/* GitHub details */}
                  <div className="flex gap-4 text-xs font-mono font-bold text-muted-foreground">
                    <button
                      onClick={() => handleStar(repo.id, repo.name)}
                      className={`flex items-center gap-1.5 hover:text-[var(--accent-electric)] transition-colors cursor-pointer ${
                        isStarred ? "text-[var(--accent-electric)]" : ""
                      }`}
                    >
                      <Star className={`size-4 ${isStarred ? "fill-[var(--accent-electric)]" : ""}`} />
                      {repo.stars + (isStarred ? 1 : 0)}
                    </button>
                    <span className="flex items-center gap-1.5">
                      <GitFork className="size-4" />
                      {repo.forks}
                    </span>
                  </div>

                  {/* Open GitHub Link */}
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer"
                  >
                    View Code
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <p className="text-sm text-muted-foreground">No repositories match your criteria.</p>
          </div>
        )}
      </div>

      {/* Contribution Rules Section */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--accent-electric)]/5 to-[var(--accent-violet)]/5 blur-3xl pointer-events-none" />

        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Code className="size-5 text-[var(--accent-electric)]" />
          Contribution Playbook
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-muted-foreground">
          <div className="space-y-2">
            <span className="font-bold text-foreground block">1. File Issues</span>
            <p>Report bugs or performance leaks using standard templated forms inside GitHub issues trackers.</p>
          </div>
          <div className="space-y-2">
            <span className="font-bold text-foreground block">2. Branch Rules</span>
            <p>Always create branches prefixed with type (e.g. `feat/`, `fix/`, `docs/`) starting from `main`.</p>
          </div>
          <div className="space-y-2">
            <span className="font-bold text-foreground block">3. Code Lints</span>
            <p>Verify clean typescript checks and prettier styles using command loops prior to submitting PR approvals.</p>
          </div>
        </div>

        <div className="border-t border-border pt-6 mt-8 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
            <Heart className="size-3.5 text-red-500 fill-red-500" />
            Thank you to our 42+ active open source contributors!
          </span>
        </div>
      </div>
    </div>
  );
}
