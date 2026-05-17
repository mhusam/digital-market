import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "../ui/Card";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="max-w-[1180px] mx-auto px-5 md:px-8 pt-10 pb-20">
      <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
        <section className="rounded-[36px] bg-[#1B1B1B] text-white px-7 py-8 md:px-10 md:py-10 shadow-[0_32px_80px_-32px_rgba(17,24,39,0.45)]">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-3 py-2 text-sm font-black"
          >
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#1E5FAF] text-[#1B1B1B]"
              aria-hidden
            >
              ◆
            </span>
            Forge
          </Link>

          <div className="mt-10 max-w-xl">
            <span className="eyebrow light">{eyebrow}</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-[-0.04em]">
              {title}
            </h1>
            <p className="mt-4 text-white/72 text-[15px] leading-relaxed font-semibold">
              {description}
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {[
              "Track paid orders and receipts in one place",
              "Re-download purchased files from a stable account area",
              "Open support tickets without leaving the storefront",
              "Keep billing details ready for faster mock checkout",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[28px] border border-white/10 bg-white/5 px-4 py-4 text-sm font-bold text-white/88"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <Card className="p-6 md:p-8 self-start">
          {children}
          <div className="mt-8 border-t border-[#1B1B1B]/8 pt-5 text-sm font-semibold text-[#1B1B1B]/72">
            {footer}
          </div>
        </Card>
      </div>
    </div>
  );
}
