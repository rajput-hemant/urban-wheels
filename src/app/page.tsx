import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  ChevronRight,
  Navigation,
  ShieldCheck,
  Sparkle,
} from "lucide-react";

import type { Location } from "@/types/location";
import { BodyStyle, SearchParams } from "@/lib/enums";
import { Icons } from "@/components/icons";
import { LogoSlider } from "@/components/logo-slider";
import { SearchForm } from "@/components/search-form";
import { SearchFormSkeleton } from "@/components/skeletons/search-form-skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import hatchback from "@/public/images/cars/body-styles/hatchback.avif";
import minivan from "@/public/images/cars/body-styles/minivan.avif";
import pickupTruck from "@/public/images/cars/body-styles/pickup-truck.avif";
import sedan from "@/public/images/cars/body-styles/sedan.avif";
import sportsCar from "@/public/images/cars/body-styles/sports-car.avif";
import suv from "@/public/images/cars/body-styles/suv.avif";

const bodyStyles = [
  { slug: BodyStyle.HATCHBACK, name: "Hatchback", icon: Icons.hatchback },
  { slug: BodyStyle.MINIVAN, name: "Minivan", icon: Icons.minivan },
  {
    slug: BodyStyle.PICKUP_TRUCK,
    name: "Pickup Truck",
    icon: Icons.pickupTruck,
  },
  { slug: BodyStyle.SPORTS_CAR, name: "Sports Car", icon: Icons.sportsCar },
  { slug: BodyStyle.SUV, name: "SUV", icon: Icons.suv },
  { slug: BodyStyle.SEDAN, name: "Sedan", icon: Icons.sedan },
];

const locations: Location[] = [
  {
    id: "c16c11e1-0875-4a56-8faf-2d080ae0b6d6",
    name: "Mumbai, India",
    value: "mumbai",
    latitude: 19.076,
    longitude: 72.8777,
    featured: false,
  },
  {
    id: "2a97043f-184f-4663-9dbb-fe8b9afc8d64",
    name: "Delhi, India",
    value: "delhi",
    latitude: 28.6139,
    longitude: 77.209,
    featured: true,
  },
  {
    id: "fae436f3-6341-486a-8691-0633f64e1997",
    name: "Amsterdam, Netherlands",
    value: "amsterdam",
    latitude: 52.3547,
    longitude: 4.904,
    featured: false,
  },
  {
    id: "6132dc81-cc1a-4a2e-93c3-d176139bec4f",
    name: "Barcelona, Spain",
    value: "barcelona",
    latitude: 41.3925,
    longitude: 2.1404,
    featured: false,
  },
  {
    id: "92331cbf-254a-4acf-9671-a77810faef4c",
    name: "Cancún, México",
    value: "cancun",
    latitude: 21.1617,
    longitude: -86.851,
    featured: true,
  },
  {
    id: "e27e9e7c-5bf9-44f9-b24f-3b5df6417c77",
    name: "Dubai, United Arab Emirates",
    value: "dubai",
    latitude: 25.2652,
    longitude: 55.2928,
    featured: true,
  },
  {
    id: "fd1e4b0d-5e1a-41db-a89b-6e33eed72ace",
    name: "New York, United States",
    value: "new-york",
    latitude: 40.6975,
    longitude: -73.9795,
    featured: false,
  },
  {
    id: "45d07433-25e2-4ce7-b039-f0317e694048",
    name: "Paris, France",
    value: "paris",
    latitude: 48.8589,
    longitude: 2.3469,
    featured: true,
  },
  {
    id: "d9b23370-3be4-4936-ae23-3ad54b310fd8",
    name: "Rio de Janeiro, Brazil",
    value: "rio",
    latitude: -22.9148,
    longitude: -43.4075,
    featured: false,
  },
  {
    id: "2538dcf8-b531-4c68-a87a-b49a42be0c23",
    name: "Rome, Italy",
    value: "rome",
    latitude: 41.8931,
    longitude: 12.4832,
    featured: true,
  },
  {
    id: "b31d9e0c-77c6-427b-9a19-37382ea62d7b",
    name: "Sydney, Australia",
    value: "sydney",
    latitude: -33.8693,
    longitude: 151.209,
    featured: false,
  },
  {
    id: "ff841d10-0682-4e51-9330-47c5abb00643",
    name: "Tokyo, Japan",
    value: "tokyo",
    latitude: 35.6841,
    longitude: 139.7742,
    featured: false,
  },
];

