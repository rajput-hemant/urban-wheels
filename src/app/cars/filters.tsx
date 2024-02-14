"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

import type { BodyStyle, EngineType, Transmission } from "@/lib/enums";

import { CounterBadge } from "@/components/counter-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SearchParams } from "@/lib/enums";
import { createUrl } from "@/lib/utils";
import { BodyStyleFilters } from "./filters/body-styles";
import { EngineTypeFilters } from "./filters/engine-types";
import { PriceRangeFilters } from "./filters/price-range";
import { SeatingCapacityFilters } from "./filters/seating-capacity";
import { TransmissionFilters } from "./filters/transmission-types";

export type SelectedFilters = {
  minPrice: number;
  maxPrice: number;
  seats: number | undefined;
  bodyStyles: BodyStyle[];
  engineTypes: EngineType[];
  transmissions: Transmission[];
};

type FiltersProps = {
  initialMinPrice: number;
  initialMaxPrice: number;
};

export function Filters({ initialMinPrice, initialMaxPrice }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [totalSelectedFilters, setTotalSelectedFilters] = React.useState(0);

  const fetchSelectedFilters = React.useCallback(() => {
    const selectedFilters: SelectedFilters = {
      minPrice:
        Number(searchParams.get(SearchParams.MIN_PRICE)) || initialMinPrice,
      maxPrice:
        Number(searchParams.get(SearchParams.MAX_PRICE)) || initialMaxPrice,
      seats: Number(searchParams.get(SearchParams.MIN_SEATS)) || undefined,
      bodyStyles: searchParams.getAll(SearchParams.BODY_STYLE) as BodyStyle[],
      engineTypes: searchParams.getAll(
        SearchParams.ENGINE_TYPE
      ) as EngineType[],
      transmissions: searchParams.getAll(
        SearchParams.TRANSMISSION
      ) as Transmission[],
    };

    const paramToPropertyMap: Partial<
      Record<SearchParams, keyof SelectedFilters>
    > = {
      [SearchParams.MIN_PRICE]: "minPrice",
      [SearchParams.MAX_PRICE]: "maxPrice",
      [SearchParams.MIN_SEATS]: "seats",
      [SearchParams.BODY_STYLE]: "bodyStyles",
      [SearchParams.ENGINE_TYPE]: "engineTypes",
      [SearchParams.TRANSMISSION]: "transmissions",
    };

    let totalCount = 0;

    Object.values(SearchParams).forEach((param) => {
      if (
        ![
          SearchParams.LOCATION,
          SearchParams.CHECKIN,
          SearchParams.CHECKOUT,
        ].includes(param)
      ) {
        const property = paramToPropertyMap[param];

        if (property) {
          const paramValue = selectedFilters[property];

          if (Array.isArray(paramValue)) {
            totalCount += paramValue.length;
          } else if (
            typeof paramValue === "number" &&
            !isNaN(paramValue) &&
            property !== "minPrice" && // Exclude 'minPrice' from adding 1 to totalCount
            property !== "maxPrice" // Exclude 'maxPrice' from adding 1 to totalCount
          ) {
            totalCount += 1;
          }
        }
      }
    });

    if (selectedFilters?.minPrice !== initialMinPrice) {
      totalCount += 1; // Increment totalCount only if minPrice is different
    }

    if (selectedFilters?.maxPrice !== initialMaxPrice) {
      totalCount += 1; // Increment totalCount only if maxPrice is different
    }

    setTotalSelectedFilters(totalCount);
    return selectedFilters;
  }, [searchParams, initialMinPrice, initialMaxPrice]);

  const [selectedFilters, setSelectedFilters] =
    React.useState<SelectedFilters>(fetchSelectedFilters);

  React.useEffect(() => {
    setSelectedFilters(fetchSelectedFilters());
  }, [fetchSelectedFilters]);

  const handleFiltersReset = React.useCallback(() => {
    setSelectedFilters({
      minPrice: initialMinPrice,
      maxPrice: initialMaxPrice,
      bodyStyles: [],
      engineTypes: [],
      seats: undefined,
      transmissions: [],
    });
  }, [initialMinPrice, initialMaxPrice]);

  const handleFiltersApply = React.useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());

    const {
      minPrice,
      maxPrice,
      seats,
      bodyStyles,
      engineTypes,
      transmissions,
    } = selectedFilters;

    newParams.delete(SearchParams.MIN_PRICE);
    newParams.delete(SearchParams.MAX_PRICE);
    newParams.delete(SearchParams.BODY_STYLE);
    newParams.delete(SearchParams.MIN_SEATS);
    newParams.delete(SearchParams.TRANSMISSION);
    newParams.delete(SearchParams.ENGINE_TYPE);

    if (minPrice !== initialMinPrice)
      newParams.set(SearchParams.MIN_PRICE, minPrice.toString());

    if (maxPrice !== initialMaxPrice)
      newParams.set(SearchParams.MAX_PRICE, maxPrice.toString());

    if (seats) newParams.set(SearchParams.MIN_SEATS, seats.toString());

    bodyStyles.forEach((bodyStyle) => {
      newParams.append(SearchParams.BODY_STYLE, bodyStyle);
    });

    engineTypes.forEach((engineType) => {
      newParams.append(SearchParams.ENGINE_TYPE, engineType);
    });

    transmissions.forEach((transmission) => {
      newParams.append(SearchParams.TRANSMISSION, transmission);
    });

    router.push(createUrl("/cars", newParams));
    setIsDialogOpen(false);
  }, [searchParams, selectedFilters, initialMinPrice, initialMaxPrice, router]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
          className: "relative",
        })}
      >
        <Filter className="mr-2 size-4 shrink-0" />
        Filters
        <CounterBadge count={totalSelectedFilters} />
      </DialogTrigger>

      <DialogContent className="flex max-h-[calc(100dvh-4rem)] flex-col gap-0 p-0 sm:max-w-3xl">
        <DialogHeader className="flex h-28 items-center justify-center">
          <DialogTitle className="text-center lg:text-3xl">Filters</DialogTitle>
        </DialogHeader>

        <div className="flex h-full grow flex-col space-y-6 overflow-y-auto border-y p-6">
          <PriceRangeFilters
            minPrice={initialMinPrice}
            maxPrice={initialMaxPrice}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          <Separator />
          <BodyStyleFilters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          <Separator />
          <EngineTypeFilters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          <Separator />
          <SeatingCapacityFilters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          <Separator />
          <TransmissionFilters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        <DialogFooter className="h-28 px-5">
          <div className="flex w-full items-center justify-between">
            <Button
              variant="secondary"
              onClick={handleFiltersReset}
              className="w-24 text-sm font-semibold transition-shadow duration-200 hover:shadow"
            >
              Clear all
            </Button>

            <Button
              onClick={handleFiltersApply}
              className="w-24 text-sm font-semibold transition-shadow duration-200 hover:shadow"
            >
              Show cars
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
