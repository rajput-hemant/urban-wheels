import type { Dispatch, SetStateAction } from "react";

import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

import type { SelectedFilters } from "../filters";

type PriceRangeFiltersProps = {
  minPrice: number;
  maxPrice: number;
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
};

export function PriceRangeFilters(props: PriceRangeFiltersProps) {
  const { minPrice, maxPrice, selectedFilters, setSelectedFilters } = props;

  const handleSliderChange = (priceRange: number[]) => {
    setSelectedFilters({
      ...selectedFilters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  return (
    <section className="">
      <h3 className="pb-6 text-xl font-semibold">Price range</h3>

      <div className="mx-auto flex max-w-[600px] flex-col items-start justify-between gap-12 pt-2">
        <Slider
          defaultValue={[minPrice, maxPrice]}
          value={[selectedFilters.minPrice, selectedFilters.maxPrice]}
          onValueChange={handleSliderChange}
          min={minPrice}
          max={maxPrice}
          step={1}
          minStepsBetweenThumbs={1}
          classNames={{ thumb: "h-7 w-7 shadow-lg" }}
        />

        <div className="flex w-full items-center justify-between gap-6">
          <div className="relative h-14 w-full">
            <Label
              htmlFor="min-price"
              className="text-muted-foreground absolute left-2.5 top-1.5 text-xs font-normal"
            >
              Minimum
            </Label>
            <span className="absolute bottom-3 left-3 text-sm">
              {formatCurrency(0, "INR").charAt(0)}
            </span>
            <Input
              id="min-price"
              readOnly
              className="absolute inset-0 h-full bg-transparent pl-6 pr-4 pt-5"
              value={selectedFilters.minPrice}
            />
          </div>

          <Separator
            decorative
            orientation="horizontal"
            className="h-px shrink-0 basis-4"
          />

          <div className="relative h-14 w-full">
            <Label
              htmlFor="max-price"
              className="text-muted-foreground absolute left-2.5 top-1.5 text-xs font-normal"
            >
              Maximum
            </Label>
            <span className="absolute bottom-3 left-3 text-sm">
              {formatCurrency(0, "INR").charAt(0)}
            </span>
            <Input
              id="max-price"
              readOnly
              className="absolute inset-0 h-full bg-transparent pl-6 pr-4 pt-5"
              value={selectedFilters.maxPrice}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
