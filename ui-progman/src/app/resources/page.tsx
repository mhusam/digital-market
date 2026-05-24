"use client";

import { useState } from "react";
import { Download, FileCode, Figma, Palette, Sparkles, Check, Search } from "lucide-react";
import { toast } from "sonner";

interface ResourceItem {
  id: string;
  title: string;
  category: "templates" | "figma" | "icons" | "presets";
  description: string;
  fileSize: string;
  downloadsCount: number;
  tags: string[];
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const categories = ["all", "templates", "figma", "icons", "presets"];

  const resources: ResourceItem[] = [
    {
      id: "res-1",
      title: "Tailwind CSS v4 Presets Config",
      category: "presets",
      description: "Predefined theme properties containing editorial grids, spring keyframes, and custom fluid design systems.",
      fileSize: "12 KB",
      downloadsCount: 1450,
      tags: ["Tailwind", "CSS v4", "Design Tokens"],
    },
    {
      id: "res-2",
      title: "PROGMAN Figma UI Kit (Beta)",
      category: "figma",
      description: "Full design board layouts, typography grids, desktop landing sheets, and interactive card wireframes.",
      fileSize: "8.4 MB",
      downloadsCount: 890,
      tags: ["Figma", "UI Kit", "Wireframes"],
    },
    {
      id: "res-3",
      title: "Developer Custom SVG Icon Set",
      category: "icons",
      description: "45 custom clean line-vector SVGs covering brackets, terminal shells, server nodes, and database indexes.",
      fileSize: "320 KB",
      downloadsCount: 2100,
      tags: ["SVGs", "Icons", "Vector"],
    },
    {
      id: "res-4",
      title: "Minimal HTML5 Landing Template",
      category: "templates",
      description: "Clean simple static HTML boilerplate featuring retro grids, css variables, and modular structures.",
      fileSize: "45 KB",
      downloadsCount: 650,
      tags: ["HTML5", "Static", "Aesthetic"],
    },
  ];

  const handleDownload = (id: string, name: string) => {
    if (downloadingId) return;

    setDownloadingId(id);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast.success(`Successfully downloaded ${name}!`);
          setTimeout(() => setDownloadingId(null), 800);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === "all" || res.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const getCatIcon = (cat: string) => {
    switch (cat) {
      case "figma":
        return <Figma className="size-4.5 text-[var(--accent-electric)]" />;
      case "icons":
        return <Palette className="size-4.5 text-[var(--accent-violet)]" />;
      default:
        return <FileCode className="size-4.5 text-blue-500" />;
    }
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Free Assets</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Developer Downloads.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Access high-quality design assets, utility presets, vector maps, and simple HTML templates without logging in.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search free resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 rounded-xl border border-border bg-card px-4 pl-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
          />
          <Search className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => {
            const isDownloading = downloadingId === res.id;
            return (
              <div
                key={res.id}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-foreground/15 transition-all duration-300 relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      {getCatIcon(res.category)}
                      {res.category}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">{res.fileSize}</span>
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2 group-hover:text-[var(--accent-electric)] transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md border border-border bg-muted/40 font-mono text-[9px] font-bold text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Downloading Progress Bar */}
                  {isDownloading && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[9px] font-mono font-bold text-[var(--accent-electric)]">
                        <span>DOWNLOADING</span>
                        <span>{downloadProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted border border-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--accent-electric)] transition-all duration-150"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => handleDownload(res.id, res.title)}
                    disabled={isDownloading}
                    className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <Sparkles className="size-4 animate-spin text-[var(--accent-electric)]" />
                        Fetching Files...
                      </>
                    ) : (
                      <>
                        <Download className="size-3.5" />
                        Download Asset
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <p className="text-sm text-muted-foreground">No resources match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
