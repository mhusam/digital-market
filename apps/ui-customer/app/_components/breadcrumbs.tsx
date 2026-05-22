import Link from "next/link";

export interface Crumb {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((crumb, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${crumb.label}-${index}`}>
            {crumb.href && !isLast ? (
              <Link href={crumb.href}>{crumb.label}</Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined}>
                {crumb.label}
              </span>
            )}
            {!isLast ? (
              <span aria-hidden="true" style={{ marginLeft: 8 }}>
                /
              </span>
            ) : null}
          </span>
        );
      })}
    </nav>
  );
}
