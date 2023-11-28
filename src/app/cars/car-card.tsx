import Image from "next/image";
import { Gauge, Star } from "lucide-react";

import { cars } from "@/lib/db/placeholder";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CarDetailsButton } from "./details-button";

type CarCardProps = {
  index: number;
  slug: string;
};

export async function CarCard({ index, slug }: CarCardProps) {
  const car = cars.find((car) => car.slug === slug);

  if (!car) {
    return null;
  }

  const {
    name,
    image_url,
    transmission,
    engine_type,
    seats,
    discounted_price_per_day,
    discounted_price_currency,
    retail_price_per_day,
    retail_price_currency,
    rating,
    reviews,
    unlimited_mileage,
  } = car;

  return (
    <Card className="duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <div className="flex items-baseline justify-between gap-x-2 whitespace-nowrap">
          <CardTitle className="inline-block truncate text-left text-sm font-semibold">
            {name}
          </CardTitle>

          <div className="text-muted-foreground flex items-baseline gap-1 text-right">
            <Star className="h-[14px] w-[14px] self-center" />

            <span className="text-sm font-medium leading-none">
              {rating} {reviews > 0 && `(${reviews})`}
            </span>
          </div>
        </div>

        <div
          className={cn(
            "text-muted-foreground pt-2 text-center text-xs leading-none",
            !unlimited_mileage && "invisible"
          )}
        >
          <Gauge className="mr-1.5 inline-block h-4 w-4" />
          Unlimited mileage
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative h-20 w-full">
          <Image
            src={image_url}
            alt={name}
            fill
            sizes="250px"
            priority={index < 8}
            quality={100}
            className="object-contain object-center"
          />
        </div>

        <div className="text-muted-foreground mt-4 flex items-center justify-between gap-x-2 text-sm">
          <p>{transmission}</p>
          <Separator orientation="vertical" decorative className="h-4" />
          <p>{engine_type}</p>
          <Separator orientation="vertical" decorative className="h-4" />
          <p>{seats} Seats</p>
        </div>

        <div className="mt-4 text-base">
          {discounted_price_per_day ? (
            <>
              <span className="text-muted-foreground mr-1.5 line-through">
                {retail_price_per_day}
              </span>

              <span className="font-semibold">
                {formatCurrency(
                  discounted_price_per_day,
                  discounted_price_currency
                )}
              </span>
            </>
          ) : (
            <span className=" font-semibold">
              {formatCurrency(retail_price_per_day, retail_price_currency)}
            </span>
          )}

          <span className="ml-1 text-sm font-medium">day</span>
        </div>
      </CardContent>

      <CardFooter>
        <CarDetailsButton slug={slug} />
      </CardFooter>
    </Card>
  );
}
