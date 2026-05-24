# PROGMAN Digital Marketplace - Rebuild Plan (`ui-progman`)

This document serves as the master engineering plan for the new `ui-progman` web client, which rebuilds the developer-focused digital products marketplace with rich modern aesthetics, micro-animations, and clean modular pages.

---

## 1. Brand Identity & Design System

The visual design is **Editorial Tech**—combining a paper-like high-contrast layout with vibrant, retro-futuristic digital accents. It feels clean and structured yet alive with interactions.

### Typography
- **Brand Logo Font**: `Audiowide` (from Google Fonts)—used for the logotype and signature headings.
- **Handwritten Accent Font**: `Caveat` (from Google Fonts)—used for editorial footnotes, highlight taglines, and informal notes.
- **Main Interface Font**: `DM Sans` (from Google Fonts)—used for all body copy, UI elements, inputs, and primary navigation.

### Color Palette
- **Editorial Light Mode**:
  - Background: Ink-warm paper `#f6f4ef`
  - Foreground: Deep ink charcoal `#0b0b10`
  - Cards: Crisp white `#ffffff`
  - Sunken Surfaces: Muted ivory `#efeae0`
  - Borders/Lines: Hairline sand `#e3ddd0`
- **Editorial Dark Mode**:
  - Background: Pitch obsidian `#0a0a0c`
  - Foreground: Bone ivory `#f4f1e8`
  - Cards: Tech grey `#111114`
  - Sunken Surfaces: Ink black `#06060a`
  - Borders/Lines: Deep obsidian `#232329`
- **Signature Accents**:
  - Primary Accent (Electric Orange): `#ff5b1f` (Light) / `#ff6b35` (Dark)
  - Secondary Accent (Violet): `#8b5cf6` (Light) / `#a78bfa` (Dark)
  - Tertiary Accent (Cyan): `#06b6d4` (Light) / `#22d3ee` (Dark)
  - Highlight Accent (Lime): `#c8f23f` (Light) / `#d4ff4a` (Dark)

### Layout & Global Aesthetics
- **Grain Overlay**: A subtle CSS noise/grain texture (`.grain-bg` using a tiny SVG data URI) layered over sections to give a premium print feel.
- **Mesh Gradients**: Frosted, glowing backdrop blobs (`.mesh-bg` with blur filters and color mix opacity) centered behind headers and primary call-to-actions.
- **Hairline Dividers**: Fine, transparent rules (`1px` with `color-mix(in oklab, var(--foreground) 12%, transparent)`) instead of heavy border styles.

---

## 2. Technology Stack & Animation Libraries

To achieve top-tier aesthetics and high-performance animations, `ui-progman` will utilize:

