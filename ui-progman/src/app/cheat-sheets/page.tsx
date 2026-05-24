"use client";

import { useState } from "react";
import { CHEAT_SHEETS } from "@/lib/mockData";
import { FileCode, Search, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CheatSheetsPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchVal, setSearchVal] = useState("");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const categories = ["all", "Next.js", "Tailwind CSS", "Postgres"];

  const filteredSheets = CHEAT_SHEETS.filter((sheet) => {
    const matchesCat = selectedCat === "all" || sheet.category === selectedCat;
    const matchesSearch =
      searchVal.trim() === "" ||
      sheet.title.toLowerCase().includes(searchVal.toLowerCase()) ||
      sheet.commands.some(
        (c) =>
          c.cmd.toLowerCase().includes(searchVal.toLowerCase()) ||
          c.desc.toLowerCase().includes(searchVal.toLowerCase())
      );
    return matchesCat && matchesSearch;
  });

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    toast.success("Command copied to clipboard");
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-10 mb-10 gap-6">
        <div>
          <span className="eyebrow text-[var(--accent-electric)] mb-3">Syntax & Commands</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Developer Cheat Sheets.
          </h1>
          <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
            Copy-paste configurations, commands, and routing structures for Next.js, Tailwind v4, and Postgres.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search commands..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full h-11 rounded-xl border border-border bg-card px-4 pl-11 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all"
          />
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`h-9 px-4 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              selectedCat === cat
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-card border-border hover:border-foreground/20 text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8">
        {filteredSheets.map((sheet) => (
          <div key={sheet.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-[var(--accent-electric)]">
                <FileCode className="size-4.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{sheet.title}</h3>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{sheet.category}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mb-6">{sheet.description}</p>

            <div className="space-y-4">
              {sheet.commands.map((cmd, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-muted/30">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-foreground mb-1">{cmd.desc}</p>
                    <code className="block font-mono text-[10.5px] text-[var(--accent-electric)] select-all truncate leading-relaxed">
                      {cmd.cmd}
                    </code>
                  </div>
                  <button
                    onClick={() => handleCopy(cmd.cmd)}
                    className="shrink-0 h-9 px-4 rounded-lg border border-border hover:border-foreground/20 bg-card text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    {copiedCmd === cmd.cmd ? (
                      <>
                        <Check className="size-3.5 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
