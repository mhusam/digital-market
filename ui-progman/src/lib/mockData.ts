export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  features: string[];
  tags: string[];
  license: string;
  version: string;
  status: "available" | "coming_soon" | "deprecated";
  creator: {
    name: string;
    avatar: string;
    role: string;
  };
  releaseDate: string;
  downloads: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface AIPrompt {
  id: string;
  category: string;
  title: string;
  description: string;
  prompt: string;
  variables: { name: string; placeholder: string; description: string }[];
}

export interface CheatSheet {
  id: string;
  title: string;
  category: string;
  description: string;
  commands: { cmd: string; desc: string; example?: string }[];
}

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  author: string;
  stars: number;
  techStack: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  detail: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  projects: number;
  avatar: string;
  role: string;
  change: "up" | "down" | "flat";
}

export interface ChangelogRelease {
  id: string;
  version: string;
  date: string;
  title: string;
  content: string;
  type: "major" | "minor" | "patch";
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: "Full-time" | "Contract" | "Part-time" | "Remote";
  location: string;
  salary: string;
  description: string;
  tags: string[];
  url: string;
}

export interface Deal {
  id: string;
  title: string;
  partner: string;
  discount: string;
  code: string;
  description: string;
  url: string;
  category: "Hosting" | "SaaS" | "Design" | "Courses";
}

export interface TechStack {
  id: string;
  title: string;
  description: string;
  components: { name: string; role: string; color: string }[];
  diagramData: string;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  duration: string;
  date: string;
  url: string;
  description: string;
  audioUrl?: string;
}

