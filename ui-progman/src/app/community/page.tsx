"use client";

import { useState } from "react";
import { COMMUNITY_THREADS, CommunityThread } from "@/lib/mockData";
import { MessageSquare, Eye, Clock, Plus, Filter, MessageCircleCode, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function CommunityPage() {
  const [threads, setThreads] = useState<CommunityThread[]>(COMMUNITY_THREADS);
  const [selectedCat, setSelectedCat] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"General" | "Q&A" | "Showcase" | "Idea">("General");
  const [newAuthor, setNewAuthor] = useState("John Builder");

  const categories = ["all", "General", "Q&A", "Showcase", "Idea"];

  const filteredThreads = selectedCat === "all"
    ? threads
    : threads.filter((t) => t.category === selectedCat);

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Thread title cannot be empty");
      return;
    }

    const newThread: CommunityThread = {
      id: `thr-${threads.length + 1}-${Date.now()}`,
      title: newTitle,
      author: newAuthor || "Anonymous",
      repliesCount: 0,
      viewsCount: 1,
      category: newCategory,
      createdAt: new Date().toISOString().split("T")[0],
      replies: []
    };

    setThreads([newThread, ...threads]);
    setNewTitle("");
    setShowCreateForm(false);
    toast.success("Discussion thread created successfully!");
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="eyebrow text-[var(--accent-electric)] mb-3">Dev Forums</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Creator Discussions.
          </h1>
          <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
            Collaborate on prompt architectures, benchmark monorepo builds, request features, and troubleshoot stack modules.
          </p>
        </div>

        <div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="h-11 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="size-4" />
            New Discussion
          </button>
        </div>
      </div>

      {/* Create thread form */}
      {showCreateForm && (
        <div className="rounded-2xl border border-border bg-card p-6 mb-10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <MessageCircleCode className="size-4.5 text-[var(--accent-electric)]" />
            Create Discussion Thread
          </h3>
          <form onSubmit={handleCreateThread} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Builder"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full h-11 rounded-xl border border-border bg-muted/50 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as "General" | "Q&A" | "Showcase" | "Idea")}
                  className="w-full h-11 rounded-xl border border-border bg-muted/50 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
                >
                  <option value="General">General</option>
                  <option value="Q&A">Q&A</option>
                  <option value="Showcase">Showcase</option>
                  <option value="Idea">Idea</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Thread Title</label>
              <input
                type="text"
                placeholder="What topic would you like to discuss?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full h-11 rounded-xl border border-border bg-muted/50 px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="h-11 px-4 rounded-xl border border-border hover:bg-muted text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-[var(--accent-electric)] text-white hover:bg-[var(--accent-electric)]/95 text-xs font-bold transition-colors cursor-pointer"
              >
                Publish Thread
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Filters */}
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

      {/* Threads list */}
      <div className="space-y-6">
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thr) => (
            <div
              key={thr.id}
              className="rounded-2xl border border-border bg-card p-6 hover:border-foreground/15 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${
                      thr.category === "Q&A"
                        ? "border-[var(--accent-electric)] bg-[var(--accent-electric)]/5 text-[var(--accent-electric)]"
                        : thr.category === "Showcase"
                          ? "border-[var(--accent-violet)] bg-[var(--accent-violet)]/5 text-[var(--accent-violet)]"
                          : "border-border bg-muted text-muted-foreground"
                    }`}>
                      {thr.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                      <Clock className="size-3" />
                      {thr.createdAt}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-[var(--accent-electric)] transition-colors">
                    {thr.title}
                  </h3>

                  <div className="text-xs text-muted-foreground">
                    Started by <span className="font-semibold text-foreground">{thr.author}</span>
                  </div>
                </div>

                <div className="flex gap-4 text-xs font-mono font-bold text-muted-foreground border-t sm:border-t-0 pt-4 sm:pt-0 border-border">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="size-4" />
                    {thr.repliesCount}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="size-4" />
                    {thr.viewsCount}
                  </span>
                </div>
              </div>

              {/* Display replies if exists */}
              {thr.replies.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Recent Replies</span>
                  <div className="space-y-3">
                    {thr.replies.map((rep, idx) => (
                      <div key={idx} className="flex gap-3 p-3 rounded-xl border border-border/80 bg-muted/30">
                        <img src={rep.avatar} alt={rep.author} className="size-6 rounded-full shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-foreground">{rep.author}</span>
                            <span className="text-[9px] text-muted-foreground font-mono">{rep.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rep.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <p className="text-sm text-muted-foreground">No discussions available in this category yet. Be the first to start one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
