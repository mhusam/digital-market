"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { BackgroundBeams } from "./BackgroundBeams";

export function BgShapes() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 34,
    mass: 0.22,
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            e.target.classList.remove("reveal-pending");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;
        if (inView) {
          el.classList.add("is-visible");
          el.classList.remove("reveal-pending");
          return;
        }
        el.classList.add("reveal-pending");
        io.observe(el);
      });
    };

    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: smoothProgress }}
        aria-hidden
      />
      <BackgroundBeams className="z-0" />
    </>
  );
}
