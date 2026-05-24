"use client";

import { useState } from "react";
import { BLOG_POSTS } from "@/lib/mockData";
import { BookOpen, Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState("all");

  const categories = ["all", "Guides", "Security", "Architecture"];

  const filteredPosts = selectedCat === "all"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category.toLowerCase() === selectedCat.toLowerCase());

  // Let's assume the first post is the featured one if available
  const featuredPost = BLOG_POSTS[0];
  const gridPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id || selectedCat !== "all");

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-12">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Tech Journal</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Engineering Insights.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Deep-dives on web compilation speeds, modular architecture facades, and user-centric design system mechanics.
        </p>
      </div>

      {/* Featured Post (only when 'all' is selected and we have a featured post) */}
      {selectedCat === "all" && featuredPost && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden mb-16 hover:border-foreground/15 transition-all duration-300 grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-[16/10] lg:aspect-auto bg-muted">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="absolute inset-0 size-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-electric)]/10 text-[var(--accent-electric)] border border-[var(--accent-electric)]/20 text-[10px] font-bold uppercase tracking-wider">
                  Featured: {featuredPost.category}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                  <Calendar className="size-3" />
                  {featuredPost.date}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
                {featuredPost.title}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground flex items-center gap-1">
                  <User className="size-3.5 text-muted-foreground" />
                  {featuredPost.author}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                  <Clock className="size-3" />
                  {featuredPost.readTime}
                </span>
              </div>

              <div className="text-xs font-bold text-[var(--accent-electric)] flex items-center gap-1 hover:underline cursor-pointer">
                Read Playbook
                <ArrowRight className="size-3.5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
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

      {/* Grid Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gridPosts.length > 0 ? (
          gridPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/15 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-muted border-b border-border">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 size-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                      <Calendar className="size-3" />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-foreground flex items-center gap-1">
                      <User className="size-3 text-muted-foreground" />
                      {post.author}
                    </span>
                    <span className="text-[9px] text-muted-foreground font-mono flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="text-[10px] font-bold text-[var(--accent-electric)] flex items-center gap-1 hover:underline cursor-pointer">
                    Read Article
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <p className="text-sm text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
