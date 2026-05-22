"use client";

import { useState } from "react";
import { MessageSquare, Search, Flame, Share2, ExternalLink, ArrowUp } from "lucide-react";

interface PulseItem {
  id: string;
  source: "Hacker News" | "Reddit" | "Twitter";
  title: string;
  author: string;
  engagement: string;
  summary: string;
  link: string;
  commentsCount: number;
}

const PULSE_DATA: PulseItem[] = [
  {
    id: "p1",
    source: "Hacker News",
    title: "Show HN: Spring Modulith 1.0 – Monoliths done right?",
    author: "johndoe",
    engagement: "412 points",
    summary: "A heated debate on whether Monoliths with enforced boundaries are preferable over early microservice transitions. Key consensus: Yes, encapsulation at code levels saves massive infrastructure overhead in early startup phases.",
    link: "#",
    commentsCount: 184
  },
  {
    id: "p2",
    source: "Reddit",
    title: "r/webdev - Are React Server Components finally ready for production?",
    author: "frontend_ninja",
    engagement: "1.2k upvotes",
    summary: "Developers share their deployment metrics. RSC shows up to 40% reduction in client-side bundle sizes. However, hosting dependencies and initial setup latency on serverless environments remain a common developer pain point.",
    link: "#",
    commentsCount: 290
  },
  {
    id: "p3",
    source: "Twitter",
    title: "Is Tailwind v4 CSS variable-first approach a game changer?",
    author: "@css_wizard",
    engagement: "842 retweets",
    summary: "Tailwind CSS v4's deprecation of JS config files in favor of native CSS custom properties is getting massive praise. Developers cite faster tooling speeds and simpler integrations with standard theme tokens.",
    link: "#",
    commentsCount: 92
  },
  {
    id: "p4",
    source: "Hacker News",
    title: "Ask HN: What is your database stack for MVPs in 2026?",
    author: "techfounder",
    engagement: "320 points",
    summary: "PostgreSQL continues to dominate, specifically combined with edge-caching frameworks or hosted instances like Supabase. SQLite is becoming highly popular for single-container architectures.",
    link: "#",
    commentsCount: 145
  }
];

const SOURCES = ["All", "Hacker News", "Reddit", "Twitter"];

export default function CommunityPage() {
  const [selectedSource, setSelectedSource] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const getSourceStyle = (source: string) => {
    switch (source) {
      case "Hacker News":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Reddit":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Twitter":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const filteredPulse = PULSE_DATA.filter((item) => {
    const matchesSource = selectedSource === "All" || item.source === selectedSource;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSource && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Banner Curated by Agent */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-6">
            <MessageSquare className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium tracking-wide">Curated by PROGMAN Social Agent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
            Community Pulse
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Real-time discussion summaries, developer trends, and popular debate threads compiled from Hacker News, Reddit, and Twitter.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-border">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {SOURCES.map((src) => (
              <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedSource === src
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search community updates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            />
          </div>
        </div>

        {/* Discussions List */}
        <div className="flex flex-col gap-6">
          {filteredPulse.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl border border-border bg-card/40 backdrop-blur-md p-6 hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${getSourceStyle(item.source)}`}>
                      {item.source}
                    </span>
                    <span className="text-xs text-muted-foreground font-light">Posted by {item.author}</span>
                  </div>

                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <ArrowUp className="w-3.5 h-3.5 text-blue-500" /> {item.engagement}
                  </span>
                </div>

                <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors duration-300 leading-snug mb-3">
                  {item.title}
                </h3>

                <div className="p-4 rounded-2xl bg-background border border-border/80 text-sm text-muted-foreground leading-relaxed font-light mb-4">
                  <strong className="text-foreground block mb-1">AI Curation Summary:</strong>
                  {item.summary}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border/40">
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {item.commentsCount} comments
                </span>

                <a
                  href={item.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-blue-400 transition-colors"
                >
                  Join Discussion
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}

          {filteredPulse.length === 0 && (
            <div className="text-center py-16 text-muted-foreground font-light">
              No community discussions found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
