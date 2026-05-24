"use client";

import { useState } from "react";
import { PODCASTS } from "@/lib/mockData";
import { Play, Pause, Headphones, Calendar, Clock, Volume2, Search, Disc } from "lucide-react";

export default function PodcastsPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePlayPause = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const filteredPodcasts = PODCASTS.filter((pod) =>
    pod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pod.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pod.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Audio & Media</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Antigravity Podcasts.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Tune in to technical audits, design systems conversations, architecture deep-dives, and creator stories.
        </p>
      </div>

      {/* Controls */}
      <div className="relative mb-10 max-w-md">
        <input
          type="text"
          placeholder="Search episodes, hosts, or topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-11 rounded-xl border border-border bg-card px-4 pl-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
        />
        <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
      </div>

      {/* Episode List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((pod) => {
            const isPlaying = playingId === pod.id;
            return (
              <div
                key={pod.id}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-foreground/15 transition-all duration-300 relative overflow-hidden group"
              >
                <div>
                  {/* Rotating CD effect when playing */}
                  <div className="absolute top-4 right-4 flex items-center justify-center">
                    <Disc className={`size-8 text-muted-foreground/30 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {pod.host}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-3 leading-snug group-hover:text-[var(--accent-electric)] transition-colors pr-8">
                    {pod.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                    {pod.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Animated Waveform Widget */}
                  <div className="h-10 border border-border bg-muted/30 rounded-xl px-4 flex items-center gap-1">
                    <span className="text-[10px] font-mono text-muted-foreground mr-2">{isPlaying ? "PLAYING" : "PAUSED"}</span>
                    <div className="flex-1 flex items-end gap-[3px] h-6">
                      {[12, 18, 8, 15, 24, 6, 14, 18, 10, 16, 22, 12, 8, 14, 20, 10, 6, 12, 18, 22, 14, 8, 15, 10].map((h, i) => (
                        <span
                          key={i}
                          className={`w-[3px] rounded-full transition-all duration-300 ${
                            isPlaying
                              ? "bg-[var(--accent-electric)] animate-pulse"
                              : "bg-muted-foreground/30"
                          }`}
                          style={{
                            height: `${isPlaying ? Math.max(4, Math.min(24, h + Math.sin(Date.now() + i) * 6)) : h}px`,
                            animationDelay: `${i * 50}ms`
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground ml-2">{pod.duration}</span>
                  </div>

                  {/* Player Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-xs font-semibold text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {pod.date}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePlayPause(pod.id)}
                      className={`h-10 px-5 rounded-full font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                        isPlaying
                          ? "bg-[var(--accent-electric)] text-white hover:bg-[var(--accent-electric)]/90"
                          : "bg-primary text-primary-foreground hover:bg-primary/95"
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="size-3.5" />
                          Pause Ep.
                        </>
                      ) : (
                        <>
                          <Play className="size-3.5" />
                          Listen Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <p className="text-sm text-muted-foreground">No podcast episodes match your query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
