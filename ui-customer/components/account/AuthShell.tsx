import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "../ui/card";

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
    <div className="page-container py-10 md:py-16">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_420px]">
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
          <Link href="/" className="inline-flex items-center gap-2 font-extrabold text-foreground">
            <Image src="/logo-2.svg" alt="PROGMAN logo" width={34} height={34} className="size-8" />
            <span className="font-brand text-[1.08rem] tracking-[0.03em]">PROGMAN</span>
          </Link>
          <p className="mt-10 font-hand text-2xl text-primary">{eyebrow}</p>
          <h1 className="mt-3 max-w-xl text-4xl font-extrabold text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Track orders and receipts",
              "Download purchased files",
              "Manage profile details",
              "Open support tickets",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm font-bold text-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <Card className="self-start p-6">
          {children}
          <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
            {footer}
          </div>
        </Card>
      </div>
    </div>
  );
}
