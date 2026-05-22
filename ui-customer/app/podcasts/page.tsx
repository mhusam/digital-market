"use client";

import { useState } from "react";
import { Podcast, Search, Play, Calendar, Clock, ExternalLink, Headphones } from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  title: string;
  show: string;
  host: string;
  duration: string;
  date: string;
  category: "Podcast" | "Video Guide" | "Interview";
  description: string;
  link: string;
}

const MEDIA_DATA: MediaItem[] = [
  {
    id: "m1",
    title: "Deep Dive into React Server Components & Streaming",
    show: "Syntax.fm - Web Development Podcast",
    host: "Wes Bos & Scott Tolinski",
    duration: "48 min",
    date: "2026-05-12",
    category: "Podcast",
    description: "An in-depth conversation discussing React 19's render execution lifecycles, streaming payloads directly over edge compute, and rendering server vs client actions.",
    link: "#"
  },
  {
    id: "m2",
    title: "Mastering Next.js 16 Workspace Configuration",
    show: "PROGMAN Technical Guides",
    host: "Scout Technical Lead",
    duration: "24 min",
    date: "2026-04-30",
    category: "Video Guide",
    description: "A complete step-by-step walkthrough explaining Next.js 16 app layout conventions, server actions, and proxy configurations in a monorepo workspace environment.",
    link: "#"
  },
  {
    id: "m3",
    title: "Building Resilient Monoliths with Spring Modulith",
    show: "Software Engineering Daily",
    host: "Jeff Meyerson",
    duration: "56 min",
    date: "2026-05-15",
    category: "Podcast",
    description: "Discussing how Modulith provides compile-time encapsulation verification, boundary check strategies, and why it forms an ideal springboard before scaling to microservices.",
    link: "#"
  },
  {
    id: "m4",
    title: "Inside the Google DeepMind Advanced Agentic Coding Team",
    show: "AI Research Podcast",
    host: "Rachel Green",
    duration: "1 hr 12 min",
    date: "2026-05-20",
    category: "Interview",
    description: "A comprehensive interview highlighting autonomous developer workflows, code testing environments, and design architectures of state-of-the-art coding agents.",
    link: "#"
  }
];

const CATEGORIES = ["All", "Podcast", "Video Guide", "Interview"];

export default function PodcastsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handlePlayMock = (title: string) => {
    toast.info(`Streaming requested for: "${title}". Redirecting...`);
  };

  const filteredMedia = MEDIA_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.show.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Banner Curated by Agent */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-full bg-gradient-to-r from-red-500 via-rose-500 to-indigo-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-6">
            <Podcast className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm font-medium tracking-wide">Curated by PROGMAN Media Agent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
            Podcasts & Technical Media
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            A curated stream of podcast episodes, design guidelines, video tutorials, and technical interviews.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-border">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                    : "bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search episodes, shows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm"
            />
          </div>
        </div>

        {/* Media Feed */}
        <div className="flex flex-col gap-8">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl border border-border bg-card/40 backdrop-blur-md p-6 hover:border-red-500/20 transition-all duration-300 flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-light">&bull; {item.show}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mt-2 max-w-3xl">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground font-light">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.duration}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{item.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto self-stretch md:self-center justify-end">
                <button
                  onClick={() => handlePlayMock(item.title)}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all text-sm shadow-lg shadow-red-500/10"
                >
                  <Play className="w-4 h-4 fill-white" />
                  Play Now
                </button>
                <a
                  href={item.link}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-2xl bg-card border border-border hover:bg-muted text-foreground font-bold transition-all text-sm"
                >
                  Details
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}

          {filteredMedia.length === 0 && (
            <div className="text-center py-16 text-muted-foreground font-light">
              No media items found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
