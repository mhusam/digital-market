import { Skeleton } from "../components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12" role="status" aria-label="Loading page content">
      <div className="w-full max-w-4xl space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
