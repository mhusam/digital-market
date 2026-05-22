"use client";

import { useState } from "react";
import { FileCode, Search, Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface CheatSheetItem {
  command: string;
  description: string;
}

interface CheatSheet {
  id: string;
  title: string;
  category: string;
  description: string;
  items: CheatSheetItem[];
}

const CHEAT_SHEETS: CheatSheet[] = [
  {
    id: "git",
    title: "Git Version Control",
    category: "DevOps",
    description: "Essential Git commands for staging, committing, branching, and syncing code.",
    items: [
      { command: "git commit -am 'message'", description: "Stage and commit all modified tracked files" },
      { command: "git checkout -b <branch-name>", description: "Create and switch to a new local branch" },
      { command: "git rebase origin/main", description: "Rebase current branch onto main branch" },
      { command: "git reset --hard HEAD~1", description: "Discard last commit and all uncommitted changes" },
      { command: "git clean -fd", description: "Remove untracked directories and files from working tree" },
    ],
  },
  {
    id: "css-grid",
    title: "CSS Grid & Flexbox",
    category: "Frontend",
    description: "Quick reference for modern layouts, positioning, and centering elements.",
    items: [
      { command: "display: grid;\ngrid-template-cols: repeat(auto-fit, minmax(250px, 1fr));", description: "Responsive grid layout without media queries" },
      { command: "display: flex;\njustify-content: center;\nalign-items: center;", description: "Perfect centering in both axes using Flexbox" },
      { command: "place-items: center;", description: "Short-hand for centering child elements in CSS Grid" },
      { command: "gap: clamp(1rem, 2vw, 2rem);", description: "Fluid spacing that scales with viewport width" },
    ],
  },
  {
    id: "docker",
    title: "Docker Containerization",
    category: "DevOps",
    description: "Basic Docker CLI commands to manage containers, images, and volumes.",
    items: [
      { command: "docker compose up --build -d", description: "Build and start containers in the background" },
      { command: "docker exec -it <container_id> sh", description: "Open an interactive terminal inside a container" },
      { command: "docker system prune -a --volumes", description: "Clean up all unused containers, networks, images, and volumes" },
      { command: "docker logs -f <container_name>", description: "Stream container logs in real-time" },
    ],
  },
  {
    id: "sql",
    title: "SQL & Relational DBs",
    category: "Database",
    description: "Common SQL queries, joins, indexes, and aggregation functions.",
    items: [
      { command: "SELECT * FROM users WHERE active = true ORDER BY created_at DESC LIMIT 10;", description: "Retrieve last 10 active users" },
      { command: "SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;", description: "Perform standard inner join between users and orders" },
      { command: "CREATE INDEX idx_products_category ON products(category);", description: "Create index to optimize category filtering speed" },
      { command: "SELECT category, COUNT(*), AVG(price) FROM products GROUP BY category;", description: "Aggregate product counts and average prices" },
    ],
  },
  {
    id: "react-hooks",
    title: "React & Next.js Hooks",
    category: "Frontend",
    description: "Core React hooks syntax, state management, and side effect lifecycle.",
    items: [
      { command: "const [state, setState] = useState(() => initialValue);", description: "Initialize state with performance optimization callback" },
      { command: "useEffect(() => {\n  // fetch data\n  return () => abortController.abort();\n}, [dep]);", description: "Handle cleanups to prevent memory leaks" },
      { command: "const ref = useRef<HTMLDivElement>(null);", description: "Access direct DOM reference or persistent mutable state" },
      { command: "const memoValue = useMemo(() => computeValue(a, b), [a, b]);", description: "Cache computed values to avoid recalculation" },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript Essentials",
    category: "Frontend",
    description: "Useful utility types, assertion techniques, and generic definitions.",
    items: [
      { command: "type RequiredProps<T> = {\n  [P in keyof T]-?: T[P];\n};", description: "Custom utility to make all properties of a type required" },
      { command: "type UserPreview = Pick<User, 'id' | 'name' | 'email'>;", description: "Select subset of properties to form a new type" },
      { command: "function getFirst<T>(arr: T[]): T | undefined {\n  return arr[0];\n}", description: "Type-safe generic function definition" },
      { command: "let value = input as unknown as CustomType;", description: "Double assertion to cast incompatible types safely" },
    ],
  },
];

const CATEGORIES = ["All", "Frontend", "DevOps", "Database"];

export default function CheatSheetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredSheets = CHEAT_SHEETS.filter((sheet) => {
    const matchesSearch =
      sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sheet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sheet.items.some((i) => i.command.toLowerCase().includes(searchTerm.toLowerCase()) || i.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || sheet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Curated by Agent */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 -z-10 blur-[100px] opacity-20 dark:opacity-30">
            <div className="h-full w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-background/50 backdrop-blur-sm border border-border rounded-full mb-6">
            <FileCode className="w-5 h-5 text-emerald-500 mr-2" />
            <span className="text-sm font-medium tracking-wide">Curated by PROGMAN Tutor Agent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
            Developer Cheat Sheets
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Quick-reference cards, snippets, and essential commands parsed and summarized for modern full-stack developer stacks.
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
              placeholder="Search cheat sheets or commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSheets.map((sheet) => (
            <div
              key={sheet.id}
              className="rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden flex flex-col hover:border-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div className="p-6 border-b border-border flex justify-between items-start">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
                    {sheet.category}
                  </div>
                  <h3 className="text-xl font-bold">{sheet.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-light">{sheet.description}</p>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col gap-4 bg-card/30">
                {sheet.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2 rounded-lg bg-background border border-border/80 p-4 relative group/item">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-xs text-muted-foreground leading-relaxed font-light">{item.description}</span>
                      <button
                        onClick={() => handleCopy(item.command)}
                        className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground shrink-0"
                        title="Copy to clipboard"
                      >
                        {copiedText === item.command ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <pre className="text-xs font-mono bg-muted/50 p-2.5 rounded border border-border/40 overflow-x-auto text-emerald-400 dark:text-emerald-300 select-all whitespace-pre-wrap">
                      <code>{item.command}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredSheets.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground font-light">
              No cheat sheets found matching your query.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
