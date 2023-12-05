import { CarCatalogSkeleton, SearchFormSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="bg-background sticky inset-x-0 top-[57px] z-50 hidden h-16 items-center justify-start border-b pt-px lg:flex">
        <div className="mx-auto w-full max-w-none px-5 sm:max-w-none sm:px-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-28" />

            <div className="-mt-16">
              <SearchFormSkeleton compact />
            </div>

            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      <div className="relative flex lg:min-h-[calc(100dvh-8rem)]">
        <div className="w-full overflow-y-auto lg:w-[55%] xl:w-[63%]">
          <CarCatalogSkeleton />
        </div>

        <div className="hidden flex-auto lg:block">
          <div className="sticky top-[calc(8rem+1px)] my-2 mr-2 flex min-h-[calc(100dvh-8.5rem)] overflow-hidden rounded-md border">
            <Skeleton className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
