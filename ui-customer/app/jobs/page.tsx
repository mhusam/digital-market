"use client";

import { useState } from "react";
import { Briefcase, Search, MapPin, DollarSign, Calendar, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface JobItem {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: "Full-Time" | "Contract" | "Part-Time";
  salary: string;
  location: string;
  category: "Engineering" | "Design" | "DevOps" | "Product";
  datePosted: string;
  description: string;
}

const JOBS_DATA: JobItem[] = [
  {
    id: "j1",
    title: "Senior Full-Stack Engineer (React/Spring Boot)",
    company: "Zenith Software Systems",
    logo: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=80&h=80&q=80",
    type: "Full-Time",
    salary: "$130k - $160k",
    location: "Remote (US/Canada)",
    category: "Engineering",
    datePosted: "2026-05-19",
    description: "Looking for an engineer to lead frontend architecture using React 19 / Next.js 16 and backend micro-monolith systems with Spring Boot 3.4."
  },
  {
    id: "j2",
    title: "Contract Web3 UI Designer",
    company: "Decentralized Lab",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=80&h=80&q=80",
    type: "Contract",
    salary: "$90 - $120 / hr",
    location: "Remote (Worldwide)",
    category: "Design",
    datePosted: "2026-05-20",
    description: "3-month contract to refine the user interface of our new liquid staking dashboard. Deep knowledge of Figma, Tailwind, and React is required."
  },
  {
    id: "j3",
    title: "DevOps & Cloud Infrastructure Specialist",
    company: "SaaS Scale Co.",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=80&h=80&q=80",
    type: "Full-Time",
    salary: "$140k - $170k",
    location: "Remote (Europe)",
    category: "DevOps",
    datePosted: "2026-05-17",
    description: "Manage scalable Kubernetes clusters, optimize multi-zone AWS setups, and configure Flyway migrations within Gitlab CI/CD pipelines."
  },
  {
    id: "j4",
    title: "Technical Product Manager",
    company: "Progman Solutions Corp",
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=80&h=80&q=80",
    type: "Full-Time",
    salary: "$120k - $150k",
    location: "Remote (US)",
    category: "Product",
    datePosted: "2026-05-18",
    description: "Coordinate developer APIs, draft product requirements for our modular SaaS platforms, and align payments workflow structures."
  },
  {
    id: "j5",
    title: "Lead Frontend Engineer (Next.js/TS)",
    company: "HyperFlow Corp",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=80&h=80&q=80",
    type: "Contract",
    salary: "$110 - $140 / hr",
    location: "Remote (US/Europe)",
    category: "Engineering",
    datePosted: "2026-05-21",
    description: "Optimize application loading speeds, implement core server-side caching, and set up dynamic styling configurations."
  }
];

const CATEGORIES = ["All", "Engineering", "Design", "DevOps", "Product"];

export default function JobsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleApply = (title: string, company: string) => {
    toast.success(`Application initiated for ${title} at ${company}!`);
  };

  const filteredJobs = JOBS_DATA.filter((job) => {
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Banner Curated by Agent */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-6">
            <Briefcase className="w-5 h-5 text-emerald-500 mr-2" />
            <span className="text-sm font-medium tracking-wide">Curated by PROGMAN Recruiting Agent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
            Developer Jobs Board
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Remote engineering, design, devops, and product management jobs curated directly from active tech channels.
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
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
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
              placeholder="Search jobs, tech, or roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
            />
          </div>
        </div>

        {/* Listings List */}
        <div className="flex flex-col gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group rounded-3xl border border-border bg-card/40 backdrop-blur-md p-6 hover:border-emerald-500/20 transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
            >
              <div className="flex gap-4 items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={job.logo} alt={job.company} className="w-14 h-14 rounded-2xl object-cover border border-border bg-muted shrink-0" />
                <div>
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">{job.company}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40">{job.type}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors duration-300">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mt-2 max-w-2xl">
                    {job.description}
                  </p>
                  
                  {/* Meta tags */}
                  <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground font-light">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                    <span className="flex items-center gap-0.5"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Posted on {job.datePosted}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleApply(job.title, job.company)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all text-sm shrink-0 self-stretch md:self-auto shadow-lg shadow-emerald-500/10"
              >
                Apply Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-16 text-muted-foreground font-light">
              No jobs found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
