import { CarCatalogSkeleton, SearchFormSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="bg-background sticky inset-x-0 top-[57px] z-50 hidden h-16 items-center justify-start border-b pt-px lg:flex">
        <div className="mx-auto w-full max-w-none px-5 sm:max-w-none sm:px-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-16" />

            <div className="-mt-16 hidden lg:flex">
              <SearchFormSkeleton compact />
            </div>

            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>

      <div className="relative flex lg:h-[calc(100dvh-8rem)]">
        <div className="w-full overflow-y-auto lg:w-[55%] xl:w-[63%]">
          <CarCatalogSkeleton />
        </div>

        <div className="hidden h-[calc(100dvh-8rem)] flex-auto pb-4 pr-5 pt-8 lg:block">
          <div className="flex h-full rounded-md border-2 border-dashed p-2">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
