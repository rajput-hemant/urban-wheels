import { Suspense } from "react";
import { FilterX } from "lucide-react";

import { fetchCars, fetchLocations } from "@/lib/db/queries";
import { SearchParams } from "@/lib/enums";
import { slugify } from "@/lib/utils";
import { MapContainer } from "@/components/map-container";
import { SearchForm } from "@/components/search-form";
import { CarCatalogSkeleton } from "@/components/skeletons/car-catalog-skeleton";
import { SearchFormSkeleton } from "@/components/skeletons/search-form-skeleton";

import { CarCard } from "./car-card";
import { Filters } from "./filters";

type CarsPageProps = {
  searchParams: {
    [SearchParams.MIN_PRICE]?: string;
    [SearchParams.MAX_PRICE]?: string;
    [SearchParams.BODY_STYLE]?: string[];
    [SearchParams.ENGINE_TYPE]?: string[];
    [SearchParams.TRANSMISSION]?: string[];
    [SearchParams.MIN_SEATS]?: string;
  };
};

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const [cars, locations] = await Promise.all([fetchCars(), fetchLocations()]);

  const carPrices = cars.map(
    (car) => car.discounted_price_per_day || car.retail_price_per_day
  );

  let filteredCars = cars;

  const {
    [SearchParams.MIN_PRICE]: minPrice,
    [SearchParams.MAX_PRICE]: maxPrice,
    [SearchParams.BODY_STYLE]: bodyStyles,
    [SearchParams.ENGINE_TYPE]: engineTypes,
    [SearchParams.TRANSMISSION]: transmissions,
    [SearchParams.MIN_SEATS]: minSeats,
  } = searchParams;

  if (minPrice) {
    filteredCars = filteredCars.filter((car) => {
      const currentPrice =
        car.discounted_price_per_day || car.retail_price_per_day;
      return currentPrice >= +minPrice;
    });
  }
  if (maxPrice) {
    filteredCars = filteredCars.filter((car) => {
      const currentPrice =
        car.discounted_price_per_day || car.retail_price_per_day;
      return currentPrice <= +maxPrice;
    });
  }
  if (bodyStyles) {
    filteredCars = filteredCars.filter(({ body_style }) =>
      bodyStyles.includes(slugify(body_style))
    );
  }
  if (engineTypes) {
    filteredCars = filteredCars.filter(({ engine_type }) =>
      engineTypes.includes(slugify(engine_type))
    );
  }
  if (transmissions) {
    filteredCars = filteredCars.filter(({ transmission }) =>
      transmissions.includes(slugify(transmission))
    );
  }
  if (minSeats) {
    filteredCars = filteredCars.filter(({ seats }) => seats >= +minSeats);
  }

  return (
    <>
      <div className="bg-background sticky inset-x-0 top-[57px] z-50 hidden h-16 items-center justify-start pt-px lg:flex">
        <div className="mx-auto w-full max-w-none px-5 sm:max-w-none sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">
              {`${filteredCars.length} car${cars.length > 1 ? "s" : ""}`}
            </p>

            <div className="-mt-16">
              <Suspense fallback={<SearchFormSkeleton compact />}>
                <SearchForm locations={locations} compact />
              </Suspense>
            </div>

            <Filters
              initialMinPrice={Math.min(...carPrices)}
              initialMaxPrice={Math.max(...carPrices)}
            />
          </div>
        </div>
      </div>

      <div className="relative flex lg:min-h-[calc(100dvh-8rem)]">
        <div className="w-full overflow-y-auto lg:w-[55%] xl:w-[63%]">
          <Suspense fallback={<CarCatalogSkeleton />}>
            <div className="px-5 py-4 sm:px-2 lg:py-0">
              {filteredCars.length ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-center gap-3">
                  {filteredCars.map(({ id, slug }, index) => (
                    <CarCard key={id} index={index} slug={slug} />
                  ))}
                </div>
              ) : (
                <div className="flex h-[calc(100dvh-11rem)] flex-col items-center justify-center rounded-md border-2 border-dashed">
                  <FilterX size={44} />
                  <div className="text-center">
                    <h1 className="text-xl font-semibold">No exact matches</h1>
                    <p className="text-muted-foreground mt-3">
                      Try changing or removing some of your filters.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Suspense>
        </div>

        <div className="hidden flex-auto lg:block">
          <div className="sticky top-[calc(7.5rem+1px)] mb-4 mr-2 flex min-h-[calc(100dvh-8rem)] overflow-hidden rounded-md border">
            <MapContainer />
          </div>
        </div>
      </div>
    </>
  );
}
