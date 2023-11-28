import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-none px-5 sm:max-w-[90%] sm:px-0 xl:max-w-6xl">
      <main className="flex h-full flex-col items-center justify-center gap-4 py-52">
        <h2 className="text-center text-2xl font-bold">404 - Car Not Found</h2>
        <p className="text-muted-foreground mb-4 max-w-md text-center">
          The car you&apos;re looking for seems to have taken a detour. No
          worries, though! We have a wide selection of vehicles waiting just for
          you.
        </p>

        <Button className="group text-sm xl:hidden" asChild>
          <Link
            href="/cars"
            className="flex items-center justify-center gap-x-2.5"
          >
            Explore Our Cars
            <ChevronRight className="h-3 w-3 duration-200 group-hover:translate-x-2" />
          </Link>
        </Button>

        <Button size="lg" className="group hidden text-sm xl:flex" asChild>
          <Link
            href="/cars"
            className="flex items-center justify-center gap-x-3"
          >
            Explore Our Cars
            <ChevronRight className="w-3.h-3.5 h-3.5 duration-200 group-hover:translate-x-2" />
          </Link>
        </Button>
      </main>
    </div>
  );
}