export interface OSRepo {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export interface CommunityThread {
  id: string;
  title: string;
  author: string;
  repliesCount: number;
  viewsCount: number;
  category: "General" | "Q&A" | "Showcase" | "Idea";
  createdAt: string;
  replies: { author: string; avatar: string; content: string; date: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface NewsHighlight {
  id: string;
  title: string;
  titleAr: string;
  summary: string;
  summaryAr: string;
  date: string;
  priority: "high" | "normal";
  category: "release" | "product" | "industry" | "community";
  tags: string[];
  source?: string;
  url: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  rsvpCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "boilerplates",
    name: "Boilerplates & Starters",
    description: "Production-ready templates with DB setup, auth, and payment integrations.",
    icon: "Layers",
    count: 8,
  },
  {
    id: "cat-2",
    slug: "ui-components",
    name: "UI Components & Presets",
    description: "Beautiful animated elements, transitions, and component primitives.",
    icon: "Sparkles",
    count: 12,
  },
  {
    id: "cat-3",
    slug: "design-assets",
    name: "Design Systems & Assets",
    description: "Figma projects, custom icons, brand kits, and styling tokens.",
    icon: "Palette",
    count: 6,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Velocty NextJS 16 Starter Kit",
    description: "The ultimate Next.js 16 boilerplate with Tailwind v4, Supabase Auth, and Stripe payment flows.",
    longDescription: "Deploy your digital product SaaS in minutes. Velocity integrates Next.js 16 App Router, Tailwind CSS v4, Prisma with Postgres, Supabase Auth, and Stripe checkouts. It features fully implemented server actions, email notifications, clean layout components, dark mode toggle, and micro-interactions.",
    price: 49.00,
    category: "boilerplates",
    rating: 4.85,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    features: [
      "Next.js 16 App Router & Server Actions",
      "Tailwind CSS v4 fully configured",
      "Supabase Auth & Database triggers",
      "Stripe checkout sessions & webhook handler",
      "Responsive navigation & modern layout UI",
    ],
    tags: ["Next.js", "Tailwind v4", "Supabase", "Stripe"],
    license: "Single Project License",
    version: "1.2.0",
    status: "available",
    creator: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
      role: "Lead Tech Architect",
    },
    releaseDate: "2026-04-10",
    downloads: 1250,
  },
  {
    id: "prod-2",
    title: "Atmosphere UI Component Library",
    description: "Premium Framer Motion animations, glassmorphism overlays, and dark-theme templates.",
    longDescription: "Elevate your web application design with Atmosphere UI. A collection of copy-paste components built using React, Framer Motion, and Tailwind CSS. Includes modern card grids, mesh background generators, floating action menus, and beautiful responsive transitions.",
    price: 29.00,
    category: "ui-components",
    rating: 4.95,
    reviewsCount: 68,
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    features: [
      "35+ Premium Interactive Components",
      "Mesh gradient & canvas background shaders",
      "Spring-based Framer Motion configurations",
      "Fully accessible, keyboard-navigable dialogs",
    ],
    tags: ["React", "Framer Motion", "Tailwind", "Accessibility"],
    license: "Unlimited Projects",
    version: "2.0.4",
    status: "available",
    creator: {
      name: "Sofia Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
      role: "UI Engineer",
    },
    releaseDate: "2026-03-22",
    downloads: 2410,
  },
  {
    id: "prod-3",
    title: "Core Design Tokens & Icons",
    description: "Complete design tokens ecosystem including a Figma plugin, 400+ custom SVGs, and brand templates.",
    longDescription: "A comprehensive design system package for creators and brands. Get access to fully modular design tokens, interactive Figma styles, a tailored dark/light color palette optimizer, and over 400 clean SVG icons ready to drop into Next.js or React.",
    price: 19.00,
    category: "design-assets",
    rating: 4.67,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=600&q=80",
    features: [
      "400+ SVG Vector Icons (Lucide optimized)",
      "Figma design tokens & brand library sync",
      "Flexible JSON theme files",
      "Free lifetime updates and support",
    ],
    tags: ["Figma", "Design System", "Icons", "JSON Theme"],
    license: "Unlimited Projects",
    version: "1.0.0",
    status: "available",
    creator: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
      role: "Digital Design Director",
    },
    releaseDate: "2026-05-01",
    downloads: 678,
  },
  {
    id: "prod-4",
    title: "Hyperion API Boilerplate",
    description: "A fast, modular backend boilerplate with Spring Boot, Java 21, Flyway migrations, and OAuth2.",
    longDescription: "Architect a robust backend infrastructure with Spring Boot. Features production-ready JWT authentication, PostgreSQL configurations, modular monolith setup, caching layers, and a full automated test harness.",
    price: 39.00,
    category: "boilerplates",
    rating: 4.78,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80",
    features: [
      "Spring Boot 3.4 & Java 21",
      "Flyway database migration templates",
      "Docker compose configurations",
      "OAuth2 + JWT Authentication out of the box",
    ],
    tags: ["Spring Boot", "Java 21", "PostgreSQL", "OAuth2"],
    license: "Single Project License",
    version: "1.1.0",
    status: "available",
    creator: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
      role: "Lead Tech Architect",
    },
    releaseDate: "2026-02-14",
    downloads: 890,
  },
  {
    id: "prod-5",
    title: "Orbit 3D Globe Widget",
    description: "Interactive canvas 3D globe component for displaying customer conversions in real time.",
    longDescription: "An elegant interactive React component wrapping HTML5 canvas. Features customizable dot density, spin acceleration, pointer dragging, marker coordinate placements, and glowing particle orbits. Optimized for landing pages.",
    price: 15.00,
    category: "ui-components",
    rating: 4.90,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    features: [
      "Highly performant WebGL/Canvas renderer",
      "Real-time event marker plots",
      "Theme synchronization (Dark/Light)",
      "Zero external runtime styling dependencies",
    ],
    tags: ["React", "ThreeJS", "WebGL", "Landing Widget"],
    license: "Unlimited Projects",
    version: "3.2.1",
    status: "available",
    creator: {
      name: "Sofia Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
      role: "UI Engineer",
    },
    releaseDate: "2026-05-12",
    downloads: 1420,
  },
];

