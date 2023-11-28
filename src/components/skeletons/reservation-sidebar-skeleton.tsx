import { Skeleton } from "../ui/skeleton";

export function ReservationSidebarSkeleton() {
  return (
    <div className="hidden normal-nums md:block">
      <div className="sticky top-24 rounded-xl border p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <div className="grid grid-cols-1 items-baseline gap-4 leading-none lg:grid-cols-2">
          <div className="flex items-baseline gap-1.5 ">
            <Skeleton className="h-6 w-36 shrink-0" />
          </div>

          <div className="flex items-baseline gap-1 tracking-tight lg:justify-end">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-14 shrink-0" />
          </div>
        </div>

        <div className="mt-6 w-full rounded-xl border">
          <div className="flex flex-col border-b p-1">
            <div className="flex flex-col gap-2.5 p-2.5">
              <Skeleton className="h-2.5 w-24" />
              <Skeleton className="h-3.5 w-36" />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div>
              <div className="flex flex-col gap-2.5 p-2.5">
                <Skeleton className="h-2.5 w-14" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </div>

            <div className="border-l">
              <div className="flex flex-col gap-1.5 p-2.5">
                <Skeleton className="h-2.5 w-14" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </div>
          </div>
        </div>

        <Skeleton className="mt-6 h-12 w-full" />
        <Skeleton className="mx-auto mt-4 h-4 w-60" />

        <hr className="my-4" />

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-28" />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-20" />
          </div>

          <hr className="my-4" />

          <div className="flex items-center justify-between pb-1">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
