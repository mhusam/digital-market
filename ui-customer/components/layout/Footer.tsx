import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const PRODUCT_LINKS = [
  { href: "/products", label: "All Products" },
  { href: "/categories/saas-solutions", label: "SaaS Kits" },
  { href: "/categories/dashboard-templates", label: "Dashboards" },
  { href: "/categories/figma-kits", label: "Figma Kits" },
];

const COMPANY_LINKS = [
  { href: "/search", label: "Search" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/login", label: "Login" },
];

const BUYING_LINKS = [
  { href: "/register", label: "Create Account" },
  { href: "/account/orders", label: "My Orders" },
  { href: "/account/downloads", label: "My Downloads" },
  { href: "/account/support", label: "Support" },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t-2 border-[#1B1B1B]/15">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-[#1E40AF] text-white rounded-xl font-black text-xl">
                ◆
              </span>
              <span className="text-[#1B1B1B] font-black text-3xl tracking-[-0.04em]">
                Forge
              </span>
            </Link>
            <p className="text-[#1B1B1B]/80 max-w-md text-[15px] leading-relaxed">
              The marketplace for premium digital products. Hand-curated themes,
              plugins, UI kits, and code, built by developers, for developers.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Github, label: "GitHub" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  aria-label={label}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#1E40AF] text-white"
                >
                  <Icon size={16} strokeWidth={2.4} />
                </span>
              ))}
            </div>
          </div>

          <FooterCol title="Products" links={PRODUCT_LINKS} />
          <FooterCol title="Browse" links={COMPANY_LINKS} />
          <FooterCol title="Collections" links={BUYING_LINKS} />
        </div>

        <div className="mt-14 pt-6 border-t border-[#1B1B1B]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[#1B1B1B]/80 text-sm font-semibold">
          <span>© {new Date().getFullYear()} Forge. All rights reserved.</span>
          <span className="font-hand text-xl text-[#1B1B1B]">
            Built for developers worldwide
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1B1B1B] mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[#1B1B1B]/80 hover:text-[#1B1B1B] hover:underline underline-offset-4 font-semibold text-[15px]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
