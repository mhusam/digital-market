import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#eee9de] rounded-md",
        "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:animate-[shimmer_1.4s_infinite]",
        className,
      )}
      style={{
        // shimmer keyframe inline (Tailwind v4)
      }}
    />
  );
}

export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white border border-[#e8e5df] rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#eee9de] bg-[#faf9f5]">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="divide-y divide-[#eee9de]">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="px-4 py-3 flex gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className={cn("h-4", c === 0 ? "w-10" : c === 1 ? "flex-1" : "w-24")} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
