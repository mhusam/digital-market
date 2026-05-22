"use client";

import { useState } from "react";
import { BookOpen, Search, HelpCircle, Code, Shield, Network } from "lucide-react";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: "Frontend" | "Backend" | "Security" | "Infrastructure" | "General";
  detailedExplanation: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "BFF (Backend For Frontend)",
    definition: "An architectural pattern where a dedicated backend service is created specifically for a corresponding frontend app or client interface.",
    category: "Backend",
    detailedExplanation: "Instead of having a single generic API endpoint used by mobile, web, and desktop clients, BFF allows developers to optimize data payloads, payload formats, and communication channels specifically tailored to the screen layout and constraints of a particular interface.",
  },
  {
    term: "JWT (JSON Web Token)",
    definition: "An open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.",
    category: "Security",
    detailedExplanation: "JWTs are commonly used for stateless user authentication. The token contains header, payload (claims), and a digital signature. Once verified, the server trusts the user credentials without storing session identifiers in a database, making it highly scalable.",
  },
  {
    term: "React Server Components (RSC)",
    definition: "A new paradigm in React where components can be fetched and rendered on the server, sending pre-compiled HTML and minimal client-side bundles.",
    category: "Frontend",
    detailedExplanation: "Unlike client components that run inside the user's browser, server components execute strictly on the host machine. They can query databases, read backend files directly, and reduce JavaScript payload size significantly to accelerate Largest Contentful Paint (LCP).",
  },
  {
    term: "Edge Computing",
    definition: "A distributed computing paradigm that brings computation and data storage closer to the sources of data (such as edge servers or CDN nodes).",
    category: "Infrastructure",
    detailedExplanation: "By running code on nodes scattered around the world (e.g., Cloudflare Workers or Vercel Edge), requests are resolved at the server geographically closest to the user. This eliminates latency caused by round-trips to a central database center.",
  },
  {
    term: "WebAssembly (Wasm)",
    definition: "A binary instruction format for a stack-based virtual machine, designed as a portable compilation target for programming languages like C, C++, Rust, and Go.",
    category: "Frontend",
    detailedExplanation: "WebAssembly enables high-performance execution of computational logic directly in web browsers at near-native speed. It works alongside JavaScript, enabling heavy workflows like video editing, 3D modeling, and local encryption to run on the client side.",
  },
  {
    term: "Idempotency",
    definition: "A property of certain operations in mathematics and computer science whereby they can be applied multiple times without changing the result beyond the initial application.",
    category: "General",
    detailedExplanation: "In REST APIs, operations like GET, PUT, and DELETE are designed to be idempotent. In payment integrations, handling webhooks with an idempotency key guarantees that a customer is not charged twice if the network drops and the payload is resent.",
  },
  {
    term: "CSS Grid Container Queries",
    definition: "A CSS layout capability allowing styling of elements based on the dimensions of their parent container rather than the viewport size.",
    category: "Frontend",
    detailedExplanation: "Container queries let you build modular components that adapt their design seamlessly depending on where they are placed. For instance, a card component can render in a wide layout inside a sidebar, and in a vertical layout inside a narrow grid cell.",
  },
  {
    term: "Spring Modulith",
    definition: "An extension to Spring Boot that assists developers in building modular monolithic applications with verified boundary guidelines.",
    category: "Backend",
    detailedExplanation: "Modulith allows you to define logical modules inside a single codebase. It verifies module boundaries at compile time, preventing developers from importing classes across internal package layers, maintaining architecture simplicity before scaling to microservices.",
  },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Security", "Infrastructure", "General"];

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Code className="w-4 h-4 text-blue-400" />;
      case "Backend":
        return <HelpCircle className="w-4 h-4 text-emerald-400" />;
      case "Security":
        return <Shield className="w-4 h-4 text-rose-400" />;
      case "Infrastructure":
        return <Network className="w-4 h-4 text-purple-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredTerms = GLOSSARY_TERMS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.detailedExplanation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Banner Curated by Agent */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-6">
            <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium tracking-wide">Curated by PROGMAN Explainer Agent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
            Tech Glossary
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Searchable definitions and deep-dive explanations of modern web terms, architectures, and jargon.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-border">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
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
              placeholder="Search tech terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
            />
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="flex flex-col gap-6">
          {filteredTerms.map((item) => (
            <div
              key={item.term}
              className="rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden hover:border-blue-500/20 transition-all p-6 cursor-pointer"
              onClick={() => setExpandedTerm(expandedTerm === item.term ? null : item.term)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-background border border-border">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold hover:text-blue-400 transition-colors">
                      {item.term}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light mt-1">
                      {item.definition}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                    {item.category}
                  </span>
                  <button className="text-xs text-blue-400 font-bold hover:underline select-none">
                    {expandedTerm === item.term ? "Collapse" : "Explain More"}
                  </button>
                </div>
              </div>

              {expandedTerm === item.term && (
                <div className="mt-4 pt-4 border-t border-border/40 text-sm text-muted-foreground leading-relaxed font-light animate-fadeIn">
                  <strong className="text-foreground block mb-1">Deep Dive:</strong>
                  {item.detailedExplanation}
                </div>
              )}
            </div>
          ))}

          {filteredTerms.length === 0 && (
            <div className="text-center py-16 text-muted-foreground font-light">
              No glossary terms found matching your query.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