export const AI_PROMPTS: AIPrompt[] = [
  {
    id: "pmp-1",
    category: "agents",
    title: "SaaS Database Architect Agent",
    description: "Instructs an agentic coder to generate normalized schema, migrations, and seed files.",
    prompt: "You are an expert PostgreSQL database architect. Design a modular, normalized schema for a SaaS marketplace application with entities for users, stores, products, orders, payments, and license downloads. Include foreign key constraints, indexes on lookup fields, and Flyway migration syntax. Additionally, output a seed script with 5 representative rows per table.",
    variables: [
      { name: "Schema Version", placeholder: "V1__initial", description: "The prefix filename for the migration file" },
      { name: "DB Type", placeholder: "PostgreSQL 16", description: "Target database dialect" },
    ],
  },
  {
    id: "pmp-2",
    category: "skills",
    title: "LCP Performance Audit Skill",
    description: "Guides Chrome DevTools or CLI agents to pinpoint slow Largest Contentful Paint sources.",
    prompt: "Analyze the web page loading timeline. Identify the Largest Contentful Paint (LCP) element, calculate its TTFB, Resource Load Delay, Resource Load Duration, and Element Render Delay. Suggest exact changes to responsive image tags, fetch priorities, and server cache control headers to reduce the overall LCP to under 1.5 seconds.",
    variables: [
      { name: "Page URL", placeholder: "https://localhost:3000/products", description: "Target page for evaluation" },
    ],
  },
  {
    id: "pmp-3",
    category: "images",
    title: "Premium Tech Product Mockup",
    description: "Generates prompt for Midjourney or Stable Diffusion to create glassmorphism device assets.",
    prompt: "A ultra-premium mockup of a digital dashboard on a bezel-less monitor screen, dark studio background, violet and electric orange glowing ambient lights, glassmorphism floating cards, abstract cybernetic design, 3D clay render details, photorealistic, 8k resolution, raytracing, side view --ar 16:9",
    variables: [],
  },
  {
    id: "pmp-4",
    category: "code",
    title: "Next.js 16 API Endpoint",
    description: "Generates prompt for coding assistant to write structured JSON handlers in Next.js v16.",
    prompt: "Write a server-side route handler in Next.js 16 App Router using TypeScript. The endpoint should handle POST requests to `/api/checkout`, parse a Zod schema payload, calculate price totals using the server-side mock database, and return a signed payload token with HttpOnly cookies. Use next/server exports.",
    variables: [],
  },
];

