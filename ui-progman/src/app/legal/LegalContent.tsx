"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Shield, CreditCard, ArrowLeft } from "lucide-react";

interface LegalContentProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms of Service", icon: FileText },
  { href: "/legal/privacy", label: "Privacy Policy", icon: Shield },
  { href: "/legal/refunds", label: "Refund Policy", icon: CreditCard },
];

export function LegalContent({ title, lastUpdated, children }: LegalContentProps) {
  const pathname = usePathname();

  return (
    <div className="page-container pt-12 pb-24 sm:pb-32">
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 items-start">
        {/* Navigation Sidebar */}
        <aside className="space-y-2 lg:sticky lg:top-24">
          <span className="eyebrow text-muted-foreground mb-4 block">Legal Center</span>
          <nav className="flex flex-col gap-1.5" aria-label="Legal document selection">
            {LEGAL_LINKS.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider border transition-all ${
                    active
                      ? "bg-primary border-primary text-primary-foreground shadow-sm"
                      : "bg-card border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content Sheet */}
        <article className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="border-b border-border pb-6 mb-8">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Last Updated: {lastUpdated}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-2">
              {title}
            </h1>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm leading-7 text-muted-foreground space-y-6">
            {children}
          </div>
        </article>
      </div>
    </div>
  );
}
