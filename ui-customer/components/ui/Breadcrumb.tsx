import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] font-bold">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-[#1B1B1B]/70 hover:text-[#1B1B1B] underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#1B1B1B]">{item.label}</span>
              )}
              {!isLast && (
                <ChevronRight
                  size={12}
                  className="text-[#1B1B1B]/50"
                  strokeWidth={2.6}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
