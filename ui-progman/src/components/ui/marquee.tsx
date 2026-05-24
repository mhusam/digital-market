import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
  duration = 40,
}: MarqueeProps) {
  return (
    <>
      <style>{`
        @keyframes marquee-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .marquee-track-h {
          display: flex;
          flex-direction: row;
          width: max-content;
          animation: marquee-horizontal var(--marquee-duration) linear infinite;
        }
        .marquee-track-v {
          display: flex;
          flex-direction: column;
          height: max-content;
          animation: marquee-vertical var(--marquee-duration) linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
        .marquee-pause-hover:hover .marquee-track-h,
        .marquee-pause-hover:hover .marquee-track-v {
          animation-play-state: paused;
        }
      `}</style>
      <div
        style={{
          "--marquee-duration": `${duration}s`,
        } as React.CSSProperties}
        className={cn(
          "group flex overflow-hidden p-1 [gap:1rem] relative",
          vertical ? "flex-col h-full" : "flex-row w-full",
          pauseOnHover ? "marquee-pause-hover" : "",
          className
        )}
      >
        {/* We output twice the elements to enable infinite loop transition */}
        <div
          className={cn(
            "flex shrink-0 justify-around [gap:1rem] min-w-full",
            vertical ? "marquee-track-v" : "marquee-track-h",
            reverse ? "marquee-reverse" : ""
          )}
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center justify-around [gap:1rem]">
              {children}
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className={cn(
            "flex shrink-0 justify-around [gap:1rem] min-w-full",
            vertical ? "marquee-track-v" : "marquee-track-h",
            reverse ? "marquee-reverse" : ""
          )}
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center justify-around [gap:1rem]">
              {children}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Marquee;
