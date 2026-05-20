"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const reduceMotion = useReducedMotion();
  const motionTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.36, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.nav
      aria-label="Breadcrumb"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionTransition}
      className="relative inline-flex max-w-full overflow-hidden rounded-[24px] border border-white/80 bg-white/70 p-1.5 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.45)] ring-1 ring-[#1B1B1B]/5 backdrop-blur-xl"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 12% 20%, rgba(14,165,233,0.2), transparent 28%), radial-gradient(circle at 72% 12%, rgba(37,99,235,0.14), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.42))",
          backgroundSize: "180% 180%",
        }}
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 9, repeat: Infinity, ease: "linear" }
        }
      />

      <ol className="relative z-10 flex max-w-full flex-wrap items-center gap-1.5 text-[13px] font-black tracking-normal">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const key = `${item.href ?? item.label}-${i}`;

          return (
            <motion.li
              key={key}
              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { ...motionTransition, delay: i * 0.045 }
              }
              className="inline-flex min-w-0 items-center gap-1.5"
            >
              {item.href && !isLast ? (
                <motion.span
                  whileHover={reduceMotion ? undefined : { y: -1 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={motionTransition}
                  className="min-w-0"
                >
                  <Link
                    href={item.href}
                    className="group relative inline-flex h-9 max-w-[min(52vw,320px)] items-center gap-2 overflow-hidden rounded-full border border-[#1B1B1B]/8 bg-white/75 px-3 text-[#1B1B1B]/68 shadow-[0_10px_24px_-18px_rgba(17,24,39,0.45)] outline-none transition-colors hover:border-[#0EA5E9]/32 hover:bg-white hover:text-[#1B1B1B] focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-white/60"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(37,99,235,0.08),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                    {i === 0 && (
                      <Home
                        size={14}
                        strokeWidth={2.6}
                        className="relative shrink-0 text-[#0EA5E9]"
                      />
                    )}
                    <span className="relative truncate">{item.label}</span>
                  </Link>
                </motion.span>
              ) : (
                <motion.span
                  aria-current="page"
                  layout
                  className="relative inline-flex h-9 max-w-[min(62vw,420px)] items-center gap-2 overflow-hidden rounded-full bg-[#111827] px-3.5 text-white shadow-[0_16px_30px_-18px_rgba(17,24,39,0.9)] ring-1 ring-white/30"
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 -left-10 w-24 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]"
                    animate={reduceMotion ? undefined : { x: [0, 180, 0] }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
                    }
                  />
                  <span
                    aria-hidden
                    className="relative size-2 shrink-0 rounded-full bg-[#38BDF8] shadow-[0_0_0_5px_rgba(56,189,248,0.16)]"
                  />
                  <span className="relative truncate">{item.label}</span>
                </motion.span>
              )}
              {!isLast && (
                <span
                  className="relative inline-flex h-9 w-7 shrink-0 items-center justify-center"
                  aria-hidden
                >
                  <span className="absolute h-px w-6 bg-gradient-to-r from-[#1B1B1B]/8 via-[#0EA5E9]/55 to-[#1B1B1B]/8" />
                  <span className="relative inline-flex size-5 items-center justify-center rounded-full border border-[#1B1B1B]/8 bg-white/80 text-[#1B1B1B]/48 shadow-[0_8px_20px_-16px_rgba(17,24,39,0.45)]">
                    <ChevronRight size={12} strokeWidth={2.8} />
                  </span>
                </span>
              )}
            </motion.li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