export const CHEAT_SHEETS: CheatSheet[] = [
  {
    id: "cht-1",
    title: "Next.js 16 App Routing & Server Actions",
    category: "Next.js",
    description: "Quick reference card for route groups, layouts, metadata config, and server action parameters.",
    commands: [
      { cmd: "export const dynamic = 'force-dynamic';", desc: "Force dynamic server rendering on request" },
      { cmd: "export async function generateMetadata({ params })", desc: "Dynamic metadata generator for SEO" },
      { cmd: "'use server';\nexport async function action(formData) {}", desc: "Declares a backend execution boundary in forms" },
      { cmd: "revalidatePath('/products');", desc: "On-demand revalidation trigger for cached page views" },
    ],
  },
  {
    id: "cht-2",
    title: "Tailwind CSS v4 Configuration & Utilities",
    category: "Tailwind CSS",
    description: "Syntax grid for CSS-first directives, new themes variables, and dynamic container queries.",
    commands: [
      { cmd: "@import \"tailwindcss\";", desc: "New CSS-first main entry point for Tailwind v4" },
      { cmd: "--color-accent: var(--accent-violet);", desc: "Custom theme variable definitions inside CSS blocks" },
      { cmd: "@utility custom-scrollbar { ... }", desc: "Define custom modular utilities directly in standard CSS files" },
      { cmd: "@container (min-width: 400px) { ... }", desc: "Container-query selector block" },
    ],
  },
  {
    id: "cht-3",
    title: "PostgreSQL Advanced Queries",
    category: "Postgres",
    description: "Common table expressions, window functions, and JSONB manipulations.",
    commands: [
      { cmd: "WITH summary AS (SELECT COUNT(*) FROM orders) SELECT * FROM summary;", desc: "Define a temporary result set using CTE syntax" },
      { cmd: "ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC)", desc: "Assign sequence ranks partitioned by columns" },
      { cmd: "data_column ->> 'license_key'", desc: "Extract JSON field value as text from JSONB fields" },
    ],
  },
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "shw-1",
    title: "DevForge Dashboard UI",
    description: "An open source developer dashboard leveraging Atmosphere components and Orbit 3D Globe.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    url: "https://github.com/devforge/dashboard",
    author: "Elena Petrova",
    stars: 342,
    techStack: ["Next.js", "Atmosphere UI", "ThreeJS", "Zustand"],
  },
  {
    id: "shw-2",
    title: "Promptly AI Client",
    description: "A desktop app client built using Velocity Next.js 16 templates for organizing AI chat flows.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    url: "https://promptly.ai",
    author: "Marcus Vance",
    stars: 189,
    techStack: ["Next.js 16", "Tailwind v4", "Supabase", "Electron"],
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "gls-1",
    term: "Modular Monolith",
    definition: "An architectural style that structures an application as a single deployable unit but with strictly bounded internal modules.",
    category: "Architecture",
    detail: "Unlike raw monoliths where classes and models bleed across domains, a modular monolith uses facades (e.g. Spring Modulith) to enforce boundaries. If Module A wants to query Module B, it must do so via B's public API facade, preventing circular dependencies and spaghetti code.",
  },
  {
    id: "gls-2",
    term: "Hydration Mismatch",
    definition: "An error occurring when the server-rendered HTML markup does not match the initial client-rendered React tree.",
    category: "React",
    detail: "Common causes include using non-deterministic values (like Date.now(), Math.random(), or window dimensions) during render without guarding them in a useEffect hook. React reports an warning in development and will re-render the tree, reducing performance.",
  },
  {
    id: "gls-3",
    term: "LCP (Largest Contentful Paint)",
    definition: "A Core Web Vital tracking the time it takes for the largest visual element (usually a hero image or text block) to render.",
    category: "Performance",
    detail: "A good LCP score is under 2.5 seconds. Optimizations include preloading critical images (fetchpriority=\"high\"), minifying critical-path CSS, and deferring non-essential Javascript blocks.",
  },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Sofia Chen", points: 12450, projects: 18, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", role: "UI Engineer", change: "up" },
  { rank: 2, name: "Alex Rivera", points: 10980, projects: 12, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80", role: "Lead Architect", change: "flat" },
  { rank: 3, name: "Marcus Vance", points: 8940, projects: 9, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80", role: "Design Director", change: "down" },
  { rank: 4, name: "Elena Petrova", points: 7420, projects: 6, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80", role: "Senior Developer", change: "up" },
  { rank: 5, name: "David Kim", points: 6100, projects: 4, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80", role: "Fullstack dev", change: "flat" },
];

export const CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    id: "chg-1",
    version: "v1.2.0",
    date: "2026-05-18",
    title: "Tailwind CSS v4 & Next.js 16 Upgrade",
    content: "We have fully upgraded our core boilerplates to support Next.js 16 and Tailwind CSS v4. This includes replacing previous PostCSS config structures with direct CSS-first configurations, speeding up hot module reload times by 40%, and adapting Lucide icons sizes. Added smooth page-reveal animations using animate-ui presets.",
    type: "major",
  },
  {
    id: "chg-2",
    version: "v1.1.2",
    date: "2026-04-30",
    title: "Optimized 3D Orbit Globe Canvas",
    content: "Reduced WebGL context footprint on mobile viewports. Fixed memory leaks occurring during fast tab switching. The 3D globe now suspends rendering automatically when out of viewport.",
    type: "minor",
  },
  {
    id: "chg-3",
    version: "v1.1.1",
    date: "2026-04-12",
    title: "Stripe Webhook Refactoring",
    content: "Patched signature validation failure in edge runtime environments. Added automatic retry handlers for temporary checkout locking database conflicts.",
    type: "patch",
  },
];

export const JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Next.js Developer",
    company: "Velocty Devs",
    type: "Full-time",
    location: "Remote (EST)",
    salary: "$120,000 - $140,000",
    description: "Join the team building next-generation templates. You will lead UI engineering, optimize page speeds (LCP/INP), integrate web-assembly components, and build custom Figma tokens tools.",
    tags: ["Next.js", "TypeScript", "Performance", "Figma"],
    url: "https://careers.velocty.dev/senior-nextjs",
  },
  {
    id: "job-2",
    title: "Spring Boot Monolith Engineer",
    company: "Hyperspace FinTech",
    type: "Contract",
    location: "Remote (Europe)",
    salary: "€80 - €100 / hr",
    description: "We are refactoring our legacy systems into a Spring Modulith architecture. Required deep knowledge of Spring Boot 3.4, Java 21, Flyway migrations, and asynchronous event publishers.",
    tags: ["Spring Boot", "Java 21", "Modulith", "Flyway"],
    url: "https://hyperspace-jobs.io/spring-boot-contract",
  },
];

