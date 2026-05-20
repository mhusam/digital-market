"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CircleUserRound, Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";

const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/categories/saas-solutions", label: "Categories" },
  { href: "/search", label: "Search" },
];

const DARK_HEADER_BG = "bg-[#0B0F14]";
const DARK_ITEM_BG = "bg-[#111821]";
const DARK_ITEM_HOVER = "hover:bg-[#1B2533]";

function isActiveLink(pathname: string, href: string) {
  if (href === "/products") return pathname === href || pathname.startsWith("/products/");
  if (href.startsWith("/categories")) return pathname.startsWith("/categories/");
  return pathname === href;
}

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.items.length);
  const user = useAuthStore((s) => s.user);
  const motionTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.16, 1, 0.3, 1] as const };

  const headerClasses =
    `pointer-events-none fixed left-0 top-0 z-50 hidden h-screen w-[78px] ${DARK_HEADER_BG} shadow-[18px_0_46px_-34px_rgba(0,0,0,0.72)] md:flex`;

  const logoMark = (
    <motion.span
      whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      transition={motionTransition}
      className="inline-flex size-10 items-center justify-center bg-[linear-gradient(135deg,#1E40AF_0%,#2563EB_52%,#0EA5E9_100%)] text-base font-black text-white shadow-[0_14px_24px_-14px_rgba(30,64,175,0.9)]"
      tabIndex={-1}
      aria-hidden
    >
      ◆
    </motion.span>
  );

  const accountActions = (
    <>
      {[
        {
          href: user ? "/account" : "/login",
          label: user ? "Account" : "Login or register",
          icon: <CircleUserRound size={17} strokeWidth={2.4} />,
        },
        {
          href: "/cart",
          label: "Cart",
          icon: <ShoppingBag size={17} strokeWidth={2.4} />,
        },
      ].map((action) => {
        const active =
          action.href === "/cart"
            ? pathname === "/cart"
            : user
              ? pathname.startsWith("/account")
              : pathname === "/login" || pathname === "/register";

        return (
          <motion.div
            key={action.href}
            whileHover={reduceMotion ? undefined : { y: -1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            transition={motionTransition}
            className="w-full"
            tabIndex={-1}
          >
            <Link
              href={action.href}
              className={`relative inline-flex h-14 w-full items-center justify-center text-white transition-colors ${
                active
                  ? "bg-[#1E40AF] shadow-[inset_3px_0_0_#38BDF8]"
                  : `${DARK_ITEM_BG} ${DARK_ITEM_HOVER}`
              }`}
              aria-current={active ? "page" : undefined}
              aria-label={action.label}
              title={action.label}
              onClick={() => setMenuOpen(false)}
            >
              {action.icon}
              {action.href === "/cart" && itemCount > 0 && (
                <motion.span
                  initial={reduceMotion ? false : { scale: 0.65 }}
                  animate={{ scale: 1 }}
                  className="absolute right-2 top-2 inline-flex h-5 min-w-5 items-center justify-center bg-[#0EA5E9] px-1.5 text-[11px] font-black text-white ring-2 ring-[#0B0F14]"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
          </motion.div>
        );
      })}
    </>
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0 }}
        transition={motionTransition}
        className={headerClasses}
      >
        <div className="pointer-events-auto flex h-full w-full flex-col items-stretch justify-between">
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            transition={motionTransition}
            className="w-full"
          >
            <Link
              href="/"
              aria-label="Forge home"
              title="Forge"
              className={`group inline-flex h-[78px] w-full items-center justify-center ${DARK_ITEM_BG} shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)] transition-colors ${DARK_ITEM_HOVER}`}
            >
              {logoMark}
            </Link>
          </motion.div>

          <nav className="flex w-full flex-col items-stretch" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <motion.div
                key={l.href}
                whileHover={reduceMotion ? undefined : { x: 2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                transition={motionTransition}
                className="w-full"
              >
                <Link
                  href={l.href}
                  className={`relative inline-flex h-[126px] w-full items-center justify-center text-[12px] font-extrabold tracking-[0.08em] transition-colors ${
                    isActiveLink(pathname, l.href)
                      ? "text-white"
                      : "text-white/58 hover:bg-[#111821] hover:text-white"
                  }`}
                  aria-current={isActiveLink(pathname, l.href) ? "page" : undefined}
                >
                  {isActiveLink(pathname, l.href) && (
                    <motion.span
                      layoutId="forge-nav-active"
                      className="absolute inset-0 bg-[#1E40AF] shadow-[inset_3px_0_0_#38BDF8]"
                      transition={motionTransition}
                    />
                  )}
                  <span className="relative z-10 rotate-180 [writing-mode:vertical-rl]">
                    {l.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex w-full flex-col items-stretch border-t border-white/8">
            {accountActions}
          </div>
        </div>
      </motion.header>

      <header
        className={`fixed inset-x-0 top-0 z-30 flex h-16 items-stretch justify-between ${DARK_HEADER_BG} shadow-[0_18px_42px_-30px_rgba(0,0,0,0.9)] transition-opacity md:hidden ${
          menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <motion.div
          whileHover={reduceMotion ? undefined : { y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          transition={motionTransition}
          className="h-full"
        >
          <Link
            href="/"
            aria-label="Forge home"
            title="Forge"
            className={`inline-flex h-full w-16 items-center justify-center ${DARK_ITEM_BG} transition-colors ${DARK_ITEM_HOVER}`}
          >
            {logoMark}
          </Link>
        </motion.div>
        <motion.button
          whileHover={reduceMotion ? undefined : { y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          className={`inline-flex h-full w-16 items-center justify-center ${DARK_ITEM_BG} text-white transition-colors ${DARK_ITEM_HOVER}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </motion.button>
      </header>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <>
            <motion.button
              key="mobile-backdrop"
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-[#020617]/56 backdrop-blur-[2px] md:hidden"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={motionTransition}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              key="mobile-menu"
              className={`fixed bottom-0 left-0 top-0 z-50 flex w-[282px] flex-col justify-between ${DARK_HEADER_BG} text-white shadow-[24px_0_60px_-34px_rgba(0,0,0,0.85)] md:hidden`}
              initial={reduceMotion ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: "-100%" }}
              transition={motionTransition}
            >
              <div className="flex h-16 items-stretch justify-between border-b border-white/8">
                <Link
                  href="/"
                  aria-label="Forge home"
                  className={`inline-flex h-full w-16 items-center justify-center ${DARK_ITEM_BG} transition-colors ${DARK_ITEM_HOVER}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {logoMark}
                </Link>
                <button
                  type="button"
                  className={`inline-flex h-full w-16 items-center justify-center ${DARK_ITEM_BG} transition-colors ${DARK_ITEM_HOVER}`}
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X size={19} />
                </button>
              </div>

              <nav className="flex w-full flex-col" aria-label="Mobile main">
                {NAV_LINKS.map((l, index) => (
                  <motion.div
                    key={l.href}
                    initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { ...motionTransition, delay: 0.04 * index }
                    }
                    className="w-full"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex h-16 w-full items-center px-5 text-sm font-extrabold transition-colors ${
                        isActiveLink(pathname, l.href)
                          ? "bg-[#1E40AF] text-white shadow-[inset_3px_0_0_#38BDF8]"
                          : "bg-transparent text-white/66 hover:bg-[#111821] hover:text-white"
                      }`}
                      aria-current={isActiveLink(pathname, l.href) ? "page" : undefined}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto grid w-full grid-cols-2 border-t border-white/8">
                {accountActions}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
