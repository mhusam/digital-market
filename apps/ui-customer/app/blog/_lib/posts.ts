export type BlogTone = "amber" | "cyan" | "green" | "rose" | "violet";

export interface BlogTag {
  slug: string;
  label: string;
  description: string;
  tone: BlogTone;
}

export interface BlogAuthor {
  id: string;
  name: string;
  handle: string;
  role: string;
  initials: string;
  tone: BlogTone;
}

export type BlogBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "code"; language: string; code: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  publishedAt: string;
  readingTimeMinutes: number;
  authorId: keyof typeof BLOG_AUTHORS;
  tags: Array<(typeof BLOG_TAGS)[number]["slug"]>;
  heroTone: BlogTone;
  blocks: BlogBlock[];
}

export const BLOG_TAGS = [
  {
    slug: "architecture",
    label: "Architecture",
    description: "Boundaries, stack decisions, and maintainable delivery.",
    tone: "cyan",
  },
  {
    slug: "delivery",
    label: "Delivery",
    description: "Checkout, fulfillment, and post-purchase operations.",
    tone: "amber",
  },
  {
    slug: "security",
    label: "Security",
    description: "Trust basics for digital goods and customer accounts.",
    tone: "green",
  },
  {
    slug: "licensing",
    label: "Licensing",
    description: "Plain-language license and handoff guidance.",
    tone: "rose",
  },
  {
    slug: "frontend",
    label: "Frontend",
    description: "Storefront UX, motion, accessibility, and Next.js notes.",
    tone: "violet",
  },
] as const satisfies BlogTag[];

export const BLOG_AUTHORS = {
  ops: {
    id: "ops",
    name: "PROGMAN Ops",
    handle: "ops@progman",
    role: "Marketplace operations",
    initials: "PO",
    tone: "amber",
  },
  engineering: {
    id: "engineering",
    name: "PROGMAN Engineering",
    handle: "build@progman",
    role: "Product engineering",
    initials: "PE",
    tone: "cyan",
  },
  support: {
    id: "support",
    name: "PROGMAN Support",
    handle: "care@progman",
    role: "Customer success",
    initials: "PS",
    tone: "green",
  },
} as const satisfies Record<string, BlogAuthor>;

