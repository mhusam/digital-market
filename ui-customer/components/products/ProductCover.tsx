import { coverFor } from "../../lib/cover";

interface ProductCoverProps {
  seed: string;
  title: string;
  size?: "sm" | "md" | "lg";
  rounded?: string;
}

export function ProductCover({
  seed,
  title,
  size = "md",
  rounded = "rounded-2xl",
}: ProductCoverProps) {
  const c = coverFor(seed);
  const heightClass =
    size === "sm" ? "h-32" : size === "lg" ? "h-[480px]" : "h-52";
  const initials = title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${heightClass} w-full`}
      style={{ background: c.bg }}
      aria-hidden
    >
      {c.pattern === "dots" && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(${c.accent} 1.5px, transparent 1.5px)`,
            backgroundSize: "18px 18px",
          }}
        />
      )}
      {c.pattern === "grid" && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(${c.accent} 1px, transparent 1px),
                              linear-gradient(90deg, ${c.accent} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      )}
      {c.pattern === "rings" && (
        <>
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full border-[6px] opacity-25"
            style={{ borderColor: c.accent }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border-[10px] opacity-20"
            style={{ borderColor: c.accent }}
          />
        </>
      )}
      {c.pattern === "wave" && (
        <svg
          className="absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
          style={{ height: "60%" }}
        >
          <path
            d="M0 60 C 100 20, 200 90, 400 30 L400 100 L0 100 Z"
            fill={c.accent}
            opacity="0.18"
          />
          <path
            d="M0 80 C 120 40, 240 100, 400 50 L400 100 L0 100 Z"
            fill={c.accent}
            opacity="0.12"
          />
        </svg>
      )}
      {c.pattern === "stack" && (
        <div className="absolute inset-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-2xl border-2"
              style={{
                inset: `${i * 14}px`,
                borderColor: c.accent,
                opacity: 0.18 + i * 0.08,
              }}
            />
          ))}
        </div>
      )}
      {c.pattern === "blocks" && (
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-25">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: i % 2 === 0 ? c.accent : "transparent",
                opacity: i % 3 === 0 ? 0.6 : 0.3,
              }}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 flex items-end justify-between p-5">
        <span
          className="font-black text-[44px] leading-none tracking-[-0.04em]"
          style={{ color: c.accent }}
        >
          {initials}
        </span>
        <span
          className="text-5xl leading-none opacity-80"
          style={{ color: c.accent }}
        >
          {c.glyph}
        </span>
      </div>
    </div>
  );
}
