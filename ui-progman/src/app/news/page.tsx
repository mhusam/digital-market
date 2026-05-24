"use client";

import { useState, useCallback } from "react";
import { NEWS_HIGHLIGHTS, NewsHighlight } from "@/lib/mockData";
import {
  Calendar,
  Search,
  Copy,
  Check,
  Link2,
  ExternalLink,
  Zap,
  Package,
  Globe,
  Users,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "en" | "ar";
type Category = "all" | NewsHighlight["category"];

const CATEGORY_META: Record<
  NewsHighlight["category"] | "all",
  { label: string; labelAr: string; icon: typeof Zap }
> = {
  all: { label: "All", labelAr: "الكل", icon: Filter },
  release: { label: "Releases", labelAr: "الإصدارات", icon: Zap },
  product: { label: "Products", labelAr: "المنتجات", icon: Package },
  industry: { label: "Industry", labelAr: "الصناعة", icon: Globe },
  community: { label: "Community", labelAr: "المجتمع", icon: Users },
};

function buildSocialText(item: NewsHighlight, lang: Lang, baseUrl: string): string {
  const title = lang === "ar" ? item.titleAr : item.title;
  const summary = lang === "ar" ? item.summaryAr : item.summary;
  const link = `${baseUrl}${item.url}`;
  const hashtags =
    lang === "ar"
      ? "#تطوير_الويب #برمجة #PROGMAN"
      : item.tags.map((t) => `#${t.replace(/[\s.\/]/g, "")}`).join(" ") + " #PROGMAN";
  const readMore = lang === "ar" ? "اقرأ المزيد" : "Read more";
  return `📢 ${title}\n\n${summary}\n\n🔗 ${readMore}: ${link}\n\n${hashtags}`;
}

function buildTwitterText(item: NewsHighlight, lang: Lang, baseUrl: string): string {
  const title = lang === "ar" ? item.titleAr : item.title;
  const link = `${baseUrl}${item.url}`;
  const hashtags =
    lang === "ar"
      ? "#تطوير_الويب #PROGMAN"
      : item.tags.slice(0, 2).map((t) => `#${t.replace(/[\s.\/]/g, "")}`).join(" ") + " #PROGMAN";
  const text = `${title} ${hashtags}`;
  return encodeURIComponent(text) + "&url=" + encodeURIComponent(link);
}

function SharePanel({
  item,
  lang,
}: {
  item: NewsHighlight;
  lang: Lang;
}) {
  const [copiedState, setCopiedState] = useState<"text" | "link" | null>(null);

  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "https://progman.dev";

  const handleCopyText = useCallback(async () => {
    const text = buildSocialText(item, lang, baseUrl);
    await navigator.clipboard.writeText(text);
    setCopiedState("text");
    setTimeout(() => setCopiedState(null), 2000);
  }, [item, lang, baseUrl]);

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText(`${baseUrl}${item.url}`);
    setCopiedState("link");
    setTimeout(() => setCopiedState(null), 2000);
  }, [item, baseUrl]);

  const socialText = buildSocialText(item, lang, baseUrl);
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl + item.url)}&quote=${encodeURIComponent(lang === "ar" ? item.titleAr : item.title)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${buildTwitterText(item, lang, baseUrl)}`;
  const waText = `${lang === "ar" ? item.titleAr : item.title}\n\n${lang === "ar" ? item.summaryAr : item.summary}\n\n${baseUrl}${item.url}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(baseUrl + item.url)}`;

  const copyLabel = lang === "ar" ? "نسخ للنشر" : "Copy Post";
  const linkLabel = lang === "ar" ? "نسخ الرابط" : "Copy Link";

  return (
    <div className={cn("pt-4 mt-4 border-t border-border flex flex-wrap items-center gap-2", lang === "ar" && "flex-row-reverse")}>
      {/* Copy post text */}
      <button
        onClick={handleCopyText}
        className={cn(
          "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border text-[11px] font-semibold transition-all",
          copiedState === "text"
            ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
            : "border-border bg-muted hover:bg-foreground/5 text-foreground"
        )}
      >
        {copiedState === "text" ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
        {copiedState === "text" ? (lang === "ar" ? "تم النسخ!" : "Copied!") : copyLabel}
      </button>

      {/* Facebook */}
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-[#1877f2]/10 hover:bg-[#1877f2]/20 text-[#1877f2] text-[11px] font-semibold transition-all"
      >
        <svg className="size-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Facebook
      </a>

      {/* X / Twitter */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-foreground/5 hover:bg-foreground/10 text-foreground text-[11px] font-semibold transition-all"
      >
        <svg className="size-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X / Twitter
      </a>

      {/* WhatsApp */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-[#25d366]/10 hover:bg-[#25d366]/20 text-[#25d366] text-[11px] font-semibold transition-all"
      >
        <svg className="size-3.5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>

      {/* LinkedIn */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 text-[#0a66c2] text-[11px] font-semibold transition-all"
      >
        <svg className="size-3.5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>

      {/* Copy link */}
      <button
        onClick={handleCopyLink}
        className={cn(
          "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border text-[11px] font-semibold transition-all ml-auto",
          lang === "ar" && "ml-0 mr-auto",
          copiedState === "link"
            ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
            : "border-border bg-transparent hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
        )}
      >
        {copiedState === "link" ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
        {copiedState === "link" ? (lang === "ar" ? "تم!" : "Copied!") : linkLabel}
      </button>
    </div>
  );
}

function NewsCard({ item, lang }: { item: NewsHighlight; lang: Lang }) {
  const [shareOpen, setShareOpen] = useState(false);
  const title = lang === "ar" ? item.titleAr : item.title;
  const summary = lang === "ar" ? item.summaryAr : item.summary;
  const isRtl = lang === "ar";
  const meta = CATEGORY_META[item.category];

  const priorityColor =
    item.priority === "high"
      ? "bg-[var(--accent-electric)]"
      : "bg-border";

  const categoryColor: Record<NewsHighlight["category"], string> = {
    release: "border-[var(--accent-violet)]/30 bg-[var(--accent-violet)]/10 text-[var(--accent-violet)]",
    product: "border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-[var(--accent-electric)]",
    industry: "border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]",
    community: "border-[var(--accent-lime)]/30 bg-[var(--accent-lime)]/10 text-foreground",
  };

  const shareLabel = lang === "ar" ? "مشاركة" : "Share";

  return (
    <article
      className="rounded-2xl border border-border bg-card/80 overflow-hidden transition-all duration-300 hover:border-foreground/15 hover:shadow-[0_12px_32px_-16px_color-mix(in_oklab,var(--foreground)_12%,transparent)]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Priority bar */}
      <div className={cn("h-1 w-full", priorityColor)} />

      <div className="p-5 sm:p-6">
        {/* Meta row */}
        <div className={cn("flex flex-wrap items-center gap-2 mb-3", isRtl && "flex-row-reverse")}>
          <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border", categoryColor[item.category])}>
            {isRtl ? meta.labelAr : meta.label}
          </span>

          {item.priority === "high" && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-[var(--accent-electric)]/30 bg-[var(--accent-electric)]/10 text-[var(--accent-electric)]">
              {isRtl ? "تحديث مهم" : "Critical Update"}
            </span>
          )}

          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
            <Calendar className="size-3 shrink-0" />
            {new Date(item.date).toLocaleDateString(isRtl ? "ar-SA" : "en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

          {item.source && (
            <span className="text-[10px] text-muted-foreground/70 font-medium">
              {isRtl ? "المصدر:" : "via"} {item.source}
            </span>
          )}

          <a
            href={item.url}
            className={cn("flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors font-medium", isRtl ? "mr-auto" : "ml-auto")}
          >
            <ExternalLink className="size-3" />
            {isRtl ? "التفاصيل" : "Details"}
          </a>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-sm sm:text-base font-bold text-foreground leading-snug mb-2",
            isRtl && "text-right font-[system-ui,'Segoe_UI',Arial,sans-serif]"
          )}
          lang={isRtl ? "ar" : "en"}
        >
          {title}
        </h3>

        {/* Summary */}
        <p
          className={cn(
            "text-xs text-muted-foreground leading-relaxed mb-4",
            isRtl && "text-right font-[system-ui,'Segoe_UI',Arial,sans-serif]"
          )}
          lang={isRtl ? "ar" : "en"}
        >
          {summary}
        </p>

        {/* Tags */}
        <div className={cn("flex flex-wrap gap-1.5 mb-4", isRtl && "flex-row-reverse")}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md border border-border bg-muted text-[10px] font-mono text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share toggle */}
        <button
          onClick={() => setShareOpen((v) => !v)}
          className={cn(
            "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border text-[11px] font-semibold transition-all",
            shareOpen
              ? "border-foreground/20 bg-foreground text-background"
              : "border-border bg-muted hover:bg-foreground/5 text-foreground"
          )}
        >
          <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {shareLabel}
        </button>

        {/* Share panel */}
        {shareOpen && <SharePanel item={item} lang={lang} />}
      </div>
    </article>
  );
}

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lang, setLang] = useState<Lang>("en");
  const [category, setCategory] = useState<Category>("all");

  const filtered = NEWS_HIGHLIGHTS.filter((n) => {
    const matchCat = category === "all" || n.category === category;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      n.title.toLowerCase().includes(q) ||
      n.titleAr.includes(searchTerm) ||
      n.summary.toLowerCase().includes(q) ||
      n.summaryAr.includes(searchTerm) ||
      n.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const isRtl = lang === "ar";

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      {/* Header */}
      <div className={cn("border-b border-border pb-10 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6", isRtl && "sm:flex-row-reverse")}>
        <div dir={isRtl ? "rtl" : "ltr"}>
          <span className="eyebrow text-[var(--accent-electric)] mb-3">
            {isRtl ? "آخر الأخبار" : "Industry Feed"}
          </span>
          <h1 className={cn("text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2", isRtl && "font-[system-ui,'Segoe_UI',Arial,sans-serif]")} lang={isRtl ? "ar" : "en"}>
            {isRtl ? "أخبار المطورين." : "Developer News."}
          </h1>
          <p className={cn("text-muted-foreground max-w-xl mt-3 text-sm leading-relaxed", isRtl && "text-right font-[system-ui,'Segoe_UI',Arial,sans-serif]")} lang={isRtl ? "ar" : "en"}>
            {isRtl
              ? "آخر الإصدارات والتحديثات وأخبار المجتمع — جاهزة للقراءة والمشاركة على منصات التواصل الاجتماعي."
              : "Latest releases, product updates, and community news — ready to read and share on any social platform."}
          </p>
        </div>

        {/* Language toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-muted shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setLang("en")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              lang === "en"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            EN
          </button>
          <button
            onClick={() => setLang("ar")}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              lang === "ar"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            عربي
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className={cn("flex flex-col sm:flex-row gap-4 mb-10", isRtl && "sm:flex-row-reverse")}>
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder={isRtl ? "ابحث في الأخبار..." : "Search news..."}
            dir={isRtl ? "rtl" : "ltr"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              "w-full h-10 rounded-xl border border-border bg-card px-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--accent-electric)]/50 focus:border-[var(--accent-electric)] transition-all",
              isRtl ? "pr-10 pl-4" : "pl-10 pr-4"
            )}
          />
          <Search className={cn("absolute top-3 size-4 text-muted-foreground", isRtl ? "right-3" : "left-3")} />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(["all", "release", "product", "industry", "community"] as Category[]).map((cat) => {
            const m = CATEGORY_META[cat];
            const Icon = m.icon;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border text-[11px] font-semibold transition-all",
                  category === cat
                    ? "border-foreground/20 bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/15"
                )}
              >
                <Icon className="size-3" />
                {isRtl ? m.labelAr : m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* News list */}
      <div className="space-y-5 max-w-4xl">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <NewsCard key={item.id} item={item} lang={lang} />
          ))
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/50">
            <p className="text-sm text-muted-foreground">
              {isRtl ? "لا توجد أخبار تطابق بحثك." : "No news matches your search."}
            </p>
          </div>
        )}
      </div>

      {/* Count */}
      {filtered.length > 0 && (
        <p className={cn("mt-8 text-[11px] text-muted-foreground/60", isRtl && "text-right")}>
          {isRtl
            ? `عرض ${filtered.length} من ${NEWS_HIGHLIGHTS.length} خبر`
            : `Showing ${filtered.length} of ${NEWS_HIGHLIGHTS.length} items`}
        </p>
      )}
    </div>
  );
}
