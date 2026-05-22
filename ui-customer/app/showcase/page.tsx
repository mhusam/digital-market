"use client";

import { useState } from "react";
import { Compass, ExternalLink, Flame, Search, Sparkles } from "lucide-react";

interface ShowcaseItem {
  id: string;
  title: string;
  creator: string;
  description: string;
  category: string;
  techStack: string[];
  imageUrl: string;
  demoUrl: string;
  likes: number;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "zenith",
    title: "Zenith CRM",
    creator: "Sarah Jenkins",
    description: "A AI-driven customer relationship platform managing client outreach, automatic sentiment analysis, and smart task scheduling.",
    category: "SaaS",
    techStack: ["Next.js", "Spring Boot", "PostgreSQL", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    demoUrl: "#",
    likes: 142,
  },
  {
    id: "codflow",
    title: "CodeFlow IDE",
    creator: "David Chen",
    description: "An online visual programming workspace designed to allow junior devs to construct workflows using drag-and-drop elements.",
    category: "Developer Tool",
    techStack: ["React", "TypeScript", "Tailwind CSS", "WebAssembly"],
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
    demoUrl: "#",
    likes: 98,
  },
  {
    id: "neuro-art",
    title: "NeuroArt Studio",
    creator: "Elena Rostova",
    description: "An AI co-creation canvas generating high-resolution digital paintings and architectural structures with custom prompt inputs.",
    category: "AI Tool",
    techStack: ["Next.js", "Python", "FastAPI", "Stable Diffusion"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    demoUrl: "#",
    likes: 211,
  },
  {
    id: "swiftshop",
    title: "SwiftShop Checkout",
    creator: "Marcus Aurelius",
    description: "Ultra-fast headless commerce template designed for speed and optimized conversion rates using edge caching.",
    category: "E-Commerce",
    techStack: ["Next.js 15", "GraphQL", "Shopify API", "Sleek CSS"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    demoUrl: "#",
    likes: 85,
  },
  {
    id: "pulse-analytics",
    title: "Pulse Analytics",
    creator: "Alex Rivera",
    description: "Minimalist serverless dashboard that displays operational key-performance indicators, active traffic counts, and network events.",
    category: "SaaS",
    techStack: ["React 19", "Node.js", "Redis", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
    demoUrl: "#",
    likes: 120,
  },
  {
    id: "dev-match",
    title: "DevMatch Portal",
    creator: "TechJobs Co.",
    description: "Peer-to-peer matchmaking system for contract developers looking for remote web projects based on verified skill tests.",
    category: "Platform",
    techStack: ["Spring Boot", "React", "PostgreSQL", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    demoUrl: "#",
    likes: 156,
  },
];

const CATEGORIES = ["All", "SaaS", "Developer Tool", "AI Tool", "E-Commerce", "Platform"];

export default function ShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    if (voted[id]) return;
    setLikesState((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setVoted((prev) => ({ ...prev, [id]: true }));
  };

  const filteredItems = SHOWCASE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.techStack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Curated by Agent */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-full bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-6">
            <Compass className="w-5 h-5 text-pink-500 mr-2" />
            <span className="text-sm font-medium tracking-wide">Curated by PROGMAN Scout Agent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
            Project Showcase
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            An inspiring gallery highlighting innovative apps, platforms, and templates built by developers using PROGMAN resources.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-border">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                    : "bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-sm"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const currentLikes = item.likes + (likesState[item.id] || 0);
            const hasVoted = voted[item.id];
            
            return (
              <div
                key={item.id}
                className="group rounded-3xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden flex flex-col hover:border-pink-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/5"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-bold bg-pink-500/90 px-2 py-1 rounded">
                      Demo Live
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">{item.category}</span>
                      <span className="text-xs text-muted-foreground font-light">by {item.creator}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-light mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-border/50">
                      <button
                        onClick={() => handleLike(item.id)}
                        disabled={hasVoted}
                        className={`flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg border transition-all ${
                          hasVoted
                            ? "bg-pink-500/10 text-pink-400 border-pink-500/30"
                            : "bg-background hover:bg-muted border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Flame className={`w-3.5 h-3.5 ${hasVoted ? "fill-pink-500 text-pink-500 animate-pulse" : ""}`} />
                        <span>{currentLikes}</span>
                      </button>

                      <a
                        href={item.demoUrl}
                        className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-pink-400 transition-colors"
                      >
                        Visit Project
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground font-light">
              No showcase entries found matching your query.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
