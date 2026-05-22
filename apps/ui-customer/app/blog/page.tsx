import type { CSSProperties } from "react";
import { ViewTransition } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, absoluteUrl } from "../_lib/site";
import styles from "./blog.module.css";
import {
  BLOG_TAGS,
  filterPostsByTag,
  formatPostDate,
  getArchiveEntries,
  getAuthor,
  getBlogTag,
  getPublishedPosts,
  getTagCounts,
  groupPostsByMonth,
  type BlogPost,
  type BlogTag,
} from "./_lib/posts";

interface BlogPageProps {
  searchParams?: Promise<{ tag?: string | string[] }>;
}

export const metadata: Metadata = {
  title: "Blog",
  description:
    "PROGMAN notes on digital products, marketplace architecture, secure delivery, licensing, and customer storefront UX.",
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: `Blog — ${SITE_NAME}`,
    description:
      "Read PROGMAN notes on digital products, marketplace architecture, secure delivery, and storefront operations.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
};

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function tagHref(slug: string) {
  return slug === "all" ? "/blog" : `/blog?tag=${encodeURIComponent(slug)}`;
}

function TopicIcon({ slug }: { slug: string }) {
  return (
    <span className={styles.topicIcon} aria-hidden="true">
      {slug === "all" ? (
        <svg viewBox="0 0 24 24">
          <path d="M4 10.5 12 4l8 6.5" />
          <path d="M6.5 10v9h11v-9" />
          <path d="M10 19v-5h4v5" />
        </svg>
      ) : null}
      {slug === "architecture" ? (
        <svg viewBox="0 0 24 24">
          <path d="M6 8h5v5H6z" />
          <path d="M13 11h5v5h-5z" />
          <path d="M11 10.5h2" />
          <path d="M8.5 13v3.5h4.5" />
        </svg>
      ) : null}
      {slug === "delivery" ? (
        <svg viewBox="0 0 24 24">
          <path d="M4 7h10v9H4z" />
          <path d="M14 10h3l3 3v3h-6z" />
          <path d="M7 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M17 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        </svg>
      ) : null}
      {slug === "security" ? (
        <svg viewBox="0 0 24 24">
          <path d="M12 4 18 6v5c0 4-2.4 6.8-6 9-3.6-2.2-6-5-6-9V6z" />
          <path d="m9.5 12 1.8 1.8L15 10" />
        </svg>
      ) : null}
      {slug === "licensing" ? (
        <svg viewBox="0 0 24 24">
          <path d="M7 4h7l3 3v13H7z" />
          <path d="M14 4v4h4" />
          <path d="M9.5 12h5" />
          <path d="M9.5 15h4" />
        </svg>
      ) : null}
      {slug === "frontend" ? (
        <svg viewBox="0 0 24 24">
          <path d="M4 5.5h16v11H4z" />
          <path d="M8 20h8" />
          <path d="M12 16.5V20" />
          <path d="m9 9-2 2 2 2" />
          <path d="m15 9 2 2-2 2" />
        </svg>
      ) : null}
    </span>
  );
}

function splitArchiveLabel(label: string) {
  const [month, year] = label.split(" ");
  return { month, year };
}

function getArchiveYears() {
  const archive = getArchiveEntries();
  const years = new Map<string, { firstMonthKey: string; monthCount: number }>();

  for (const entry of archive) {
    const { year } = splitArchiveLabel(entry.label);
    const existing = years.get(year);

    if (existing) {
      existing.monthCount += 1;
    } else {
      years.set(year, { firstMonthKey: entry.key, monthCount: 1 });
    }
  }

  return {
    monthCount: archive.length,
    years: Array.from(years.entries()).map(([year, value]) => ({
      year,
      ...value,
    })),
  };
}

function TopicRail({ activeTag }: { activeTag: string }) {
  const posts = getPublishedPosts();
  const counts = getTagCounts(posts);
  const topics: Array<BlogTag & { count: number }> = BLOG_TAGS.map((tag) => ({
    ...tag,
    count: counts.get(tag.slug) ?? 0,
  }));

  return (
    <aside className={styles.topicRail} aria-label="Blog topics">
      <Link
        href="/blog"
        className={`${styles.topicLink} ${activeTag === "all" ? styles.isActive : ""}`}
        aria-current={activeTag === "all" ? "page" : undefined}
      >
        <TopicIcon slug="all" />
        <span>all</span>
        <strong>{posts.length}</strong>
      </Link>
      {topics.map((tag) => (
        <Link
          key={tag.slug}
          href={tagHref(tag.slug)}
          className={`${styles.topicLink} ${activeTag === tag.slug ? styles.isActive : ""}`}
          aria-current={activeTag === tag.slug ? "page" : undefined}
          data-tone={tag.tone}
        >
          <TopicIcon slug={tag.slug} />
          <span>{tag.label.toLowerCase()}</span>
          <strong>{tag.count}</strong>
        </Link>
      ))}
    </aside>
  );
}

