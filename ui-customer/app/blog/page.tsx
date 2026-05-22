import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import {
  BLOG_TAGS,
  filterPostsByTag,
  formatPostDate,
  getAuthor,
  getBlogTag,
  getPublishedPosts,
  getTagCounts,
  type BlogPost,
} from "./_lib/posts";

interface BlogPageProps {
  searchParams?: Promise<{ tag?: string | string[] }>;
}

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Field notes from the PROGMAN team on shipping digital products, delivery, licensing, and storefront UX.",
};

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function tagHref(slug: string) {
  return slug === "all" ? "/blog" : `/blog?tag=${encodeURIComponent(slug)}`;
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const author = getAuthor(post);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:border-foreground/30 md:p-12"
    >
      {/* Decorative number */}
      <span className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
        Editor’s pick — 01
      </span>

      {/* Soft accent backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full bg-[var(--accent-electric)] opacity-[0.06] blur-3xl transition-opacity duration-700 group-hover:opacity-[0.14]"
      />

      <div className="relative max-w-3xl">
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {formatPostDate(post.publishedAt)}
          </time>
          <span className="size-1 rounded-full bg-muted-foreground/50" />
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={11} /> {post.readingTimeMinutes} min read
          </span>
        </div>

        <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-foreground transition-colors group-hover:text-[var(--accent-electric)]">
          {post.title}
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
          {post.excerpt}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-semibold text-muted-foreground">
            By <span className="text-foreground">{author.handle}</span>
            <span className="mx-2 text-muted-foreground/50">·</span>
            <span className="text-muted-foreground">{author.role}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
            Read article
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostRow({ post, index }: { post: BlogPost; index: number }) {
  const author = getAuthor(post);
  const primaryTag = post.tags[0] ? getBlogTag(post.tags[0]) : undefined;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-border py-8 transition-colors hover:bg-card/40 md:gap-8 md:py-10"
    >
      {/* Index */}
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground tabular-nums md:text-xs">
        {String(index).padStart(2, "0")}
      </span>

      {/* Body */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {formatPostDate(post.publishedAt)}
          </time>
          {primaryTag && (
            <>
              <span className="size-1 rounded-full bg-muted-foreground/40" />
              <span className="text-[var(--accent-electric)]">
                {primaryTag.label}
              </span>
            </>
          )}
          <span className="size-1 rounded-full bg-muted-foreground/40" />
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={10} /> {post.readingTimeMinutes} min
          </span>
        </div>

        <h3 className="mt-3 text-xl font-extrabold leading-tight tracking-[-0.02em] text-foreground transition-colors group-hover:text-[var(--accent-electric)] md:text-2xl">
          {post.title}
        </h3>

        <p className="mt-2.5 line-clamp-2 max-w-2xl text-sm leading-6 text-muted-foreground md:text-[15px]">
          {post.summary}
        </p>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {author.handle}{" "}
          <span className="text-muted-foreground/50">— {author.role}</span>
        </p>
      </div>

      {/* Arrow */}
      <ArrowUpRight
        size={20}
        className="mt-1 hidden text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-electric)] md:block"
      />
    </Link>
  );
}

function TagFilter({ activeTag }: { activeTag: string }) {
  const posts = getPublishedPosts();
  const counts = getTagCounts(posts);

  return (
    <nav
      className="flex flex-wrap items-center gap-1.5"
      aria-label="Filter by topic"
    >
      <FilterChip
        href="/blog"
        label="All"
        count={posts.length}
        active={activeTag === "all"}
      />
      {BLOG_TAGS.map((tag) => (
        <FilterChip
          key={tag.slug}
          href={tagHref(tag.slug)}
          label={tag.label}
          count={counts.get(tag.slug) ?? 0}
          active={activeTag === tag.slug}
        />
      ))}
    </nav>
  );
}

function FilterChip({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-8 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      {label}
      <span
        className={`tabular-nums text-[10px] font-bold ${
          active ? "text-background/70" : "text-muted-foreground/70"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const requestedTag = firstParam(params?.tag);
  const activeTag =
    requestedTag && getBlogTag(requestedTag) ? requestedTag : "all";
  const activeTagMeta =
    activeTag === "all" ? undefined : getBlogTag(activeTag);
  const posts = filterPostsByTag(activeTag);
  const featured = posts[0];
  const rest = posts.slice(1);
  const feedLabel = activeTagMeta
    ? `${activeTagMeta.label} notes`
    : "All published notes";

  return (
    <section className="page-container py-16 md:py-24" aria-label="Blog">
      {/* ─── HEADER ─── */}
      <header className="mb-12 md:mb-16">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">Journal</span>
          <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground md:inline">
            {posts.length} entries · Updated weekly
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground">
          Field notes from the team{" "}
          <span className="italic font-serif text-[var(--accent-electric)]">
            shipping
          </span>{" "}
          this marketplace.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
          Practical writing on architecture, delivery, licensing, and the
          small UX decisions that make storefronts feel{" "}
          <span className="text-foreground">considered</span>.
        </p>

        <div className="mt-10 hairline" />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Now showing —{" "}
            <span className="text-foreground">{feedLabel}</span>
          </p>
          <TagFilter activeTag={activeTag} />
        </div>
      </header>

      {/* ─── FEATURED ─── */}
      {featured ? (
        <div className="mb-16 md:mb-20">
          <FeaturedPost post={featured} />
        </div>
      ) : null}

      {/* ─── LIST ─── */}
      {posts.length === 0 ? (
        <EmptyState />
      ) : rest.length > 0 ? (
        <section aria-labelledby="blog-list-title">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2
              id="blog-list-title"
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground"
            >
              ⎯ All entries
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              {String(rest.length).padStart(2, "0")} more
            </span>
          </div>

          <div className="border-t border-border">
            {rest.map((post, idx) => (
              <PostRow key={post.slug} post={post} index={idx + 2} />
            ))}
          </div>
        </section>
      ) : null}

      {/* ─── FOOTER LINK ─── */}
      <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 md:flex-row md:items-center">
        <div>
          <p className="font-hand text-2xl text-[var(--accent-electric)]">
            Want more?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse by topic or jump straight to the marketplace.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/products"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-[13px] font-bold text-background transition-transform hover:scale-[1.02]"
          >
            Enter the marketplace
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card/40 py-16 px-8 text-center">
      <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground">
        No stories in this category yet.
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Try a different filter — or browse the full feed.
      </p>
      <Link
        href="/blog"
        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-electric)]"
      >
        View all stories
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}