export const DEALS: Deal[] = [
  {
    id: "deal-1",
    title: "3 Months Free Vercel Pro",
    partner: "Vercel",
    discount: "3 Months Free",
    code: "PROGMANVERCEL",
    description: "Deploy Next.js 16 applications with high-performance edge compute, analytics metrics, and instant CDN preview branches.",
    url: "https://vercel.com/pro-promo",
    category: "Hosting",
  },
  {
    id: "deal-2",
    title: "Supabase $50 DB Credit",
    partner: "Supabase",
    discount: "$50 Store Credit",
    code: "SUPAPROGMAN50",
    description: "Spin up postgres instances, implement secure Auth triggers, enable edge functions, and manage assets with S3 file buckets.",
    url: "https://supabase.com/pricing",
    category: "SaaS",
  },
];

export const TECH_STACKS: TechStack[] = [
  {
    id: "stk-1",
    title: "Modular NextJS + Spring Monolith Stack",
    description: "Best for scalable SaaS startups needing high performance frontend + strongly typed modular backend.",
    components: [
      { name: "Next.js 16 BFF", role: "Web Frontend / Route proxying / Session handling", color: "violet" },
      { name: "Spring Boot Monolith", role: "Business Logic / Facades / Transactions", color: "orange" },
      { name: "PostgreSQL DB", role: "Transactional persistence / JSONB logs", color: "emerald" },
      { name: "S3 Storage", role: "Digital downloads / Signed media paths", color: "blue" },
    ],
    diagramData: "Next.js BFF client -> HTTPS API proxy -> Spring Boot Facades -> JPA Repository -> PostgreSQL Instance",
  },
  {
    id: "stk-2",
    title: "Serverless NextJS + Supabase Stack",
    description: "Best for quick, dynamic, lightweight launches with minimal infrastructure overhead.",
    components: [
      { name: "Next.js 16 Server Actions", role: "Edge execution boundaries", color: "violet" },
      { name: "Supabase Auth & DB", role: "Managed Postgres / RLS policies / OAuth", color: "emerald" },
      { name: "Stripe checkout", role: "Payment captures & subscription webhooks", color: "amber" },
    ],
    diagramData: "Client Page -> Server Actions -> Supabase SQL Query & Stripe Session Redirect",
  },
];

export const PODCASTS: Podcast[] = [
  {
    id: "pod-1",
    title: "Building next-generation UI libraries with Sofia Chen",
    host: "The Antigravity Dev Podcast",
    duration: "42:15",
    date: "2026-05-15",
    url: "/podcasts/sofia-chen",
    description: "In this episode, we talk about custom framer-motion springs, design system token synchronization, and why React 19 web-components compilation will change the ecosystem.",
  },
  {
    id: "pod-2",
    title: "From Spaghetti Monoliths to Spring Modulith",
    host: "Java Frontiers",
    duration: "38:40",
    date: "2026-04-20",
    url: "/podcasts/spring-modulith",
    description: "A deep dive into modularity rules, package-private boundaries, event-based inter-module messaging, and validating project structures dynamically with ArchUnit.",
  },
];

export const OS_REPOS: OSRepo[] = [
  {
    id: "repo-1",
    name: "lucide-react-spring",
    description: "Beautiful animated wrappers around Lucide icons using react-spring physics definitions.",
    stars: 1250,
    forks: 89,
    language: "TypeScript",
    url: "https://github.com/community/lucide-react-spring",
  },
  {
    id: "repo-2",
    name: "spring-modulith-cli",
    description: "Command line tool to generate visual UML architectures from Spring Boot Modulith projects.",
    stars: 840,
    forks: 56,
    language: "Java",
    url: "https://github.com/community/spring-modulith-cli",
  },
];

