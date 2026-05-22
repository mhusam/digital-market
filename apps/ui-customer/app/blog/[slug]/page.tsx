import { ViewTransition, type CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { SITE_NAME, absoluteUrl } from "../../_lib/site";
import styles from "../blog.module.css";
import {
  BLOG_POSTS,
  formatPostDate,
  getAuthor,
  getBlogPost,
  getBlogTag,
  getRelatedPosts,
  getTableOfContents,
  type BlogBlock,
  type BlogPost,
} from "../_lib/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog post not found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: canonical,
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      authors: [getAuthor(post).name],
      tags: post.tags.map((tagSlug) => getBlogTag(tagSlug)?.label).filter(Boolean) as string[],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function PostTags({ post }: { post: BlogPost }) {
  return (
    <div className={styles.postTags} aria-label="Post tags">
      {post.tags.map((tagSlug) => {
        const tag = getBlogTag(tagSlug);
        if (!tag) return null;
        return (
          <Link key={tag.slug} href={`/blog?tag=${tag.slug}`} data-tone={tag.tone} transitionTypes={["blog-nav-back"]}>
            {tag.label}
          </Link>
        );
      })}
    </div>
  );
}

function ArticleBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 id={block.id}>{block.text}</h2>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.cite ? <cite>{block.cite}</cite> : null}
        </blockquote>
      );
    case "callout":
      return (
        <aside className={styles.articleCallout}>
          <strong>{block.title}</strong>
          <p>{block.text}</p>
        </aside>
      );
    case "code":
      return (
        <pre className={styles.codeBlock} aria-label={`${block.language} code example`}>
          <code>{block.code}</code>
        </pre>
      );
    default:
      return null;
  }
}

function RelatedPosts({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post);
  if (related.length === 0) return null;

  return (
    <section className={styles.relatedPosts} aria-labelledby="related-posts-title">
      <h2 id="related-posts-title">Related notes</h2>
      <div>
        {related.map((item, index) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className={styles.relatedCard}
            transitionTypes={["blog-nav-forward"]}
            style={{ "--item-index": index } as CSSProperties}
          >
            <span>{formatPostDate(item.publishedAt)}</span>
            <strong>{item.title}</strong>
            <small>{item.readingTimeMinutes} min read</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthor(post);
  const toc = getTableOfContents(post);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.tags.map((tagSlug) => getBlogTag(tagSlug)?.label).filter(Boolean),
    articleSection: post.tags[0] ? getBlogTag(post.tags[0])?.label : undefined,
  };

  return (
    <ViewTransition
      enter={{ "blog-nav-forward": "blog-nav-forward", "blog-nav-back": "blog-nav-back", default: "none" }}
      exit={{ "blog-nav-forward": "blog-nav-forward", "blog-nav-back": "blog-nav-back", default: "none" }}
      default="none"
    >
      <article className={`shell-container ${styles.articleShell}`} aria-labelledby="article-title">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" },
            { label: post.title },
          ]}
        />

        <Link href="/blog" className={styles.backLink} transitionTypes={["blog-nav-back"]}>
          Back to blog
        </Link>

        <div className={styles.articleLayout}>
          <aside className={styles.articleAside} aria-label="Article table of contents">
            <p className={styles.railTitle}>On this page</p>
            {toc.length > 0 ? (
              <nav>
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`}>
                    {item.text}
                  </a>
                ))}
              </nav>
            ) : null}
          </aside>

          <div className={styles.articleMain}>
            <ViewTransition name={`blog-post-${post.slug}`} share="blog-card-morph">
              <header className={styles.articleHero} data-tone={post.heroTone}>
                <div className={styles.avatar} data-tone={author.tone} aria-hidden="true">
                  {author.initials}
                </div>
                <div className={styles.articleHeroCopy}>
                  <p className={styles.authorLine}>
                    <strong>{author.handle}</strong>
                    <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                  </p>
                  <PostTags post={post} />
                  <h1 id="article-title">{post.title}</h1>
                  <p>{post.summary}</p>
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
              </header>
            </ViewTransition>

            <div className={styles.articleContent}>
              {post.blocks.map((block, index) => (
                <ArticleBlock key={`${block.type}-${index}`} block={block} />
              ))}
            </div>

            <RelatedPosts post={post} />
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </article>
    </ViewTransition>
  );
}
