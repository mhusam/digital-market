"use client";

import { useState } from "react";
import { GLOSSARY_TERMS } from "@/lib/mockData";
import { BookOpen, Search, HelpCircle } from "lucide-react";

export default function TechGlossaryPage() {
  const [searchVal, setSearchVal] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("all");

  const alphabet = ["all", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesLetter =
      selectedLetter === "all" ||
      term.term.toUpperCase().startsWith(selectedLetter);
    const matchesSearch =
      searchVal.trim() === "" ||
      term.term.toLowerCase().includes(searchVal.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchVal.toLowerCase()) ||
      term.detail.toLowerCase().includes(searchVal.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-10 mb-10 gap-6">
        <div>
          <span className="eyebrow text-[var(--accent-electric)] mb-3">Developer Glossary</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Ecosystem Terminology.
          </h1>
          <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
            Quick, plain-English definitions and deep dives into patterns, metrics, and backend concepts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full h-11 rounded-xl border border-border bg-card px-4 pl-11 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all"
          />
          <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
        </div>
      </div>

      {/* Alphabet Index */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-12 border-b border-border pb-6 overflow-x-auto [scrollbar-width:none]">
        {alphabet.map((letter) => {
          const hasTerms = letter === "all" || GLOSSARY_TERMS.some((t) => t.term.toUpperCase().startsWith(letter));
          return (
            <button
              key={letter}
              onClick={() => hasTerms && setSelectedLetter(letter)}
              disabled={!hasTerms}
              className={`size-8 rounded-lg text-xs font-bold transition-all uppercase flex items-center justify-center cursor-pointer select-none border ${
                selectedLetter === letter
                  ? "bg-primary border-primary text-primary-foreground"
                  : hasTerms
                    ? "bg-card border-border hover:border-foreground/20 text-foreground"
                    : "bg-muted/30 border-transparent text-muted-foreground/30 cursor-not-allowed"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Glossary Terms List */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {filteredTerms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <span className="font-bold text-sm text-foreground block mb-2">No terms match</span>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              We couldn&apos;t find any dictionary definitions matching the selected letter or search criteria.
            </p>
          </div>
        ) : (
          filteredTerms.map((term) => (
            <div key={term.id} className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-md bg-muted flex items-center justify-center text-[var(--accent-electric)]">
                    <BookOpen className="size-3.5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{term.term}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted/50 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                  {term.category}
                </span>
              </div>
              
              <p className="text-xs font-semibold text-foreground leading-relaxed mb-4">
                {term.definition}
              </p>

              <div className="rounded-xl bg-muted/30 border border-border p-4 text-xs text-muted-foreground leading-relaxed flex gap-3">
                <HelpCircle className="size-4.5 text-muted-foreground/60 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block mb-1">Deep Dive Overview</span>
                  {term.detail}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
