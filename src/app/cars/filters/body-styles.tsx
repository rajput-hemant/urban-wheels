import type { Dispatch, SetStateAction } from "react";

import { BodyStyle } from "@/lib/enums";
import { Icons } from "@/components/icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import type { SelectedFilters } from "../filters";

export const bodyStyles = [
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

type BodyStyleFiltersProps = {
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
};

export function BodyStyleFilters(props: BodyStyleFiltersProps) {
  const { selectedFilters, setSelectedFilters } = props;

  function toggleBodyStyle(slug: string[]) {
    setSelectedFilters((prev) => ({
      ...prev,
      bodyStyles: slug as BodyStyle[],
    }));
  }

  return (
    <section>
      <h3 className="pb-6 text-xl font-semibold">Body Style</h3>

      <ToggleGroup
        type="multiple"
        variant="outline"
        value={selectedFilters.bodyStyles}
        onValueChange={toggleBodyStyle}
        className="grid h-full w-full grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {bodyStyles.map(({ icon: Icon, slug, name }) => {
          return (
            <ToggleGroupItem
              key={slug}
              value={slug}
              className="flex h-32 w-full flex-col items-start justify-between p-4"
            >
              {Icon && <Icon className="h-8 w-8" />}
              <span className="text-base font-medium">{name}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </section>
  );
}
