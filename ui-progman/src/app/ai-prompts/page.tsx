"use client";

import { useState } from "react";
import { AI_PROMPTS } from "@/lib/mockData";
import { Sparkles, Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function AiPromptsPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["all", "agents", "skills", "images", "code"];

  const filteredPrompts = selectedCat === "all"
    ? AI_PROMPTS
    : AI_PROMPTS.filter((p) => p.category === selectedCat);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Prompt copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">AI Prompts Hub</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Curated AI instruction sets.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Stunning copy-paste engineering templates for coding agents, image models, and system automation tasks.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`h-9 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
              selectedCat === cat
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-card border-border hover:border-foreground/20 text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPrompts.map((pmp) => (
          <div
            key={pmp.id}
            className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-foreground/20 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {pmp.category}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">{pmp.id}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="size-4.5 text-[var(--accent-electric)]" />
                {pmp.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {pmp.description}
              </p>

              {/* Prompt Block */}
              <div className="relative rounded-xl border border-border bg-muted/50 p-4 mb-4 font-mono text-[11px] leading-5 text-foreground/90 whitespace-pre-wrap select-all">
                {pmp.prompt}
              </div>

              {/* Variables */}
              {pmp.variables.length > 0 && (
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Variables</span>
                  <div className="grid grid-cols-1 gap-2">
                    {pmp.variables.map((v, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] border border-border rounded-lg bg-card px-2.5 py-1.5">
                        <span className="font-mono font-bold text-foreground">{v.name}:</span>
                        <span className="text-muted-foreground">{v.description} (e.g. &quot;{v.placeholder}&quot;)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleCopy(pmp.id, pmp.prompt)}
              className="mt-4 w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer"
            >
              {copiedId === pmp.id ? (
                <>
                  <Check className="size-3.5" />
                  Copied Prompt!
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  Copy Instruction
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