function ArchiveRail() {
  const { monthCount, years } = getArchiveYears();

  return (
    <aside className={styles.archiveRail} aria-label="Blog archive">
      <p className={styles.archiveTitle} aria-label={`${monthCount} archive months`}>
        <span>Month</span>
        <strong>{monthCount}</strong>
      </p>
      {years.map((entry) => (
        <a
          key={entry.year}
          href={`#month-${entry.firstMonthKey}`}
          className={styles.archiveYearLink}
          aria-label={`${entry.year}, ${entry.monthCount} archive months`}
        >
          {entry.year}
        </a>
      ))}
    </aside>
  );
}

function MobileFilters({ activeTag }: { activeTag: string }) {
  const allPostsCount = getPublishedPosts().length;

  return (
    <nav className={styles.mobileFilters} aria-label="Blog topic filters">
      <Link
        href="/blog"
        aria-current={activeTag === "all" ? "page" : undefined}
        className={activeTag === "all" ? styles.isActive : ""}
      >
        All <span>{allPostsCount}</span>
      </Link>
      {BLOG_TAGS.map((tag) => (
        <Link
          key={tag.slug}
          href={tagHref(tag.slug)}
          aria-current={activeTag === tag.slug ? "page" : undefined}
          className={activeTag === tag.slug ? styles.isActive : ""}
          data-tone={tag.tone}
        >
          {tag.label}
        </Link>
      ))}
    </nav>
  );
}

function PostTags({ post }: { post: BlogPost }) {
  return (
    <div className={styles.postTags} aria-label="Post tags">
      {post.tags.map((tagSlug) => {
        const tag = getBlogTag(tagSlug);
        if (!tag) return null;
        return (
          <span key={tag.slug} data-tone={tag.tone}>
            {tag.label}
          </span>
        );
      })}
    </div>
  );
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const author = getAuthor(post);

  return (
    <li className={styles.postListItem} style={{ "--item-index": index } as CSSProperties}>
      <ViewTransition name={`blog-post-${post.slug}`} share="blog-card-morph">
        <article className={styles.postCard} data-tone={post.heroTone}>
          <div className={styles.avatar} data-tone={author.tone} aria-hidden="true">
            {author.initials}
          </div>
          <header className={styles.postMeta}>
            <span className={styles.authorLine}>
              <strong>{author.handle}</strong>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            </span>
            <PostTags post={post} />
          </header>
          <div className={styles.postBody}>
            <h2>
              <Link href={`/blog/${post.slug}`} transitionTypes={["blog-nav-forward"]}>
                {post.title}
              </Link>
            </h2>
            <p>{post.excerpt}</p>
          </div>
          <div className={styles.postVisual} aria-hidden="true">
            <span className={styles.visualCard} />
            <span className={styles.visualCard} />
            <span className={styles.visualCard} />
            <span className={styles.visualGrid} />
          </div>
          <footer className={styles.postFooter}>
            <span>{post.readingTimeMinutes} min read</span>
            <Link href={`/blog/${post.slug}`} transitionTypes={["blog-nav-forward"]} aria-label={`Read ${post.title}`}>
              Read note
            </Link>
          </footer>
        </article>
      </ViewTransition>
    </li>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const requestedTag = firstParam(params?.tag);
  const activeTag = requestedTag && getBlogTag(requestedTag) ? requestedTag : "all";
  const activeTagMeta = activeTag === "all" ? undefined : getBlogTag(activeTag);
  const posts = filterPostsByTag(activeTag);
  const groupedPosts = groupPostsByMonth(posts);
  const feedLabel = activeTagMeta ? activeTagMeta.label.toLowerCase() : "latest notes";

  return (
    <section className={`shell-container ${styles.blogShell}`} aria-label="Blog">
      <MobileFilters activeTag={activeTag} />

      <div className={styles.blogLayout}>
        <ArchiveRail />
        <TopicRail activeTag={activeTag} />

        <main className={styles.feed} id="blog-feed" aria-label="Blog feed">
          <h1 className={styles.feedSummary} aria-label={`${posts.length} posts, ${feedLabel}`}>
            <strong>{posts.length} posts</strong>
            <span aria-hidden="true">|</span>
            <em>{feedLabel}</em>
          </h1>

          {groupedPosts.length > 0 ? (
            groupedPosts.map((group) => (
              <section key={group.key} className={styles.monthGroup} id={`month-${group.key}`}>
                <h2>{group.label}</h2>
                <ul className={styles.postList}>
                  {group.posts.map((post, index) => (
                    <PostCard key={post.slug} post={post} index={index} />
                  ))}
                </ul>
              </section>
            ))
          ) : (
            <div className={styles.emptyFeed}>
              <h2>No posts for this topic yet.</h2>
              <p>Switch back to all notes or choose a different topic.</p>
              <Link href="/blog" className="button button-secondary">
                View all posts
              </Link>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
