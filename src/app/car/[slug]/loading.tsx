import {
  CarOverviewSkeleton,
  ReservationSidebarSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-none px-5 md:max-w-[90%] md:px-0 lg:mt-4 xl:max-w-6xl">
      <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-[1fr_370px]">
        <CarOverviewSkeleton />
        <ReservationSidebarSkeleton />
      </div>
    </div>
  );
}