export const COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: "thr-1",
    title: "Best practice for Next.js 16 server actions signature validation?",
    author: "Dan Abramov Fan",
    repliesCount: 14,
    viewsCount: 420,
    category: "Q&A",
    createdAt: "2026-05-20",
    replies: [
      { author: "Sofia Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80", content: "Always validate the input using a Zod schema, check user permissions via headers/cookies, and secure key identifiers using symmetric encryption if they pass through client states.", date: "2026-05-20" },
      { author: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80", content: "Agreed. I also use simple tokens validation for checkout requests to prevent replay bots.", date: "2026-05-21" },
    ],
  },
  {
    id: "thr-2",
    title: "Velocity Starter Kit build times are incredible!",
    author: "Vercel Enthusiast",
    repliesCount: 8,
    viewsCount: 310,
    category: "Showcase",
    createdAt: "2026-05-18",
    replies: [],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blg-1",
    title: "Mastering Tailwind CSS v4 in Next.js 16",
    excerpt: "Learn how the new CSS-first engine simplifies configuration, replaces post-css dependencies, and boosts render speed.",
    content: "Tailwind CSS v4 introduces a revolutionary Rust engine that compiles design files faster than ever. Instead of config.js, we define custom colors, utilities, and media directives right in globals.css. This guide shows how to migrate templates, set up theme customizers, and optimize bundle sizes.",
    readTime: "5 min read",
    author: "Sofia Chen",
    date: "2026-05-10",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "blg-2",
    title: "Securing Spring Boot Monolith APIs with JWT & Cookies",
    excerpt: "Step-by-step strategy for configuring HttpOnly cookie proxies in Next.js server routers to defend against XSS.",
    content: "When building a BFF (Backend-for-Frontend) setup, passing authorization headers on the client exposes JWTs to token interception. The correct solution is store session cookies under HttpOnly flags. Here we configure Spring Security 6, custom cookie publishers, and Next.js middleware routing.",
    readTime: "8 min read",
    author: "Alex Rivera",
    date: "2026-04-15",
    category: "Security",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80",
  },
];

