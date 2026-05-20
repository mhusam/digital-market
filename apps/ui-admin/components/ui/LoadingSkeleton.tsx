import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-border-subtle rounded-md",
        "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:animate-[shimmer_1.4s_infinite]",
        className,
      )}
    />
  );
}

export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="panel">
      <div className="surface-header">
        <Skeleton className="h-9 w-64 max-w-full" />
      </div>
      <div className="table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              {Array.from({ length: cols }).map((_, c) => (
                <th key={c}>
                  <Skeleton className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c}>
                    <Skeleton
                      className={cn(
                        "h-4",
                        c === 0 ? "w-24" : c === cols - 1 ? "w-16 ml-auto" : "w-full max-w-[140px]",
                      )}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
