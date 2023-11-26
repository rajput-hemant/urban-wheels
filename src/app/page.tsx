import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  Navigation,
  ShieldCheck,
  Sparkle,
} from "lucide-react";

import { BodyStyle, SearchParams } from "@/lib/enums";
import { Icons } from "@/components/icons";
import { LogoSlider } from "@/components/logo-slider";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import {
  hatchback,
  minivan,
  pickupTruck,
  sedan,
  sportsCar,
  suv,
} from "@/public/images/cars/body-styles";

const bodyStyles = [
  {
    slug: BodyStyle.HATCHBACK,
    name: "Hatchback",
    icon: Icons.hatchback,
  },
  { slug: BodyStyle.MINIVAN, name: "Minivan", icon: Icons.minivan },
  {
    slug: BodyStyle.PICKUP_TRUCK,
    name: "Pickup Truck",
    icon: Icons.pickupTruck,
  },
  {
    slug: BodyStyle.SPORTS_CAR,
    name: "Sports Car",
    icon: Icons.sportsCar,
  },
  { slug: BodyStyle.SUV, name: "SUV", icon: Icons.suv },
  { slug: BodyStyle.SEDAN, name: "Sedan", icon: Icons.sedan },
];

export default function Page() {
  return (
    <main>
      <Hero />
      <BodyStyleCarExplorer />
      <Features />
      <CarExplorer />
    </main>
  );
}

function Hero() {
  return (
    <section className="from-background to-muted via-muted border-b bg-gradient-to-b">
      <h1 className="from-foreground bg-gradient-to-t to-zinc-600 bg-clip-text text-center text-5xl font-bold text-transparent dark:bg-gradient-to-b">
        Find your car
      </h1>

      <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-4 text-sm font-medium md:gap-12">
        <div className="flex shrink-0 items-center justify-center gap-1.5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          <span>No hidden fees.</span>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-1.5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          <span>Transparent pricing.</span>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-1.5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          <span>Flexible cancellations.</span>
        </div>
      </div>
      <div className="mt-5 hidden md:block">
        {/* <Suspense fallback={<SearchFormSkeleton />}>
            <SearchForm locations={locations} />
          </Suspense> */}
      </div>
      <div className="mt-14 overflow-x-hidden">
        <LogoSlider />
      </div>
    </section>
  );
}

function BodyStyleCarExplorer() {
  const imageMap = {
    hatchback: hatchback,
    minivan: minivan,
    "pickup-truck": pickupTruck,
    "sports-car": sportsCar,
    suv: suv,
    sedan: sedan,
  };

  return (
    <section className="container border-t pt-10">
      <h2 className="text-2xl font-bold">Popular Rental Car Choices</h2>
      <p className="text-muted-foreground text-sm">
        Choose from a wide variety of vehicles
      </p>

      <div className="before:from-background after:from-background relative mt-8 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[10%] before:bg-gradient-to-r after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[10%] after:bg-gradient-to-l">
        <ScrollArea>
          <div className="mb-4 space-x-2 whitespace-nowrap">
            {bodyStyles.map(({ slug, name }) => {
              const imageUrl = imageMap[slug];

              return (
                <div
                  key={slug}
                  className="group relative inline-block h-36 w-64 overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-md"
                >
                  <Link
                    href={{
                      pathname: "/cars",
                      query: { [SearchParams.BODY_STYLE]: slug },
                    }}
                    className="absolute inset-0 z-20"
                  >
                    <span className="sr-only">{name}</span>
                  </Link>

                  <div className="absolute left-3 top-3 z-10 flex items-center justify-center leading-none">
                    <span className="rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 text-[15px] font-semibold text-neutral-800">
                      {name}
                    </span>
                  </div>

                  {imageUrl ? (
                    <Image
                      priority
                      src={imageUrl}
                      alt={name}
                      width={250}
                      height={144}
                      className="h-full w-full bg-gradient-to-r from-[#f9f9f9] to-[#e9e9e9] object-cover object-center duration-300 group-hover:scale-110"
                      placeholder="blur"
                    />
                  ) : (
                    <Skeleton className="h-full w-full" />
                  )}
                </div>
              );
            })}
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-muted mt-10 border-t">
      <div className="mx-auto max-w-none px-5 py-14 sm:max-w-[90%] sm:px-0 lg:max-w-4xl">
        <h2 className="text-center text-2xl font-bold">
          Discover Why We Stand Out
        </h2>

        <div className="mt-12 grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left">
            <div className="bg-background flex h-12 w-12 items-center justify-center rounded-full border">
              <Sparkle className="h-6 w-6 text-neutral-500" />
            </div>
            <p className="mt-6 font-semibold">Hassle-Free Booking</p>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-5">
              Effortless booking process. Your perfect car, just a click away.
              Enjoy seamless reservations and unlock great deals instantly.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left">
            <div className="bg-background flex h-12 w-12 items-center justify-center rounded-full border">
              <ShieldCheck className="h-6 w-6 text-neutral-500" />
            </div>
            <p className="mt-6 font-semibold">Secure Rentals</p>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-5">
              Your safety assured. Rigorous checks, transparent policies, and
              comprehensive insurance. Travel worry-free with well-maintained
              vehicles and reliable, secure rental services.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-center md:items-start md:text-left">
            <div className="bg-background flex h-12 w-12 items-center justify-center rounded-full border">
              <Navigation className="h-6 w-6 text-neutral-500" />
            </div>
            <p className="mt-6 font-semibold">Easy Navigation</p>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-5">
              Explore with confidence. User-friendly navigation tools to find
              your way, making your travels smooth and enjoyable, wherever your
              destination may be.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CarExplorer() {
  return (
    <section className="border-t py-16">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-x-6 gap-y-9 md:flex-row md:items-center">
          <h2 className="text-center text-2xl font-bold leading-9">
            <p>Your Journey Begins Here.</p>
            <p>Dive into Endless Possibilities!</p>
          </h2>

          <Button size="lg" className="group mx-auto md:mx-0" asChild>
            <Link
              href="/cars"
              className="flex items-center justify-center gap-x-2"
            >
              Explore Cars
              <ChevronRight className="h-4 w-4 duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
