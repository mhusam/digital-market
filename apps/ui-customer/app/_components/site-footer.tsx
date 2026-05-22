import Link from "next/link";

const productLinks = [
  { href: "/catalog", label: "All products" },
  { href: "/catalog?type=PROJECT", label: "Projects" },
  { href: "/catalog?type=SOLUTION", label: "Solutions" },
  { href: "/track", label: "Track an order" },
];

const companyLinks = [
  { href: "/about", label: "About PROGMAN" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/legal/terms", label: "Terms of service" },
  { href: "/legal/privacy", label: "Privacy policy" },
  { href: "/legal/refunds", label: "Refund policy" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer shell-container" aria-label="Site footer">
      <div className="site-footer-brand">
        <strong>PROGMAN</strong>
        <p>
          Digital IT products, projects, and solutions with instant delivery and
          transparent licensing. Built for teams that ship.
        </p>
      </div>

      <div className="site-footer-column">
        <h4>Marketplace</h4>
        <ul>
          {productLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-footer-column">
        <h4>Company</h4>
        <ul>
          {companyLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-footer-column">
        <h4>Legal</h4>
        <ul>
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="site-footer-base">
        <span>© {year} PROGMAN. All rights reserved.</span>
        <span>Secure checkout · PayPal · Bank transfer</span>
      </div>
    </footer>
  );
}
