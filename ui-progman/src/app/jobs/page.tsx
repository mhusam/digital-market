"use client";

import { useState } from "react";
import { JOBS } from "@/lib/mockData";
import { Briefcase, MapPin, DollarSign, ExternalLink, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const jobTypes = ["all", "Full-time", "Contract", "Part-time", "Remote"];

  const filteredJobs = JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || job.type === selectedType || (selectedType === "Remote" && job.location.toLowerCase().includes("remote"));
    return matchesSearch && matchesType;
  });

  const handleApply = (title: string, company: string) => {
    toast.success(`Redirecting to application for ${title} at ${company}...`);
  };

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className="border-b border-border pb-10 mb-10">
        <span className="eyebrow text-[var(--accent-electric)] mb-3">Dev Placements</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Developer Opportunities.
        </h1>
        <p className="text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed">
          Discover high-impact remote or contract roles at top tech companies building next-gen web platforms.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search jobs, tech stacks, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 rounded-xl border border-border bg-card px-4 pl-10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)]"
          />
          <Search className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
        </div>

        {/* Type pills */}
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`h-9 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                selectedType === type
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border hover:border-foreground/20 text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:border-[var(--accent-electric)]/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {job.company}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] border border-[var(--accent-violet)]/20 text-[10px] font-bold uppercase tracking-wider">
                    {job.type}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Briefcase className="size-4.5 text-[var(--accent-electric)]" />
                    {job.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                    {job.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="size-3.5" />
                    {job.salary}
                  </span>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md border border-border bg-muted/50 font-mono text-[9px] font-bold text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleApply(job.title, job.company)}
                  className="w-full md:w-auto h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/95 transition-all cursor-pointer whitespace-nowrap"
                >
                  Apply Now
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <p className="text-sm text-muted-foreground">No opportunities matching your criteria were found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
