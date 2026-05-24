"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  return (
    <AnimatedThemeToggler
      variant="circle"
      duration={450}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "rounded-full cursor-pointer hover:bg-muted"
      )}
      aria-label="Toggle theme"
    />
  );
}
