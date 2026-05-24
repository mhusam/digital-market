import { coverFor } from "../../lib/cover";

interface ProductCoverProps {
  seed: string;
  title: string;
  size?: "sm" | "card" | "md" | "lg";
  rounded?: string;
}

export function ProductCover({
  seed,
  title,
  size = "md",
  rounded = "rounded-lg",
}: ProductCoverProps) {
  const cover = coverFor(seed);
  const isCard = size === "card";
  const heightClass =
    size === "sm"
      ? "h-20"
      : isCard
        ? "h-36"
        : size === "lg"
          ? "h-[360px]"
          : "h-44";
  const initials = title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={`relative w-full overflow-hidden border border-border bg-muted/60 ${rounded} ${heightClass}`}
      aria-label={`${title} preview`}
      role="img"
    >
      <div className="absolute inset-0" style={{ background: cover.bg }} />
      <div className="absolute inset-4 rounded-lg border border-white/30 bg-card/10" />
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
        <span
          className={
            isCard
              ? "text-3xl font-extrabold leading-none"
              : "text-4xl font-extrabold leading-none"
          }
          style={{ color: cover.accent }}
        >
          {initials}
        </span>
        <span
          className={isCard ? "text-xs font-bold" : "text-sm font-bold"}
          style={{ color: cover.accent }}
        >
          Product preview
        </span>
      </div>
    </div>
  );
}