export const BLOG_POSTS = [
  {
    slug: "what-to-check-before-buying-a-digital-solution",
    title: "What to check before buying a digital solution",
    excerpt:
      "A practical checklist for evaluating a downloadable product, project, or solution before it enters your delivery plan.",
    summary:
      "Use scope, ownership, license, deployment notes, and support expectations as the baseline before checkout.",
    publishedAt: "2026-05-14T09:00:00.000Z",
    readingTimeMinutes: 6,
    authorId: "support",
    tags: ["delivery", "licensing"],
    heroTone: "amber",
    blocks: [
      {
        type: "paragraph",
        text: "Digital products can save weeks when they match the work you actually need to ship. The failure mode is buying a promising package and discovering later that the license, deployment shape, or maintenance assumptions do not fit your team.",
      },
      {
        type: "heading",
        id: "start-with-the-job",
        text: "Start with the job, not the screenshot",
      },
      {
        type: "paragraph",
        text: "Before comparing listings, write down the workflow you expect the product to cover. Include the users, the systems it must connect to, and the parts your team is not willing to rebuild.",
      },
      {
        type: "list",
        items: [
          "Confirm the package format: product, project, or turnkey solution.",
          "Check whether deployment notes match your hosting environment.",
          "Read the license summary before adding the item to cart.",
          "Look for a clear handoff path: assets, credentials, docs, and support channel.",
        ],
      },
      {
        type: "callout",
        title: "Rule of thumb",
        text: "A good purchase should reduce ambiguity. If a listing creates more follow-up questions than it answers, pause and ask support before checkout.",
      },
      {
        type: "heading",
        id: "check-the-operational-edge",
        text: "Check the operational edge",
      },
      {
        type: "paragraph",
        text: "The product itself is only half the purchase. Delivery links, update expectations, refund terms, and post-purchase support are part of the operational surface. Treat them as requirements, not afterthoughts.",
      },
    ],
  },
  {
    slug: "instant-delivery-needs-boring-infrastructure",
    title: "Instant delivery needs boring infrastructure",
    excerpt:
      "The checkout moment feels simple only when payment capture, signed downloads, and order recovery are designed as one system.",
    summary:
      "Reliable fulfillment depends on boring primitives: idempotency, expiring links, audit trails, and customer-visible status.",
    publishedAt: "2026-05-02T11:30:00.000Z",
    readingTimeMinutes: 7,
    authorId: "engineering",
    tags: ["architecture", "delivery", "security"],
    heroTone: "cyan",
    blocks: [
      {
        type: "paragraph",
        text: "Instant delivery is not a button. It is a chain of small guarantees: the payment is captured once, the order is recoverable, the download is scoped to the buyer, and the UI tells the customer what happened.",
      },
      {
        type: "heading",
        id: "design-for-browser-failure",
        text: "Design for browser failure",
      },
      {
        type: "paragraph",
        text: "Payment providers can redirect successfully while a browser tab closes, network state changes, or a customer refreshes. Webhooks and idempotent capture paths protect the order from that kind of ordinary failure.",
      },
      {
        type: "code",
        language: "text",
        code: "checkout -> provider order -> approval -> capture\n                \u2514 webhook backup -> idempotent capture",
      },
      {
        type: "heading",
        id: "make-downloads-expire",
        text: "Make downloads expire",
      },
      {
        type: "paragraph",
        text: "Signed URLs should be temporary and tied to order state. That keeps delivery convenient for the customer while limiting accidental sharing and stale access.",
      },
      {
        type: "quote",
        text: "The best fulfillment flow is memorable to the operator and unremarkable to the buyer.",
        cite: "PROGMAN Engineering",
      },
    ],
  },
  {
    slug: "license-pages-should-be-short-enough-to-read",
    title: "License pages should be short enough to read",
    excerpt:
      "Digital product licenses fail when they are hidden, vague, or written for lawyers instead of buyers making delivery decisions.",
    summary:
      "License clarity improves conversion because it removes risk from the purchase decision.",
    publishedAt: "2026-04-18T08:15:00.000Z",
    readingTimeMinutes: 5,
    authorId: "support",
    tags: ["licensing", "delivery"],
    heroTone: "rose",
    blocks: [
      {
        type: "paragraph",
        text: "A buyer should know whether they can use a product for one internal project, a client project, or a commercial product before they reach checkout. If that answer is buried, the store is creating avoidable risk.",
      },
      {
        type: "heading",
        id: "state-the-operating-boundaries",
        text: "State the operating boundaries",
      },
      {
        type: "list",
        items: [
          "Who can use the product after purchase.",
          "Whether client delivery or resale is allowed.",
          "What happens when the product is modified.",
          "How updates and support are handled.",
        ],
      },
      {
        type: "paragraph",
        text: "Clear boundaries are not anti-sales. They reduce refund pressure, support ambiguity, and buyer hesitation.",
      },
      {
        type: "callout",
        title: "Implementation note",
        text: "Put the short license summary on the product page and link the full terms from the same surface. Do not force customers to hunt through footer links during checkout.",
      },
    ],
  },
  {
    slug: "why-the-storefront-stays-fast-when-the-catalog-grows",
    title: "Why the storefront stays fast when the catalog grows",
    excerpt:
      "A few frontend constraints keep catalog browsing responsive: server-rendered entry points, narrow client state, and CSS-first motion.",
    summary:
      "The customer app should spend JavaScript on workflow state, not decorative animation or duplicated catalog data.",
    publishedAt: "2026-04-04T10:00:00.000Z",
    readingTimeMinutes: 8,
    authorId: "engineering",
    tags: ["frontend", "architecture"],
    heroTone: "violet",
    blocks: [
      {
        type: "paragraph",
        text: "A marketplace can feel heavy long before it has a large catalog. The usual cause is not product count; it is mixing data fetching, animation, and state management into the same client-heavy surface.",
      },
      {
        type: "heading",
        id: "use-client-state-for-decisions",
        text: "Use client state for decisions",
      },
      {
        type: "paragraph",
        text: "Filtering, cart state, and account actions need client interactivity. Static editorial content, metadata, and navigational structure do not. Keeping those pieces server-rendered protects the initial route budget.",
      },
      {
        type: "heading",
        id: "let-css-carry-motion",
        text: "Let CSS carry motion",
      },
      {
        type: "paragraph",
        text: "Motion should clarify hierarchy and movement through the app. CSS transitions, scroll-driven reveals, and browser view transitions cover most of that without shipping a general animation runtime to every visitor.",
      },
      {
        type: "code",
        language: "css",
        code: "@media (prefers-reduced-motion: no-preference) {\n  .card { transition: transform 180ms ease; }\n  .card:hover { transform: translateY(-4px); }\n}",
      },
    ],
  },
  {
    slug: "signed-downloads-are-a-product-feature",
    title: "Signed downloads are a product feature",
    excerpt:
      "Secure file delivery is not just a backend concern. It shapes trust, support volume, and how customers recover purchases.",
    summary:
      "Short-lived links, account recovery, and clear status copy make digital delivery feel dependable.",
    publishedAt: "2026-03-20T14:45:00.000Z",
    readingTimeMinutes: 6,
    authorId: "ops",
    tags: ["security", "delivery"],
    heroTone: "green",
    blocks: [
      {
        type: "paragraph",
        text: "A download link is one of the most sensitive product surfaces in a digital store. Customers expect it to work immediately, and operators need enough control to prevent stale access from becoming a support or licensing problem.",
      },
      {
        type: "heading",
        id: "show-expiration-clearly",
        text: "Show expiration clearly",
      },
      {
        type: "paragraph",
        text: "Temporary links are only friendly when the customer understands them. Use plain copy near the action: links expire, they can be refreshed from the order page, and support can help if the order state looks wrong.",
      },
      {
        type: "list",
        items: [
          "Scope links to paid or confirmed orders.",
          "Record download events for audit and support.",
          "Let customers regenerate links from authenticated account pages.",
        ],
      },
      {
        type: "quote",
        text: "Security features become customer features when they explain themselves at the point of use.",
      },
    ],
  },
  {
    slug: "a-small-architecture-for-a-digital-marketplace",
    title: "A small architecture for a digital marketplace",
    excerpt:
      "The PROGMAN stack uses a modular monolith API and focused storefronts so product, payment, and delivery boundaries stay visible.",
    summary:
      "Small systems age better when module ownership is explicit and cross-module access goes through public facades.",
    publishedAt: "2026-02-28T12:00:00.000Z",
    readingTimeMinutes: 9,
    authorId: "engineering",
    tags: ["architecture", "security"],
    heroTone: "cyan",
    blocks: [
      {
        type: "paragraph",
        text: "Marketplaces look like one application, but they are a collection of ownership boundaries: identity, catalog, ordering, payments, fulfillment, and platform settings. Treating those boundaries seriously is what keeps future work understandable.",
      },
      {
        type: "heading",
        id: "modules-before-services",
        text: "Modules before services",
      },
      {
        type: "paragraph",
        text: "A modular monolith keeps deployment simple while forcing the codebase to express ownership. Public facades become the contract, and internal packages stay private to the owning module.",
      },
      {
        type: "heading",
        id: "separate-customer-and-admin-surfaces",
        text: "Separate customer and admin surfaces",
      },
      {
        type: "paragraph",
        text: "The admin app optimizes for operation and control. The customer app optimizes for trust, browsing, checkout, and recovery. Splitting those concerns makes each interface easier to reason about.",
      },
      {
        type: "callout",
        title: "Pragmatic boundary",
        text: "Do not turn every module into a network service until deployment independence is worth the operational cost.",
      },
    ],
  },
] as const satisfies BlogPost[];

