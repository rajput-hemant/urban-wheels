import type { SelectedFilters } from "../filters";
import type { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SeatingCapacityFiltersProps = {
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
};

export function SeatingCapacityFilters(props: SeatingCapacityFiltersProps) {
  const { selectedFilters, setSelectedFilters } = props;

  const handleClick = (seats: number | undefined) => {
    setSelectedFilters({
      ...selectedFilters,
      seats: selectedFilters.seats === seats ? undefined : seats,
    });
  };

  return (
    <section>
      <h3 className="pb-6 text-xl font-semibold">Seating capacity</h3>

      <div className="mb-2 flex flex-row flex-wrap items-center gap-3">
        {[undefined, 2, 3, 4, 5, 6, 7].map((seats, index, array) => {
          return (
            <Button
              key={seats ?? "any"}
              variant="outline"
              onClick={() => handleClick(seats)}
              className={cn(
                "w-14 rounded-full",
                selectedFilters.seats === seats &&
                  "!bg-primary !text-background"
              )}
            >
              {seats === undefined ?
                "Any"
              : index === array.length - 1 ?
                `${seats}+`
              : seats}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