export const NEWS_HIGHLIGHTS: NewsHighlight[] = [
  {
    id: "nws-1",
    title: "Tailwind CSS v4 stable release is now fully integrated across all PROGMAN boilerplates.",
    titleAr: "إصدار Tailwind CSS v4 المستقر متاح الآن بالكامل في جميع قوالب PROGMAN",
    summary: "After months of beta testing, Tailwind CSS v4 is now the default in every PROGMAN boilerplate. The new release ships with the Lightning CSS engine built-in, a redesigned @theme directive, native cascade layers, and up to 35% faster build times. Existing projects can follow the published migration guide.",
    summaryAr: "بعد أشهر من الاختبار التجريبي، أصبح Tailwind CSS v4 الإصدار الافتراضي في كل قوالب PROGMAN. يتضمن الإصدار الجديد محرك Lightning CSS مدمجاً، وتوجيه @theme المُعاد تصميمه، وطبقات CSS أصلية، وأوقات بناء أسرع بنسبة 35%. يمكن للمشاريع الحالية اتباع دليل الترحيل المنشور.",
    date: "2026-05-20",
    priority: "high",
    category: "release",
    tags: ["TailwindCSS", "CSS", "Frontend", "Performance"],
    source: "PROGMAN Engineering",
    url: "/changelog",
  },
  {
    id: "nws-2",
    title: "Next.js 16 Partial Prerendering is production-stable — all PROGMAN starters updated.",
    titleAr: "التصيير المسبق الجزئي في Next.js 16 أصبح مستقراً للإنتاج — جميع قوالب PROGMAN محدّثة",
    summary: "Partial Prerendering (PPR) in Next.js 16 allows pages to serve a static shell instantly while streaming dynamic content in parallel. All PROGMAN starter kits have been updated to leverage PPR for optimal Time to First Byte scores. Lighthouse benchmarks on the updated starters show LCP improvements of up to 40%.",
    summaryAr: "يُتيح التصيير المسبق الجزئي (PPR) في Next.js 16 للصفحات تقديم هيكل ثابت فوري مع بث المحتوى الديناميكي في وقت واحد. تم تحديث جميع مجموعات أدوات PROGMAN للاستفادة من PPR لتحقيق أفضل نتائج لوقت أول بايت. تُظهر معايير Lighthouse تحسينات في LCP تصل إلى 40%.",
    date: "2026-05-18",
    priority: "high",
    category: "release",
    tags: ["NextJS", "Performance", "SSR", "WebDev"],
    source: "PROGMAN Engineering",
    url: "/changelog",
  },
  {
    id: "nws-3",
    title: "React 19 Server Actions and the use() hook are now fully supported in Atmosphere UI.",
    titleAr: "إجراءات الخادم وخطاف use() في React 19 مدعومان بالكامل في Atmosphere UI",
    summary: "React 19's stable APIs — Server Actions, the new use() hook, ref as a prop, and improved error boundaries — are now documented, tested, and integrated within the Atmosphere UI component library. Interactive migration examples and codemods are available for teams upgrading from React 18.",
    summaryAr: "واجهات برمجة React 19 المستقرة، بما فيها إجراءات الخادم وخطاف use() الجديد ودعم ref كخاصية وحدود أخطاء محسّنة، أصبحت موثقة ومختبرة ومدمجة في مكتبة Atmosphere UI. أمثلة تفاعلية على الترحيل وأدوات تحويل الكود متاحة للفرق التي تترقى من React 18.",
    date: "2026-05-15",
    priority: "normal",
    category: "product",
    tags: ["React19", "ServerActions", "UIComponents", "JavaScript"],
    source: "Atmosphere UI Team",
    url: "/products/prod-2",
  },
  {
    id: "nws-4",
    title: "Bun v1.2 is now the default runtime in new PROGMAN boilerplates — 4× faster installs.",
    titleAr: "Bun v1.2 أصبح بيئة التشغيل الافتراضية في قوالب PROGMAN الجديدة — تثبيت أسرع 4 مرات",
    summary: "New PROGMAN boilerplates ship with Bun v1.2 as the default runtime and package manager. Internal benchmarks show 4× faster install times and 2× faster test execution versus Node.js / pnpm workflows. Existing customers can opt in via the updated setup guide — Node.js remains fully supported.",
    summaryAr: "تأتي قوالب PROGMAN الجديدة مع Bun v1.2 كبيئة تشغيل ومدير حزم افتراضي. تُظهر المعايير الداخلية أوقات تثبيت أسرع 4 مرات وتنفيذ اختبارات أسرع مرتين مقارنةً بسير عمل Node.js / pnpm. يمكن للعملاء الحاليين الاشتراك عبر دليل الإعداد المحدّث — Node.js لا يزال مدعوماً بالكامل.",
    date: "2026-05-12",
    priority: "normal",
    category: "release",
    tags: ["Bun", "JavaScript", "Performance", "DevTools"],
    source: "PROGMAN Engineering",
    url: "/blog",
  },
  {
    id: "nws-5",
    title: "TypeScript 5.8 strict mode now enforced across all PROGMAN packages — migration docs published.",
    titleAr: "تطبيق وضع TypeScript 5.8 الصارم على جميع حزم PROGMAN — وثائق الترحيل منشورة",
    summary: "PROGMAN has upgraded all packages to TypeScript 5.8 with strict mode enabled. Breaking changes include improved type inference for conditional types, new isolatedDeclarations support, and tighter narrowing rules. A detailed breaking-changes guide and automated codemod scripts are available in the developer portal.",
    summaryAr: "قامت PROGMAN بترقية جميع الحزم إلى TypeScript 5.8 مع تفعيل الوضع الصارم. التغييرات الجذرية تشمل تحسين استنتاج الأنواع للأنواع الشرطية، ودعم isolatedDeclarations الجديد، وقواعد تضييق أكثر دقة. دليل تفصيلي للتغييرات الجذرية وسكريبتات تحويل الكود الآلية متاحة في بوابة المطورين.",
    date: "2026-05-08",
    priority: "normal",
    category: "release",
    tags: ["TypeScript", "JavaScript", "TypeSafety", "Developer"],
    source: "PROGMAN Engineering",
    url: "/changelog",
  },
  {
    id: "nws-6",
    title: "PROGMAN reaches 3,800 active developers — 30% limited-time discount now live.",
    titleAr: "PROGMAN تتخطى 3,800 مطور نشط — خصم 30% محدود الوقت ساري الآن",
    summary: "We've officially hit 3,800 active developers building with PROGMAN products. To celebrate this milestone, all boilerplates and component libraries are 30% off for the next 72 hours. Use code PROGMAN3K at checkout. Thank you to every developer who has shipped with us.",
    summaryAr: "وصلنا رسمياً إلى 3,800 مطور نشط يبنون باستخدام منتجات PROGMAN. احتفالاً بهذا الإنجاز، جميع القوالب ومكتبات المكونات بخصم 30% لمدة 72 ساعة. استخدم الرمز PROGMAN3K عند الدفع. شكراً لكل مطور أطلق مشروعه معنا.",
    date: "2026-05-05",
    priority: "high",
    category: "community",
    tags: ["Community", "Discount", "Milestone", "PROGMAN"],
    source: "PROGMAN Team",
    url: "/products",
  },
  {
    id: "nws-7",
    title: "Supabase branching workflow added to Velocity — preview deployments are now fully automated.",
    titleAr: "إضافة سير عمل فروع Supabase إلى Velocity — نشر المعاينة أصبح آلياً بالكامل",
    summary: "The Velocity Next.js 16 starter kit now ships with full Supabase branching support. Each pull request automatically provisions an isolated Supabase preview environment, enabling safe database migrations and end-to-end feature testing before any code reaches production.",
    summaryAr: "يأتي قالب Velocity Next.js 16 الآن مع دعم كامل لفروع Supabase. يُنشئ كل طلب سحب بيئة Supabase معاينة معزولة تلقائياً، مما يُتيح ترحيل قواعد بيانات آمناً واختبار شاملاً للميزات قبل وصول أي كود إلى الإنتاج.",
    date: "2026-04-28",
    priority: "normal",
    category: "product",
    tags: ["Supabase", "NextJS", "Database", "DevOps"],
    source: "Velocity Team",
    url: "/products/prod-1",
  },
  {
    id: "nws-8",
    title: "shadcn/ui v3 chart components now available in Atmosphere UI — 12 new visualization primitives.",
    titleAr: "مكونات الرسوم البيانية shadcn/ui v3 متاحة الآن في Atmosphere UI — 12 عنصراً مرئياً جديداً",
    summary: "Atmosphere UI now bundles shadcn/ui v3's chart primitives powered by Recharts 3. The 12 new components include area, bar, line, pie, radar, and radial charts — all pre-styled to match the Atmosphere design system with full dark mode and responsive support out of the box.",
    summaryAr: "تشتمل Atmosphere UI الآن على عناصر shadcn/ui v3 الأساسية للرسوم البيانية المدعومة بـ Recharts 3. تشمل المكونات الـ 12 الجديدة مخططات المساحة والأعمدة والخطوط والدائرية والرادار والشعاعية — مُهيأة مسبقاً لتتناسب مع نظام تصميم Atmosphere مع دعم كامل للوضع الداكن والاستجابة.",
    date: "2026-04-20",
    priority: "normal",
    category: "product",
    tags: ["shadcn", "Charts", "DataViz", "UIComponents"],
    source: "Atmosphere UI Team",
    url: "/products/prod-2",
  },
];

export const EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "SaaS Launch Strategy with Velocity Boilerplate",
    date: "2026-06-05",
    time: "18:00 UTC",
    location: "Zoom & YouTube Live",
    description: "Join Alex Rivera and Sofia Chen as they build and launch a digital product SaaS in under an hour. Discover token setup, custom checkouts, and Supabase optimizations.",
    rsvpCount: 245,
  },
  {
    id: "evt-2",
    title: "Spring Monolith Design Patterns Q&A",
    date: "2026-06-18",
    time: "15:00 UTC",
    location: "Discord Developer Stages",
    description: "An open questions panel regarding facade patterns, modular validation with ArchUnit, and database migration safety using Flyway.",
    rsvpCount: 189,
  },
];