const testimonials = [
  {
    id: "985425fe-0c7e-4700-8e6d-d48b3bc66768",
    name: "Olivia Parker",
    comment:
      "Best Car Rental Experience! The website's interface is intuitive, making it easy to find the ideal car. The reviews from other users were incredibly helpful, and the entire process, from booking to return, was a breeze. Highly recommended!",
    username: "oliviaparker",
    image_url: "/images/avatars/olivia-parker.avif",
  },
  {
    id: "6671f37d-75ad-404f-bf23-04ddff964aa5",
    name: "Emma Thompson",
    comment:
      "A Seamless Experience! This website made renting a car hassle-free. The search filters helped me find the perfect car for my trip, and the customer support was responsive and friendly. 5-star service all the way!",
    username: "emmathompson",
    image_url: "/images/avatars/emma-thompson.avif",
  },
  {
    id: "8ecd373f-65c7-4651-a575-63325489297a",
    name: "Sophia Rodriguez",
    comment:
      "Reliable and Affordable! I've used several car rental websites before, but this one stands out. The prices are transparent, no hidden fees, and the cars are well-maintained. I'll be coming back for all my future trips.",
    username: "sophiarodriguez",
    image_url: "/images/avatars/sophia-rodriguez.avif",
  },
  {
    id: "944fdb07-590d-4cb1-a797-e7fb672c84e1",
    name: "Daniel Johnson",
    comment:
      "Exceptional Service! From booking to drop-off, everything was smooth and easy. The selection of cars was impressive, and the prices were unbeatable. Will definitely recommend to friends!",
    username: "danjohnson",
    image_url: "/images/avatars/daniel-johnson.avif",
  },
];

export default function Page() {
  return (
    <main>
      <Hero />
      <BodyStyleCarExplorer />
      <Features />
      <Testimonials />
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
          <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
          <span>No hidden fees.</span>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-1.5">
          <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
          <span>Transparent pricing.</span>
        </div>
        <div className="flex shrink-0 items-center justify-center gap-1.5">
          <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
          <span>Flexible cancellations.</span>
        </div>
      </div>
      <div className="mt-5 hidden md:block">
        <Suspense fallback={<SearchFormSkeleton />}>
          <SearchForm locations={locations} />
        </Suspense>
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
    <section className="container pt-10">
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
                    <span className="rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 text-sm font-semibold text-neutral-800">
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
                      placeholder="blur"
                      className="h-full w-full bg-gradient-to-r from-[#f9f9f9] to-[#e9e9e9] object-cover object-center duration-300 group-hover:scale-110"
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

function Testimonials() {
  return (
    <section className="border-t py-12">
      <div className="container">
        <h2 className="text-center text-2xl font-bold">Driven by Feedback</h2>
        <div className="mt-4 columns-1 sm:columns-2 lg:columns-4">
          {testimonials.map(({ id, name, username, comment, image_url }) => (
            <div key={id} className="pt-4">
              <figure className="bg-muted rounded-2xl border p-8 duration-200 hover:shadow-md">
                <blockquote className="text-sm leading-6">
                  <em>“{comment}”</em>
                </blockquote>

                <figcaption className="mt-6 flex items-center justify-start gap-5">
                  <Image
                    src={image_url}
                    alt={name}
                    height={40}
                    width={40}
                    className="h-12 w-12 rounded-full border"
                  />
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-muted-foreground text-sm">@{username}</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
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
              className="flex items-center justify-center gap-x-2 font-semibold"
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