1. **Next.js (App Router)**: File-based routing, SEO optimization, and hybrid server/client-side rendering.
2. **Tailwind CSS (v4)**: Modern CSS utility framework using CSS-native variables.
3. **Shadcn UI**: Unstyled accessible components (Radix Primitives) customized with custom editorial typography.
4. **Animate UI** ([animate-ui.com](https://animate-ui.com/)): Specialized micro-animation states, custom interactive buttons, magnetic elements, and smooth route transitions.
5. **Magic UI** ([magicui.design](https://magicui.design/)): Premium visual decorations such as:
   - **Border Beams**: Glimmering paths traced around cards on hover.
   - **Marquee Tickers**: Smooth, continuous-loop text/logos (used for promotional headers).
   - **Retro Grids**: Grid perspective lines for hero sections.
   - **Neon Glows / Particle Effects**: Backdrop interactions.

---

## 3. Global Structural Components

### 3.1. Root Layout (`app/layout.tsx`)
- Loads `DM Sans`, `Caveat`, and `Audiowide` fonts.
- Implements `ThemeProvider` for light/dark modes.
- Renders the global `<Navbar />`, `<main className="flex-grow">`, `<Footer />`, and custom notification toasts (`Toaster`).

### 3.2. Global Navbar (`components/layout/Navbar.tsx`)
- **Logo**: Features the animated rotating `logo-2.svg` followed by "PROGMAN" in `Audiowide` typeface with a subtle `.brand-shimmer` gradient.
- **Nav Pill**: A floating, capsule-style navigation container with smooth hover transitions for primary routes: Home, Products, Trends, Resources, News, Events, and Blog.
- **App Launcher ("Universe" Menu)**:
  - Triggered by a button with a `LayoutGrid` icon that morphs to a close `X`.
  - Opens a full-screen overlay backdrop (`fixed inset-0 bg-background/95 backdrop-blur-2xl`) containing a gorgeous Bento grid of shortcuts.
  - Interactive grid elements glow with custom accent colors on hover using `Magic UI` light-beams.

### 3.3. Global Footer (`components/layout/Footer.tsx`)
- Structured in clean, minimalist columns.
- Features developer credits, copyright, social links, newsletter input, and a breathing "live status" indicator pulse dot (`.pulse-dot`).

---

## 4. Blueprint for all 27 Pages & Routes

Below are the detailed implementation blueprints for all 27 subpages mapped from `ui-customer/app`.

### 1. Home Page (`/` or `app/page.tsx`)
- **Purpose**: First landing point for customers, introducing the platform and highlighting top products and resources.
- **Sections**:
  1. *Hero Banner*: Retro Grid backdrop (`Magic UI`), custom taglines ("Digital made simple.") using `Caveat`, large bold title, and search input with instant results popup.
  2. *KPI Strip*: 4 columns detailing customer statistics (e.g. 12.5k Builders) with hover-reveal neon dots.
  3. *Pillars / Thesis*: Informative cards detailing why PROGMAN is unique. Uses `.surface-edge` with hover-translate-y animations.
  4. *Bento Categories*: Grid layout highlighting 6 principal craft categories. Large bento slots use `Magic UI` border beams.
  5. *Trending Shelf*: Top-rated products displayed in detailed grid cards.
  6. *Final CTA*: Deep dark-colored grid panel with circular glowing background overlays (`blur-3xl`).
- **Animations**: Fade-up animations for hero content (`.fade-up`), scrolling marquee ticker strip (`.marquee`), and scale transitions for product cards.

### 2. Products List Page (`/products` or `app/products/page.tsx`)
- **Purpose**: Search, filter, and view the entire catalog of resources, kits, and software.
- **Key Sections**:
  - Filter Sidebar: Collapsible sidebar on mobile, sticky on desktop, allowing filter by price (free vs paid), category, tags, and creator.
  - Sorting Bar: Quick sort by popularity, rating, newest, and price.
  - Product Grid: Cards showing thumbnail, creator, badge, stars, and cart button.
- **Animations**: Grid layout transitions using `Animate UI` staggered entrance; interactive hover cards with border glows.

### 3. Product Details Page (`/products/[id]` / `/product-details`)
- **Purpose**: In-depth product description, pricing tier options, creator profiles, reviews, and dependencies.
- **Key Sections**:
  - Product Hero: Title, rating, creator info, categories, and direct action tabs.
  - Media Gallery: Carousel (`Animate UI`) with video demo, screenshots, and zoom options.
  - Purchase Card: Floating pricing selector box, buy buttons, feature checkmarks, and license details.
  - Reviews Section: Ratings, testimonials, and customer-written reviews.
- **Animations**: Smooth switching between gallery items; loading skeleton transitions (`Shadcn`); buy button press bounce.

### 4. Categories Page (`/categories/[slug]` or `app/categories/[slug]/page.tsx`)
- **Purpose**: Filtered listing of templates and tools matching a specific craft category (e.g., Boilerplates, Design Systems).
- **Key Sections**:
  - Category Header: Custom icon, title in `Audiowide`, brief description, and total product count.
  - Filtered Grid: Products matching the selected category.
- **Animations**: Staggered card reveals; transition indicators when switching between categories.

### 5. AI Prompts Page (`/ai-prompts` or `app/ai-prompts/page.tsx`)
- **Purpose**: A repository of structured prompts for LLMs (Claude, GPT) and image models (Midjourney, Flux).
- **Key Sections**:
  - Category Selector: Tab options (e.g., Code, Copywriting, Vector Art, Image Gen).
  - Prompt Cards: Expandable cards displaying prompt instructions.
  - Copy Button: Interactive button showing success state animations when clicked.
- **Animations**: Slide-down expansion for prompt details; scale-up hover feedback on cards.

### 6. Cheat Sheets Page (`/cheat-sheets` or `app/cheat-sheets/page.tsx`)
- **Purpose**: Fast-reference sheets for developer frameworks (e.g. Next.js, Tailwind v4, Git commands).
- **Key Sections**:
  - Cheat Sheet Grid: Code blocks and text side-by-side.
  - Search Input: Interactive instantaneous filter by command/utility keyword.
- **Animations**: Code block fade-in on keyword highlight; keyboard shortcut triggers showing feedback.

### 7. Showcase Page (`/showcase` or `app/showcase/page.tsx`)
- **Purpose**: A list of external websites and applications built by creators using PROGMAN boilerplates.
- **Key Sections**:
  - Project Cards: High-quality site mockups, description, tags, developer profiles, and external link.
  - Submission CTA: Floating action button for users to submit their own projects.
- **Animations**: Hover card reveal with detailed stats overlay; project grid zoom transitions.

### 8. Tech Glossary Page (`/tech-glossary` or `app/tech-glossary/page.tsx`)
- **Purpose**: Educational definitions of engineering concepts and acronyms.
- **Key Sections**:
  - Alphabet Index: Header line with A-Z navigation.
  - Term List: Definition blocks styled with clean monospace code badges.
- **Animations**: Scroll-to-section smooth transitions; highlighter underline animations on term focus.

### 9. Leaderboard Page (`/leaderboard` or `app/leaderboard/page.tsx`)
- **Purpose**: Gamified board highlighting the top-selling creators, most downloaded tools, and most active forum members.
- **Key Sections**:
  - Top 3 Podium: Elegant columns for gold, silver, and bronze rankings.
  - Rank Table: List showing username, products, total sales/downloads, and profile badges.
- **Animations**: Ranking cards slide-up from bottom to top; number increment counters for stats.

### 10. Changelog Page (`/changelog` or `app/changelog/page.tsx`)
- **Purpose**: chronological log of product updates, feature releases, and monorepo code updates.
- **Key Sections**:
  - Timeline Axis: Vertical line tracking release dates.
  - Release Posts: Version tags, summary list of additions, fixes, and improvements (styled in Markdown).
- **Animations**: Scroll-triggered opacity fades for older releases; expand/collapse details.

### 11. Jobs Board Page (`/jobs` or `app/jobs/page.tsx`)
- **Purpose**: Developer opportunities, contract roles, and boilerplate creator hiring options.
- **Key Sections**:
  - Filters: Location (Remote/Onsite), Type (Fulltime, Contract), and Salary Range.
  - Job List: Cards detailing company name, logo, position title, description, and "Apply" buttons.
- **Animations**: Smooth search query transitions; hover scale-up on company profiles.

### 12. Deals & Offers Page (`/deals` or `app/deals/page.tsx`)
- **Purpose**: Discounts on dev services (Vercel, Supabase, AWS), courses, and hardware.
- **Key Sections**:
  - Coupon Grid: Discount banners featuring code copy buttons and external affiliate URLs.
  - Interactive wheel/selector: Simple games to win specific vouchers.
- **Animations**: Sparkle effect (using `Magic UI`) on discount card copy; countdown timers for expiring coupons.

### 13. Tech Stacks Page (`/tech-stacks` or `app/tech-stacks/page.tsx`)
- **Purpose**: Standard templates and stack blueprints (e.g. Next.js + Prisma + Tailwind v4 starter).
- **Key Sections**:
  - Stacks Diagram: Interactive visual dependency trees (React → Tailwind → Postgres).
  - One-click Install CLI commands copy codes.
- **Animations**: Interactive node-connecting lines; copy code success visual ripple.

### 14. Podcasts & Media Page (`/podcasts` or `app/podcasts/page.tsx`)
- **Purpose**: Video tutorials, podcasts, and video series about building digital products.
- **Key Sections**:
  - Featured Video Player: Embedded responsive player.
  - Episodes Playlist: Audio preview files with custom wave representations.
- **Animations**: Smooth play/pause custom animations; wave visualization shifts.

### 15. Open Source Page (`/open-source` or `app/open-source/page.tsx`)
- **Purpose**: Highlighting community-driven, MIT-licensed products hosted on GitHub.
- **Key Sections**:
  - Repo Cards: Live counts of GitHub stars, forks, and issues.
  - Code Contribution Guides.
- **Animations**: Star counts fetching with live-loader feedback; GitHub logo rotation.

### 16. Community Page (`/community` or `app/community/page.tsx`)
- **Purpose**: Creator discussions, forums, and Q&A boards.
- **Key Sections**:
  - Active Threads: Thread lists, reply numbers, user avatars.
  - Start Thread Form: Custom inputs.
- **Animations**: Bubble pop notification indicators; slide-in replies.

### 17. Blog Page (`/blog` or `app/blog/page.tsx`)
- **Purpose**: Engineering playbooks, product marketing advice, and creator case studies.
- **Key Sections**:
  - Featured Article: Large landing banner with high-contrast text.
  - Article Grid: Category tabs, author details, reading estimates.
- **Animations**: Image hover pan/zoom; card focus outlines.

### 18. Resources Page (`/resources` or `app/resources/page.tsx`)
- **Purpose**: Free templates, UI libraries, SVG design assets, and font files.
- **Key Sections**:
  - Asset Download Cards: Custom inline download triggers.
  - Live preview drawers.
- **Animations**: File-download progress animations; preview drawer sliding transitions.

### 19. News Page (`/news` or `app/news/page.tsx`)
- **Purpose**: Live developer-centric newsletter and industry announcements.
- **Key Sections**:
  - Live Ticker: Headline scrolling strip.
  - News Articles: Brief articles categorized with tag chips.
- **Animations**: Sliding tickers; live alert pulse animations.

### 20. Events Page (`/events` or `app/events/page.tsx`)
- **Purpose**: Live meetups, hackathons, and product launch webinars.
- **Key Sections**:
  - Calendar View: Event blocks mapped on dates.
  - Event Details: Date, time, Google Calendar addition, and RSVP registers.
- **Animations**: Calendar month shift sliding; RSVP confirmation checks.

### 21. Cart Page (`/cart` or `app/cart/page.tsx`)
- **Purpose**: Shopping cart checkout review of digital purchases.
- **Key Sections**:
  - Cart Items List: Product rows with remove buttons.
  - Total Summary Card: Items total, taxes, discount voucher input, and proceed buttons.
- **Animations**: Swipe-to-remove actions on items; price updating increments.

### 22. Checkout Page (`/checkout` or `app/checkout/page.tsx`)
- **Purpose**: Billing setup and payments integration (PayPal or Bank Transfer).
- **Key Sections**:
  - Step Indicators: Customer details → Payment details → Confirmation.
  - Payment Gateways: PayPal integrations, Bank Reference selectors.
- **Animations**: Step transition fades; processing payment spinners.

### 23. Account Profile Page (`/account` or `app/account/page.tsx`)
- **Purpose**: Customer purchased assets, license keys, and personal credentials settings.
- **Key Sections**:
  - Purchases List: Direct download keys and receipt downloads.
  - Profile Settings Form: Name, email, passwords, dark mode preferences.
- **Animations**: Input focus borders; instant copy to clipboard loops for license keys.

### 24. Login Page (`/login` or `app/login/page.tsx`)
- **Purpose**: User login credentials form.
- **Key Sections**:
  - Credentials Form: Input fields with inline error highlights.
  - OAuth login buttons: Google login options.
- **Animations**: Shake animation on incorrect submission; button load indicator.

### 25. Register Page (`/register` or `app/register/page.tsx`)
- **Purpose**: New user signup.
- **Key Sections**:
  - Signup Form: Name, email, passwords, and agreement checks.
- **Animations**: Password strength indicator bar transition; successful account redirect fades.

### 26. Forgot Password Page (`/forgot-password` or `app/forgot-password/page.tsx`)
- **Purpose**: Account reset recovery emails.
- **Key Sections**:
  - Email Request Form: Send link inputs.
- **Animations**: Mail success envelope sending animations.

### 27. Search Page (`/search` or `app/search/page.tsx`)
- **Purpose**: Comprehensive results page for site-wide queries.
- **Key Sections**:
  - Results Tabs: Filter results by products, articles, glossary terms, or forum threads.
  - Grid View: Ranked list matches.
- **Animations**: Real-time debounce autocomplete drops; page result fades.

### 28. Trends Page (`/trends` or `app/trends/page.tsx`)
- **Purpose**: Analytics charts showing search queries, popular categories, and trending products.
- **Key Sections**:
  - Trends Chart: Interactive Line charts using Shadcn/Recharts representing product analytics.
- **Animations**: Dynamic line chart animations on load; tooltip fade-in.

---

## 5. Styling Guidelines & Animation Details

When building out components, developers must strictly adhere to the following rules to maintain the premium feel:

1. **Card Hover Lift**:
   Always apply the `.surface-edge` style to standard cards.
   ```css
   .surface-edge {
     background: var(--card);
     border: 1px solid var(--border);
     box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 12px 30px -18px rgba(0,0,0,0.25);
     transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms;
   }
   .surface-edge:hover {
     transform: translateY(-3px);
     box-shadow: 0 1px 0 rgba(0,0,0,0.06), 0 28px 48px -22px rgba(0,0,0,0.32);
     border-color: var(--accent-electric);
   }
   ```
2. **Text Shimmer**:
   Use `.brand-shimmer` for title highlights to draw focus.
3. **Magic UI Integrations**:
   - Wrap grids in `<RetroGrid />` or use a `<BorderBeam />` around premium products.
   - Use `<Marquee />` in news headers for industry announcements.
4. **Animate UI Buttons**:
   - Use magnetic buttons for high-priority CTA interactions.
   - Use interactive icon-rotations on navigation pills.
