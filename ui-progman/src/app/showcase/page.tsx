"use client";

import { useState } from "react";
import { SHOWCASE_ITEMS } from "@/lib/mockData";
import { Star, Compass, Plus, Github, ExternalLink, MessageSquare, Heart } from "lucide-react";
import { toast } from "sonner";

export default function ShowcasePage() {
  const [items, setItems] = useState(SHOWCASE_ITEMS);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  
  // Submit Form States
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newStack, setNewStack] = useState("");

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    toast.success("Project upvoted");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newUrl || !newAuthor) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newItem = {
      id: `shw-custom-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
      url: newUrl,
      author: newAuthor,
      stars: 1,
      techStack: newStack.split(",").map((s) => s.trim()).filter(Boolean),
    };
    setItems([newItem, ...items]);
    setIsSubmitOpen(false);
    
    // Clear states
    setNewTitle("");
    setNewDesc("");
    setNewUrl("");
    setNewAuthor("");
    setNewStack("");
    toast.success("Project submitted successfully! It is now live in the showcase.");
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-10 mb-10 gap-6">
        <div>
          <span className="eyebrow text-[var(--accent-electric)] mb-3">Project Showcase</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Built with PROGMAN.
          </h1>
          <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
            Discover websites, SaaS products, dashboards, and developer extensions created by community builders.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitOpen(true)}
          className="h-11 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer shadow-sm"
        >
          <Plus className="size-4" />
          Submit Project
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-foreground/20"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-muted border-b border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="object-cover size-full group-hover:scale-101 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <span className="text-[10px] font-bold text-muted-foreground">By {item.author}</span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-500">
                    <Star className="size-3.5 fill-current" />
                    <span className="font-bold text-foreground">{item.stars + (likes[item.id] || 0)}</span>
                  </div>
                </div>
                
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-[var(--accent-electric)] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 rounded-full border border-border bg-muted/40 text-[9px] font-bold text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4 flex items-center justify-between gap-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="size-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="size-3" />
                </a>

                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="h-8 px-3 rounded-lg border border-border bg-card text-foreground font-semibold text-[11px] hover:bg-muted transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Heart className="size-3.5 fill-rose-500/10 text-rose-500" />
                  <span>Upvote</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Drawer Modal Overlay */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg animate-scale-up relative">
            <h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
              <Compass className="size-5 text-[var(--accent-electric)]" />
              Submit Your Creation
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Showcase what you constructed with our layout packages or code templates.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Acme SaaS Platform"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-card text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Description *</label>
                <textarea
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain how you used our code or styles..."
                  rows={3}
                  className="w-full p-3 rounded-lg border border-border bg-card text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Author Name *</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-card text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">URL (Git or Site) *</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full h-10 px-3 rounded-lg border border-border bg-card text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={newStack}
                  onChange={(e) => setNewStack(e.target.value)}
                  placeholder="Next.js, Supabase, Tailwind"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-card text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitOpen(false)}
                  className="flex-1 h-10 rounded-lg border border-border bg-card hover:bg-muted font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/95 cursor-pointer"
                >
                  Post Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
