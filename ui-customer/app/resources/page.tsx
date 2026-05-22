import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Stack — Resources | PROGMAN",
  description:
    "A hand-kept directory of the tools, references, and libraries that working developers actually use.",
};

interface Resource {
  name: string;
  url: string;
  desc: string;
}

interface Section {
  id: string;
  title: string;
  blurb: string;
  resources: Resource[];
}

const SECTIONS: Section[] = [
  {
    id: "frontend",
    title: "Frontend Frameworks",
    blurb: "What people actually reach for when they open a new repo.",
    resources: [
      { name: "React", url: "https://react.dev", desc: "The library that swallowed the frontend." },
      { name: "Next.js", url: "https://nextjs.org", desc: "Production React, by way of Vercel." },
      { name: "Vue.js", url: "https://vuejs.org", desc: "Approachable, progressive, still going strong." },
      { name: "Svelte", url: "https://svelte.dev", desc: "Moves the work to compile time." },
      { name: "Astro", url: "https://astro.build", desc: "Content-first; ship less JavaScript on purpose." },
      { name: "Solid.js", url: "https://www.solidjs.com", desc: "React's syntax, finer-grained reactivity." },
      { name: "Remix", url: "https://remix.run", desc: "Full-stack via web standards." },
      { name: "Angular", url: "https://angular.dev", desc: "Opinionated, batteries-included, enterprise." },
    ],
  },
  {
    id: "css",
    title: "CSS & Design Systems",
    blurb: "Styling decisions and the components that already made them.",
    resources: [
      { name: "Tailwind CSS", url: "https://tailwindcss.com", desc: "Utility-first; bring your own taste." },
      { name: "shadcn/ui", url: "https://ui.shadcn.com", desc: "Copy-paste components you actually own." },
      { name: "Radix UI", url: "https://www.radix-ui.com", desc: "Accessible, unstyled UI primitives." },
      { name: "Framer Motion", url: "https://www.framer.com/motion", desc: "Motion for React without the math." },
      { name: "Open Props", url: "https://open-props.style", desc: "CSS variables as a design token system." },
      { name: "Panda CSS", url: "https://panda-css.com", desc: "Build-time CSS-in-JS, zero runtime." },
      { name: "Animate UI", url: "https://animate-ui.com", desc: "Animated React component distribution." },
      { name: "CSS-Tricks", url: "https://css-tricks.com", desc: "The reference everyone secretly still reads." },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    blurb: "From the server side, where business logic still lives.",
    resources: [
      { name: "Spring Boot", url: "https://spring.io/projects/spring-boot", desc: "Production-grade Spring, minimal config." },
      { name: "Hono", url: "https://hono.dev", desc: "Small, fast, edge-friendly web framework." },
      { name: "Fastify", url: "https://fastify.dev", desc: "Low-overhead Node.js framework." },
      { name: "Express.js", url: "https://expressjs.com", desc: "The default that refuses to die." },
      { name: "tRPC", url: "https://trpc.io", desc: "End-to-end typesafe APIs, no schemas." },
      { name: "GraphQL", url: "https://graphql.org", desc: "A query language for your API." },
      { name: "OpenAPI", url: "https://swagger.io", desc: "REST contracts, generated tooling." },
      { name: "Postman", url: "https://www.postman.com", desc: "Where APIs go to be poked at." },
    ],
  },
  {
    id: "data",
    title: "Databases & Data Layer",
    blurb: "Persistence, with all the tradeoffs that implies.",
    resources: [
      { name: "PostgreSQL", url: "https://www.postgresql.org", desc: "The correct answer most of the time." },
      { name: "Supabase", url: "https://supabase.com", desc: "Postgres plus the things around Postgres." },
      { name: "Neon", url: "https://neon.tech", desc: "Serverless Postgres with branching." },
      { name: "Prisma", url: "https://www.prisma.io", desc: "Type-safe ORM, schema-first." },
      { name: "Drizzle", url: "https://orm.drizzle.team", desc: "TypeScript ORM that reads like SQL." },
      { name: "Redis", url: "https://redis.io", desc: "In-memory store for the hot path." },
      { name: "MongoDB", url: "https://www.mongodb.com", desc: "Document store for less-relational shapes." },
      { name: "Turso", url: "https://turso.tech", desc: "SQLite, but distributed at the edge." },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    blurb: "Getting code from your laptop to other people's screens.",
    resources: [
      { name: "Vercel", url: "https://vercel.com", desc: "Git push, get a URL." },
      { name: "Cloudflare", url: "https://www.cloudflare.com", desc: "Edge runtime, CDN, and increasingly everything." },
      { name: "Docker", url: "https://www.docker.com", desc: "Containers, still the lingua franca." },
      { name: "GitHub Actions", url: "https://github.com/features/actions", desc: "CI/CD where your code already lives." },
      { name: "Terraform", url: "https://www.terraform.io", desc: "Infrastructure declared, not clicked." },
      { name: "Railway", url: "https://railway.app", desc: "The middle ground between Vercel and Kubernetes." },
      { name: "Fly.io", url: "https://fly.io", desc: "Run full-stack apps near your users." },
      { name: "AWS", url: "https://aws.amazon.com", desc: "The default no one regrets — or admits liking." },
    ],
  },
  {
    id: "auth",
    title: "Auth & Security",
    blurb: "The part you keep wanting to outsource — sometimes correctly.",
    resources: [
      { name: "Auth.js", url: "https://authjs.dev", desc: "Open-source auth, especially for Next.js." },
      { name: "Clerk", url: "https://clerk.com", desc: "Drop-in auth, sessions, and user management." },
      { name: "Lucia", url: "https://lucia-auth.com", desc: "Session-based auth, runtime-agnostic." },
      { name: "Keycloak", url: "https://www.keycloak.org", desc: "Enterprise IAM, self-hostable." },
      { name: "OWASP", url: "https://owasp.org", desc: "Read it before something bad happens." },
      { name: "JWT.io", url: "https://jwt.io", desc: "Decode and verify JSON Web Tokens." },
    ],
  },
  {
    id: "ai",
    title: "AI & Models",
    blurb: "What's worth integrating, what's worth ignoring.",
    resources: [
      { name: "Anthropic", url: "https://docs.anthropic.com", desc: "Claude, with a real eng-focused SDK." },
      { name: "OpenAI", url: "https://platform.openai.com", desc: "GPT, embeddings, audio, the rest." },
      { name: "Hugging Face", url: "https://huggingface.co", desc: "Models, datasets, and the community." },
      { name: "Vercel AI SDK", url: "https://sdk.vercel.ai", desc: "Streaming UI helpers, provider-agnostic." },
      { name: "LangChain", url: "https://www.langchain.com", desc: "Glue for LLM apps; opinions vary." },
      { name: "Ollama", url: "https://ollama.com", desc: "Run open-weights models on your laptop." },
      { name: "Replicate", url: "https://replicate.com", desc: "Open-source ML behind a cloud API." },
      { name: "Google AI Studio", url: "https://aistudio.google.com", desc: "Gemini, with a serviceable playground." },
    ],
  },
  {
    id: "design",
    title: "Design & Prototyping",
    blurb: "Tools for thinking visually before you start typing.",
    resources: [
      { name: "Figma", url: "https://www.figma.com", desc: "Where the design happens." },
      { name: "Mobbin", url: "https://mobbin.com", desc: "Real-world UI references, well-tagged." },
      { name: "Dribbble", url: "https://dribbble.com", desc: "Eye candy, used in moderation." },
      { name: "Excalidraw", url: "https://excalidraw.com", desc: "Hand-drawn diagrams without ceremony." },
      { name: "Coolors", url: "https://coolors.co", desc: "Palette generator that doesn't waste your time." },
      { name: "Heroicons", url: "https://heroicons.com", desc: "Hand-crafted SVGs from the Tailwind team." },
      { name: "Lucide", url: "https://lucide.dev", desc: "Open-source icon set with broad coverage." },
      { name: "Unsplash", url: "https://unsplash.com", desc: "Free, high-quality photography." },
    ],
  },
  {
    id: "testing",
    title: "Testing & Quality",
    blurb: "Caught early, cheap. Caught in prod, expensive.",
    resources: [
      { name: "Playwright", url: "https://playwright.dev", desc: "Reliable E2E across modern browsers." },
      { name: "Vitest", url: "https://vitest.dev", desc: "Fast, Vite-native unit testing." },
      { name: "Testing Library", url: "https://testing-library.com", desc: "Test what the user sees, not the markup." },
      { name: "Jest", url: "https://jestjs.io", desc: "Still the workhorse in many codebases." },
      { name: "Cypress", url: "https://www.cypress.io", desc: "Browser testing with great DX." },
      { name: "Storybook", url: "https://storybook.js.org", desc: "Build and document components in isolation." },
    ],
  },
  {
    id: "tools",
    title: "Tools & Utilities",
    blurb: "Quietly making the working day shorter.",
    resources: [
      { name: "VS Code", url: "https://code.visualstudio.com", desc: "The default editor, for better and worse." },
      { name: "Raycast", url: "https://www.raycast.com", desc: "Launcher, snippets, productivity glue." },
      { name: "Warp", url: "https://www.warp.dev", desc: "Modern terminal with AI built in." },
      { name: "GitHub", url: "https://github.com", desc: "Where your code lives, whether you like it." },
      { name: "RegExr", url: "https://regexr.com", desc: "Build and test regular expressions live." },
      { name: "Can I Use", url: "https://caniuse.com", desc: "Browser support, settled in seconds." },
      { name: "Bundlephobia", url: "https://bundlephobia.com", desc: "Know the cost before you npm install." },
      { name: "Transform Tools", url: "https://transform.tools", desc: "JSON to TS, GraphQL, and back." },
    ],
  },
  {
    id: "learn",
    title: "Learning & Reference",
    blurb: "Where to look when you're stuck and Stack Overflow won't do.",
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org", desc: "The web platform reference. Period." },
      { name: "web.dev", url: "https://web.dev", desc: "Modern web practices, Google-edited." },
      { name: "JavaScript.info", url: "https://javascript.info", desc: "The modern JavaScript tutorial." },
      { name: "Patterns.dev", url: "https://www.patterns.dev", desc: "Modern web app patterns explained." },
      { name: "Roadmap.sh", url: "https://roadmap.sh", desc: "Community-driven learning paths." },
      { name: "DevDocs", url: "https://devdocs.io", desc: "Offline-capable API documentation browser." },
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org", desc: "Free, project-based curriculum." },
      { name: "The Odin Project", url: "https://www.theodinproject.com", desc: "Full-stack curriculum, opinionated." },
    ],
  },
  {
    id: "mobile",
    title: "Mobile & Native",
    blurb: "When the browser isn't the right surface.",
    resources: [
      { name: "Expo", url: "https://expo.dev", desc: "React Native, without the friction." },
      { name: "React Native", url: "https://reactnative.dev", desc: "Native UIs with React semantics." },
      { name: "Flutter", url: "https://flutter.dev", desc: "Cross-platform UI from a single codebase." },
      { name: "SwiftUI", url: "https://developer.apple.com/xcode/swiftui", desc: "Apple's declarative UI for native apps." },
      { name: "Capacitor", url: "https://capacitorjs.com", desc: "Web apps wrapped in a native runtime." },
      { name: "Tauri", url: "https://tauri.app", desc: "Smaller, safer desktop apps via Rust." },
    ],
  },
  {
    id: "commerce",
    title: "Payments & Commerce",
    blurb: "Moving money is, somehow, still hard.",
    resources: [
      { name: "Stripe", url: "https://stripe.com", desc: "Payments for software companies." },
      { name: "PayPal Developer", url: "https://developer.paypal.com", desc: "Checkout, subscriptions, payouts." },
      { name: "Lemon Squeezy", url: "https://www.lemonsqueezy.com", desc: "Payments and tax for digital goods." },
      { name: "Paddle", url: "https://www.paddle.com", desc: "Merchant of record for SaaS." },
      { name: "Gumroad", url: "https://gumroad.com", desc: "Simple commerce for creators." },
      { name: "Shopify Dev", url: "https://shopify.dev", desc: "Custom storefronts on Shopify." },
    ],
  },
  {
    id: "observe",
    title: "Monitoring & Analytics",
    blurb: "Knowing whether the thing is actually working.",
    resources: [
      { name: "Sentry", url: "https://sentry.io", desc: "Errors and performance, in context." },
      { name: "PostHog", url: "https://posthog.com", desc: "Product analytics, flags, replays — open-source." },
      { name: "Plausible", url: "https://plausible.io", desc: "Privacy-friendly analytics, simple." },
      { name: "Vercel Analytics", url: "https://vercel.com/analytics", desc: "RUM with no extra setup on Vercel." },
      { name: "Grafana", url: "https://grafana.com", desc: "Dashboards for everything that emits metrics." },
      { name: "LogRocket", url: "https://logrocket.com", desc: "Session replay and frontend monitoring." },
    ],
  },
];

const TOTAL = SECTIONS.reduce((sum, s) => sum + s.resources.length, 0);
const ISSUE_DATE = "May 22, 2026";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ResourcesPage() {
  return (
    <div className="page-container py-16 md:py-24">
      <header className="mb-16 border-b border-foreground pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          <span>The Directory</span>
          <span>{TOTAL} entries · {SECTIONS.length} sections</span>
          <span>Revised {ISSUE_DATE}</span>
        </div>
        <h1 className="mt-8 text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl">
          The Stack
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A hand-kept directory of the tools, references, and libraries that working developers actually open. No affiliates. No rankings. Just an opinion, kept current.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-x-16">
        <nav aria-label="Sections" className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="border-b border-foreground pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
            Contents
          </h2>
          <ol className="mt-4 flex flex-col">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-baseline justify-between gap-3 border-b border-[var(--hairline)] py-2 text-sm text-foreground transition-colors hover:text-[var(--accent-electric)]"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="underline-offset-4 group-hover:underline">{s.title}</span>
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                    {s.resources.length}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-20">
          {SECTIONS.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <div className="mb-6 border-t border-foreground pt-6">
                <div className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span>§ {String(i + 1).padStart(2, "0")}</span>
                  <span>{section.resources.length} entries</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-foreground md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {section.blurb}
                </p>
              </div>

              <ul>
                {section.resources.map((r, idx) => (
                  <li
                    key={r.url}
                    className="border-b border-[var(--hairline)] last:border-b-0"
                  >
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-[2rem_1fr] items-baseline gap-x-5 py-4 md:grid-cols-[2.5rem_10rem_1fr_auto] md:gap-x-8 md:py-5"
                    >
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <span className="text-base font-bold tracking-tight text-foreground underline-offset-4 group-hover:underline md:text-lg">
                        {r.name}
                      </span>

                      <span className="col-span-2 text-sm leading-relaxed text-muted-foreground md:col-span-1">
                        {r.desc}
                      </span>

                      <span className="col-span-2 mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:col-span-1 md:mt-0 md:justify-self-end md:text-right">
                        {hostnameOf(r.url)} <span className="text-[var(--accent-electric)]">↗</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-3 border-t border-foreground pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>End of directory</span>
        <span>Missing something? · editors@progman</span>
      </footer>
    </div>
  );
}
