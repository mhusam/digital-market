"use client";

import { useState } from "react";
import { TECH_STACKS } from "@/lib/mockData";
import { Layers, Terminal, Copy, Check, GitFork, Server, Database, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function TechStacksPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getComponentIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("db") || n.includes("postgres") || n.includes("sql")) return <Database className="size-4 text-emerald-500" />;
    if (n.includes("spring") || n.includes("backend") || n.includes("server")) return <Server className="size-4 text-orange-500" />;
    if (n.includes("auth") || n.includes("stripe") || n.includes("checkout")) return <ShieldCheck className="size-4 text-amber-500" />;
    return <Layers className="size-4 text-violet-500" />;
  };

  const handleCopyCommand = (id: string, name: string) => {
    const command = `npx progman create-stack --template ${id}`;
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    toast.success(`Initialization command for ${name} copied!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Architectures</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Production Tech Stacks.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Explore validated multi-tier starter kits. Designed for modular security, containerization, and rapid deployment.
        </p>
      </div>

      {/* Stacks List */}
      <div className="space-y-12">
        {TECH_STACKS.map((stack) => {
          const cliCommand = `npx progman create-stack --template ${stack.id}`;
          return (
            <div
              key={stack.id}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-foreground/15 transition-all duration-300 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Info and Components */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">Blueprint {stack.id}</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">{stack.title}</h2>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {stack.description}
                    </p>
                  </div>

                  {/* Components breakdown */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Service Layers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {stack.components.map((comp, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl border border-border bg-muted/30"
                        >
                          <div className="mt-0.5">{getComponentIcon(comp.name)}</div>
                          <div>
                            <span className="font-semibold text-xs text-foreground block">{comp.name}</span>
                            <span className="text-[10px] text-muted-foreground block mt-0.5 leading-relaxed">{comp.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CLI installer bar */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick Setup CLI</h3>
                    <div className="flex items-center gap-2 border border-border rounded-xl bg-muted p-2 pl-4">
                      <Terminal className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="flex-1 font-mono text-[11px] text-foreground font-semibold select-all overflow-x-auto whitespace-nowrap">
                        {cliCommand}
                      </div>
                      <button
                        onClick={() => handleCopyCommand(stack.id, stack.title)}
                        className="h-8 px-3 rounded-lg bg-card border border-border hover:bg-muted font-bold text-[10px] uppercase tracking-wider text-foreground flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        {copiedId === stack.id ? (
                          <>
                            <Check className="size-3 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 text-muted-foreground" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Interactive diagram box */}
                <div className="lg:col-span-2 flex flex-col justify-between border border-border bg-muted/40 rounded-xl p-6 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--accent-electric)]/5 to-[var(--accent-violet)]/5 blur-2xl pointer-events-none" />

                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block flex items-center gap-1">
                      <GitFork className="size-3" />
                      Architecture Flow
                    </span>

                    {/* Nodes flow visualizer */}
                    <div className="relative pl-4 border-l-2 border-dashed border-border/80 py-2 space-y-6">
                      {stack.diagramData.split("->").map((node, index) => (
                        <div key={index} className="relative">
                          {/* Bullet dot */}
                          <div className="absolute -left-[21px] top-1.5 size-2.5 rounded-full bg-border border-2 border-card" />
                          <div className="font-mono text-xs font-bold text-foreground">
                            {node.trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[10px] text-muted-foreground/60 leading-normal border-t border-border pt-4 mt-6">
                    * Diagrams generated from project facade bindings. Run setup commands in standard workspace contexts.
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
