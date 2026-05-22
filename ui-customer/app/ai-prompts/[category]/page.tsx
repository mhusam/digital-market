import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/ai-prompts" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </Link>
        
        <div className="mb-12 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-32 bg-gradient-to-r from-purple-500 to-blue-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
            <span className="text-xs font-bold tracking-wide uppercase">{capitalizedCategory} Prompts</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {capitalizedCategory} AI Prompts
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg font-light">
            Engineered prompts specifically designed to yield the best results for {category} tasks. Select a prompt below to see its details and variables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-border/80 transition-colors cursor-pointer group shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Professional {capitalizedCategory} Template {i}
                </h3>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">Pro</span>
              </div>
              <p className="text-muted-foreground font-light mb-6 line-clamp-2">
                This is a placeholder for the actual prompt engineering record. The text here will explain the context and structure of the prompt.
              </p>
              <div className="bg-muted rounded-xl p-4 border border-border font-mono text-sm text-muted-foreground relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
                "Act as an expert {category} system. Your objective is to..."
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
