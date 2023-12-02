import dynamic from "next/dynamic";

import { fetchLocations } from "@/lib/db/queries";

import { Skeleton } from "./ui/skeleton";

const DynamicMap = dynamic(async () => await import("./map"), {
  loading: () => <Skeleton className="h-full w-full" />,
  ssr: false,
});

export async function MapContainer() {
  const locations = await fetchLocations();

  return (
    <div className="flex w-full">
      <DynamicMap locations={locations} />
    </div>
  );
}