export function getPublishedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogTag(slug: string): BlogTag | undefined {
  return BLOG_TAGS.find((tag) => tag.slug === slug);
}

export function getAuthor(post: BlogPost): BlogAuthor {
  return BLOG_AUTHORS[post.authorId];
}

export function getTagCounts(posts: BlogPost[] = getPublishedPosts()) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}

export function filterPostsByTag(tagSlug?: string): BlogPost[] {
  const posts = getPublishedPosts();
  if (!tagSlug || tagSlug === "all") return posts;
  return posts.filter((post) => post.tags.some((tag) => tag === tagSlug));
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const postTags = new Set(post.tags);
  return getPublishedPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.reduce(
        (total, tag) => total + (postTags.has(tag) ? 1 : 0),
        0,
      ),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((candidate) => candidate.post);
}

export function formatPostDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatPostMonth(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function getArchiveEntries(posts: BlogPost[] = getPublishedPosts()) {
  const counts = new Map<string, { label: string; count: number }>();

  for (const post of posts) {
    const key = post.publishedAt.slice(0, 7);
    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, { label: formatPostMonth(post.publishedAt), count: 1 });
    }
  }

  return Array.from(counts.entries()).map(([key, value]) => ({
    key,
    ...value,
  }));
}

export function groupPostsByMonth(posts: BlogPost[]) {
  const groups = new Map<string, { label: string; posts: BlogPost[] }>();

  for (const post of posts) {
    const key = post.publishedAt.slice(0, 7);
    const existing = groups.get(key);
    if (existing) {
      existing.posts.push(post);
    } else {
      groups.set(key, {
        label: formatPostMonth(post.publishedAt),
        posts: [post],
      });
    }
  }

  return Array.from(groups.entries()).map(([key, value]) => ({
    key,
    ...value,
  }));
}

export function getTableOfContents(post: BlogPost) {
  return post.blocks
    .filter((block): block is Extract<BlogBlock, { type: "heading" }> =>
      block.type === "heading",
    )
    .map((block) => ({ id: block.id, text: block.text }));
}
