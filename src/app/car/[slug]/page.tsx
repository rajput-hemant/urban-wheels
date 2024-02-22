import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Gift, LifeBuoy, Map } from "lucide-react";

import type { Metadata } from "next";

import { fetchCarBySlug, fetchCars, fetchLocations } from "@/lib/db/queries";
import { ReservationSidebar } from "./reservation-sidebar";

type CarPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params: { slug },
}: CarPageProps): Promise<Metadata> {
  const car = await fetchCarBySlug(slug);

  if (!car) {
    return {};
  }

  return {
    title: car.name,
    description: car.descriptions[0],
  };
}

export async function generateStaticParams() {
  const cars = await fetchCars();
  return cars.map(({ slug }) => ({ slug }));
}

export default async function CarDetailsPage({ params }: CarPageProps) {
  const [car, locations] = await Promise.all([
    fetchCarBySlug(params.slug),
    fetchLocations(),
  ]);

  if (!car) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-none px-5 md:max-w-[90%] md:px-0 lg:mt-4 xl:max-w-6xl">
      <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-[1fr_370px]">
        <div className="p-6 px-0 pb-0 md:pb-0 md:pr-6">
          <div className="grid grid-cols-[1fr_auto] justify-between">
            <div className="flex flex-col">
              <h1 className="font-heading text-2xl md:text-3xl">{car.name}</h1>

              <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-1.5 text-sm lg:text-base">
                <span>{car.seats} seats</span>
                <span>·</span>
                <span>{car.engine_type}</span>
                <span>·</span>
                <span>{car.transmission}</span>
                {car.unlimited_mileage && (
                  <>
                    <span>·</span>
                    <span>Unlimited mileage</span>
                  </>
                )}
              </div>
            </div>

            <div className="relative h-14 w-20 md:w-24">
              <Image
                src={car.image_url}
                alt={car.name}
                fill
                priority
                className="object-contain object-center"
              />
            </div>
          </div>

          <hr className="my-6" />

          <div className="flex flex-col gap-6">
            <div className="flex gap-8">
              <Gift className="size-6 shrink-0" />
              <div className="flex flex-col">
                <p className="font-semibold">Exclusive Deals</p>
                <p className="text-muted-foreground mt-0.5 text-sm leading-5">
                  Unlock special discounts and exclusive offers tailored just
                  for you.
                </p>
              </div>
            </div>

            <div className="flex gap-8">
              <Map className="size-6 shrink-0" />
              <div className="flex flex-col">
                <p className="font-semibold">Local Tips</p>
                <p className="text-muted-foreground mt-0.5 text-sm leading-5">
                  Receive recommendations for local attractions, restaurants,
                  and scenic routes.
                </p>
              </div>
            </div>

            <div className="flex gap-8">
              <LifeBuoy className="size-6 shrink-0" />
              <div className="flex flex-col">
                <p className="font-semibold">24/7 Roadside Assistance</p>
                <p className="text-muted-foreground mt-0.5 text-sm leading-5">
                  Travel with confidence. Our round-the-clock assistance ensures
                  you&apos;re supported anytime, anywhere.
                </p>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          <div className="mt-10 space-y-6">
            {car.descriptions.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <hr className="my-12" />

          <div className="mb-6">
            <h2 className="text-lg font-semibold">Features</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {car.features.map((feature) => (
                <div key={feature} className="flex items-center gap-4">
                  <Check className="size-4 shrink-0" />
                  <p className="text-muted-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ReservationSidebar
          carSlug={params.slug}
          pricePerDay={car.discounted_price_per_day || car.retail_price_per_day}
          currency={car.discounted_price_currency || car.retail_price_currency}
          rating={car.rating}
          reviews={car.reviews}
          locations={locations}
        />
      </div>
    </div>
  );
}
