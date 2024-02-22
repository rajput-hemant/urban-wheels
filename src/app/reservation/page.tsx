import Image from "next/image";
import { differenceInDays } from "date-fns";
import { Star } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { fetchCarBySlug, fetchLocationByValue } from "@/lib/db/queries";
import { SearchParams } from "@/lib/enums";
import { formatCurrency, formatDates } from "@/lib/utils";
import { NavigateBack } from "./navigate-back";
import { PayButton } from "./pay-button";

type ReservationPageProps = {
  searchParams: {
    [SearchParams.CAR_SLUG]: string;
    [SearchParams.LOCATION]: string;
    [SearchParams.CHECKIN]: string;
    [SearchParams.CHECKOUT]: string;
  };
};

export default async function ReservationPage(props: ReservationPageProps) {
  const {
    checkin,
    checkout,
    location: locationSlug,
    [SearchParams.CAR_SLUG]: carSlug,
  } = props.searchParams;

  const [car, location] = await Promise.allSettled([
    fetchCarBySlug(carSlug),
    fetchLocationByValue(locationSlug),
  ]);

  if (car.status === "rejected" || !car.value) {
    throw new Error("Failed to fetch car data.");
  }

  if (location.status === "rejected" || !location.value) {
    throw new Error("Failed to fetch location data.");
  }

  const bodyStyle = car.value.body_style;
  const carName = car.value.name;
  const rating = car.value.rating;
  const reviews = car.value.reviews;
  const pricePerDay =
    car.value.discounted_price_per_day || car.value.retail_price_per_day;
  const currency =
    car.value.discounted_price_currency || car.value.retail_price_currency;

  const days = differenceInDays(new Date(checkout), new Date(checkin));
  const subtotal = pricePerDay * days;
  const taxesAndFees = subtotal * 0.16;

  return (
    <main className="mx-auto w-full max-w-none px-5 md:max-w-[90%] md:px-0 lg:mt-4 xl:max-w-6xl">
      <div className="flex h-40 items-center">
        <div className="flex gap-2 md:-ml-12">
          <NavigateBack />
          <h1 className="text-3xl font-semibold">Confirm and pay</h1>
        </div>
      </div>

      <div className="flex w-full flex-col-reverse justify-between gap-10 md:flex-row">
        <div className="mx-auto w-full max-w-lg md:mx-0">
          <h2 className="text-xl font-semibold">Your reservation</h2>

          <div className="mt-4 space-y-1">
            <h3 className="font-semibold">Dates</h3>
            <p className="text-muted-foreground">
              {formatDates(checkin, checkout)}
            </p>
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="font-semibold">Place</h3>
            <p className="text-muted-foreground">{location.value.name}</p>
          </div>

          <Separator decorative className="my-8" />

          <PayButton />
        </div>

        <div className="mx-auto w-full max-w-lg rounded-xl border p-6 md:mx-0">
          <div className="flex justify-between">
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs">{bodyStyle}</p>
              <p className="text-sm">{carName}</p>

              <div className="flex items-baseline space-x-1 text-xs">
                <Star className="size-3" />
                <span className="font-semibold">{rating}</span>
                <span className="text-muted-foreground mt-5">
                  ({reviews} reviews)
                </span>
              </div>
            </div>

            <Image
              src={car.value.image_url}
              alt={car.value.name}
              width={100}
              height={100}
            />
          </div>

          <Separator decorative className="my-6" />

          <div className="space-y-6">
            <h1 className="text-xl font-semibold">Price Details</h1>

            <div className="text-muted-foreground flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="underline">
                  {formatCurrency(pricePerDay, currency)} x {days} days
                </span>
                <span>{formatCurrency(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Taxes and fees</span>
                <span>{formatCurrency(taxesAndFees, currency)}</span>
              </div>
            </div>
          </div>

          <Separator decorative className="my-6" />

          <div className="flex justify-between font-semibold">
            <span>Total ({currency})</span>
            <span>{formatCurrency(subtotal + taxesAndFees, currency)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
