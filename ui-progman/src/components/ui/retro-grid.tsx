import { cn } from "@/lib/utils";

export function RetroGrid({
  className,
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px] opacity-40 dark:opacity-30",
        className
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      <style>{`
        @keyframes retro-grid-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(60px);
          }
        }
        .retro-grid-lines {
          animation: retro-grid-scroll 18s linear infinite;
        }
      `}</style>
      
      {/* Grid wrapper */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="retro-grid-lines absolute [background-repeat:repeat] [background-size:60px_60px] [height:400vh] [inset:0%_-50%] [width:200%] [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
      </div>

      {/* Shadow Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90%" />
    </div>
  );
}
