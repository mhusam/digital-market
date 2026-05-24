import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SHOP_LINKS = [
  { href: "/products", label: "All products" },
  { href: "/categories/saas-solutions", label: "SaaS kits" },
  { href: "/categories/dashboard-templates", label: "Dashboards" },
  { href: "/search", label: "Search" },
];

const ACCOUNT_LINKS = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/cart", label: "Cart" },
  { href: "/account/profile", label: "Profile" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#08080a] text-neutral-400">
      {/* Backdrop accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[var(--accent-electric)] opacity-[0.10] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[var(--accent-violet)] opacity-[0.10] blur-3xl"
      />

      <div className="page-container relative py-16 md:py-20">
        {/* Editorial top — giant wordmark */}
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-hand text-2xl text-[var(--accent-electric)]">
              Digital made simple.
            </p>

          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/5"
          >
            Enter the marketplace
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-8">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-extrabold"
            >
              <Image
                src="/logo-2.svg"
                alt="PROGMAN logo"
                width={32}
                height={32}
                className="size-8"
              />
              <span className="font-brand text-[1.08rem] tracking-[0.03em]">
                PROGMAN
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6">
              Curated digital products for creators, founders, and modern
              teams. Hand-picked, never spammed.
            </p>

          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Account" links={ACCOUNT_LINKS} />

          {/* Newsletter column */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              Stay in the loop
            </h2>
            <p className="mt-3 text-sm leading-6">
              New drops, code kits, and product launches — once a week.
            </p>
            <form className="mt-5 flex gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                className="min-w-0 border-white/15 bg-white/5 text-white placeholder:text-white/40"
                aria-label="Email address"
              />
              <Button type="submit" className="bg-[var(--accent-electric)] text-white hover:bg-[var(--accent-electric)]/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs font-medium uppercase tracking-[0.14em] md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {new Date().getFullYear()} PROGMAN — All rights reserved.
          </span>
          <span className="text-white/40">
            The complete developer universe, designed &amp; built for the next wave of builders.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm transition-colors hover:text-white"
            >
              {link.label}
              <ArrowUpRight
                size={12}
                className="opacity-0 transition-all group-hover:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
