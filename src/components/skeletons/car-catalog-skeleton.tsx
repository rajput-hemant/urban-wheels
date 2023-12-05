import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export function CarCatalogSkeleton() {
  return (
    <div className="p-4 sm:px-2 lg:py-2">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-center gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function CarCardSkeleton() {
  return (
    <div className="h-full w-full rounded-xl border shadow-sm">
      <div className="mb-4 flex justify-between p-6">
        <Skeleton className="h-5 w-1/2" />
        <div className="flex w-1/3 gap-1.5">
          <Skeleton className="h-5 w-5 shrink-0" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>

      <div className="p-6 pt-2">
        <Skeleton className="h-20 w-full" />
        <div className="mt-5 flex items-center justify-between gap-2">
          <Skeleton className=" h-4 w-1/4" />
          <Separator orientation="vertical" decorative className="h-4" />
          <Skeleton className=" h-4 w-1/4" />
          <Separator orientation="vertical" decorative className="h-4" />
          <Skeleton className=" h-4 w-1/4" />
        </div>
        <Skeleton className="mt-5 h-5" />
      </div>

      <div className="p-6 pt-0">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
