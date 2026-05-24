import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 8,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "var(--accent-electric)",
  colorTo = "var(--accent-violet)",
  delay = 0,
}: BorderBeamProps) {
  return (
    <>
      <style>{`
        @keyframes border-beam-anim {
          100% {
            offset-distance: 100%;
          }
        }
        .border-beam-active::after {
          animation: border-beam-anim var(--duration) linear infinite;
          animation-delay: var(--delay);
        }
      `}</style>
      <div
        style={
          {
            "--size": `${size}px`,
            "--duration": `${duration}s`,
            "--anchor": `${anchor}`,
            "--border-width": `${borderWidth}px`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            "--delay": `${delay}s`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] border-beam-active",
          // Mask clip to draw on border path
          "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
          // Pseudo-element rotating background
          "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
          className
        )}
      />
    </>
  );
}
