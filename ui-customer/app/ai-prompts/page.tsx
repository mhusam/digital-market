import Link from "next/link";
import { Bot, Wand2, Image as ImageIcon, Video, BookOpen, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompts | PROGMAN",
  description: "Curated AI prompts for generating optimal results",
};

const categories = [
  {
    id: "agents",
    name: "Agents",
    description: "Prompts tailored for specialized AI agents to execute complex workflows and tasks autonomously.",
    icon: Bot,
    color: "from-blue-500/20 to-purple-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: "skills",
    name: "Skills",
    description: "Enhance your AI's capabilities with targeted skill-based prompts for programming and analysis.",
    icon: Wand2,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    id: "images",
    name: "Images",
    description: "Detailed parameters and modifiers to generate stunning, high-fidelity visual assets.",
    icon: ImageIcon,
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
  },
  {
    id: "video",
    name: "Video",
    description: "Directorial prompts for consistent motion, cinematic lighting, and scene transitions.",
    icon: Video,
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400",
  },
  {
    id: "story",
    name: "Story",
    description: "Narrative structures and character arcs to produce compelling, cohesive storytelling.",
    icon: BookOpen,
    color: "from-indigo-500/20 to-cyan-500/20",
    iconColor: "text-indigo-400",
  },
];

export default function AIPromptsPage() {
  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-sm font-medium tracking-wide">Curated by PROGMAN Prompt Engineer Agent</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
            AI Prompts
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Expertly crafted prompt templates engineered to extract the most accurate, creative, and optimized results from your AI models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/ai-prompts/${category.id}`}
              className="group relative block p-8 rounded-3xl bg-card border border-border overflow-hidden transition-all duration-500 hover:border-border/80 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${category.color}`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-background border border-border group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-foreground/90 transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed font-light group-hover:text-foreground/80 transition-colors duration-300 flex-grow">
                  {category.description}
                </p>
                
                <div className="mt-8 flex items-center text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Explore {category.name.toLowerCase()}
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
